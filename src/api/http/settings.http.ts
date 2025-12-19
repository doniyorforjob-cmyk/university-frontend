import apiClient from '../client';
import { GlobalSettings } from '../../types/settings.types';
import { settingsApi as mockSettingsApi } from '../mock/settings.mock';

export const settingsApi = {
    getSettings: async (): Promise<GlobalSettings> => {
        try {
            const response = await apiClient.get('/settings');
            return response.data;
        } catch (error) {
            console.error('Error fetching global settings from API. Falling back to mock data.', error);
            // Fallback to mock data to ensure the UI doesn't break
            return mockSettingsApi.getSettings();
        }
    }
};
