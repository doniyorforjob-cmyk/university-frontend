import apiClient from '../client';
import { HomeSectionBlock, HomeSectionType } from '../../pages/Home/types';
import { HomeHeroData, HomeStatsData, HomeNewsData, HomeFacultiesData, HomeVideoGalleryData, HomeMediaData, HomeInteractiveServicesData, HomeUniversitySystemsData } from '../../types/home.types';


export const homeApi = {
  getHomeSections: async (): Promise<HomeSectionBlock[]> => {
    try {
      const response = await apiClient.get('/home-sections');
      return response.data;
    } catch (error) {
      console.error('Error fetching home sections:', error);
      throw error;
    }
  },

  getHeroData: async (): Promise<HomeHeroData> => {
    try {
      const response = await apiClient.get('/hero');
      console.log('Successfully fetched hero data from API:', response.data);
      // The transformer is robust enough to handle different shapes.
      return response.data;
    } catch (error) {
      console.error('Error fetching hero data from API:', error);
      throw error;
    }
  },

  getStatsData: async (): Promise<HomeStatsData> => {
    try {
      const response = await apiClient.get('/stats');
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      return data;
    } catch (error) {
      console.error('Error fetching stats data:', error);
      throw error;
    }
  },

  getNewsData: async (): Promise<HomeNewsData> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const currentLocale = localStorage.getItem('locale') || 'en';

      let allEntries;
      if (currentLocale !== 'en') {
        try {
          const [resLocalized, resEnglish] = await Promise.all([
            apiClient.get(`/projects/${projectId}/content/news`, {
              params: { with: 'image', per_page: 12 }
            }),
            apiClient.get(`/projects/${projectId}/content/news`, {
              params: { with: 'image', per_page: 12, locale: 'en' }
            })
          ]);

          const dataLocalized = Array.isArray(resLocalized.data) ? resLocalized.data : resLocalized.data.data;
          const dataEnglish = Array.isArray(resEnglish.data) ? resEnglish.data : resEnglish.data.data;

          allEntries = (dataLocalized && dataLocalized.length > 0) ? dataLocalized : dataEnglish;
        } catch (e) {
          const response = await apiClient.get(`/projects/${projectId}/content/news`, {
            params: { with: 'image', per_page: 12 }
          });
          allEntries = Array.isArray(response.data) ? response.data : response.data.data;
        }
      } else {
        const response = await apiClient.get(`/projects/${projectId}/content/news`, {
          params: { with: 'image', per_page: 12 }
        });
        allEntries = Array.isArray(response.data) ? response.data : response.data.data;
      }

      const mapEntry = (entry: any) => ({
        id: entry.uuid || entry.id,
        slug: entry.fields?.slug || entry.slug,
        title: entry.fields?.title || entry.title || '',
        image_url: (Array.isArray(entry.fields?.image) ? entry.fields.image[0]?.url : (entry.fields?.image?.url || '')) || '/images/logo.png',
        description: entry.fields?.content ? entry.fields.content.substring(0, 150) + '...' : '',
        published_at: entry.fields?.date || entry.published_at || entry.created_at,
        date: entry.fields?.date || entry.published_at || entry.created_at,
      });

      return {
        news: allEntries
          .filter((e: any) => e.category === 'news' || !e.category)
          .slice(0, 12)
          .map(mapEntry),
        announcements: allEntries
          .filter((e: any) => (e.fields?.category || e.category) === 'announcements')
          .map((e: any) => ({ ...mapEntry(e), text: e.title })),
        events: allEntries
          .filter((e: any) => (e.fields?.category || e.category) === 'events')
          .map(mapEntry),
        corruption: allEntries
          .filter((e: any) => e.category === 'corruption')
          .map(mapEntry),
        sport: allEntries
          .filter((e: any) => e.category === 'sport')
          .map(mapEntry),
      };
    } catch (error) {
      console.error('Error fetching news data:', error);
      throw error;
    }
  },

  getFacultiesData: async (): Promise<HomeFacultiesData> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const response = await apiClient.get(`/projects/${projectId}/content/faculties`, {
        params: { with: 'icon' }
      });
      const data = Array.isArray(response.data) ? response.data : response.data.data;
      return {
        faculties: data.map((entry: any) => ({
          id: entry.uuid || entry.id,
          name: entry.fields?.name || entry.name,
          color: entry.fields?.color || 'from-sky-500 to-indigo-500',
          image: (Array.isArray(entry.fields?.icon) ? entry.fields.icon[0]?.url : (entry.fields?.icon?.url || '')) || '/images/logo.png',
          iconImage: (Array.isArray(entry.fields?.icon) ? entry.fields.icon[0]?.url : (entry.fields?.icon?.url || '')) || '/images/logo.png',
        }))
      };
    } catch (error) {
      console.error('Error fetching faculties data:', error);
      throw error;
    }
  },

  getVideoGalleryData: async (): Promise<HomeVideoGalleryData> => {
    try {
      const response = await apiClient.get('/video-gallery');
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      return data;
    } catch (error) {
      console.error('Error fetching video gallery data:', error);
      throw error;
    }
  },

  getMediaData: async (): Promise<HomeMediaData> => {
    try {
      const response = await apiClient.get('/media');
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      return data;
    } catch (error) {
      console.error('Error fetching media data:', error);
      throw error;
    }
  },

  getInteractiveServicesData: async (): Promise<HomeInteractiveServicesData> => {
    try {
      const response = await apiClient.get('/interactive-services');
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      return data;
    } catch (error) {
      console.error('Error fetching interactive services data:', error);
      throw error;
    }
  },

  getUniversitySystemsData: async (): Promise<HomeUniversitySystemsData> => {
    try {
      const response = await apiClient.get('/university-systems');
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      return data;
    } catch (error) {
      console.error('Error fetching university systems data:', error);
      throw error;
    }
  },

  updateSectionData: async (sectionType: HomeSectionType, data: any): Promise<void> => {
    try {
      await apiClient.put(`/${sectionType}`, data);
    } catch (error) {
      console.error(`Error updating ${sectionType} data:`, error);
      throw error;
    }
  }
};