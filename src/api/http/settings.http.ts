import apiClient from '../client';
import { GlobalSettings } from '../../types/settings.types';


export const settingsApi = {
    getSettings: async (): Promise<GlobalSettings> => {
        try {
            const projectId = process.env.REACT_APP_PROJECT_ID;
            const response = await apiClient.get(`/projects/${projectId}/content/settings`);

            // Transform API response to GlobalSettings format
            const data = Array.isArray(response.data) ? response.data[0] : response.data.data?.[0] || response.data;
            return {
                siteName: data.fields?.siteName || data.siteName || 'NamDTU',
                siteDescription: data.fields?.siteDescription || data.siteDescription || '',
                logo: data.fields?.logo || data.logo || '/images/logo.png',
                ...data.fields
            };
        } catch (error) {
            console.error('Error fetching global settings from API:', error);
            throw error;
        }
    }
};
