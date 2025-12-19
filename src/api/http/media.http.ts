import apiClient from '../client';
import { MediaArticle } from '../../types/media.types';

export const getMediaArticles = async (): Promise<MediaArticle[]> => {
  const response = await apiClient.get<MediaArticle[]>('/media-articles');
  return response.data;
};