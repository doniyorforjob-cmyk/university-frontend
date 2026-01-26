import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface DocumentFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface DocumentEntry {
    id: string;
    slug: string;
    title: string;
    description: string;
    files: DocumentFile[];
    publishDate?: string;
}

const normalizeData = (res: any) => {
    if (!res) return [];
    // Handle both { data: [...] } and directly [...]
    const data = res.data !== undefined ? (Array.isArray(res.data) ? res.data : [res.data]) : (Array.isArray(res) ? res : []);
    return data;
};

const mapEntry = (entry: any, slugFallback: string = ''): DocumentEntry => {
    const fields = entry.fields || entry || {};

    // Robust date extraction
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

export const getDocumentBySlug = async (slug: string, locale?: string): Promise<DocumentEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        // Try 'documents' first
        let response = await apiClient.get(`/projects/${projectId}/content/documents`, {
            params: {
                locale,
                'filter[slug]': slug,
                with: 'files,documents'
            }
        });

        let rawData = normalizeData(response.data);

        // Fallback to 'document' if empty
        if (rawData.length === 0) {
            response = await apiClient.get(`/projects/${projectId}/content/document`, {
                params: {
                    locale,
                    'filter[slug]': slug,
                    with: 'files,documents'
                }
            });
            rawData = normalizeData(response.data);
        }

        if (rawData.length === 0) return null;

        return mapEntry(rawData[0], slug);
    } catch (error) {
        console.error('Error fetching document by slug:', error);
        return null;
    }
};

export const getAllDocuments = async (locale?: string): Promise<DocumentEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        // Try 'documents' first
        let response = await apiClient.get(`/projects/${projectId}/content/documents`, {
            params: {
                locale,
                with: 'files,documents'
            }
        });

        let rawData = normalizeData(response.data);

        // Fallback to 'document' if empty
        if (rawData.length === 0) {
            response = await apiClient.get(`/projects/${projectId}/content/document`, {
                params: {
                    locale,
                    with: 'files,documents'
                }
            });
            rawData = normalizeData(response.data);
        }

        return rawData.map((entry: any) => mapEntry(entry));
    } catch (error) {
        console.error('Error fetching all documents:', error);
        return [];
    }
};
