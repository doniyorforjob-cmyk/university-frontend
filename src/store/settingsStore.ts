import { create } from 'zustand';
import { GlobalSettings } from '../types/settings.types';
import { settingsApi } from '@/services/settingsService';
import { cacheManager } from '@/utils/cacheManager';

interface SettingsState {
    settings: GlobalSettings | null; // Active settings (backwards compatible)
    settingsCache: Record<string, GlobalSettings>; // Cache per locale
    isLoading: boolean;
    error: string | null;
    fetchSettings: (locale?: string, force?: boolean) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
    settings: null,
    settingsCache: {},
    isLoading: false,
    error: null,
    fetchSettings: async (locale = 'uz', force = false) => {
        const currentStore = get();

        // 1. Check in-memory cache first (fastest)
        if (!force && currentStore.settingsCache[locale]) {
            set({ settings: currentStore.settingsCache[locale], error: null });
            return;
        }

        // 2. Check global cache manager (localStorage/prefetch)
        const cacheKey = `global-settings-${locale}`;
        const cachedData = cacheManager.getStale(cacheKey) as GlobalSettings | null;
        if (!force && cachedData) {
            set((state) => ({
                settings: cachedData,
                settingsCache: { ...state.settingsCache, [locale]: cachedData },
                error: null
            }));

            // SWR Logic:
            // If cache is fresh (not expired), we don't need to re-fetch.
            // cacheManager.has(key) returns true only if key exists AND is not expired.
            if (cacheManager.has(cacheKey)) {
                return;
            }
            // If we are here, data is stale (expired but still in localStorage/memory).
            // We continue to fetch in background to update it.
        }

        // Only set loading if we don't have any data to show (Silent SWR)
        if (!cachedData && !currentStore.settings) {
            set({ isLoading: true, error: null });
        } else {
            set({ error: null }); // Clear potential errors if we have data
        }

        try {
            // 2. Fetch from API
            const data = await settingsApi.getSettings(locale);

            set((state) => ({
                settings: data,
                settingsCache: { ...state.settingsCache, [locale]: data },
                isLoading: false
            }));
        } catch (err) {
            set({ error: (err as Error).message, isLoading: false });
        }
    }
}));
