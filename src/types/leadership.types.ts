export interface Leadership {
    id: string;
    slug?: string;
    name: string;
    position: string;
    degree?: string;
    birth_date?: string;
    phone?: string;
    email?: string;
    image?: string;
    biography?: string;
    career?: string; // Career history (HTML/RichText) - "Mehnat faoliyati"
    description?: string; // Duties/Tasks (HTML/RichText) - "Vazifasi"
    scopus_id?: string;
    scopus_stats?: {
        articles: number;
        citations: number;
    };
    google_scholar_id?: string;
    languages?: Array<{
        name: string;
        level: number; // 0-100
    }>;
    isMain?: boolean;
}
