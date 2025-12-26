import { settingsApi as httpSettingsApi } from '../api/http/settings.http';
import { GlobalSettings } from '../types/settings.types';

export const settingsApi = httpSettingsApi;
export type { GlobalSettings };
