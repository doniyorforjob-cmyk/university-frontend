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
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      return data;
    } catch (error) {
      console.error('Error fetching hero data:', error);
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
      const response = await apiClient.get('/news');
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      return data;
    } catch (error) {
      console.error('Error fetching news data:', error);
      throw error;
    }
  },

  getFacultiesData: async (): Promise<HomeFacultiesData> => {
    try {
      const response = await apiClient.get('/faculties');
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      return data;
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