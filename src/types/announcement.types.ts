export interface Announcement {
  id: number;
  slug: string;
  title: string;
  image_url: string;
  excerpt: string;
  published_at: string; // ISO 8601 format: "2023-10-28T12:00:00Z"
  views: number;
}

export interface AnnouncementDetail extends Announcement {
  content: string; // To'liq matn (HTML bo'lishi mumkin)
  author: {
    name: string;
    avatar_url?: string;
  };
  category: {
    id: number;
    name: string;
  };
}