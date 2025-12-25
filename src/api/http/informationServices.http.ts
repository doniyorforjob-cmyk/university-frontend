import apiClient from '../client';
import { ContentBlock } from '@/components/shared/ContentBuilder';

export const fetchInformationServicesData = async (): Promise<{ blocks: ContentBlock[] }> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/information-services`);

    const data = Array.isArray(response.data) ? response.data : response.data.data;

    // Transform to ContentBlock format
    const blocks = data.map((entry: any) => ({
      type: entry.fields?.type || 'text',
      content: entry.fields?.content || entry.content,
      data: entry.fields?.data || entry.data
    }));

    return { blocks };
  } catch (error) {
    console.error("Information services fetch error:", error);
    return { blocks: [] };
  }
};