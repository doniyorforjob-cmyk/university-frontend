import apiClient from '../client';
import { Post, PostDetail, PostCategory } from '../../types/post.types';

export const getPosts = async (category?: PostCategory): Promise<Post[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    console.log("Using projectId:", projectId);
    const params: any = { with: 'image' };
    if (category) {
      params['filter[category][eq]'] = category;
    }

    // Start localized and English fallback requests in parallel if current locale is not English
    const currentLocale = params.locale || localStorage.getItem('locale') || 'en';

    let data;
    if (currentLocale !== 'en') {
      try {
        const [resLocalized, resEnglish] = await Promise.all([
          apiClient.get(`/projects/${projectId}/content/news`, { params }),
          apiClient.get(`/projects/${projectId}/content/news`, {
            params: { ...params, locale: 'en' }
          })
        ]);

        const dataLocalized = Array.isArray(resLocalized.data) ? resLocalized.data : resLocalized.data.data;
        const dataEnglish = Array.isArray(resEnglish.data) ? resEnglish.data : resEnglish.data.data;

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
      image_url: (Array.isArray(entry.fields?.image) ? entry.fields.image[0]?.url : (entry.fields?.image?.url || '')) || '/images/logo.png',
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
      image_url: (Array.isArray(entry.fields?.image) ? entry.fields.image[0]?.url : (entry.fields?.image?.url || '')) || '/images/logo.png',
      description: entry.fields?.content ? entry.fields.content.substring(0, 150) + '...' : '',
      published_at: entry.created_at || entry.published_at,
      views: entry.fields?.views || 0,
      category: (entry.fields?.category || 'news') as PostCategory,
      content: entry.fields?.content || '',
      author: { name: 'Matbuot xizmati' }
    };
  } catch (error) {
    console.error("News detail fetch error:", error);
    return undefined;
  }
};