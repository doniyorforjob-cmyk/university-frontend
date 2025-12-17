import apiClient from '../client';
import { Post, PostDetail, PostCategory } from '../../types/post.types';

export const getPosts = async (category?: PostCategory): Promise<Post[]> => {
  // TODO: Haqiqiy API so'rovi shu yerda yoziladi
  console.warn("getPosts: http versiyasi hali yozilmagan.");
  return [];
};

export const getPostBySlug = async (slug: string): Promise<PostDetail | undefined> => {
  // TODO: Haqiqiy API so'rovi shu yerda yoziladi
  console.warn("getPostBySlug: http versiyasi hali yozilmagan.");
  return undefined;
};