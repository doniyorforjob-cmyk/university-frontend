export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  image_url: string;
  excerpt: string;
  published_at: string; // ISO 8601 format: "2023-10-28T12:00:00Z"
  views: number;
}

export interface NewsArticleDetail extends NewsArticle {
  content: string; // To'liq matn (HTML bo'lishi mumkin)
  author: {
    name: string;
    avatar_url?: string;
  };
  views: number;
  category: {
    id: number;
    name: string;
  };
}