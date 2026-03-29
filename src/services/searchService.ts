import apiClient from '../api/client';
import { getImageUrl } from '../utils/apiUtils';

export interface SearchResult {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    href: string;
    type: 'news' | 'announcement' | 'open_lesson' | 'event' | 'step-forward' | 'other' | 'department' | 'faculty' | 'person' | 'article' | 'info';
    typeLabel?: string;
}

const COLLECTIONS = [
    { name: 'news', type: 'news', path: 'news' },
    { name: 'announcements', type: 'announcement', path: 'announcements' },
    { name: 'open-lessons', type: 'open_lesson', path: 'open-lessons' },
    { name: 'events', type: 'event', path: 'events' },
    { name: 'step-forward', type: 'article', path: 'step-forward' },
    { name: 'corruption', type: 'news', path: 'corruption' },
    { name: 'academic-departments', type: 'department', path: 'departments' },
    { name: 'faculties', type: 'faculty', path: 'faculties' },
    { name: 'rector-university', type: 'person', path: 'leadership' },
    { name: 'vice-rectors', type: 'person', path: 'leadership' },
    { name: 'deans-of-faculties', type: 'person', path: 'leadership' },
    { name: 'heads-of-centers', type: 'person', path: 'leadership' },
    { name: 'heads-of-academic-departments', type: 'person', path: 'leadership' },
    { name: 'cultural-events', type: 'event', path: 'cultural-events' },
    { name: 'sports-club-life', type: 'info', path: 'sports-club-life' },
    { name: 'spiritual-educational-section', type: 'info', path: 'spiritual-educational-section' },
    { name: 'cultural-educational-activities', type: 'info', path: 'cultural-educational-activities' },
    { name: 'eco-active-students', type: 'article', path: 'eco-active-students' },
] as const;

/** Extract a string value from a potentially localized object or plain string */
const extractLocalized = (val: any, locale: string): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
        // STRICT: ONLY return current locale value. No fallback to other languages during search.
        return val[locale] || '';
    }
    return String(val);
};

/** Decode HTML entities and strip HTML tags from text */
const cleanHtml = (text: string): string => {
    if (!text) return '';
    return text
        // Strip HTML tags
        .replace(/<[^>]*>/gm, '')
        // Decode common HTML entities
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')
        .replace(/&lsquo;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&mdash;/g, '—')
        .replace(/&ndash;/g, '–')
        .replace(/&#\d+;/g, '') // Remove numeric entities
        .replace(/\s+/g, ' ')   // Collapse multiple spaces
        .trim();
};

/** Build a searchable text blob from an item — only title/name fields to avoid false positives */
const buildSearchText = (item: any, locale: string): string => {
    const fields = item.fields || item;
    const parts: string[] = [];

    // ONLY search in title and name — not description/biography/responsibilities
    const titleFields = ['title', 'name'];
    for (const field of titleFields) {
        const val = fields[field] || item[field];
        if (!val) continue;
        if (typeof val === 'string') {
            parts.push(val);
        } else if (typeof val === 'object') {
            // STRICT: Only use the current locale for searching
            if (val[locale]) parts.push(val[locale]);
        }
    }
    return parts.join(' ').toLowerCase();
};

export const searchSite = async (query: string, locale: string): Promise<SearchResult[]> => {
    if (!query || query.trim().length < 2) return [];

    const projectId = process.env.REACT_APP_PROJECT_ID;
    const searchTerm = query.toLowerCase().trim();
    const searchKeywords = searchTerm.split(/\s+/).filter(k => k.length > 1);

    try {
        const fetchCollection = async (collName: string, targetLocale: string) => {
            try {
                const response = await apiClient.get(`/projects/${projectId}/content/${collName}`, {
                    params: {
                        locale: targetLocale,
                        per_page: 100,
                        with: 'image,media,gallery'
                    }
                });
                return Array.isArray(response.data) ? response.data : response.data?.data || [];
            } catch (err) {
                console.warn(`Search failed for collection ${collName}:`, err);
                return [];
            }
        };

        const responses = await Promise.all(COLLECTIONS.map(coll => fetchCollection(coll.name, locale)));
        let allResults: SearchResult[] = [];

        responses.forEach((data, index) => {
            const collection = COLLECTIONS[index];

            const mapped = data.map((item: any) => {
                const fields = item.fields || item;

                // Robust image path extraction
                const imgObj = fields.image || fields.media || (Array.isArray(fields.gallery) ? fields.gallery[0] : null);
                let imagePath = (Array.isArray(imgObj) ? imgObj[0]?.url || imgObj[0]?.path : imgObj?.url || imgObj?.path) || item.image_url || '';
                if (!imagePath && fields.images) {
                    const imgs = Array.isArray(fields.images) ? fields.images[0] : fields.images;
                    imagePath = imgs?.url || imgs?.path || '';
                }

                const prefix = locale === 'uz' ? '' : `/${locale}`;
                const slug = fields.slug || item.slug || item.uuid || item.id;

                // Localized title (prefer current locale, fallback chain)
                const title = extractLocalized(fields.title || item.title || fields.name || item.name, locale);
                // Localized description
                const rawDesc = fields.description || fields.content || fields.biography || fields.biografiya || fields.responsibilities || fields.vazifalari || '';
                const description = extractLocalized(rawDesc, locale);

                // Specialized URL construction
                let href = `${prefix}/${collection.path}/${slug}`;
                if (collection.name === 'academic-departments') href = `${prefix}/departments/${slug}`;
                else if (collection.name === 'faculties') href = `${prefix}/faculties/${slug}`;
                else if (collection.path === 'leadership') href = `${prefix}/leadership/${slug}`;
                else if (collection.name === 'open-lessons') href = `${prefix}/open-lessons/${slug}`;
                else if (collection.name === 'events' || collection.name === 'cultural-events') href = `${prefix}/events/${slug}`;
                else if (collection.name === 'step-forward') href = `${prefix}/step-forward/${slug}`;

                return {
                    id: item.uuid || item.id,
                    title: String(title),
                    description: cleanHtml(String(description)).substring(0, 180),
                    image: getImageUrl(imagePath),
                    date: item.created_at || item.published_at || fields.date || '',
                    href,
                    type: collection.type,
                    // Store full search text for filtering (STRICT locale)
                    _searchText: buildSearchText(item, locale),
                };
            }).filter((res: any) => res.title.trim().length > 0); // FILTER OUT items without localized title

            allResults = [...allResults, ...mapped];
        });

        // Deduplicate by id
        const seen = new Set<string>();
        allResults = allResults.filter(item => {
            if (seen.has(item.id)) return false;
            seen.add(item.id);
            return true;
        });

        // Filter: search across ALL locale variants of text
        const filtered = allResults.filter((item: any) => {
            const searchStr = item._searchText || `${item.title} ${item.description}`.toLowerCase();
            if (searchKeywords.length > 1) {
                // Multi-word: ALL keywords must match (AND logic — prevents false positives)
                return searchKeywords.every(kw => searchStr.includes(kw));
            }
            return searchStr.includes(searchTerm);
        });

        // Clean up internal field and sort by date
        return filtered
            .map(({ _searchText, ...rest }: any) => rest)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    } catch (error) {
        console.error('Site search error:', error);
        return [];
    }
};
