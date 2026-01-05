import apiClient from '../client';
import { HomeSectionBlock, HomeSectionType } from '../../pages/Home/types';
import {
  HomeHeroData,
  HomeStatsData,
  HomeNewsData,
  HomeFacultiesData,
  HomeVideoGalleryData,
  HomeMediaData,
  HomeInteractiveServicesData,
  HomeUniversitySystemsData
} from '../../types/home.types';
import { getImageUrl } from '../../utils/apiUtils';
import { transformStatsData } from '../../pages/Home/transformers/statsTransformer';
import { transformNewsData } from '../../pages/Home/transformers/newsTransformer';
import { transformInteractiveServicesData } from '../../pages/Home/transformers/interactiveServicesTransformer';
import { TransformedUniversitySystemsData, transformUniversitySystemsData } from '../../pages/Home/transformers/universitySystemsTransformer';

import { transformVideoGalleryData } from '../../pages/Home/transformers/videoGalleryTransformer';

import { transformFacultiesData } from '../../pages/Home/transformers/facultiesTransformer';

export const homeApi = {
  getHomeSections: async (): Promise<HomeSectionBlock[]> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const response = await apiClient.get('/home-sections').catch(() => ({ data: [] }));
      return response.data;
    } catch (error) {
      console.error('Error fetching home sections:', error);
      return [];
    }
  },

  getHeroData: async (locale?: string): Promise<HomeHeroData> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const params: any = { with: 'image' };
      if (locale) {
        params.locale = locale;
      }
      const response = await apiClient.get(`/projects/${projectId}/content/hero`, {
        params
      });
      const data = Array.isArray(response.data) ? response.data : response.data.data;
      return data;
    } catch (error) {
      console.error('Error fetching hero data from Elmapi:', error);
      throw error;
    }
  },

  getStatsData: async (): Promise<HomeStatsData> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const response = await apiClient.get(`/projects/${projectId}/content/stats`);
      const data = transformStatsData(response.data);
      return data;
    } catch (error) {
      console.error('Error fetching stats data:', error);
      throw error;
    }
  },

  getNewsData: async (locale?: string): Promise<HomeNewsData> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const params: any = { with: 'image', per_page: 30 };
      if (locale) {
        params.locale = locale;
      }

      const response = await apiClient.get(`/projects/${projectId}/content/news`, { params });
      return transformNewsData(response.data);
    } catch (error) {
      console.error('Error fetching news data:', error);
      throw error;
    }
  },

  getFacultiesData: async (locale?: string): Promise<HomeFacultiesData> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const params: any = { with: 'image' };
      if (locale) params.locale = locale;

      const [facultiesRes, departmentsRes] = await Promise.all([
        apiClient.get(`/projects/${projectId}/content/faculties`, { params }),
        apiClient.get(`/projects/${projectId}/content/departments`, { params: { ...params, with: 'image' } }).catch(() => ({ data: [] }))
      ]);

      const facultiesRaw = Array.isArray(facultiesRes.data) ? facultiesRes.data : facultiesRes.data.data;
      const departmentsRaw = Array.isArray(departmentsRes.data) ? departmentsRes.data : departmentsRes.data.data;

      return transformFacultiesData(facultiesRaw, departmentsRaw);
    } catch (error) {
      console.error('Error fetching faculties data:', error);
      throw error;
    }
  },

  getVideoGalleryData: async (): Promise<HomeVideoGalleryData> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const response = await apiClient.get(`/projects/${projectId}/content/video-gallery`);
      return transformVideoGalleryData(response.data);
    } catch (error) {
      console.error('Error fetching video gallery data:', error);
      throw error;
    }
  },

  getMediaData: async (): Promise<HomeMediaData> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const response = await apiClient.get(`/projects/${projectId}/content/media`);
      return transformVideoGalleryData(response.data);
    } catch (error) {
      console.error('Error fetching media data:', error);
      throw error;
    }
  },

  getInteractiveServicesData: async (locale?: string): Promise<HomeInteractiveServicesData> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const params: any = {};
      if (locale) {
        params.locale = locale;
      }
      const response = await apiClient.get(`/projects/${projectId}/content/interactive-services`, { params });
      return transformInteractiveServicesData(response.data);
    } catch (error) {
      console.error('Error fetching interactive services data:', error);
      throw error;
    }
  },

  getUniversitySystemsData: async (locale?: string): Promise<TransformedUniversitySystemsData> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const params: any = {};

      if (locale) {
        params.locale = locale;
      }

      const [systemsResponse, quickLinksResponse] = await Promise.all([
        apiClient.get(`/projects/${projectId}/content/university-systems`, { params }),
        apiClient.get(`/projects/${projectId}/content/quick-links`, { params }).catch(() => ({ data: [] })) // Handle missing collection gracefully
      ]);

      return transformUniversitySystemsData(systemsResponse.data, quickLinksResponse.data);
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