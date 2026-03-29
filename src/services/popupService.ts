import apiClient from '../api/client';
import { PopupItem, PopupItemType } from '../types/popup.types';
import { getImageUrl } from '../utils/apiUtils';

const COLLECTIONS: { type: PopupItemType; endpoint: string }[] = [
  { type: 'news', endpoint: 'news' },
  { type: 'announcements', endpoint: 'announcements' },
  { type: 'open-lessons', endpoint: 'open-lessons' },
  { type: 'events', endpoint: 'events' },
  { type: 'step-forward', endpoint: 'step-forward' },
  { type: 'green-university', endpoint: 'green-university' },
  { type: 'cultural-events', endpoint: 'cultural-events' },
  { type: 'sports-club-life', endpoint: 'sports-club-life' },
];

export const getAggregatedPopupContent = async (locale?: string): Promise<PopupItem[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const currentLocale = locale || localStorage.getItem('locale') || 'uz';

    const fetchPromises = COLLECTIONS.map(async (col) => {
      try {
        const response = await apiClient.get(`/projects/${projectId}/content/${col.endpoint}`, {
          params: {
            'filter[showpopup][eq]': true,
            with: 'image',
            per_page: 10, // Fetch a bit more to ensure we find enough candidates
            locale: currentLocale,
          },
        });

        const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
        
        return data.map((entry: any) => {
          const fields = entry.fields || {};
          const imageObj = Array.isArray(fields.image) ? fields.image[0] : fields.image;
          
          // Determine the best date field (date, published_at, or created_at)
          const dateValue = fields.published_at || fields.date || entry.published_at || entry.created_at;

          return {
            id: entry.uuid || entry.id,
            slug: fields.slug || entry.slug,
            title: fields.title || entry.title,
            type: col.type,
            image_url: getImageUrl(imageObj?.url || imageObj?.thumbnail_url || ''),
            published_at: dateValue,
            description: fields.description || fields.content?.substring(0, 100),
            showpopup: fields.showpopup === true || fields.showpopup === 'true' || fields.showpopup === 1 || fields.showpopup === "1",
          };
        });
      } catch (err) {
        console.error(`Error fetching popup content for ${col.type}:`, err);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    const flatResults = results.flat();

    // STRICT FILTER: Only items where showpopup is truly true
    // Then sort by date descending and take top 4
    return flatResults
      .filter(item => item.showpopup === true)
      .sort((a, b) => {
        const dateA = new Date(a.published_at).getTime();
        const dateB = new Date(b.published_at).getTime();
        return dateB - dateA;
      })
      .slice(0, 4);
  } catch (error) {
    console.error("Aggregated popup content fetch error:", error);
    return [];
  }
};
