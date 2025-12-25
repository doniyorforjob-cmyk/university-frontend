import apiClient from '../client';

export const fetchInteractiveServicesData = async (): Promise<any[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/interactive-services`);

    const data = Array.isArray(response.data) ? response.data : response.data.data;

    return data.map((entry: any) => ({
      id: entry.uuid || entry.id,
      title: entry.fields?.title || entry.title,
      description: entry.fields?.description || entry.description,
      link: entry.fields?.link || entry.link,
      icon: entry.fields?.icon || entry.icon
    }));
  } catch (error) {
    console.error("Interactive services fetch error:", error);
    return [];
  }
};