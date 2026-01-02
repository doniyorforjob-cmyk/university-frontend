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

    return data.map((entry: any) => ({
      id: entry.uuid || entry.id,
      slug: entry.fields?.slug || entry.slug,
      title: entry.fields?.title || entry.title,
      excerpt: entry.fields?.content || entry.fields?.excerpt || '',
      image: (Array.isArray(entry.fields?.image) ? entry.fields.image[0]?.url : (entry.fields?.image?.url || '')) || '/images/logo.png',
      published_at: entry.fields?.published_at || entry.published_at || entry.created_at,
      source: entry.fields?.sources || entry.fields?.source || 'OAV',
      url: entry.fields?.url || '#',
      type: entry.fields?.type || 'online'
    }));
  } catch (error) {
    console.error('Error fetching media articles:', error);
    return [];
  }
};