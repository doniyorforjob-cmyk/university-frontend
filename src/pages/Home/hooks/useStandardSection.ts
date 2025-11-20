import { useCachedApi } from '../../../hooks/useCachedApi';
import { HomeSectionType } from '../types';

interface UseStandardSectionOptions {
  ttlMinutes?: number;
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
    ttlMinutes = 15,
    enabled = true,
    transformData,
    refetchOnWindowFocus = false,
    refetchInterval
  } = options;

  return useCachedApi({
    key: `home-section-${sectionType}`,
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