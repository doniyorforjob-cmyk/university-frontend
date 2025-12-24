import apiClient from '../client';
import { HomeSectionBlock, HomeSectionType } from '../../pages/Home/types';
import { HomeHeroData, HomeStatsData, HomeNewsData, HomeFacultiesData, HomeVideoGalleryData, HomeMediaData, HomeInteractiveServicesData, HomeUniversitySystemsData } from '../../types/home.types';
import { homeApi as mockHomeApi } from '../mock/home.mock';

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
      console.error('Error fetching hero data from API. Falling back to mock data.', error);
      // Fallback to mock data to ensure the UI doesn't break
      return mockHomeApi.getHeroData();
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
      const response = await apiClient.get('/collections/news/entries', {
        params: { with: 'image', per_page: 50 }
      });
      const allEntries = response.data.data;

      const mapEntry = (entry: any) => ({
        id: entry.id || entry.uuid,
        slug: entry.slug,
        title: entry.title || '',
        image_url: entry.image?.url || '',
        description: entry.content ? entry.content.substring(0, 150) + '...' : '',
        published_at: entry.date || entry.created_at,
        date: entry.date || entry.created_at,
      });

      return {
        news: allEntries
          .filter((e: any) => e.category === 'news' || !e.category)
          .slice(0, 12)
          .map(mapEntry),
        announcements: allEntries
          .filter((e: any) => e.category === 'announcements')
          .map((e: any) => ({ ...mapEntry(e), text: e.title })),
        events: allEntries
          .filter((e: any) => e.category === 'events')
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
      return mockHomeApi.getNewsData();
    }
  },

  getFacultiesData: async (): Promise<HomeFacultiesData> => {
    try {
      const response = await apiClient.get('/collections/faculties/entries', {
        params: { with: 'icon' }
      });
      return {
        faculties: response.data.data.map((entry: any) => ({
          id: entry.id || entry.uuid,
          name: entry.name,
          color: entry.color || 'from-sky-500 to-indigo-500',
          image: entry.icon?.url || '',
          iconImage: entry.icon?.url || '',
        }))
      };
    } catch (error) {
      console.error('Error fetching faculties data:', error);
      return mockHomeApi.getFacultiesData();
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