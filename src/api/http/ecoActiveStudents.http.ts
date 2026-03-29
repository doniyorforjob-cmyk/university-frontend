import apiClient from '../client';
import { ContentBlock } from '@/components/shared/ContentBuilder';

export interface EcoActiveStudentsDetailEntry {
  id: string;
  slug: string;
  title: string;
  description: string;
  contentBlocks: ContentBlock[];
  image?: string;
  gallery?: string[];
  createdAt?: string;
  updatedAt?: string;
  views?: number;
}

const unescapeHtml = (html: string) => {
  if (!html) return '';
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ');
};

const getImageUrl = (image: any): string | undefined => {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  if (Array.isArray(image) && image.length > 0) return getImageUrl(image[0]);
  if (typeof image === 'object') return image.url || image.src || undefined;
  return undefined;
};

export const fetchEcoActiveStudentsData = async (locale?: string): Promise<any[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/ecoactive-students`, {
      params: { locale }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;
    return (data || []).map((item: any) => {
      const fields = item.fields || item || {};
      return {
        ...item,
        fields: {
          ...fields,
          image: getImageUrl(fields.image),
          createdAt: item.created_at || item.createdAt || item.created || fields.created_at || fields.createdAt || fields.created || item.published_at,
          updatedAt: item.updated_at || item.updatedAt || item.updated || fields.updated_at || fields.updatedAt || fields.updated
        }
      };
    });
  } catch (error) {
    console.error("Eco students fetch error:", error);
    return [];
  }
};

export const getEcoActiveStudentsDetailBySlug = async (slug: string, locale?: string): Promise<EcoActiveStudentsDetailEntry | null> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/ecoactive-students`, {
      params: {
        locale,
        'filter[slug][eq]': slug
      }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;
    let entry = (data || []).find((e: any) => (e.fields?.slug || e.slug) === slug);

    if (!entry && data && data.length > 0) {
      entry = data[0];
    }

    if (!entry) return null;
    const fields = entry.fields || entry || {};

    // Parse content field
    let blocks: ContentBlock[] = [];
    try {
      if (fields.content) {
        const parsed = typeof fields.content === 'string' ? JSON.parse(fields.content) : fields.content;
        if (Array.isArray(parsed)) {
          blocks = parsed.map((b: any) => ({
            id: b.id || Math.random().toString(36).substr(2, 9),
            type: b.type || 'rich-text',
            data: {
              ...b.data,
              content: typeof b.data?.content === 'string' ? unescapeHtml(b.data.content) : b.data?.content
            }
          }));
        } else {
          blocks = [{
            id: entry.uuid || entry.id,
            type: 'rich-text',
            data: { content: unescapeHtml(fields.content) }
          }];
        }
      }
    } catch (e) {
      blocks = [{
        id: entry.uuid || entry.id,
        type: 'rich-text',
        data: { content: unescapeHtml(fields.content) }
      }];
    }

    // Parse gallery
    let galleryArr: string[] = [];
    if (fields.gallery) {
      if (Array.isArray(fields.gallery)) {
        galleryArr = fields.gallery.map((img: any) => getImageUrl(img)).filter(Boolean) as string[];
      } else if (typeof fields.gallery === 'string') {
        try {
          const parsed = JSON.parse(fields.gallery);
          if (Array.isArray(parsed)) {
            galleryArr = parsed.map((img: any) => getImageUrl(img)).filter(Boolean) as string[];
          }
        } catch (e) {
          galleryArr = [getImageUrl(fields.gallery)].filter(Boolean) as string[];
        }
      }
    } else if (Array.isArray(fields.image)) {
      galleryArr = fields.image.map((img: any) => getImageUrl(img)).filter(Boolean) as string[];
    }

    return {
      id: entry.uuid || entry.id,
      slug: fields.slug || '',
      title: fields.title || '',
      description: fields.description || '',
      contentBlocks: blocks,
      image: getImageUrl(fields.image),
      gallery: galleryArr.length > 0 ? galleryArr : undefined,
      createdAt: entry.created_at || entry.createdAt || entry.created || fields.created_at || fields.createdAt || fields.created || entry.published_at,
      updatedAt: entry.updated_at || entry.updatedAt || entry.updated || fields.updated_at || fields.updatedAt || fields.updated,
      views: entry.views || fields.views || 0
    };
  } catch (error) {
    console.error("EcoActiveStudentsDetail fetch error:", error);
    return null;
  }
};