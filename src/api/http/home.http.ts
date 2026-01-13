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

// Helper to fetch data with fallback to 'uz' locale if empty (count < 1)
const fetchWithFallback = async (endpoint: string, params: any = {}, locale?: string, disableFallback: boolean = false) => {
  const projectId = process.env.REACT_APP_PROJECT_ID;
  const requestParams = { ...params };

  if (locale) {
    requestParams.locale = locale;
  }

  try {
    const response = await apiClient.get(`/projects/${projectId}/content/${endpoint}`, { params: requestParams });
    const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);

    // Strict Fallback: Only if data is COMPLETELY empty and fallback is not disabled
    if (data.length === 0 && locale && locale !== 'uz' && !disableFallback) {
      const fallbackParams = { ...params, locale: 'uz' };
      const fallbackResponse = await apiClient.get(`/projects/${projectId}/content/${endpoint}`, { params: fallbackParams });
      const fallbackData = Array.isArray(fallbackResponse.data) ? fallbackResponse.data : (fallbackResponse.data?.data || []);

      if (fallbackData.length > 0) {
        return fallbackData;
      }
    }

    return data;
  } catch (error) {
    console.warn(`Error fetching ${endpoint} (with fallback logic):`, error);
    // If original request fails, try fallback 'uz' immediately just in case (if not disabled)
    if (locale && locale !== 'uz' && !disableFallback) {
      try {
        const fallbackParams = { ...params, locale: 'uz' };
        const fallbackResponse = await apiClient.get(`/projects/${projectId}/content/${endpoint}`, { params: fallbackParams });
        return Array.isArray(fallbackResponse.data) ? fallbackResponse.data : (fallbackResponse.data?.data || []);
      } catch (fallbackError) {
        throw error; // If fallback also fails, throw original or new error
      }
    }
    throw error;
  }
};

export const homeApi = {
  getHomeSections: async (): Promise<HomeSectionBlock[]> => {
    try {
      const response = await apiClient.get('/home-sections').catch(() => ({ data: [] }));
      return response.data;
    } catch (error) {
      console.error('Error fetching home sections:', error);
      return [];
    }
  },

  getHeroData: async (locale?: string): Promise<any> => {
    try {
      const [heroData, linksData] = await Promise.all([
        fetchWithFallback('hero', { with: 'image' }, locale),
        fetchWithFallback('hero-links', { with: 'image' }, locale).catch(err => {
          console.warn('Failed to fetch hero-links, using empty array', err);
          return [];
        })
      ]);
      return { hero: heroData, links: linksData };
    } catch (error) {
      console.error('Error fetching hero data:', error);
      throw error;
    }
  },

  getStatsData: async (locale?: string): Promise<any> => {
    // Restore locale parameter and use fallback (only checks for empty)
    return fetchWithFallback('stats', {}, locale);
  },

  getNewsData: async (locale?: string): Promise<any> => {
    return fetchWithFallback('news', { with: 'image', per_page: 30 }, locale, true);
  },

  getEventsData: async (locale?: string): Promise<any> => {
    return fetchWithFallback('events', { with: 'image,gallery', per_page: 30 }, locale, true);
  },

  getAnnouncementsData: async (locale?: string): Promise<any> => {
    return fetchWithFallback('announcements', { with: 'image', per_page: 30 }, locale, true);
  },

  getCombinedNewsData: async (locale?: string): Promise<any> => {
    try {
      const [news, events, announcements, corruption] = await Promise.all([
        fetchWithFallback('news', { with: 'image', per_page: 30 }, locale, true),
        fetchWithFallback('events', { with: 'image,gallery', per_page: 30 }, locale, true),
        fetchWithFallback('announcements', { with: 'image', per_page: 30 }, locale, true),
        fetchWithFallback('corruption', { with: 'image,gallery,media', per_page: 30 }, locale, true).catch(() => [])
      ]);
      return { news, events, announcements, corruption };
    } catch (error) {
      console.error('Error fetching combined news data:', error);
      throw error;
    }
  },

  getFacultiesData: async (locale?: string): Promise<any> => {
    try {
      // Use fallback logic for both faculties and departments
      const [facultiesRes, departmentsRes] = await Promise.all([
        fetchWithFallback('faculties', { with: 'image' }, locale),
        fetchWithFallback('departments', { with: 'image' }, locale)
      ]);

      return { faculties: facultiesRes, departments: departmentsRes };
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

  getMediaData: async (locale?: string): Promise<any> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const params = { with: 'image', locale };

      // Slugs to try for photo gallery (User requested logic retained)
      const photoSlugs = ['photos-gallery', 'photo-gallery', 'photo-gallery', 'photogallery', 'photos', 'gallery', 'media-photos', 'fotogallery', 'fotogalereya'];

      // Fetch collections
      const results = await Promise.all([
        ...photoSlugs.map(slug =>
          apiClient.get(`/projects/${projectId}/content/${slug}`, { params })
            .then(res => {
              return { slug, data: res.data };
            })
            .catch(err => {
              return { slug, data: null };
            })
        ),
        apiClient.get(`/projects/${projectId}/content/video-gallery`, { params })
          .then(res => ({ slug: 'video-gallery', data: res.data }))
          .catch(() => ({ slug: 'video-gallery', data: null }))
      ]);

      let photosData: any[] = [];

      // Find first successful photo gallery response with data
      for (let i = 0; i < photoSlugs.length; i++) {
        const res = results[i];
        if (res.data) {
          const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
          if (data.length > 0) {
            photosData = data;
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
    return fetchWithFallback('interactive-services', {}, locale);
  },

  getUniversitySystemsData: async (locale?: string): Promise<any> => {
    try {
      const systemsData = await fetchWithFallback('university-systems', {}, locale);
      // Quick links are now part of university-systems collection (category: 'quick links')
      const quickLinksResponse = { data: [] };
      return { systems: systemsData, quickLinks: [] };
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