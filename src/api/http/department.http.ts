import apiClient from '../client';
import { Department } from '../../types/department.types';

export const getDepartments = async (): Promise<Department[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/departments`);

    // Transform API response to Department format
    const data = Array.isArray(response.data) ? response.data : response.data.data;
    return data.map((entry: any) => ({
      id: entry.uuid || entry.id,
      name: entry.fields?.name || entry.fields?.title || entry.name || entry.title || 'Nomsiz Kafedra',
      description: entry.fields?.description || entry.description,
      head: entry.fields?.head || entry.head,
      contact: entry.fields?.contact || entry.contact
    }));
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};