import { HomeNewsData } from '../../../types/home.types';
import { getImageUrl } from '../../../utils/apiUtils';

export const transformNewsData = (apiData: any): HomeNewsData => {
  // 1. Normalize Response
  const rawItems = Array.isArray(apiData)
    ? apiData
    : (Array.isArray(apiData?.data) ? apiData.data : (apiData?.data ? [apiData.data] : []));

  // 2. Map Fields
  const allEntries = rawItems.map((item: any) => {
    const fields = item.fields || {};

    // Determine category (default to 'news' if not set)
    const category = (fields.category || item.category || 'news').toLowerCase();

    // Map image safely
    const imageUrl = getImageUrl(
      (typeof fields.image === 'object' && !Array.isArray(fields.image) ? fields.image.path || fields.image.url : '') ||
      (Array.isArray(fields.images) ? fields.images[0]?.path : '') ||
      (fields.images?.path || '') ||
      (Array.isArray(fields.image) ? fields.image[0]?.url : '') ||
      (fields.image?.url || '') ||
      (item.image_url || item.image || '')
    );

    return {
      id: item.uuid || item.id || Math.random(),
      slug: fields.slug || item.slug || '',
      title: fields.title || item.title || '',
      description: fields.description || fields.content || item.description || '',
      // Content can be truncated in UI, but good to have full here or handle truncated version
      image_url: imageUrl,
      published_at: fields.published_at || fields.date || item.published_at || item.created_at || new Date().toISOString(),
      category: category,
      // For specific fields like 'text' in announcements, we map title to it
      text: fields.title || item.title || ''
    };
  }).sort((a: any, b: any) => {
    // 3. Sort: Newest First
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  });

  // 4. Categorize
  return {
    news: allEntries.filter((e: any) => e.category === 'news' || !e.category),
    announcements: allEntries.filter((e: any) => e.category === 'announcements'),
    events: allEntries.filter((e: any) => e.category === 'events'),
    corruption: allEntries.filter((e: any) => e.category === 'corruption'),
    sport: allEntries.filter((e: any) => e.category === 'sport')
  };
};