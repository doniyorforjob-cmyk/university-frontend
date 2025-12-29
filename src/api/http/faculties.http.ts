import apiClient from '../client';
import { Faculty } from '../../types/faculty.types';
import { getImageUrl } from '../../utils/apiUtils';

export const getFaculties = async (): Promise<Faculty[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/faculties`, {
            params: { with: 'icon' }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;

        return data.map((entry: any) => ({
            id: entry.uuid || entry.id,
            name: entry.fields?.name || entry.name,
            shortDescription: entry.fields?.description || entry.description,
            image: getImageUrl(Array.isArray(entry.fields?.icon) ? entry.fields.icon[0]?.url : (entry.fields?.icon?.url || '')),
            iconImage: getImageUrl(Array.isArray(entry.fields?.icon) ? entry.fields.icon[0]?.url : (entry.fields?.icon?.url || '')),
            color: entry.fields?.color || 'from-sky-500 to-indigo-500',
        }));
    } catch (error) {
        console.error("Faculties fetch error:", error);
        return [];
    }
};