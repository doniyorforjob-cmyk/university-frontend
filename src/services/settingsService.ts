import { settingsApi as mockSettingsApi } from '../api/mock/settings.mock';
import { settingsApi as httpSettingsApi } from '../api/http/settings.http';
import { GlobalSettings } from '../types/settings.types';

export const isUsingMock = process.env.REACT_APP_USE_MOCK_API === 'true' || true; // Standalone testda true turadi

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const settingsApi = isUsingMock ? mockSettingsApi : httpSettingsApi;
export type { GlobalSettings };
