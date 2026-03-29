import apiClient from '../client';

export interface InformationServiceData {
  title: Record<string, string>;
  description: Record<string, string>;
  banner?: string;
  documents?: { name: any; file: string }[];
}

export const fetchInformationServicesData = async (locale?: string): Promise<InformationServiceData> => {
  const projectId = process.env.REACT_APP_PROJECT_ID;
  const endpoint = `/projects/${projectId}/content/information-services`;

  try {
    const response = await apiClient.get(endpoint, {
      params: { locale }
    });

    const rawData = Array.isArray(response.data) ? response.data : response.data?.data;
    const data = Array.isArray(rawData) ? rawData[0] : rawData;

    if (!data) {
      console.warn("No data found in information-services collection");
      return {
        title: { uz: 'Ma\'lumot topilmadi', ru: 'Данные не найдены', en: 'No data found' },
        description: { uz: '', ru: '', en: '' },
        documents: []
      };
    }

    const fields = data.fields || data;

    // Helper to extract image URL from various formats (array of objects, single object, or string)
    const resolveImageUrl = (image: any): string | undefined => {
      if (!image) return undefined;
      if (Array.isArray(image)) return image[0]?.url || image[0]?.thumbnail_url || image[0]?.path;
      return image.url || image.thumbnail_url || image.path || (typeof image === 'string' ? image : undefined);
    };

    return {
      title: fields.title || {},
      description: fields.description || fields.content || {},
      banner: resolveImageUrl(fields.banner) || resolveImageUrl(fields.image),
      documents: (fields.documents || fields.files || []).map((doc: any) => ({
        name: doc.name || doc.title || (typeof doc === 'object' ? (doc.filename || doc.uuid) : 'Hujjat'),
        file: doc.file?.url || doc.url || doc.file || doc.path || (typeof doc === 'string' ? doc : '')
      }))
    };
  } catch (error) {
    console.error("Information services fetch error:", error);
    throw error;
  }
};