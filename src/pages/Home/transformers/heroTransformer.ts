import { HomeHeroData } from '../../../services/homeService';
import { getImageUrl } from '../../../utils/apiUtils';

export const transformHeroData = (apiData: any): HomeHeroData => {
  // Handle both new structure { hero: [], links: [] } and old structure (just array or object)
  const heroDataRaw = apiData?.hero || apiData;
  const linksDataRaw = apiData?.links || [];

  // Elmapi can return data directly as an array or wrapped in a data property
  const rawItems = Array.isArray(heroDataRaw)
    ? heroDataRaw
    : (Array.isArray(heroDataRaw?.data) ? heroDataRaw.data : (heroDataRaw?.data ? [heroDataRaw.data] : []));

  const rawLinks = Array.isArray(linksDataRaw)
    ? linksDataRaw
    : (Array.isArray(linksDataRaw?.data) ? linksDataRaw.data : []);

  const items = rawItems.map((item: any) => {
    const fields = item.fields || {};

    const title = fields.title || item.title || 'NamDTU';
    const desc = fields.description || fields.content || item.description || '';

    // TEMPORARY: Hardcoded test video & no image as per user request
    const videoPath = 'https://vjs.zencdn.net/v/oceans.mp4';

    return {
      id: item.uuid || item.id || Math.random().toString(),
      img: '', // User confirmed no image from backend
      video: videoPath,
      title: title,
      desc: desc,
      enabled: fields.enabled !== false
    };
  });

  const actionLinks = rawLinks.map((item: any) => {
    const fields = item.fields || {};
    return {
      id: item.uuid || item.id || Math.random().toString(),
      title: fields.title || item.title || '',
      url: fields.url || fields.link || '#',
      isExternal: fields.is_external || fields.isExternal || false,
      // Icon can be raw SVG string or image URL, assuming SVG string for now as per previous hardcoded data, 
      // but from API it will likely be a string or an object. 
      // If API returns an image object, we might need to fetch/render it.
      // For now, let's assume 'icon' field contains the SVG string OR we use a default if missing.
      icon: fields.icon || fields.svg || ''
    };
  }).sort((a: any, b: any) => (Number(b.id) - Number(a.id))).slice(0, 3); // Latest 3 by ID descending

  return {
    items,
    actionLinks
  };
};