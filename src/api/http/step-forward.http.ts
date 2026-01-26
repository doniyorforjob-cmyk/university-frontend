import apiClient from '../client';
import { StepForward, StepForwardDetail } from '../../types/step-forward.types';

export const getStepForwards = async (locale?: string): Promise<StepForward[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const currentLocale = locale || localStorage.getItem('locale') || 'uz';

        const response = await apiClient.get(`/projects/${projectId}/content/step-forward`, {
            params: {
                with: 'image',
                locale: currentLocale
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;

        if (!Array.isArray(data)) return [];

        return data.map((entry: any) => {
            const imageObj = Array.isArray(entry.fields?.image) ? entry.fields.image[0] : entry.fields?.image;
            return {
                id: entry.uuid || entry.id,
                slug: entry.fields?.slug || entry.slug,
                title: entry.fields?.title || entry.title,
                description: entry.fields?.description || '',
                image_url: (imageObj?.url || imageObj?.thumbnail_url || imageObj?.path) || '/images/logo.png',
                date: entry.fields?.date || entry.published_at || entry.created_at,
                views: entry.fields?.views || 0,
            };
        });
    } catch (error) {
        console.error("Step forward fetch error:", error);
        return [];
    }
};

export const getStepForwardBySlug = async (slug: string, locale?: string): Promise<StepForwardDetail | undefined> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const currentLocale = locale || localStorage.getItem('locale') || 'en';

        const response = await apiClient.get(`/projects/${projectId}/content/step-forward`, {
            params: {
                'filter[slug][eq]': slug,
                with: 'image,gallery',
                locale: currentLocale
            }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;

        if (!Array.isArray(data)) return undefined;

        const entry = data.find((item: any) => {
            const itemSlug = item.fields?.slug || item.slug;
            return itemSlug === slug;
        });

        if (!entry) {
            console.warn(`Step forward not found for slug: ${slug} in locale: ${currentLocale}`);
            return undefined;
        }

        const imageObj = Array.isArray(entry.fields?.image) ? entry.fields.image[0] : entry.fields?.image;

        return {
            id: entry.uuid || entry.id,
            slug: entry.fields?.slug || entry.slug,
            title: entry.fields?.title || entry.title,
            description: entry.fields?.description || '',
            image_url: (imageObj?.url || imageObj?.thumbnail_url || imageObj?.path) || '/images/logo.png',
            date: entry.fields?.date || entry.published_at || entry.created_at,
            views: entry.fields?.views || 0,
            content: entry.fields?.content || '',
            gallery: Array.isArray(entry.fields?.gallery)
                ? entry.fields.gallery.map((img: any) => img.url || img.thumbnail_url || img.path)
                : undefined,
        };
    } catch (error) {
        console.error("Step forward detail fetch error:", error);
        return undefined;
    }
};
