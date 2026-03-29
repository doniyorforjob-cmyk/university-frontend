import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface FinalStateAttestationFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface FinalStateAttestationEntry {
    id: string;
    slug: string;
    title: string;
    content: string;
    image_url?: string;
    published_at: string;
    views: number;
    files: FinalStateAttestationFile[];
}

export const fetchFinalStateAttestationData = async (locale?: string): Promise<FinalStateAttestationEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/final-state-attestation`, {
            params: {
                locale,
                with: 'files,documents'
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;
        if (!Array.isArray(data) || data.length === 0) return null;

        const entry = data[0];
        const fields = entry.fields || {};
        const merged = { ...entry, ...fields };

        // Support plural 'files', 'documents' and singular 'file' from CMS
        const rawFiles = merged.file || merged.files || merged.documents || [];
        const filesArray = Array.isArray(rawFiles) ? rawFiles : [rawFiles].filter(Boolean);

        return {
            id: entry.uuid || entry.id,
            slug: merged.slug || entry.slug || '',
            title: merged.title || merged.name || '',
            content: merged.content || merged.description || merged.body || merged.text || '',
            image_url: getImageUrl(
                (typeof merged.image === 'object' && !Array.isArray(merged.image) ? merged.image.path || merged.image.url : '') ||
                (Array.isArray(merged.images) ? merged.images[0]?.path : '') ||
                (merged.image?.path || '') ||
                (merged.image?.url || '') ||
                (entry.image_url || entry.image || '')
            ),
            published_at: entry.created_at || entry.published_at,
            views: merged.views || 0,
            files: filesArray.map((file: any) => ({
                name: file.name || file.title || file.filename || 'Hujjat',
                url: getImageUrl(file.url || file.path || ''),
                size: file.size,
                ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
            }))
        };
    } catch (error) {
        console.error("Final state attestation fetch error:", error);
        return null;
    }
};
