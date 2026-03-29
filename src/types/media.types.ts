export interface MediaArticle {
    id: number | string;
    slug: string;
    title: string;
    source: string;
    url: string;
    published_at: string;
    content: string;
    image: string;
    gallery?: string[];
    categories?: string[];
    type?: 'online' | 'tv' | 'print';
}

export interface MediaDetail extends MediaArticle {
    author?: { name: string };
    views?: number;
}