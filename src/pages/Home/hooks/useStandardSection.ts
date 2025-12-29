import { useCachedApi } from '../../../hooks/useCachedApi';
import { HomeSectionType } from '../types';
import { CACHE_CONFIG } from '../../../config/constants';
import { useLocale } from '../../../contexts/LocaleContext';


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
  const { locale } = useLocale();
  const {
    ttlMinutes = CACHE_CONFIG.SECTIONS[sectionType as keyof typeof CACHE_CONFIG.SECTIONS]?.ttlMinutes ?? CACHE_CONFIG.TTL.SHORT, // Default from config or SHORT
    enabled = true,
    transformData,
    refetchOnWindowFocus = false,
    refetchInterval
  } = options;

  return useCachedApi({
    key: `home-section-${sectionType}-http-${locale}`,
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