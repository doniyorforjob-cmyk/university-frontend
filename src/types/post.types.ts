export type PostCategory = 'news' | 'announcements' | 'corruption' | 'events' | 'sport';

export interface Post {
  id: number;
  slug: string;
  title: string;
  image_url: string;
  published_at: string;
  views: number;
  category: PostCategory;
  description?: string;
}

export interface PostDetail extends Post {
  content: string; // To'liq matn (HTML bo'lishi mumkin)
  author: {
    name: string;
    avatar_url?: string;
  };
}