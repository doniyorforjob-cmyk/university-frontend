import { create } from 'zustand';
import { GlobalSettings } from '../types/settings.types';
import { settingsApi } from '@/services/settingsService';

interface SettingsState {
    settings: GlobalSettings | null;
    isLoading: boolean;
    error: string | null;
    fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    settings: null,
    isLoading: false,
    error: null,
    fetchSettings: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await settingsApi.getSettings();
            set({ settings: data, isLoading: false });
        } catch (err) {
            set({ error: (err as Error).message, isLoading: false });
        }
    }
}));
