import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface YashilUniversitetFile {
  name: string;
  url: string;
  size?: number;
  ext?: string;
}

export interface YashilUniversitetEntry {
  id: string;
  slug: string;
  title: string;
  content: string;
  files: YashilUniversitetFile[];
}

export const fetchYashilUniversitetData = async (locale?: string): Promise<YashilUniversitetEntry | null> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/green-university`, {
      params: {
        locale,
        with: 'files'
      }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;
    if (!Array.isArray(data) || data.length === 0) return null;

    // Map the first entry
    const entry = data[0];
    const fields = entry.fields || entry || {};

    return {
      id: entry.uuid || entry.id,
      slug: fields.slug || entry.slug || '',
      title: fields.title || '',
      content: fields.content || '',
      files: (fields.files || []).map((file: any) => ({
        name: file.name || file.title || file.filename || 'Hujjat',
        url: getImageUrl(file.url || file.path || ''),
        size: file.size,
        ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
      }))
    };
  } catch (error) {
    console.error("Green university fetch error:", error);
    return null;
  }
};