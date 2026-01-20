import { useMemo, useCallback } from 'react';
import { useCachedApi } from '../../../hooks/useCachedApi';
import { HomeSectionType } from '../types';
import { CACHE_CONFIG } from '../../../config/constants';
import { useLocale } from '../../../contexts/LocaleContext';


interface UseStandardSectionOptions {
  ttlMinutes?: number; // Override default TTL
  enabled?: boolean;
  transformData?: (rawData: any) => any;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
  revalidateThresholdMinutes?: number;
  keepPreviousData?: boolean;
}

export const useStandardSection = <T = any>(
  sectionType: HomeSectionType,
  fetcher: (locale?: string) => Promise<T>,
  options: UseStandardSectionOptions = {}
) => {
  const { locale = 'uz' } = useLocale();
  const {
    ttlMinutes = CACHE_CONFIG.SECTIONS[sectionType as keyof typeof CACHE_CONFIG.SECTIONS]?.ttlMinutes ?? CACHE_CONFIG.TTL.SHORT, // Default from config or SHORT
    enabled = true,
    transformData,
    onSuccess: userOnSuccess,
    onError: userOnError,
    refetchOnWindowFocus = false,
    refetchInterval,
    revalidateThresholdMinutes
  } = options;

  // Stabilize callbacks to prevent infinite re-render loops in useCachedApi
  const handleSuccess = useCallback((data: any) => {
    userOnSuccess?.(data);
  }, [userOnSuccess]);

  const handleError = useCallback((error: Error) => {
    console.error(`${sectionType} section xatolik:`, error);
    userOnError?.(error);
  }, [userOnError, sectionType]);

  // Stabilize the fetcher to prevent infinite reload loops
  const stabilizedFetcher = useMemo(() => async () => {
    const rawData = await fetcher(locale);
    return transformData ? transformData(rawData) : rawData;
  }, [fetcher, transformData, locale]);

  return useCachedApi({
    key: `home-section-${sectionType}-http-${locale}_v6`, // Versioned key to force fresh fetch
    fetcher: stabilizedFetcher,
    ttlMinutes,
    enabled,
    refetchOnWindowFocus,
    refetchInterval,
    revalidateThresholdMinutes,
    keepPreviousData: options.keepPreviousData,
    onSuccess: handleSuccess,
    onError: handleError
  });
};