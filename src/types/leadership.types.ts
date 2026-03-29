export interface Leadership {
    id: string;
    slug?: string;
    name: string;
    position: string;
    degree?: string;
    department?: string;
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
    order?: number;
    fields?: any;
    collection?: any;
    reception_days?: string;
    category?: 'leadership' | 'dean' | 'academic_head' | 'academic_staff' | 'admin' | 'center' | 'section';
    certificates?: Array<{ name: string; url: string; }>;
    methodological_publications?: string; // "Uslubiy nashrlar" (HTML rich text)
    thesis_abstract?: string;            // "Avtoreferat" (HTML rich text)
    research_works?: string;             // "Ilmiy ishlar" (HTML rich text)
    scopus_url?: string;
    wos_url?: string;
    orcid_url?: string;
    scholar_url?: string;
    researchgate_url?: string;
}
