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
import { transformStatsData } from '../../pages/Home/transformers/universityStatsTransformer';
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

  getHeroData: async (locale?: string): Promise<any> => {
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

  getStatsData: async (): Promise<any> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const response = await apiClient.get(`/projects/${projectId}/content/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stats data:', error);
      throw error;
    }
  },

  getNewsData: async (locale?: string): Promise<any> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const params: any = { with: 'image', per_page: 30 };
      if (locale) {
        params.locale = locale;
      }

      const response = await apiClient.get(`/projects/${projectId}/content/news`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching news data:', error);
      throw error;
    }
  },

  getFacultiesData: async (locale?: string): Promise<any> => {
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

      return { faculties: facultiesRaw, departments: departmentsRaw };
    } catch (error) {
      console.error('Error fetching faculties data:', error);
      throw error;
    }
  },

  getVideoGalleryData: async (): Promise<any> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const response = await apiClient.get(`/projects/${projectId}/content/video-gallery`);
      return response.data;
    } catch (error) {
      console.error('Error fetching video gallery data:', error);
      throw error;
    }
  },

  getMediaData: async (): Promise<any> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;

      // Slugs to try for photo gallery
      const photoSlugs = ['photos-gallery', 'photo-gallery', 'photo-gallery', 'photogallery', 'photos', 'gallery', 'media-photos', 'fotogallery', 'fotogalereya'];


      // Fetch collections
      const results = await Promise.all([
        ...photoSlugs.map(slug =>
          apiClient.get(`/projects/${projectId}/content/${slug}`, { params: { with: 'image' } })
            .then(res => {
              return { slug, data: res.data };
            })
            .catch(err => {
              return { slug, data: null };
            })
        ),
        apiClient.get(`/projects/${projectId}/content/video-gallery`, { params: { with: 'image' } })
          .then(res => ({ slug: 'video-gallery', data: res.data }))
          .catch(() => ({ slug: 'video-gallery', data: null }))
      ]);

      let photosData: any[] = [];
      let activePhotoSlug = '';

      // Find first successful photo gallery response with data
      for (let i = 0; i < photoSlugs.length; i++) {
        const res = results[i];
        if (res.data) {
          const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
          if (data.length > 0) {
            photosData = data;
            activePhotoSlug = res.slug;
            break;
          }
        }
      }

      const videoRes = results[results.length - 1];
      const videosData = videoRes.data ? (Array.isArray(videoRes.data) ? videoRes.data : (videoRes.data.data || [])) : [];

      return {
        photos: photosData,
        videos: videosData
      };
    } catch (error) {
      console.error('Error fetching media data:', error);
      throw error;
    }
  },

  getInteractiveServicesData: async (locale?: string): Promise<any> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const params: any = {};
      if (locale) {
        params.locale = locale;
      }
      const response = await apiClient.get(`/projects/${projectId}/content/interactive-services`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching interactive services data:', error);
      throw error;
    }
  },

  getUniversitySystemsData: async (locale?: string): Promise<any> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const params: any = {};

      if (locale) {
        params.locale = locale;
      }

      const systemsResponse = await apiClient.get(`/projects/${projectId}/content/university-systems`, { params });

      // Quick links are now part of university-systems collection (category: 'quick links')
      // No need to call a separate endpoint that returns 404.
      const quickLinksResponse = { data: [] };

      return { systems: systemsResponse.data, quickLinks: quickLinksResponse.data };
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