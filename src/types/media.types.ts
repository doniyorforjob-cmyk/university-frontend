export interface MediaArticle {
    id: number | string;
    slug: string;
    title: string;
    source: string;
    url: string;
    published_at: string;
    excerpt: string;
    image: string;
    type?: 'online' | 'tv' | 'print';
}