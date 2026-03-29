import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface MastersProgramFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface MastersProgramEntry {
    id: string;
    slug: string;
    title: string;
    content: string;
    image_url?: string;
    gallery?: string[];
    published_at: string;
    files: MastersProgramFile[];
}

export const fetchMastersProgramData = async (locale?: string): Promise<MastersProgramEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/masters-program`, {
            params: {
                locale,
                with: 'files,image,gallery'
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;
        if (!Array.isArray(data) || data.length === 0) return null;

        const entry = data[0];
        const fields = entry.fields || {};
        const merged = { ...entry, ...fields };

        // Support both plural 'files' and singular 'file' from CMS
        const rawFiles = merged.file || merged.files || [];
        const filesArray = Array.isArray(rawFiles) ? rawFiles : [rawFiles].filter(Boolean);

        return {
            id: entry.uuid || entry.id,
            slug: merged.slug || entry.slug || '',
            title: merged.title || '',
            content: merged.content || merged.description || merged.body || merged.text || '',
            image_url: getImageUrl(
                (typeof merged.image === 'object' && !Array.isArray(merged.image) ? merged.image.path || merged.image.url : '') ||
                (Array.isArray(merged.images) ? merged.images[0]?.path : '') ||
                (merged.image?.path || '') ||
                (merged.image?.url || '') ||
                (entry.image_url || entry.image || '')
            ),
            gallery: Array.isArray(merged.gallery)
                ? merged.gallery.map((img: any) => getImageUrl(img.path || img.url))
                : [],
            published_at: entry.created_at || entry.published_at,
            files: filesArray.map((file: any) => ({
                name: file.name || file.title || file.filename || 'Hujjat',
                url: getImageUrl(file.url || file.path || ''),
                size: file.size,
                ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
            }))
        };
    } catch (error) {
        console.error("Masters program fetch error:", error);
        return null;
    }
};
