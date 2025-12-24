import apiClient from '../client';
import { Post, PostDetail, PostCategory } from '../../types/post.types';

export const getPosts = async (category?: PostCategory): Promise<Post[]> => {
  try {
    const response = await apiClient.get('/collections/news/entries', {
      params: {
        with: 'image',
        'filter[category][eq]': category
      }
    });

    return response.data.data.map((entry: any) => ({
      id: entry.id || entry.uuid,
      slug: entry.slug,
      title: entry.title,
      image_url: entry.image?.url || '',
      description: entry.content ? entry.content.substring(0, 150) + '...' : '',
      published_at: entry.date || entry.created_at,
      views: entry.views || 0,
      category: entry.category as PostCategory,
    }));
  } catch (error) {
    console.error("News fetch error:", error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<PostDetail | undefined> => {
  try {
    const response = await apiClient.get('/collections/news/entries', {
      params: {
        'filter[slug][eq]': slug,
        with: 'image,gallery'
      }
    });

    const entry = response.data.data[0];
    if (!entry) return undefined;

    return {
      id: entry.id || entry.uuid,
      slug: entry.slug,
      title: entry.title,
      image_url: entry.image?.url || '',
      description: entry.content ? entry.content.substring(0, 150) + '...' : '',
      published_at: entry.date || entry.created_at,
      views: entry.views || 0,
      category: entry.category as PostCategory,
      content: entry.content || '',
      author: { name: 'Matbuot xizmati' }
    };
  } catch (error) {
    console.error("News detail fetch error:", error);
    return undefined;
  }
};