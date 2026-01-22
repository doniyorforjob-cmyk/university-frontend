
import { useState, useEffect, useCallback } from 'react';
import { useGlobalCache } from '@/components/providers/CachedApiProvider';
import { useLocale } from '@/contexts/LocaleContext';

interface UseCachedApiOptions {
  key: string;
  fetcher: (locale?: string) => Promise<any>;
  ttlMinutes?: number;
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
  keepPreviousData?: boolean;
  revalidateThresholdMinutes?: number; // Background revalidation threshold
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
  keepPreviousData = false,
  revalidateThresholdMinutes = 0.166 // Default: revalidate if older than 10 seconds
}: UseCachedApiOptions) => {

  const { cacheManager, config } = useGlobalCache();
  const { locale } = useLocale();

  // Create a unique composite key that includes the locale
  const localeKey = `${key}_${locale}`;

  // SWR: Initial data from cache
  const [data, setData] = useState<T | null>(() => cacheManager.getStale(localeKey));
  // Loading is true only if we have NO data at all for this locale
  const [loading, setLoading] = useState(() => enabled && !cacheManager.getStale(localeKey));
  const [error, setError] = useState<Error | null>(null);

  // Synchronize state with localeKey changes during render to avoid stale data flicker
  const [prevLocaleKey, setPrevLocaleKey] = useState(localeKey);

  if (localeKey !== prevLocaleKey) {
    setPrevLocaleKey(localeKey);
    const cachedData = cacheManager.get(localeKey);
    const staleData = cacheManager.getStale(localeKey);

    if (cachedData) {
      setData(cachedData);
      setLoading(false);
    } else if (staleData) {
      setData(staleData);
      setLoading(false);
    } else {
      // IF keepPreviousData is false, CLEAR data to avoid showing wrong locale
      if (!keepPreviousData) {
        setData(null);
      }

      // If we have no data for this NEW locale, we must show loading
      if (enabled) {
        setLoading(true);
      }
    }
  }

  const ttl = ttlMinutes || config.defaultTtl;

  const fetchData = useCallback(async (force = false) => {
    try {
      // Check cache validity
      const item = cacheManager.getItem(localeKey);
      const isExpired = !item || item.expiresAt <= Date.now();
      const isStale = item && (!item.timestamp || (Date.now() - item.timestamp > revalidateThresholdMinutes * 60 * 1000));

      // SWR Logic: If we have fresh enough data, just return
      if (!force && item && !isExpired && !isStale) {
        setData(item.data);
        setLoading(false);
        onSuccess?.(item.data);
        return;
      }

      // We only show loading if we really have no data to show (respecting keepPreviousData)
      // data corresponds to the state of the component, which might be stale from previous locale
      // if keepPreviousData is true. If it's false, data was set to null in the render block above.
      if (!item && !data) {
        setLoading(true);
      }

      setError(null);

      // Fetch fresh data (with deduplication)
      let requestPromise = inflightRequests.get(localeKey);

      if (!requestPromise) {
        requestPromise = fetcher(locale);
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
  }, [localeKey, fetcher, ttl, revalidateThresholdMinutes, onSuccess, onError, cacheManager, locale, data]);

  // Initial load and key change handling
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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