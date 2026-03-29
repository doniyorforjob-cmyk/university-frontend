import apiClient from '../client';
import { getImageUrl, getLocalized } from '../../utils/apiUtils';

export interface YashilUniversitetFile {
  name: string;
  url: string;
  size?: number;
  ext?: string;
}

export interface GreenUniversityEntry {
  id: string;
  uuid?: string;
  slug: string;
  title: string;
  content: string;
  description?: string;
  image?: string;
  gallery?: string[];
  category?: {
    name: string;
    slug: string;
  };
  files?: YashilUniversitetFile[];
  published_at?: string;
  created_at?: string;
}

/**
 * Yashil Universitet ma'lumotlarini ro'yxat ko'rinishida olish
 * @param locale Til (uz, ru, en)
 * @returns Ma'lumotlar ro'yxati
 */
export const fetchGreenUniversityList = async (locale: string = 'uz', categorySlug?: string): Promise<GreenUniversityEntry[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/green-university`, {
      params: {
        locale,
        with: 'files,category',
        per_page: 100 // Ko'proq ma'lumot olish
      }
    });

    const data = Array.isArray(response.data) ? response.data : (response.data.data || []);

    // Client-side filter
    let filteredData = data;
    if (categorySlug) {
      filteredData = data.filter((entry: any) => {
        const fields = entry.fields || entry || {};
        const category = fields.category;

        const checkMatch = (cat: any) => {
          if (!cat) return false;
          if (typeof cat === 'string') return cat === categorySlug;
          if (typeof cat === 'object') {
            return (cat.slug === categorySlug) || (cat.fields?.slug === categorySlug);
          }
          return false;
        };

        // Handle category as array or single object
        return Array.isArray(category) ? category.some(checkMatch) : checkMatch(category);
      });
    }

    // Default fallback for green-university list page if no categorySlug provided and no results
    if (filteredData.length === 0 && !categorySlug) {
      filteredData = data;
    }

    return filteredData.map((entry: any) => {
      const fields = entry.fields || entry || {};

      // Image extraction - handle array or object
      const imageField = fields.image;
      const imageUrl = Array.isArray(imageField)
        ? (imageField[0]?.url || imageField[0]?.path || '')
        : (imageField?.url || imageField?.path || imageField || '');

      return {
        id: entry.uuid || entry.id,
        uuid: entry.uuid,
        slug: fields.slug || entry.slug || entry.uuid || entry.id,
        title: getLocalized(fields.title, locale),
        content: getLocalized(fields.content, locale),
        description: getLocalized(fields.description || fields.content, locale),
        image: getImageUrl(imageUrl),
        gallery: (Array.isArray(fields.gallery) ? fields.gallery : []).map((img: any) =>
          getImageUrl(img.url || img.path || img || '')
        ),
        category: fields.category ? {
          name: getLocalized(Array.isArray(fields.category) ? fields.category[0] : fields.category, locale),
          slug: (Array.isArray(fields.category) ? fields.category[0]?.slug : fields.category.slug) || ''
        } : undefined,
        files: (Array.isArray(fields.files) ? fields.files : []).map((file: any) => ({
          name: file.name || file.title || file.filename || 'Hujjat',
          url: getImageUrl(file.url || file.path || ''),
          size: file.size,
          ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
        })),
        published_at: entry.published_at || fields.published_at || entry.created_at,
        created_at: entry.created_at || fields.created_at
      };
    });
  } catch (error) {
    console.error("Green university list fetch error:", error);
    return [];
  }
};

/**
 * Yashil Universitet bitta maqola ma'lumotlarini slug orqali olish
 */
export const getGreenUniversityBySlug = async (slug: string, locale?: string): Promise<GreenUniversityEntry | null> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const isUUID = slug.length > 20 && slug.includes('-');
    const filterKey = isUUID ? 'filter[id][eq]' : 'filter[slug][eq]';

    const response = await apiClient.get(`/projects/${projectId}/content/green-university`, {
      params: {
        [filterKey]: slug,
        locale,
        with: 'files,category'
      }
    });

    const data = Array.isArray(response.data) ? response.data : (response.data.data || []);

    // Client-side find to ensure correct item
    const entry = data.find((item: any) => {
      const itemSlug = item.fields?.slug || item.slug;
      const itemId = item.uuid || item.id;
      return itemSlug === slug || itemId === slug;
    }) || data[0]; // Fallback to first if API returned only one and filter was successful

    if (!entry) return null;

    const fields = entry.fields || entry || {};

    // Image extraction - handle array or object
    const imageField = fields.image;
    const imageUrl = Array.isArray(imageField)
      ? (imageField[0]?.url || imageField[0]?.path || '')
      : (imageField?.url || imageField?.path || imageField || '');

    return {
      id: entry.uuid || entry.id,
      uuid: entry.uuid,
      slug: fields.slug || entry.slug || entry.uuid || entry.id,
      title: getLocalized(fields.title, locale),
      content: getLocalized(fields.content, locale),
      description: getLocalized(fields.description || fields.content, locale),
      image: getImageUrl(imageUrl),
      gallery: (Array.isArray(fields.gallery) ? fields.gallery : []).map((img: any) =>
        getImageUrl(img.url || img.path || img || '')
      ),
      category: fields.category ? {
        name: getLocalized(Array.isArray(fields.category) ? fields.category[0] : fields.category, locale),
        slug: (Array.isArray(fields.category) ? fields.category[0]?.slug : fields.category.slug) || ''
      } : undefined,
      files: (Array.isArray(fields.files) ? fields.files : []).map((file: any) => ({
        name: file.name || file.title || file.filename || 'Hujjat',
        url: getImageUrl(file.url || file.path || ''),
        size: file.size,
        ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
      })),
      published_at: entry.published_at || fields.published_at,
      created_at: entry.created_at || fields.created_at
    };
  } catch (error) {
    console.error("Green university detail fetch error:", error);
    return null;
  }
};

// Eskilar bilan moslikni ta'minlash (Legacy support)
export type YashilUniversitetEntry = GreenUniversityEntry;
export const fetchYashilUniversitetData = async (locale?: string) => {
  const list = await fetchGreenUniversityList(locale);
  return list.length > 0 ? list[0] : null;
};