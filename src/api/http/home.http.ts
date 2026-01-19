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
import { createSlug } from '../../utils/format';
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
    // console.log(`[DEBUG] fetchWithFallback: ${endpoint} locale=${locale}`);
    const response = await apiClient.get(`/projects/${projectId}/content/${endpoint}`, { params: requestParams });
    const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);

    // console.log(`[DEBUG] ${endpoint} response length: ${data.length}`);

    // Strict Fallback: Only if data is COMPLETELY empty and fallback is not disabled
    if (data.length === 0 && locale && locale !== 'uz' && !disableFallback) {
      console.warn(`[DEBUG] Empty data for ${locale}, trying fallback to 'uz'`);
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
        fetchWithFallback('hero', { with: 'image,video,media' }, locale, true),
        fetchWithFallback('hero-links', { with: 'image' }, locale, true).catch(err => {
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
    // Restore locale parameter and use fallback (only checks for empty) - Strict for locale
    return fetchWithFallback('stats', {}, locale, true);
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
      // Use fallback logic for both faculties and departments - STRICT for locale
      const [facultiesRes, departmentsRes] = await Promise.all([
        fetchWithFallback('faculties', { with: 'image' }, locale, true),
        fetchWithFallback('academic-departments', { with: 'image' }, locale, true)
      ]);

      return { faculties: facultiesRes, departments: departmentsRes };
    } catch (error) {
      console.error('Error fetching faculties data:', error);
      throw error;
    }
  },

  getMediaData: async (locale?: string): Promise<any> => {
    try {
      const photoSlugs = ['photos', 'photo-gallery', 'photos-gallery', 'photogallery', 'gallery', 'media-photos', 'fotogallery', 'fotogalereya'];

      // Try to fetch from all slugs in parallel, strict locale
      const results = await Promise.all([
        ...photoSlugs.map(slug =>
          fetchWithFallback(slug, { with: 'image,gallery', per_page: 100 }, locale, true)
            .catch(() => []) // Don't throw if one slug fails
        ),
        fetchWithFallback('video-gallery', { with: 'video', per_page: 50 }, locale, true)
          .catch(() => [])
      ]);

      let photosData: any[] = [];
      // Use the first slug that returns non-empty data
      for (let i = 0; i < photoSlugs.length; i++) {
        if (results[i] && results[i].length > 0) {
          photosData = results[i];
          break;
        }
      }

      const videosData = results[results.length - 1] || [];

      return {
        photos: photosData,
        videos: videosData
      };
    } catch (error) {
      console.error('Error fetching media data:', error);
      throw error;
    }
  },

  getPhotoDetailById: async (id: string, locale?: string): Promise<any> => {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      const params = { with: 'image,gallery', locale };

      const photoSlugs = ['photos', 'photo-gallery', 'photos-gallery', 'photogallery', 'gallery', 'media-photos', 'fotogallery', 'fotogalereya'];

      // Try to find the item in any of these collections
      // Strategy 1: Try direct fetch /content/{slug}/{id}
      // Strategy 2: If 404, fetch collection /content/{slug} and find by ID (Backend limitation workaround)

      // Parallel execution to speed up finding the item
      const promises = photoSlugs.map(async (slug) => {
        try {
          // 1. Try Direct Fetch
          const url = `/projects/${projectId}/content/${slug}/${id}`;
          try {
            const response = await apiClient.get(url, { params });
            if (response.data) {
              return { ...response.data, category_slug: slug };
            }
          } catch (directErr: any) {
            // 2. Fallback: List Fetch if Direct 404s
            if (directErr.status === 404 || directErr.response?.status === 404) {
              // Pass true to disableFallback for strict language search as requested
              const listData = await fetchWithFallback(slug, { ...params, per_page: 100 }, locale, true);

              const foundItem = listData.find((item: any) => {
                const itemUuid = String(item.uuid || item.id || '').toLowerCase();
                const itemTitleSlug = createSlug(item.fields?.title || item.title || '').toLowerCase();
                const itemExplicitSlug = String(item.slug || '').toLowerCase();
                const searchId = String(id).toLowerCase();

                return itemUuid === searchId || itemTitleSlug === searchId || itemExplicitSlug === searchId;
              });

              if (foundItem) {
                return { ...foundItem, category_slug: slug };
              }
            }
          }
        } catch (e) {
          return null;
        }
        return null;
      });

      const results = await Promise.all(promises);
      const found = results.find(res => res !== null);

      if (found) return found;
      return null;
    } catch (error) {
      console.error('Error fetching photo detail:', error);
      throw error;
    }
  },

  getInteractiveServicesData: async (locale?: string): Promise<any> => {
    return fetchWithFallback('interactive-services', {}, locale, true);
  },

  getVideoGalleryData: async (locale?: string): Promise<HomeMediaData> => {
    try {
      const data = await fetchWithFallback('video-gallery', { with: 'image,video', per_page: 100 }, locale, true);
      return transformVideoGalleryData({ photos: [], videos: data });
    } catch (error) {
      console.error('Error fetching video gallery data:', error);
      throw error;
    }
  },

  getPhotoGalleryData: async (locale?: string): Promise<HomeMediaData> => {
    try {
      const data = await fetchWithFallback('photo-gallery', { with: 'image,gallery', per_page: 100 }, locale, true);
      return transformVideoGalleryData({ photos: data, videos: [] });
    } catch (error) {
      console.error('Error fetching photo gallery data:', error);
      throw error;
    }
  },

  getUniversitySystemsData: async (locale?: string): Promise<any> => {
    try {
      const systemsData = await fetchWithFallback('university-systems', { per_page: 50 }, locale, true);
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