export interface MediaArticle {
    id: number;
    title: string;
    source: string; // Masalan, 'Kun.uz', 'Daryo.uz'
    url: string; // Asl maqolaga havola
    published_at: string; // ISO formatdagi sana
    excerpt?: string;
    thumbnail?: string;
    type: 'online' | 'tv' | 'print';
}