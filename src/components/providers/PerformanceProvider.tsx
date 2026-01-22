import React, { useEffect } from 'react';
import { observeWebVitals } from '@/utils/performance';
import { useGlobalCache } from './CachedApiProvider';

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getCacheStats } = useGlobalCache();

  useEffect(() => {
    // Web Vitals monitoring
    observeWebVitals((metrics) => {
      const cacheStats = getCacheStats();

      // Send to analytics with cache info (silent, no console logs)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'Core Web Vitals with Cache',
          value: Math.round(metrics.lcp || 0),
          custom_map: {
            ...metrics,
            cache_hit_rate: cacheStats.hitRate,
            cache_memory_items: cacheStats.memoryItems,
            cache_storage_items: cacheStats.storageItems
          }
        });
      }
    });

    // Memory monitoring (silent, no warnings)
    const memoryInterval = setInterval(() => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        const usedMB = Math.round(memInfo.usedJSHeapSize / 1048576);
        const totalMB = Math.round(memInfo.totalJSHeapSize / 1048576);

        // Track memory but don't log warnings
        if (usedMB > totalMB * 0.8) {
          // High memory detected, but silent
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(memoryInterval);
  }, [getCacheStats]);

  return <>{children}</>;
};