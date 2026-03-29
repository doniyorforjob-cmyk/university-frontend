import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface PresidentialDecreeEntry {
    id: string;
    slug: string;
    title: string;
    content: string;
    published_at: string;
    files: { name: string; url: string; size?: number; ext?: string }[];
}

export const fetchPresidentialDecreeData = async (locale?: string): Promise<PresidentialDecreeEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/presidential-decree`, {
            params: { locale, with: 'files' }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;
        if (!Array.isArray(data) || data.length === 0) return null;

        const entry = data[0];
        const fields = entry.fields || {};
        const merged = { ...entry, ...fields };

        const rawFiles = merged.file || merged.files || [];
        const filesArray = Array.isArray(rawFiles) ? rawFiles : [rawFiles].filter(Boolean);

        return {
            id: entry.uuid || entry.id,
            slug: merged.slug || entry.slug || '',
            title: merged.title || '',
            content: merged.content || merged.description || merged.body || merged.text || '',
            published_at: entry.created_at || entry.published_at,
            files: filesArray.map((file: any) => ({
                name: file.name || file.title || file.filename || 'Hujjat',
                url: getImageUrl(file.url || file.path || ''),
                size: file.size,
                ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
            }))
        };
    } catch (error) {
        console.error('Presidential decree fetch error:', error);
        return null;
    }
};
