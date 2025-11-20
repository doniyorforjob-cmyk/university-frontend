import { useState, useEffect } from 'react';
import { HomeSectionType } from '../types';
import { homeApi } from '../../../api/homeApi';

interface SectionDataCache {
  [key: string]: {
    data: any;
    timestamp: number;
    ttl: number;
  };
}

class SectionDataCacheManager {
  private static cache: SectionDataCache = {};
  private static readonly DEFAULT_TTL = 15 * 60 * 1000; // 15 minutes

  static get(key: string): any | null {
    const cached = this.cache[key];
    if (!cached) return null;

    if (Date.now() - cached.timestamp > cached.ttl) {
      delete this.cache[key];
      return null;
    }

    return cached.data;
  }

  static set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    this.cache[key] = {
      data,
      timestamp: Date.now(),
      ttl,
    };
  }

  static clear(): void {
    this.cache = {};
  }

  static remove(key: string): void {
    delete this.cache[key];
  }
}

interface UseSectionDataOptions {
  ttl?: number;
  enabled?: boolean;
  refetchOnMount?: boolean;
}

export const useSectionData = (
  sectionType: HomeSectionType,
  sectionId?: string,
  options: UseSectionDataOptions = {}
) => {
  const {
    ttl = 15 * 60 * 1000,
    enabled = true,
    refetchOnMount = false,
  } = options;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = sectionId ? `${sectionType}-${sectionId}` : sectionType;

  // API data fetcher using homeApi
  const fetchSectionData = async (type: HomeSectionType, id?: string): Promise<any> => {
    switch (type) {
      case 'hero':
        return await homeApi.getHeroData();
      case 'stats':
        return await homeApi.getStatsData();
      case 'news':
        return await homeApi.getNewsData();
      case 'faculties':
        return await homeApi.getFacultiesData();
      case 'video-gallery':
        return await homeApi.getVideoGalleryData();
      case 'interactive-services':
        return await homeApi.getInteractiveServicesData();
      default:
        throw new Error(`Unknown section type: ${type}`);
    }
  };

  const loadData = async (force = false) => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);

      // Check cache first (unless forcing refresh)
      if (!force) {
        const cachedData = SectionDataCacheManager.get(cacheKey);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }
      }

      // Fetch fresh data
      const freshData = await fetchSectionData(sectionType, sectionId);
      setData(freshData);

      // Cache the data
      SectionDataCacheManager.set(cacheKey, freshData, ttl);

    } catch (err) {
      console.error(`Failed to load ${sectionType} data:`, err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => loadData(true);

  const clearCache = () => {
    SectionDataCacheManager.remove(cacheKey);
  };

  // Load data on mount or when dependencies change
  useEffect(() => {
    if (refetchOnMount) {
      loadData();
    } else {
      // Try to load from cache
      const cachedData = SectionDataCacheManager.get(cacheKey);
      if (cachedData) {
        setData(cachedData);
      } else {
        loadData();
      }
    }
  }, [sectionType, sectionId, enabled]);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache,
    isStale: !SectionDataCacheManager.get(cacheKey),
  };
};