import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface BachelorFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface BachelorEntry {
    id: string;
    slug: string;
    title: string;
    content: string;
    files: BachelorFile[];
    published_at: string;
    views: number;
}

/**
 * Fetches all bachelor entries (list view)
 */
export const fetchBachelors = async (locale?: string): Promise<BachelorEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/bachelor`, {
            params: {
                locale,
                with: 'files'
            }
        });

        const rawData = Array.isArray(response.data) ? response.data : response.data.data;
        if (!Array.isArray(rawData)) return [];

        return rawData.map((entry: any) => {
            const fields = entry.fields || entry || {};

            return {
                id: entry.uuid || entry.id,
                slug: fields.slug || entry.slug || '',
                title: fields.title || '',
                content: fields.content || '',
                files: (fields.files || []).map((file: any) => ({
                    name: file.name || file.title || file.filename || 'Hujjat',
                    url: getImageUrl(file.url || file.path || ''),
                    size: file.size,
                    ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
                })),
                published_at: entry.created_at || entry.published_at,
                views: fields.views || 0
            };
        });
    } catch (error) {
        console.error('Error fetching bachelors:', error);
        return [];
    }
};

/**
 * Fetches a single bachelor entry by its slug (detail view)
 */
export const fetchBachelorBySlug = async (slug: string, locale?: string): Promise<BachelorEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        // Slug or ID check - identical to studentService
        const isUUID = slug.length > 20 && slug.includes('-');
        const filterKey = isUUID ? 'filter[id][eq]' : 'filter[slug][eq]';

        const response = await apiClient.get(`/projects/${projectId}/content/bachelor`, {
            params: {
                [filterKey]: slug,
                locale,
                with: 'files'
            }
        });

        const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);

        // Exact match find logic from students.http.ts
        const entry = data.find((item: any) => {
            const itemSlug = item.fields?.slug || item.slug;
            const itemId = item.uuid || item.id;
            return itemSlug === slug || itemId === slug;
        });

        if (!entry) return null;

        const fields = entry.fields || entry || {};

        return {
            id: entry.uuid || entry.id,
            slug: fields.slug || entry.slug || '',
            title: fields.title || '',
            content: fields.content || '',
            files: (fields.files || []).map((file: any) => ({
                name: file.name || file.title || file.filename || 'Hujjat',
                url: getImageUrl(file.url || file.path || ''),
                size: file.size,
                ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
            })),
            published_at: entry.created_at || entry.published_at,
            views: fields.views || 0
        };
    } catch (error) {
        console.error(`Error fetching bachelor by slug: ${slug}`, error);
        return null;
    }
};
