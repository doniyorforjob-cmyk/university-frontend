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
            content: entry.fields?.content || '',
            image: getImageUrl(resolveImage(entry.fields?.image || entry.image)),
            iconImage: getImageUrl(resolveImage(entry.fields?.icon || entry.icon)),
            color: entry.fields?.color || 'from-sky-500 to-indigo-500',
            slug: entry.fields?.slug || entry.slug,
            deanName: entry.fields?.dean_name || entry.fields?.dean,
            deanPosition: entry.fields?.dean_position,
            deanPhone: entry.fields?.dean_phone,
            deanEmail: entry.fields?.dean_email,
            deanImage: getImageUrl(resolveImage(entry.fields?.dean_image)),
            gallery: Array.isArray(entry.fields?.gallery) ? entry.fields.gallery.map((img: any) => getImageUrl(resolveImage(img))) : [],
            directionsAndSpecializations: entry.fields?.directions || entry.fields?.specializations,
            internationalCooperation: entry.fields?.cooperation
        }));
    } catch (error) {
        console.error("Faculties fetch error:", error);
        return [];
    }
};

export const getFacultyById = async (id: string | number): Promise<Faculty | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        // Check if ID is UUID
        const isUUID = String(id).length > 20 && String(id).includes('-');
        const endpoint = `/projects/${projectId}/content/faculties/${id}`;

        const response = await apiClient.get(endpoint, {
            params: { with: 'icon,image,gallery,dean_image' }
        });

        const entry = response.data?.data || response.data;
        if (!entry) return null;

        // Resolve image helper (defined inside getFaculties, but let's re-use logic)
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

        return {
            id: entry.uuid || entry.id,
            name: entry.fields?.name || entry.fields?.title || entry.name || entry.title || "Fakultet",
            description: entry.fields?.content || entry.fields?.description || entry.description,
            content: entry.fields?.content || '',
            image: getImageUrl(resolveImage(entry.fields?.image || entry.image)),
            iconImage: getImageUrl(resolveImage(entry.fields?.icon || entry.icon)),
            color: entry.fields?.color || 'from-sky-500 to-indigo-500',
            slug: entry.fields?.slug || entry.slug,
            deanName: entry.fields?.dean_name || entry.fields?.dean,
            deanPosition: entry.fields?.dean_position || "Fakultet dekani",
            deanPhone: entry.fields?.dean_phone,
            deanEmail: entry.fields?.dean_email,
            deanImage: getImageUrl(resolveImage(entry.fields?.dean_image)),
            gallery: Array.isArray(entry.fields?.gallery) ? entry.fields.gallery.map((img: any) => getImageUrl(resolveImage(img))) : [],
            directionsAndSpecializations: entry.fields?.directions || entry.fields?.specializations,
            internationalCooperation: entry.fields?.cooperation
        };
    } catch (error) {
        console.error("Faculty fetch error:", error);
        // Fallback to searching in all faculties if single fetch fails
        try {
            const allFaculties = await getFaculties();
            return allFaculties.find(f => String(f.id) === String(id)) || null;
        } catch (e) {
            return null;
        }
    }
};

export const getDepartmentsByFacultyId = async (facultyId: string | number): Promise<Department[]> => {
    try {
        const allDepartments = await getDepartments();
        return allDepartments.filter(dept =>
            String(dept.facultyId) === String(facultyId)
        );
    } catch (error) {
        console.error("Departments by faculty fetch error:", error);
        return [];
    }
};

export const getDepartmentById = async (id: string | number): Promise<Department | null> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/departments/${id}`, {
            params: { with: 'image,gallery,faculty' }
        });

        const entry = response.data?.data || response.data;
        console.log('getDepartmentById API Response:', { id, entry, fullResponse: response.data });
        if (!entry) return null;

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

        return {
            id: entry.uuid || entry.id,
            name: entry.fields?.name || entry.fields?.title || entry.name || entry.title,
            phone: entry.fields?.phone || entry.fields?.phone_number,
            email: entry.fields?.email,
            headName: entry.fields?.head_name || entry.fields?.manager || entry.fields?.dean || entry.fields?.leader,
            slug: entry.fields?.slug || entry.slug,
            facultyId: entry.fields?.faculty?.uuid || entry.fields?.faculty?.id,
            image: getImageUrl(resolveImage(entry.fields?.image)),
            description: entry.fields?.description || entry.fields?.content,
            content: entry.fields?.content || '',
            gallery: Array.isArray(entry.fields?.gallery) ? entry.fields.gallery.map((img: any) => getImageUrl(resolveImage(img))) : [],
            directions: entry.fields?.directions,
            history: entry.fields?.history
        };
    } catch (error) {
        console.error("Department fetch error:", error);
        // Fallback: try to find in all departments
        try {
            console.log('Trying fallback: fetching all departments to find ID:', id);
            const allDepartments = await getDepartments();
            const found = allDepartments.find(d => String(d.id) === String(id));
            console.log('Fallback result:', found);
            return found || null;
        } catch (fallbackError) {
            console.error("Fallback also failed:", fallbackError);
            return null;
        }
    }
};

export const getDepartments = async (): Promise<Department[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/departments`, {
            params: { with: 'image' }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;

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
            name: entry.fields?.name || entry.fields?.title || entry.name || entry.title,
            phone: entry.fields?.phone || entry.fields?.phone_number,
            email: entry.fields?.email,
            headName: entry.fields?.head_name || entry.fields?.manager || entry.fields?.dean || entry.fields?.leader,
            slug: entry.fields?.slug || entry.slug,
            facultyId: entry.fields?.faculty?.uuid || entry.fields?.faculty?.id,
            image: getImageUrl(resolveImage(entry.fields?.image)),
            description: entry.fields?.description || entry.fields?.content,
        }));
    } catch (error) {
        console.error("Departments fetch error:", error);
        return [];
    }
};