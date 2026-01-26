import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface SpiritualFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface SpiritualActivityEntry {
    id: string;
    slug: string;
    title: string;
    content?: string;
    files: SpiritualFile[];
    date?: string;
}

export const fetchSpiritualActivities = async (locale?: string): Promise<SpiritualActivityEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/spiritual-educational-section`, {
            params: {
                locale,
                with: 'files'
            }
        });

        const rawData = Array.isArray(response.data) ? response.data : response.data.data;
        if (!Array.isArray(rawData)) return [];

        return rawData.map((entry: any) => {
            const fields = entry.fields || entry || {};

            const rawDate = fields.date ||
                fields.Created || entry.Created ||
                fields.created_at || entry.created_at ||
                fields.createdAt || entry.createdAt ||
                entry.published_at;

            return {
                id: entry.uuid || entry.id,
                slug: fields.slug || entry.slug || '',
                title: fields.title || '',
                content: fields.content || '',
                date: rawDate,
                files: (fields.files || []).map((file: any) => ({
                    name: file.name || file.title || file.filename || 'Hujjat',
                    url: getImageUrl(file.url || file.path || ''),
                    size: file.size,
                    ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
                }))
            };
        }).sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
        });
    } catch (error) {
        console.error('Error fetching spiritual-educational activities:', error);
        return [];
    }
};

export const getSpiritualActivityBySlug = async (slug: string, locale?: string): Promise<SpiritualActivityEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/spiritual-educational-section/${slug}`, {
            params: {
                locale,
                with: 'files'
            }
        });

        const entry = response.data?.data || response.data;
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
            }))
        };
    } catch (error) {
        console.error(`Error fetching spiritual-educational activity by slug: ${slug}`, error);
        return null;
    }
};
