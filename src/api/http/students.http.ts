import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface StudentFile {
    name: string;
    url: string;
    size?: number;
    ext?: string;
}

export interface StudentEntry {
    id: string;
    slug: string;
    title: string;
    content: string;
    image_url: string;
    gallery: string[];
    files: StudentFile[];
    published_at: string;
    views: number;
}

export const fetchStudents = async (locale?: string): Promise<StudentEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/students`, {
            params: {
                locale,
                with: 'image,gallery,files'
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
                image_url: getImageUrl(
                    (typeof fields.image === 'object' && !Array.isArray(fields.image) ? fields.image.path || fields.image.url : '') ||
                    (Array.isArray(fields.images) ? fields.images[0]?.path : '') ||
                    (fields.images?.path || '') ||
                    (Array.isArray(fields.image) ? fields.image[0]?.url : '') ||
                    (fields.image?.url || '') ||
                    (entry.image_url || entry.image || '')
                ),
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
        console.error('Error fetching students:', error);
        return [];
    }
};

export const getStudentBySlug = async (slug: string, locale?: string): Promise<StudentEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;

        // Slug or ID check
        const isUUID = slug.length > 20 && slug.includes('-');
        const filterKey = isUUID ? 'filter[id][eq]' : 'filter[slug][eq]';

        const response = await apiClient.get(`/projects/${projectId}/content/students`, {
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
            image_url: getImageUrl(
                (typeof fields.image === 'object' && !Array.isArray(fields.image) ? fields.image.path || fields.image.url : '') ||
                (Array.isArray(fields.images) ? fields.images[0]?.path : '') ||
                (fields.images?.path || '') ||
                (Array.isArray(fields.image) ? fields.image[0]?.url : '') ||
                (fields.image?.url || '') ||
                (entry.image_url || entry.image || '')
            ),
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
        console.error(`Error fetching student by slug: ${slug}`, error);
        return null;
    }
};
