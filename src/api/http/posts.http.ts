import apiClient from '../client';
import { Post, PostDetail, PostCategory } from '../../types/post.types';
import { getImageUrl } from '../../utils/apiUtils';

export const getPosts = async (category?: PostCategory, locale?: string): Promise<Post[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    console.log("Using projectId:", projectId);
    const params: any = { with: 'image' };
    if (category) {
      params['filter[category][eq]'] = category;
    }
    if (locale) {
      params['locale'] = locale;
    }

    // Start localized and English fallback requests in parallel if current locale is not English
    const currentLocale = locale || params.locale || localStorage.getItem('locale') || 'en';

    let data;
    if (currentLocale !== 'en') {
      try {
        const [resLocalized, resEnglish] = await Promise.all([
          apiClient.get(`/projects/${projectId}/content/news`, { params }),
          apiClient.get(`/projects/${projectId}/content/news`, {
            params: { ...params, locale: 'en' }
          })
        ]);

        let dataLocalized = Array.isArray(resLocalized.data) ? resLocalized.data : resLocalized.data.data;
        const dataEnglish = Array.isArray(resEnglish.data) ? resEnglish.data : resEnglish.data.data;

        // FALLBACK: Agar kategoriya bo'yicha o'zbekcha/ruscha ma'lumot topilmasa, filtersiz olib ko'rish
        // Bu "uz dagi malumotlarni kursatmayapti" degan muammoni hal qiladi (ehtimol kategoriya sluglari mos emas)
        if (!dataLocalized || dataLocalized.length === 0) {
          try {
            const fallbackParams = { ...params };
            if (fallbackParams['filter[category][eq]']) {
              console.warn(`No content for locale ${currentLocale} with category, trying unfiltered...`);
              delete fallbackParams['filter[category][eq]'];

              const resLocalizedUnfiltered = await apiClient.get(`/projects/${projectId}/content/news`, {
                params: { ...fallbackParams, per_page: 50, locale: currentLocale }
              });

              const dataUnfiltered = Array.isArray(resLocalizedUnfiltered.data) ? resLocalizedUnfiltered.data : resLocalizedUnfiltered.data.data;
              if (dataUnfiltered && dataUnfiltered.length > 0) {
                dataLocalized = dataUnfiltered;
              }
            }
          } catch (fallbackErr) {
            console.warn("Unfiltered fallback failed:", fallbackErr);
          }
        }

        data = (dataLocalized && dataLocalized.length > 0) ? dataLocalized : dataEnglish;
      } catch (e) {
        // Fallback to single request if parallel fails
        const response = await apiClient.get(`/projects/${projectId}/content/news`, { params });
        data = Array.isArray(response.data) ? response.data : response.data.data;
      }
    } else {
      const response = await apiClient.get(`/projects/${projectId}/content/news`, { params });
      data = Array.isArray(response.data) ? response.data : response.data.data;
    }

    // FINAL FALLBACK: If category was 'news' and returned 0 items, try WITHOUT category filter
    if (category === 'news' && (!data || data.length === 0)) {
      console.log("No items found with category 'news', trying unfiltered fetch...");
      const fallbackRes = await apiClient.get(`/projects/${projectId}/content/news`, {
        params: { with: 'image', per_page: 50 }
      });
      data = Array.isArray(fallbackRes.data) ? fallbackRes.data : fallbackRes.data.data;
    }

    return data.map((entry: any) => ({
      id: entry.uuid || entry.id,
      slug: entry.fields?.slug || entry.slug,
      title: entry.fields?.title || entry.title,
      image_url: getImageUrl(
        (typeof entry.fields?.image === 'object' && !Array.isArray(entry.fields?.image) ? entry.fields.image.path || entry.fields.image.url : '') ||
        (Array.isArray(entry.fields?.images) ? entry.fields.images[0]?.path : '') ||
        (entry.fields?.images?.path || '') ||
        (Array.isArray(entry.fields?.image) ? entry.fields.image[0]?.url : '') ||
        (entry.fields?.image?.url || '') ||
        (entry.image_url || entry.image || '')
      ),
      description: entry.fields?.content ? entry.fields.content.substring(0, 150) + '...' : '',
      published_at: entry.created_at || entry.published_at,
      views: entry.fields?.views || 0,
      category: (entry.fields?.category || 'news') as PostCategory,
    }));
  } catch (error) {
    console.error("News fetch error:", error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<PostDetail | undefined> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    // Start localized and English fallback requests in parallel if current locale is not English
    const currentLocale = localStorage.getItem('locale') || 'en';

    let data;
    if (currentLocale !== 'en') {
      try {
        const [resLocalized, resEnglish] = await Promise.all([
          apiClient.get(`/projects/${projectId}/content/news`, {
            params: { 'filter[slug][eq]': slug, with: 'image,gallery' }
          }),
          apiClient.get(`/projects/${projectId}/content/news`, {
            params: { 'filter[slug][eq]': slug, with: 'image,gallery', locale: 'en' }
          })
        ]);

        const dataLocalized = Array.isArray(resLocalized.data) ? resLocalized.data : resLocalized.data.data;
        const dataEnglish = Array.isArray(resEnglish.data) ? resEnglish.data : resEnglish.data.data;

        data = (dataLocalized && dataLocalized.length > 0) ? dataLocalized : dataEnglish;
      } catch (e) {
        // Fallback to single request if parallel fails
        const response = await apiClient.get(`/projects/${projectId}/content/news`, {
          params: { 'filter[slug][eq]': slug, with: 'image,gallery' }
        });
        data = Array.isArray(response.data) ? response.data : response.data.data;
      }
    } else {
      const response = await apiClient.get(`/projects/${projectId}/content/news`, {
        params: { 'filter[slug][eq]': slug, with: 'image,gallery' }
      });
      data = Array.isArray(response.data) ? response.data : response.data.data;
    }

    const entry = data[0];
    if (!entry) return undefined;

    return {
      id: entry.uuid || entry.id,
      slug: entry.fields?.slug || entry.slug,
      title: entry.fields?.title || entry.title,
      image_url: getImageUrl(
        (typeof entry.fields?.image === 'object' && !Array.isArray(entry.fields?.image) ? entry.fields.image.path || entry.fields.image.url : '') ||
        (Array.isArray(entry.fields?.images) ? entry.fields.images[0]?.path : '') ||
        (entry.fields?.images?.path || '') ||
        (Array.isArray(entry.fields?.image) ? entry.fields.image[0]?.url : '') ||
        (entry.fields?.image?.url || '') ||
        (entry.image_url || entry.image || '')
      ),
      description: entry.fields?.content ? entry.fields.content.substring(0, 150) + '...' : '',
      published_at: entry.created_at || entry.published_at,
      views: entry.fields?.views || 0,
      category: (entry.fields?.category || 'news') as PostCategory,
      content: entry.fields?.content || '',
      author: { name: 'Matbuot xizmati' },
      gallery: Array.isArray(entry.fields?.gallery)
        ? entry.fields.gallery.map((img: any) => getImageUrl(img.path || img.url))
        : []
    };
  } catch (error) {
    console.error("News detail fetch error:", error);
    return undefined;
  }
};