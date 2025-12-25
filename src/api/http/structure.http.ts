import apiClient from '../client';
import { Department } from '../../types/structure.types';

export const fetchStructureData = async (): Promise<any[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/structure`);

    const data = Array.isArray(response.data) ? response.data : response.data.data;

    return data.map((entry: any) => ({
      id: entry.uuid || entry.id,
      title: entry.fields?.title || entry.title,
      description: entry.fields?.description || entry.description,
      type: entry.fields?.type || entry.type,
      children: entry.fields?.children || entry.children || []
    }));
  } catch (error) {
    console.error("Structure fetch error:", error);
    return [];
  }
};