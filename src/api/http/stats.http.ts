import apiClient from '../client';
import { Stat } from '../../types/stat.types';

export const fetchStats = async (locale?: string): Promise<Stat[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/stats`, {
      params: { locale }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;

    return data.map((entry: any) => ({
      id: entry.uuid || entry.id,
      label: entry.fields?.label || entry.label,
      value: entry.fields?.value || entry.value,
      icon: entry.fields?.icon || entry.icon,
      description: entry.fields?.description || entry.description
    }));
  } catch (error) {
    console.error("Stats fetch error:", error);
    return [];
  }
};