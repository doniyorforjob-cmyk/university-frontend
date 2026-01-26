import apiClient from '../client';
import { Announcement, AnnouncementDetail } from '../../types/announcement.types';

export const getAnnouncements = async (locale?: string): Promise<Announcement[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const currentLocale = locale || localStorage.getItem('locale') || 'uz';

    const response = await apiClient.get(`/projects/${projectId}/content/announcements`, {
      params: {
        with: 'image',
        sort: '-published_at',
        locale: currentLocale
      }
    });

    const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);

    return data.map((entry: any) => {
      const imageObj = Array.isArray(entry.fields?.image) ? entry.fields.image[0] : entry.fields?.image;
      return {
        id: entry.uuid || entry.id,
        slug: entry.fields?.slug || entry.slug,
        title: entry.fields?.title || entry.title,
        image_url: (imageObj?.url || imageObj?.thumbnail_url) || '/images/logo.png',
        description: entry.fields?.content ? entry.fields.content.substring(0, 150) + '...' : (entry.fields?.description || ''),
        published_at: entry.fields?.date || entry.published_at || entry.created_at,
        category: 'announcements',
        type: 'announcements'
      };
    });
  } catch (error) {
    console.error("Announcements fetch error:", error);
    return [];
  }
};

export const getAnnouncementBySlug = async (slug: string, locale?: string): Promise<AnnouncementDetail | undefined> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const currentLocale = locale || localStorage.getItem('locale') || 'uz';
    const isId = /^\d+$/.test(slug);

    let entry: any;

    if (isId) {
      // Fetch by ID directly
      try {
        const response = await apiClient.get(`/projects/${projectId}/content/announcements/${slug}`, {
          params: {
            with: 'image,gallery',
            locale: currentLocale
          }
        });
        entry = response.data;
      } catch (err) {
        console.warn(`Failed to fetch announcement by ID: ${slug}`, err);
        return undefined;
      }
    } else {
      // Fetch by Slug
      const response = await apiClient.get(`/projects/${projectId}/content/announcements`, {
        params: {
          'filter[slug][eq]': slug,
          with: 'image,gallery',
          locale: currentLocale
        }
      });
      const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      entry = data.find((item: any) => (item.fields?.slug || item.slug) === slug);
    }

    if (!entry) {
      console.warn(`Announcement not found for identifier: ${slug}`);
      return undefined;
    }

    const fields = entry.fields || {};
    const imageObj = Array.isArray(fields.image) ? fields.image[0] : fields.image;

    return {
      id: entry.uuid || entry.id,
      slug: fields.slug || entry.slug,
      title: fields.title || entry.title,
      image_url: (imageObj?.url || imageObj?.thumbnail_url) || '/images/logo.png',
      excerpt: fields.description || (fields.content ? fields.content.substring(0, 150) + '...' : ''),
      published_at: fields.date || entry.published_at || entry.created_at,
      views: fields.views || 0,
      category: {
        id: 1,
        name: 'announcements'
      },
      content: fields.content || '',
      author: {
        name: fields.author || 'NamDTU Matbuot xizmati'
      },
      gallery: Array.isArray(fields.gallery) ? fields.gallery.map((g: any) => g.url || g.thumbnail_url || g.path) : []
    };
  } catch (error) {
    console.error("Announcement detail fetch error:", error);
    return undefined;
  }
};