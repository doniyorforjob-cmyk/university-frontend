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

export const useSettingsStore = create<SettingsState>((set: any, get: any) => ({
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
        const cacheItem = cacheManager.getItem(cacheKey);

        if (!force && cacheItem) {
            set((state: any) => ({
                settings: cacheItem.data,
                settingsCache: { ...state.settingsCache, [locale]: cacheItem.data },
                error: null
            }));

            // Proactive Revalidation Logic (SWR):
            // If data is fresh (e.g., less than 20 seconds old), we don't need to re-fetch
            const REVALIDATE_THRESHOLD = 20 * 1000; // 20 seconds
            const isFresh = (Date.now() - cacheItem.timestamp) < REVALIDATE_THRESHOLD;

            if (isFresh && !force) {
                return;
            }
            // Otherwise, we continue to fetch in background to update the state
        }

        // Only set loading if we don't have any data to show (Silent SWR)
        if (!force && cacheItem) {
            set((state: SettingsState) => ({
                settings: cacheItem.data,
                settingsCache: { ...state.settingsCache, [locale]: cacheItem.data },
                error: null
            }));
            return;
        }

        set({ isLoading: true, error: null });

        try {
            // 2. Fetch from API
            const data = await settingsApi.getSettings(locale);

            set((state: SettingsState) => ({
                settings: data,
                settingsCache: { ...state.settingsCache, [locale]: data },
                isLoading: false
            }));
        } catch (err) {
            set({ error: (err as Error).message, isLoading: false });
        }
    }
}));
