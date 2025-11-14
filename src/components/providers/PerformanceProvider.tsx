import React, { useEffect } from 'react';
import { observeWebVitals, reportPerformance } from '@/utils/performance';
import { useGlobalCache } from './CachedApiProvider';

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getCacheStats } = useGlobalCache();

  useEffect(() => {
    // Web Vitals monitoring
    observeWebVitals((metrics) => {
      const cacheStats = getCacheStats();

      // Enhanced performance reporting with cache info
      console.group('🚀 Performance + Cache Metrics');
      console.log(`CLS: ${metrics.cls?.toFixed(3)}`);
      console.log(`FID: ${metrics.fid?.toFixed(0)}ms`);
      console.log(`FCP: ${metrics.fcp?.toFixed(0)}ms`);
      console.log(`LCP: ${metrics.lcp?.toFixed(0)}ms`);
      console.log(`TTFB: ${metrics.ttfb?.toFixed(0)}ms`);
      console.log(`Cache Hit Rate: ${cacheStats.hitRate}%`);
      console.log(`Memory Cache: ${cacheStats.memoryItems} items`);
      console.log(`Storage Cache: ${cacheStats.storageItems} items`);
      console.groupEnd();

      // Send to analytics with cache info
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

    // Memory monitoring
    const memoryInterval = setInterval(() => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        const usedMB = Math.round(memInfo.usedJSHeapSize / 1048576);
        const totalMB = Math.round(memInfo.totalJSHeapSize / 1048576);

        if (usedMB > totalMB * 0.8) {
          console.warn(`High memory usage: ${usedMB}MB / ${totalMB}MB`);
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(memoryInterval);
  }, [getCacheStats]);

  return <>{children}</>;
};