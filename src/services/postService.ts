import { getPosts as apiGetPosts, getPostBySlug as apiGetPostBySlug } from '../api/postsApi';
import { Post, PostDetail, PostCategory } from '../types/post';

// Postlarni olish (kategoriya bo'yicha filtr bilan)
export const getPosts = (category?: PostCategory): Promise<Post[]> => {
  return apiGetPosts(category);
};

// Bitta postni 'slug' orqali olish
export const getPostBySlug = (slug: string): Promise<PostDetail | undefined> => {
  return apiGetPostBySlug(slug);
};