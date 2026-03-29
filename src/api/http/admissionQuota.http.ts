import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface AdmissionQuotaFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface AdmissionQuotaEntry {
    id: string;
    slug: string;
    title: string;
    content: string;
    image_url?: string;
    gallery?: string[];
    files?: AdmissionQuotaFile[];
    published_at: string;
    views: number;
}

export const fetchAdmissionQuotas = async (locale?: string): Promise<AdmissionQuotaEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/admission-quota`, {
            params: {
                locale,
                with: 'image,gallery,files'
            }
        });

        const rawData = Array.isArray(response.data) ? response.data : (response.data?.data || []);
        if (!Array.isArray(rawData)) return [];

        return rawData.map((entry: any) => {
            const fields = entry.fields || entry || {};

            return {
                id: entry.uuid || entry.id,
                slug: fields.slug || entry.slug || '',
                title: fields.title || '',
                content: fields.content || '',
                image_url: fields.image_url || fields.image?.url || '',
                gallery: Array.isArray(fields.gallery)
                    ? fields.gallery.map((img: any) => getImageUrl(img.path || img.url))
                    : [],
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
        console.error('Error fetching admission quotas:', error);
        return [];
    }
};

export const getAdmissionQuotaBySlug = async (slug: string, locale?: string): Promise<AdmissionQuotaEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        // Slug or ID check
        const isUUID = slug.length > 20 && slug.includes('-');
        const filterKey = isUUID ? 'filter[id][eq]' : 'filter[slug][eq]';

        const response = await apiClient.get(`/projects/${projectId}/content/admission-quota`, {
            params: {
                [filterKey]: slug,
                locale,
                with: 'image,gallery,files'
            }
        });

        const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
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
            image_url: fields.image_url || fields.image?.url || '',
            gallery: Array.isArray(fields.gallery)
                ? fields.gallery.map((img: any) => getImageUrl(img.path || img.url))
                : [],
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
        console.error(`Error fetching admission quota by slug: ${slug}`, error);
        return null;
    }
};
