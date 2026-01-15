import apiClient from '../client';
import { MediaArticle } from '../../types/media.types';

export const getMediaArticles = async (): Promise<MediaArticle[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/media-about-us`, {
      params: {
        with: 'image'
      }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;

    if (!Array.isArray(data)) return [];

    return data.map((entry: any) => {
      const categories = Array.isArray(entry.fields?.categorys)
        ? entry.fields.categorys
        : (entry.fields?.categorys ? [entry.fields.categorys] : []);

      // Determine type based on categories
      let mappedType: 'online' | 'tv' | 'print' = 'online';
      if (categories.includes('tv') || categories.includes('teleradiokanal')) mappedType = 'tv';
      else if (categories.includes('gazeta') || categories.includes('newspaper')) mappedType = 'print';

      return {
        id: entry.uuid || entry.id,
        slug: entry.fields?.slug || entry.slug,
        title: entry.fields?.title || entry.title,
        content: entry.fields?.content || '',
        image: (Array.isArray(entry.fields?.image) ? entry.fields.image[0]?.url || entry.fields.image[0]?.thumbnail_url : (entry.fields?.image?.url || entry.fields?.image?.thumbnail_url || '')) || '/images/logo.png',
        gallery: Array.isArray(entry.fields?.gallery) ? entry.fields.gallery.map((img: any) => img.url || img.thumbnail_url) : [],
        published_at: entry.fields?.published_at || entry.published_at || entry.created_at,
        source: entry.fields?.sources || entry.fields?.source || (categories.length > 0 ? categories[0].toUpperCase() : 'OAV'),
        url: entry.fields?.url || '#',
        categories: categories,
        type: mappedType
      };
    });
  } catch (error) {
    console.error('Error fetching media articles:', error);
    return [];
  }
};

export const getMediaArticleBySlug = async (slug: string, locale?: string): Promise<MediaArticle | null> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const currentLocale = locale || localStorage.getItem('locale') || 'uz';

    const response = await apiClient.get(`/projects/${projectId}/content/media-about-us`, {
      params: {
        'filter[slug][eq]': slug,
        with: 'image,gallery',
        locale: currentLocale
      }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;
    if (!data || (Array.isArray(data) && data.length === 0)) return null;

    // API may return all items if filtering is not supported exactly on this endpoint,
    // so we apply a client-side find to ensure we get the correct item.
    const entry = Array.isArray(data)
      ? data.find((item: any) => (item.fields?.slug || item.slug) === slug)
      : ((data.fields?.slug || data.slug) === slug ? data : null);

    if (!entry) return null;

    const categories = Array.isArray(entry.fields?.categorys)
      ? entry.fields.categorys
      : (entry.fields?.categorys ? [entry.fields.categorys] : []);

    let mappedType: 'online' | 'tv' | 'print' = 'online';
    if (categories.includes('tv') || categories.includes('teleradiokanal')) mappedType = 'tv';
    else if (categories.includes('gazeta') || categories.includes('newspaper')) mappedType = 'print';

    return {
      id: entry.uuid || entry.id,
      slug: entry.fields?.slug || entry.slug,
      title: entry.fields?.title || entry.title,
      content: entry.fields?.content || '',
      image: (Array.isArray(entry.fields?.image) ? entry.fields.image[0]?.url || entry.fields.image[0]?.thumbnail_url : (entry.fields?.image?.url || entry.fields?.image?.thumbnail_url || '')) || '/images/logo.png',
      gallery: Array.isArray(entry.fields?.gallery) ? entry.fields.gallery.map((img: any) => img.url || img.thumbnail_url) : [],
      published_at: entry.fields?.published_at || entry.published_at || entry.created_at,
      source: entry.fields?.sources || entry.fields?.source || (categories.length > 0 ? categories[0].toUpperCase() : 'OAV'),
      url: entry.fields?.url || '#',
      categories: categories,
      type: mappedType
    } as any;
  } catch (error) {
    console.error('Error fetching media article by slug:', error);
    return null;
  }
};