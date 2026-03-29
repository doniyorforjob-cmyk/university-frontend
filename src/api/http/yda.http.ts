import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface YDAFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface YDAEntry {
    id: string;
    slug: string;
    title: string;
    description: string;
    files: YDAFile[];
    publishDate?: string;
}

const normalizeData = (res: any) => {
    if (!res) return [];
    const data = res.data !== undefined ? (Array.isArray(res.data) ? res.data : [res.data]) : (Array.isArray(res) ? res : []);
    return data;
};

const mapEntry = (entry: any, slugFallback: string = ''): YDAEntry => {
    const fields = entry.fields || entry || {};

    const rawDate = fields.Created ||
        entry.Created ||
        fields.created_at ||
        entry.created_at ||
        fields.createdAt ||
        entry.createdAt ||
        fields.date ||
        fields.publishDate ||
        entry.publishDate ||
        entry.updated_at;

    return {
        id: entry.uuid || entry.id,
        slug: fields.slug || entry.slug || slugFallback,
        title: fields.title || fields.name || entry.name || '',
        description: fields.description || fields.content || '',
        publishDate: rawDate,
        files: (fields.files || fields.documents || []).map((file: any) => ({
            name: file.name || file.title || file.filename || 'Dokument',
            url: getImageUrl(file.url || file.path || ''),
            size: file.size,
            ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
        }))
    };
};

export const getYDAData = async (locale?: string): Promise<YDAEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/final-state-attestation`, {
            params: {
                locale,
                with: 'files,documents'
            }
        });

        const rawData = normalizeData(response.data);
        return rawData.map((entry: any) => mapEntry(entry));
    } catch (error) {
        console.error('Error fetching YDA data:', error);
        return [];
    }
};

export const getYDABySlug = async (slug: string, locale?: string): Promise<YDAEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/final-state-attestation`, {
            params: {
                locale,
                'filter[slug]': slug,
                with: 'files,documents'
            }
        });

        const rawData = normalizeData(response.data);
        if (rawData.length === 0) return null;

        return mapEntry(rawData[0], slug);
    } catch (error) {
        console.error('Error fetching YDA by slug:', error);
        return null;
    }
};
