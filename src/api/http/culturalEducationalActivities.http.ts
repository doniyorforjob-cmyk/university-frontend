import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface CulturalEducationalFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface CulturalEducationalEntry {
    id: string;
    slug: string;
    title: string;
    content?: string;
    files: CulturalEducationalFile[];
    date?: string;
    image?: string;
    gallery?: string[];
}

export const fetchCulturalEducationalActivities = async (locale?: string): Promise<CulturalEducationalEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/cultural-educational-activities`, {
            params: {
                locale,
                with: 'files,image,gallery,media'
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

            const imgField = fields.image || fields.media || fields.image_url || entry.image_url || entry.image;
            const imgsField = fields.images || fields.gallery || [];

            const primaryImage = (Array.isArray(imgField) ? imgField[0] : imgField) || {};
            const secondaryImage = (Array.isArray(imgsField) ? imgsField[0] : imgsField) || {};

            const finalImageUrl = getImageUrl(
                (primaryImage?.url || primaryImage?.thumbnail_url || primaryImage?.path) ||
                (secondaryImage?.url || secondaryImage?.thumbnail_url || secondaryImage?.path) ||
                (typeof imgField === 'string' ? imgField : '') ||
                ''
            );

            return {
                id: entry.uuid || entry.id,
                slug: fields.slug || entry.slug || entry.uuid || entry.id || '',
                title: fields.title || '',
                content: fields.content || '',
                date: rawDate,
                image: finalImageUrl,
                gallery: (Array.isArray(imgsField) ? imgsField : []).map((img: any) =>
                    getImageUrl(img.url || img.thumbnail_url || img.path || (typeof img === 'string' ? img : ''))
                ),
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
        console.error('Error fetching cultural-educational activities:', error);
        return [];
    }
};

export const getCulturalEducationalEntryBySlug = async (slug: string, locale?: string): Promise<CulturalEducationalEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        // Use filter[slug][eq] for more robust lookup like posts.http.ts
        const isUUID = slug.length > 20 && slug.includes('-');
        const filterKey = isUUID ? 'filter[id][eq]' : 'filter[slug][eq]';

        const response = await apiClient.get(`/projects/${projectId}/content/cultural-educational-activities`, {
            params: {
                [filterKey]: slug,
                locale,
                with: 'files,image,gallery,media'
            }
        });

        const rawData = Array.isArray(response.data) ? response.data : response.data.data;
        let entry = null;

        if (Array.isArray(rawData)) {
            entry = rawData.find((item: any) => {
                const fields = item.fields || item || {};
                return fields.slug === slug || item.slug === slug || item.uuid === slug || item.id === slug;
            }) || rawData[0];
        } else {
            entry = rawData;
        }

        if (!entry) return null;

        const fields = entry.fields || entry || {};

        const rawDate = fields.date ||
            fields.Created || entry.Created ||
            fields.created_at || entry.created_at ||
            fields.createdAt || entry.createdAt ||
            entry.published_at;

        const imgField = fields.image || fields.media || fields.image_url || entry.image_url || entry.image;
        const imgsField = fields.images || fields.gallery || [];

        const primaryImage = (Array.isArray(imgField) ? imgField[0] : imgField) || {};
        const secondaryImage = (Array.isArray(imgsField) ? imgsField[0] : imgsField) || {};

        const finalImageUrl = getImageUrl(
            (primaryImage?.url || primaryImage?.thumbnail_url || primaryImage?.path) ||
            (secondaryImage?.url || secondaryImage?.thumbnail_url || secondaryImage?.path) ||
            (typeof imgField === 'string' ? imgField : '') ||
            ''
        );

        return {
            id: entry.uuid || entry.id,
            slug: fields.slug || entry.slug || entry.uuid || entry.id || '',
            title: fields.title || '',
            content: fields.content || '',
            date: rawDate,
            image: finalImageUrl,
            gallery: (Array.isArray(imgsField) ? imgsField : []).map((img: any) =>
                getImageUrl(img.url || img.thumbnail_url || img.path || (typeof img === 'string' ? img : ''))
            ),
            files: (fields.files || []).map((file: any) => ({
                name: file.name || file.title || file.filename || 'Hujjat',
                url: getImageUrl(file.url || file.path || ''),
                size: file.size,
                ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
            }))
        };
    } catch (error) {
        console.error(`Error fetching cultural-educational entry by slug: ${slug}`, error);
        return null;
    }
};
