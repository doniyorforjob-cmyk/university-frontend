import apiClient from '../client';
import { MediaArticle } from '../../types/media.types';

export const getMediaArticles = async (): Promise<MediaArticle[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/media`);

    // Transform API response to MediaArticle format
    const data = Array.isArray(response.data) ? response.data : response.data.data;
    return data.map((entry: any) => ({
      id: entry.uuid || entry.id,
      title: entry.fields?.title || entry.title,
      description: entry.fields?.description || entry.description,
      image: entry.fields?.image?.[0]?.url || entry.fields?.image?.url || '/images/logo.png',
      date: entry.fields?.date || entry.published_at || entry.created_at,
      source: entry.fields?.source || entry.source
    }));
  } catch (error) {
    console.error('Error fetching media articles:', error);
    return [];
  }
};