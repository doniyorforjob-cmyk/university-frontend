import apiClient from '../client';
import { OrganizationalStructureDoc } from '../../types/organizationalStructure.types';
import { getImageUrl } from '../../utils/apiUtils';

export const fetchOrganizationalStructureData = async (locale?: string): Promise<OrganizationalStructureDoc | null> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/organizational-structure`, {
      params: { locale }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;

    if (!data || data.length === 0) return null;

    const entry = data[0];

    // Helper to resolve file from varied API formats
    const resolveFile = (file: any): string => {
      if (!file) return '';
      if (Array.isArray(file)) {
        const first = file[0];
        if (!first) return '';
        if (typeof first === 'string') return first;
        return first.url || '';
      }
      if (typeof file === 'string') return file;
      return file.url || '';
    };

    return {
      title: entry.fields?.title || entry.name || "Tashkiliy tuzilma",
      fileUrl: getImageUrl(resolveFile(entry.fields?.file))
    };
  } catch (error) {
    console.error("Organizational structure fetch error:", error);
    return null;
  }
};