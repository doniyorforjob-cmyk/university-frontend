import apiClient from '../client';
import { Faculty, Department } from '../../types/faculty.types';
import { getImageUrl } from '../../utils/apiUtils';

export const getFaculties = async (): Promise<Faculty[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/faculties`, {
            params: { with: 'icon,image' }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;

        // Helper to resolve image from varied API formats (string, object, array of strings/objects)
        const resolveImage = (img: any): string => {
            if (!img) return '';
            if (Array.isArray(img)) {
                const first = img[0];
                if (!first) return '';
                if (typeof first === 'string') return first;
                return first.thumbnail_url || first.url || '';
            }
            if (typeof img === 'string') return img;
            return img.thumbnail_url || img.url || '';
        };

        return data.map((entry: any) => ({
            id: entry.uuid || entry.id,
            name: entry.fields?.name || entry.fields?.title || entry.name || entry.title || "Fakultet",
            shortDescription: entry.fields?.description || entry.description,
            image: getImageUrl(resolveImage(entry.fields?.image || entry.image)),
            iconImage: getImageUrl(resolveImage(entry.fields?.icon || entry.icon)),
            color: entry.fields?.color || 'from-sky-500 to-indigo-500',
            slug: entry.fields?.slug || entry.slug,
        }));
    } catch (error) {
        console.error("Faculties fetch error:", error);
        return [];
    }
};

export const getDepartments = async (): Promise<Department[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/departments`);

        const data = Array.isArray(response.data) ? response.data : response.data.data;

        return data.map((entry: any) => ({
            id: entry.uuid || entry.id,
            name: entry.fields?.name || entry.fields?.title || entry.name || entry.title,
            phone: entry.fields?.phone || entry.fields?.phone_number,
            email: entry.fields?.email,
            headName: entry.fields?.head_name || entry.fields?.manager || entry.fields?.dean || entry.fields?.leader,
            slug: entry.fields?.slug || entry.slug,
            facultyId: entry.fields?.faculty?.uuid || entry.fields?.faculty?.id,
        }));
    } catch (error) {
        console.error("Departments fetch error:", error);
        return [];
    }
};