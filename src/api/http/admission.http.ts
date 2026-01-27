import apiClient from '../client';
import { getImageUrl } from '../../utils/apiUtils';

export interface AdmissionFile {
  name: string;
  url: string;
  size?: number;
  ext?: string;
}

export interface AdmissionEntry {
  id: string;
  slug: string;
  title: string;
  content: string;
  image_url?: string;
  files: AdmissionFile[];
}

export const fetchAdmissionData = async (locale?: string): Promise<AdmissionEntry | null> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/admission`, {
      params: {
        locale,
        with: 'files'
      }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;
    if (!Array.isArray(data) || data.length === 0) return null;

    // Map the first entry as the main admission page content
    const entry = data[0];
    const fields = entry.fields || entry || {};

    return {
      id: entry.uuid || entry.id,
      slug: fields.slug || entry.slug || '',
      title: fields.title || '',
      content: fields.content || '',
      image_url: getImageUrl(
        (typeof fields.image === 'object' && !Array.isArray(fields.image) ? fields.image.path || fields.image.url : '') ||
        (Array.isArray(fields.images) ? fields.images[0]?.path : '') ||
        (fields.image?.path || '') ||
        (fields.image?.url || '') ||
        (entry.image_url || entry.image || '')
      ),
      files: (fields.files || []).map((file: any) => ({
        name: file.name || file.title || file.filename || 'Hujjat',
        url: getImageUrl(file.url || file.path || ''),
        size: file.size,
        ext: file.extension || file.ext || (file.url || file.path)?.split('.').pop()?.toLowerCase()
      }))
    };
  } catch (error) {
    console.error("Admission fetch error:", error);
    return null;
  }
};