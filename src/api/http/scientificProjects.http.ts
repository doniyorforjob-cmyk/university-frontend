import apiClient from '../client';
import { toString } from '../../utils/apiUtils';

export interface ScientificProjectEntry {
    id: string;
    slug: string;
    title: string;
    content?: string;
}

export const fetchScientificProjects = async (locale?: string): Promise<ScientificProjectEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(
            `/projects/${projectId}/content/scientific-projects`,
            { params: { locale } }
        );

        const rawData = Array.isArray(response.data)
            ? response.data
            : response.data?.data || [];

        if (!Array.isArray(rawData)) return [];

        return rawData.map((entry: any) => {
            const fields = entry.fields || {};

            // Combine content and content-continued if both exist
            const mainContent = toString(fields.content || fields.description, locale) || '';
            const continuedContent = toString(fields['content-continued'] || fields.content_continued, locale) || '';
            const fullContent = continuedContent
                ? `${mainContent}<div class="mt-4">${continuedContent}</div>`
                : mainContent;

            return {
                id: entry.uuid || entry.id,
                slug: fields.slug || entry.slug || entry.uuid || entry.id,
                title: toString(fields.title || fields.name, locale) || '',
                content: fullContent,
            };
        });
    } catch (error) {
        console.error('Error fetching scientific projects:', error);
        return [];
    }
};

export const getScientificProjectBySlug = async (slug: string, locale?: string): Promise<ScientificProjectEntry | null> => {
    try {
        const all = await fetchScientificProjects(locale);
        return all.find(item => item.slug === slug) || null;
    } catch (error) {
        console.error('Error fetching scientific project by slug:', error);
        return null;
    }
};
