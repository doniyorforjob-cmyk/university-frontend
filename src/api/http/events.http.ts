import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export const getEventBySlug = async (slug: string, locale?: string): Promise<any> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const currentLocale = locale || localStorage.getItem('locale') || 'uz';

        // Slug yoki ID ekanligini aniqlash
        const isUUID = slug.length > 20 && slug.includes('-');
        const filterKey = isUUID ? 'filter[id][eq]' : 'filter[slug][eq]';

        const response = await apiClient.get(`/projects/${projectId}/content/events`, {
            params: {
                [filterKey]: slug,
                with: 'image,gallery',
                locale: currentLocale
            }
        });

        const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
        const entry = data.find((item: any) => {
            const itemSlug = item.fields?.slug || item.slug;
            const itemId = item.uuid || item.id;
            return itemSlug === slug || itemId === slug;
        });

        if (!entry) return undefined;

        const fields = entry.fields || {};

        return {
            id: entry.uuid || entry.id,
            slug: fields.slug || entry.slug,
            title: fields.title || entry.title,
            image_url: getImageUrl(
                (typeof fields.image === 'object' && !Array.isArray(fields.image) ? fields.image.path || fields.image.url : '') ||
                (Array.isArray(fields.images) ? fields.images[0]?.path : '') ||
                (fields.images?.path || '') ||
                (Array.isArray(fields.image) ? fields.image[0]?.url : '') ||
                (fields.image?.url || '') ||
                (entry.image_url || entry.image || '')
            ),
            description: fields.description || '',
            content: fields.content || '',
            published_at: entry.created_at || entry.published_at,
            views: fields.views || 0,
            location: fields.location || '',
            event_date: fields.event_date || entry.created_at,
            gallery: Array.isArray(fields.gallery)
                ? fields.gallery.map((img: any) => getImageUrl(img.path || img.url))
                : []
        };
    } catch (error) {
        console.error("Event detail fetch error:", error);
        return undefined;
    }
};
