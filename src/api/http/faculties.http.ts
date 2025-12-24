import apiClient from '../client';
import { Faculty } from '../../types/faculty.types';

export const getFaculties = async (): Promise<Faculty[]> => {
    try {
        const response = await apiClient.get('/collections/faculties/entries', {
            params: { with: 'icon' }
        });

        return response.data.data.map((entry: any) => ({
            id: entry.id || entry.uuid,
            name: entry.name,
            shortDescription: entry.description,
            image: entry.icon?.url || '',
            iconImage: entry.icon?.url || '',
            color: entry.color || 'from-sky-500 to-indigo-500',
        }));
    } catch (error) {
        console.error("Faculties fetch error:", error);
        return [];
    }
};