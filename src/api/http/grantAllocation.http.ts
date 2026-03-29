import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface GrantAllocationFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface GrantAllocationEntry {
    id: string;
    slug: string;
    title: any; // Localized object {uz, ru, en}
    content: any; // Localized object {uz, ru, en}
    image_url?: string;
    files: GrantAllocationFile[];
    published_at: string;
}

export const fetchGrantAllocations = async (locale?: string): Promise<GrantAllocationEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/grant-allocation`, {
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
                title: fields.title || entry.title || '',
                content: fields.content || entry.content || '',
                files: (fields.files || []).map((file: any) => ({
                    name: file.name || file.title || file.filename || 'Hujjat',
                    url: getImageUrl(file.url || file.path || ''),
                    size: file.size,
                    ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
                })),
                published_at: entry.created_at || entry.published_at
            };
        });
    } catch (error) {
        console.error('Error fetching grant allocations:', error);
        return [];
    }
};

export const getGrantAllocationBySlug = async (slug: string, locale?: string): Promise<GrantAllocationEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        const response = await apiClient.get(`/projects/${projectId}/content/grant-allocation`, {
            params: {
                'filter[slug][eq]': slug,
                locale,
                with: 'files'
            }
        });

        const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
        const entry = data.find((item: any) => {
            const itemSlug = item.fields?.slug || item.slug;
            return itemSlug === slug;
        });

        if (!entry) return null;

        const fields = entry.fields || entry || {};

        return {
            id: entry.uuid || entry.id,
            slug: fields.slug || entry.slug || '',
            title: fields.title || entry.title || '',
            content: fields.content || entry.content || '',
            files: (fields.files || []).map((file: any) => ({
                name: file.name || file.title || file.filename || 'Hujjat',
                url: getImageUrl(file.url || file.path || ''),
                size: file.size,
                ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
            })),
            published_at: entry.created_at || entry.published_at
        };
    } catch (error) {
        console.error(`Error fetching grant allocation by slug: ${slug}`, error);
        return null;
    }
};
