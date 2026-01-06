import { HomeStatsData } from '../../../types/home.types';
import { getImageUrl } from '../../../utils/apiUtils';

export const transformStatsData = (apiData: any): HomeStatsData => {
  try {
    // Normalize raw data from generic API response
    const rawItems = Array.isArray(apiData)
      ? apiData
      : (Array.isArray(apiData?.data) ? apiData.data : (apiData?.data ? [apiData.data] : []));

    if (rawItems.length === 0) {
      return { stats: [] };
    }

    const sortedStats = rawItems.map((item: any) => {
      const fields = item.fields || {};

      // Safe image extraction (handles string, object, and array shapes)
      const rawImage = fields.image || fields.images || fields.cover_image || item.image || item.images || '';
      let imagePath = '';

      if (typeof rawImage === 'string') {
        imagePath = rawImage;
      } else if (Array.isArray(rawImage)) {
        const first = rawImage[0];
        imagePath = typeof first === 'string' ? first : (first?.path || first?.url || '');
      } else if (rawImage && typeof rawImage === 'object') {
        imagePath = rawImage.path || rawImage.url || rawImage.image_url || '';
      }

      const value = Number(fields.value) ||
        Number(item.value) ||
        Number(fields.count) ||
        Number(item.count) ||
        Number(fields.number) ||
        Number(item.number) || 0;


      return {
        id: item.uuid || item.id || Math.random(),
        text: fields.text || item.text || fields.title || item.title || '',
        value: value,
        plus: fields.plus === true || item.plus === true || fields.has_plus === true,
        order: Number(fields.order) || 100, // Default to a high order if missing
        image: imagePath ? getImageUrl(imagePath) : null
      };
    }).sort((a: any, b: any) => a.order - b.order);

    // The first item (order 1) is treated as the "Area" card
    const areaItem = sortedStats[0];
    const gridStats = sortedStats.slice(1);

    const result: HomeStatsData = {
      stats: gridStats.map((s: any) => ({
        id: s.id,
        text: s.text,
        end: s.value,
        plus: s.plus
      })),
      universityArea: areaItem ? {
        area: areaItem.value,
        unit: 'm²',
        image: areaItem.image || "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        text: areaItem.text
      } : undefined
    };

    return result;
  } catch (err) {
    console.error('[ERROR] universityStatsTransformer failed:', err);
    return { stats: [] }; // Fallback to avoid crashing the whole page
  }
};