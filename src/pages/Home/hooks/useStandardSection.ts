import { useCachedApi } from '../../../hooks/useCachedApi';
import { HomeSectionType } from '../types';
import { SECTION_CACHE_CONFIG } from '../../../config/constants';


interface UseStandardSectionOptions {
  ttlMinutes?: number; // Override default TTL
  enabled?: boolean;
  transformData?: (rawData: any) => any;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
}

export const useStandardSection = <T = any>(
  sectionType: HomeSectionType,
  fetcher: () => Promise<T>,
  options: UseStandardSectionOptions = {}
) => {
  const {
    ttlMinutes = SECTION_CACHE_CONFIG[sectionType]?.ttlMinutes ?? 0.5, // Default from config
    enabled = true,
    transformData,
    refetchOnWindowFocus = false,
    refetchInterval
  } = options;

  return useCachedApi({
    key: `home-section-${sectionType}-http`,
    fetcher: async () => {
      const rawData = await fetcher();
      return transformData ? transformData(rawData) : rawData;
    },
    ttlMinutes,
    enabled,
    refetchOnWindowFocus,
    refetchInterval,
    onError: (error) => {
      console.error(`${sectionType} section xatolik:`, error);
      // Future: Send to error monitoring service
    },
    onSuccess: (data) => {
      console.log(`${sectionType} section ma'lumotlari yuklandi`);
      // Future: Send analytics event
    }
  });
};