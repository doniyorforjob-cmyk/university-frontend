import apiClient from '../client';
import { Leadership } from '../../types/leadership.types';

const formatPhone = (phone: any): string => {
    if (!phone) return '';
    return String(phone).split('.')[0];
};

export const getLeadershipApi = async (locale?: string): Promise<Leadership[]> => {
    try {
        const projectId = process.env.REACT_APP_PROJECT_ID;
        const response = await apiClient.get(`/projects/${projectId}/content/leadership`, {
            params: { locale }
        });

        const data = Array.isArray(response.data) ? response.data : response.data.data;

        return data.map((entry: any) => ({
            id: entry.uuid || entry.id,
            name: entry.fields?.name || entry.name,
            head: entry.fields?.head || entry.head,
            phone: formatPhone(entry.fields?.phone || entry.phone),
            email: entry.fields?.email || entry.email
        }));
    } catch (error) {
        console.error('Error fetching leadership:', error);
        throw error;
    }
};
