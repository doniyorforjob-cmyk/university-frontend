import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface UniversityContent {
    id: string | number;
    title: string;
    content: string; // information field from API
    image: string | null;
}

export const getUniversityContent = async (locale?: string): Promise<UniversityContent | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/university`, {
            params: { locale }
        });

        let data;
        if (Array.isArray(response.data)) {
            data = response.data[0];
        } else if (response.data?.data && Array.isArray(response.data.data)) {
            data = response.data.data[0];
        } else {
            data = response.data?.data || response.data;
        }

        if (!data) {
            throw new Error(`University API returned empty data. Status: ${response.status}`);
        }

        const fields = data.fields || {};


        return {
            id: data.uuid || data.id,
            title: fields.title || 'Namangan davlat texnika universiteti',
            content: fields.information || fields.content || '',
            image: getImageUrl(fields.image)
        };
    } catch (error) {
        console.error("Error fetching university content:", error);
        throw error; // Rethrow to let useCachedApi handle it
    }
};
