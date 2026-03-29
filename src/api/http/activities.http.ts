import apiClient from '../client';
import { ActivityPageData } from '../../types/activities.types';

export const fetchActivitiesData = async (locale?: string): Promise<ActivityPageData | null> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/ projects / ${projectId} /content/activities`, {
      params: { locale }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;
    if (!data || data.length === 0) return null;

    const entry = data[0]; // Take the first record

    let iconsJson = {};
    const rawIcons = entry.fields?.icons_json || entry.icons_json;
    if (typeof rawIcons === 'string') {
      try {
        iconsJson = JSON.parse(rawIcons);
      } catch (e) {
        console.error("Error parsing icons_json:", e);
      }
    } else if (typeof rawIcons === 'object') {
      iconsJson = rawIcons;
    }

    let categories: string[] = [];
    const rawCategories = entry.fields?.categories || entry.categories;
    if (Array.isArray(rawCategories)) {
      categories = rawCategories;
    } else if (typeof rawCategories === 'string') {
      categories = rawCategories.split(',').map((c: string) => c.trim());
    }

    return {
      id: entry.uuid || entry.id,
      title: entry.fields?.title || entry.title || '',
      content: entry.fields?.content || entry.content || '',
      categories,
      icons_json: iconsJson as any
    };
  } catch (error) {
    console.error("Activities fetch error:", error);
    return null;
  }
};