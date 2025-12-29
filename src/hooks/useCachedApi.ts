
import { useState, useEffect, useCallback } from 'react';
import { useGlobalCache } from '@/components/providers/CachedApiProvider';
import { useLocale } from '@/contexts/LocaleContext';

interface UseCachedApiOptions {
  key: string;
  fetcher: () => Promise<any>;
  ttlMinutes?: number;
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
  keepPreviousData?: boolean;
}

const inflightRequests = new Map<string, Promise<any>>();

export const useCachedApi = <T = any>({
  key,
  fetcher,
  ttlMinutes,
  enabled = true,
  onSuccess,
  onError,
  refetchOnWindowFocus = false,
  refetchInterval,
  keepPreviousData = false
}: UseCachedApiOptions) => {

  const { cacheManager, config } = useGlobalCache();
  const { locale } = useLocale();

  // Create a unique composite key that includes the locale
  const localeKey = key.includes(locale) ? key : `${key}_${locale}`;

  const [data, setData] = useState<T | null>(() => cacheManager.get(localeKey));
  const [loading, setLoading] = useState(() => enabled && !cacheManager.has(localeKey));
  const [error, setError] = useState<Error | null>(null);

  const ttl = ttlMinutes || config.defaultTtl;

  const fetchData = useCallback(async (force = false) => {
    try {
      // Check cache first (unless forcing refresh)
      if (!force) {
        const cachedData = cacheManager.get(localeKey);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          onSuccess?.(cachedData);
          return;
        }
      }

      setLoading(true);
      setError(null);

      // Fetch fresh data (with deduplication)
      let requestPromise = inflightRequests.get(localeKey);

      if (!requestPromise) {
        requestPromise = fetcher();
        inflightRequests.set(localeKey, requestPromise);

        try {
          const freshData = await requestPromise;
          setData(freshData);
          cacheManager.set(localeKey, freshData, ttl);
          onSuccess?.(freshData);
        } finally {
          inflightRequests.delete(localeKey);
        }
      } else {
        // Reuse existing request
        const freshData = await requestPromise;
        setData(freshData);
        onSuccess?.(freshData);
      }

    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [localeKey, fetcher, ttl, enabled, cacheManager, onSuccess, onError]);

  // Initial load and key change handling
  useEffect(() => {
    const cachedData = cacheManager.get(localeKey);
    if (cachedData) {
      setData(cachedData);
      setLoading(false);
    } else {
      if (!keepPreviousData) {
        setData(null);
      }
      if (enabled) setLoading(true);
    }
    fetchData();
  }, [fetchData, localeKey, cacheManager, enabled, keepPreviousData]);

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      fetchData(true); // Force refresh
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchData, refetchOnWindowFocus]);

  // Refetch interval
  useEffect(() => {
    if (!refetchInterval) return;

    const interval = setInterval(() => {
      fetchData(true); // Force refresh
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [fetchData, refetchInterval]);

  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  const clearCache = useCallback(() => {
    cacheManager.delete(key);
  }, [cacheManager, key]);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache,
    isCached: cacheManager.has(key)
  };
};