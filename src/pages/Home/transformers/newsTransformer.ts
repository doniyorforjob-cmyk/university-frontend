import { HomeNewsData } from '../../../types/home.types';
import { getImageUrl } from '../../../utils/apiUtils';

export const transformNewsData = (apiData: any): HomeNewsData => {
  const transformItem = (item: any, defaultCategory: string = 'news') => {
    const fields = item.fields || {};

    // Collect all potential category sources
    const candidates = [
      fields.category,
      item.category,
      ...(Array.isArray(fields.categories) ? fields.categories : [fields.categories]),
      ...(Array.isArray(item.categories) ? item.categories : [item.categories])
    ].filter(Boolean)
      .map(c => String(c).toLowerCase().replace(/\s+/g, '-'));

    // Check for corruption tags specifically
    const corruptionTags = ['corruption', 'korrupsiya', 'korrupsiyaga-qarshi-kurashish'];
    const isCorruption = candidates.some(c => corruptionTags.includes(c));

    // Determine final category
    let category = defaultCategory;
    if (isCorruption) {
      category = 'korrupsiyaga-qarshi-kurashish'; // Normalized standard
    } else if (candidates.length > 0) {
      category = candidates[0];
    }

    const imageObj = Array.isArray(fields.image) ? fields.image[0] : (fields.image || {});
    const imageUrl = getImageUrl(
      (imageObj?.url || imageObj?.thumbnail_url || imageObj?.path) ||
      (Array.isArray(fields.images) ? fields.images[0]?.path : '') ||
      (fields.images?.path || '') ||
      (item.image_url || item.image || '')
    );

    return {
      id: item.uuid || item.id || Math.random(),
      slug: fields.slug || item.slug || '',
      title: fields.title || item.title || '',
      description: fields.description || fields.content || item.description || '',
      image_url: imageUrl,
      published_at: fields.published_at || fields.date || item.published_at || item.created_at || new Date().toISOString(),
      category: category,
      text: fields.title || item.title || ''
    };
  };

  const normalize = (data: any) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (data?.data) return [data.data];
    return [];
  };

  const sortFn = (a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime();

  // Handle combined data object { news: ..., events: ..., announcements: ..., corruption: ... }
  if (apiData && !Array.isArray(apiData) && (apiData.news || apiData.events || apiData.announcements || apiData.corruption)) {
    const newsItems = normalize(apiData.news).map((item: any) => transformItem(item, 'news'));
    const eventItems = normalize(apiData.events).map((item: any) => transformItem(item, 'events'));
    const dedicatedAnnouncements = normalize(apiData.announcements).map((item: any) => transformItem(item, 'announcement'));
    const dedicatedCorruption = normalize(apiData.corruption).map((item: any) => transformItem(item, 'corruption'));

    // Combined announcements
    const allAnnouncements = [
      ...newsItems.filter((item: any) => item.category === 'announcement'),
      ...dedicatedAnnouncements
    ].sort(sortFn);

    return {
      news: newsItems.filter((item: any) => item.category === 'news').sort(sortFn).map((e: any) => ({ ...e, date: e.published_at })),
      announcements: allAnnouncements.map((e: any) => ({ ...e, date: e.published_at })),
      events: eventItems.sort(sortFn).map((e: any) => ({ ...e, date: e.published_at })),
      corruption: dedicatedCorruption.length > 0
        ? dedicatedCorruption.sort(sortFn).map((e: any) => ({ ...e, date: e.published_at }))
        : newsItems.filter((item: any) => ['corruption', 'korrupsiya', 'korrupsiyaga-qarshi-kurashish'].includes(item.category)).map((e: any) => ({ ...e, date: e.published_at })),
      sport: newsItems.filter((item: any) => item.category === 'sport').map((e: any) => ({ ...e, date: e.published_at }))
    };
  }

  // Fallback for single array or nested data property
  const rawItems = normalize(apiData);
  const allEntries = rawItems.map((item: any) => transformItem(item)).sort(sortFn);

  return {
    news: allEntries.filter((item: any) => item.category === 'news').map((e: any) => ({ ...e, date: e.published_at })),
    announcements: allEntries.filter((item: any) => item.category === 'announcement').map((e: any) => ({ ...e, date: e.published_at })),
    events: allEntries.filter((item: any) => item.category === 'events').map((e: any) => ({ ...e, date: e.published_at })),
    corruption: allEntries.filter((item: any) => ['corruption', 'korrupsiya', 'korrupsiyaga-qarshi-kurashish'].includes(item.category)).map((e: any) => ({ ...e, date: e.published_at })),
    sport: allEntries.filter((item: any) => item.category === 'sport').map((e: any) => ({ ...e, date: e.published_at }))
  };
};