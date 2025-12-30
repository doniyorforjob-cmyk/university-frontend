import apiClient from '../client';
import { Announcement, AnnouncementDetail } from '../../types/announcement.types';

export const getAnnouncements = async (): Promise<Announcement[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const response = await apiClient.get(`/projects/${projectId}/content/news`, {
      params: {
        'filter[category][eq]': 'announcements',
        with: 'image'
      }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;

    return data.map((entry: any) => ({
      id: entry.uuid || entry.id,
      slug: entry.fields?.slug || entry.slug,
      title: entry.fields?.title || entry.title,
      image_url: (Array.isArray(entry.fields?.image) ? entry.fields.image[0]?.url : (entry.fields?.image?.url || '')) || '/images/logo.png',
      description: entry.fields?.content ? entry.fields.content.substring(0, 150) + '...' : '',
      published_at: entry.fields?.date || entry.published_at || entry.created_at,
      category: 'announcements'
    }));
  } catch (error) {
    console.error("Announcements fetch error:", error);
    return [];
  }
};

export const getAnnouncementBySlug = async (slug: string, locale?: string): Promise<AnnouncementDetail | undefined> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const currentLocale = locale || localStorage.getItem('locale') || 'en';

    const response = await apiClient.get(`/projects/${projectId}/content/news`, {
      params: {
        'filter[slug][eq]': slug,
        'filter[category][eq]': 'announcements',
        with: 'image,gallery',
        locale: currentLocale
      }
    });

    const data = Array.isArray(response.data) ? response.data : response.data.data;

    // API filtrni inobatga olmasligi mumkin, shuning uchun client-side da ham filtrlaymiz
    const entry = data.find((item: any) => {
      const itemSlug = item.fields?.slug || item.slug;
      return itemSlug === slug;
    });

    if (!entry) {
      console.warn(`Announcement not found for slug: ${slug} in locale: ${currentLocale}`);
      return undefined;
    }


    return {
      id: entry.uuid || entry.id,
      slug: entry.fields?.slug || entry.slug,
      title: entry.fields?.title || entry.title,
      image_url: (Array.isArray(entry.fields?.image) ? entry.fields.image[0]?.url : (entry.fields?.image?.url || '')) || '/images/logo.png',
      excerpt: entry.fields?.content ? entry.fields.content.substring(0, 150) + '...' : '',
      published_at: entry.fields?.date || entry.published_at || entry.created_at,
      views: entry.fields?.views || 0,
      category: {
        id: 1,
        name: 'announcements'
      },
      content: entry.fields?.content || '',
      author: {
        name: entry.fields?.author || 'Matbuot xizmati'
      }
    };
  } catch (error) {
    console.error("Announcement detail fetch error:", error);
    return undefined;
  }
};