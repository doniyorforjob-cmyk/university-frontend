import apiClient from '../client';
import { OpenLesson, OpenLessonDetail } from '../../types/open-lesson.types';

export const getOpenLessons = async (): Promise<OpenLesson[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/open-lessons`, {
            params: {
                with: 'image'
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
                teacher_name: entry.fields?.teacher_name || '',
                lesson_date: entry.fields?.lesson_date || entry.published_at || entry.created_at,
                description: entry.fields?.description || '',
                image_url: (imageObj?.url || imageObj?.thumbnail_url || imageObj?.path) || '/images/logo.png',
                views: entry.fields?.views || 0,
            };
        });
    } catch (error) {
        console.error("Open lessons fetch error:", error);
        return [];
    }
};

export const getOpenLessonBySlug = async (slug: string, locale?: string): Promise<OpenLessonDetail | undefined> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const currentLocale = locale || localStorage.getItem('locale') || 'en';

        const response = await apiClient.get(`/projects/${projectId}/content/open-lessons`, {
            params: {
                'filter[slug][eq]': slug,
                with: 'image,gallery,department',
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
            console.warn(`Open lesson not found for slug: ${slug} in locale: ${currentLocale}`);
            return undefined;
        }

        // Department mapping
        let departmentInfo;
        if (entry.fields?.department) {
            const dept = Array.isArray(entry.fields.department) ? entry.fields.department[0] : entry.fields.department;
            if (dept) {
                departmentInfo = {
                    id: dept.id || 0,
                    name: dept.fields?.title || dept.fields?.name || dept.title || dept.name || ''
                };
            }
        }

        const imageObj = Array.isArray(entry.fields?.image) ? entry.fields.image[0] : entry.fields?.image;

        return {
            id: entry.uuid || entry.id,
            slug: entry.fields?.slug || entry.slug,
            title: entry.fields?.title || entry.title,
            teacher_name: entry.fields?.teacher_name || '',
            lesson_date: entry.fields?.lesson_date || entry.published_at || entry.created_at,
            description: entry.fields?.description || '',
            image_url: (imageObj?.url || imageObj?.thumbnail_url || imageObj?.path) || '/images/logo.png',
            views: entry.fields?.views || 0,
            content: entry.fields?.content || '',
            department: departmentInfo,
            gallery: Array.isArray(entry.fields?.gallery)
                ? entry.fields.gallery.map((img: any) => img.url || img.thumbnail_url || img.path)
                : undefined,
            attachments: Array.isArray(entry.fields?.attachments)
                ? entry.fields.attachments.map((file: any) => ({
                    name: file.name || file.filename,
                    url: file.url
                }))
                : undefined,
            video_url: entry.fields?.video_url
        };
    } catch (error) {
        console.error("Open lesson detail fetch error:", error);
        return undefined;
    }
};
