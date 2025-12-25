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

    let response = await apiClient.get(`/projects/${projectId}/content/news`, { params });

    let data = Array.isArray(response.data) ? response.data : response.data.data;

    // Fallback to English if no data found and current locale is not English
    if ((!data || data.length === 0) && localStorage.getItem('locale') !== 'en') {
      console.log('No news found in current locale, trying English fallback for list...');
      response = await apiClient.get(`/projects/${projectId}/content/news`, {
        params: {
          with: 'image',
          'filter[category][eq]': category,
          locale: 'en'
        }
      });
      data = Array.isArray(response.data) ? response.data : response.data.data;
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
    let response = await apiClient.get(`/projects/${projectId}/content/news`, {
      params: {
        'filter[slug][eq]': slug,
        with: 'image,gallery'
      }
    });



    // Handle both array response and paginated response
    let data = Array.isArray(response.data) ? response.data : response.data.data;

    // Retry with English locale if not found in current locale
    if ((!data || data.length === 0) && localStorage.getItem('locale') !== 'en') {
      console.log('Post not found in current locale, trying English fallback...');
      response = await apiClient.get(`/projects/${projectId}/content/news`, {
        params: {
          'filter[slug][eq]': slug,
          with: 'image,gallery',
          locale: 'en'
        }
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