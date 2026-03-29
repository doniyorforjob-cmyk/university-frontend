import apiClient from '../client';
import { toString } from '../../utils/apiUtils';

export interface ScientificCouncilEntry {
    id: string;
    slug: string;
    title: string;
    content?: string;
}

export const fetchScientificCouncils = async (locale?: string): Promise<ScientificCouncilEntry[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(
            `/projects/${projectId}/content/scientific-councils-awarding-academic-degrees`,
            { params: { locale } }
        );

        const rawData = Array.isArray(response.data)
            ? response.data
            : response.data?.data || [];

        if (!Array.isArray(rawData)) return [];

        return rawData.map((entry: any) => {
            const fields = entry.fields || {};
            return {
                id: entry.uuid || entry.id,
                slug: fields.slug || entry.slug || entry.uuid || entry.id,
                title: toString(fields.title || fields.name, locale) || '',
                content: toString(fields.content || fields.description || fields.body, locale) || '',
            };
        });
    } catch (error) {
        console.error('Error fetching scientific councils:', error);
        return [];
    }
};
export const getScientificCouncilBySlug = async (slug: string, locale?: string): Promise<ScientificCouncilEntry | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        // Search by slug first
        const response = await apiClient.get(
            `/projects/${projectId}/content/scientific-councils-awarding-academic-degrees`,
            {
                params: {
                    locale,
                    'filter[slug][eq]': slug,
                }
            }
        );

        let data = null;
        const rawData = Array.isArray(response.data) ? response.data : response.data?.data || [];

        if (Array.isArray(rawData) && rawData.length > 0) {
            // Find by slug or ID in the returned results to be safe
            data = rawData.find((item: any) => {
                const fields = item.fields || {};
                return (fields.slug === slug || item.slug === slug || item.uuid === slug || item.id === slug);
            });

            // If no match found but we have data, and we were filtering by slug, 
            // the API might have returned something else, but let's take the first one ONLY if we have a single result
            if (!data && rawData.length === 1) {
                data = rawData[0];
            }
        }

        // Fallback to searching by ID/UUID if slug match fails
        if (!data) {
            const idResponse = await apiClient.get(
                `/projects/${projectId}/content/scientific-councils-awarding-academic-degrees/${slug}`,
                { params: { locale } }
            );
            data = idResponse.data?.data || idResponse.data;
        }

        if (!data) return null;

        const fields = data.fields || {};
        return {
            id: data.uuid || data.id,
            slug: fields.slug || data.slug || data.uuid || data.id,
            title: toString(fields.title || fields.name, locale) || '',
            content: toString(fields.content || fields.description || fields.body, locale) || '',
        };
    } catch (error) {
        console.error('Error fetching scientific council by slug:', error);
        return null;
    }
};
