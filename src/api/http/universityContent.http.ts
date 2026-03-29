import apiClient from '../client';
import { ContentBlock } from '@/components/shared/ContentBuilder';

export const fetchUniversityContentData = async (locale?: string): Promise<ContentBlock[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/university`, {
      params: { locale }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;

    // Transform to ContentBlock format
    return data.map((entry: any) => ({
      type: entry.fields?.type || 'text',
      content: entry.fields?.content || entry.content,
      data: entry.fields?.data || entry.data
    }));
  } catch (error) {
    console.error("University content fetch error:", error);
    return [];
  }
};