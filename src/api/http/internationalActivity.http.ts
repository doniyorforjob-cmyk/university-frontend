import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface InternationalFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface InternationalActivityEntry {
    id: string;
    slug: string;
    title: string;
    content?: string;
    files: InternationalFile[];
    date?: string;
}

export const fetchInternationalActivities = async (locale?: string): Promise<InternationalActivityEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/international-activities`, {
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
                date: fields.date || entry.created_at || entry.createdAt || entry.published_at,
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
        console.error('Error fetching international activities:', error);
        return [];
    }
};
