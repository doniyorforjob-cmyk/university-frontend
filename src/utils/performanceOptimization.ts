/**
 * Performance Optimization Utilities
 * Barcha optimizatsiya funksiyalarini markazlashtirish
 */

import React from 'react';
import { observeWebVitals, reportPerformance } from './performance';
import { setupResourceHints, registerServiceWorker } from './preload';
import { prefetchRoute } from '../config/routesConfig';

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  React.useEffect(() => {
    // Web Vitals monitoring
    observeWebVitals(reportPerformance);

    // Resource hints setup
    setupResourceHints();

    // Service Worker registration
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker();
    }
  }, []);
};

// Route prefetching hook
export const useRoutePrefetching = (routes: string[]) => {
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // User is active, prefetch likely routes
        routes.forEach(route => {
          setTimeout(() => prefetchRoute(route), 100);
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [routes]);
};

// Bundle splitting utilities
export const createAsyncComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) => {
  return React.lazy(importFn);
};

// Dynamic import with error boundary
export const loadComponentDynamically = async <T,>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
): Promise<T> => {
  try {
    const module = await importFn();
    return module.default;
  } catch (error) {
    console.error('Dynamic import failed:', error);
    if (fallback) {
      return fallback as T;
    }
    throw error;
  }
};

// Memory optimization
export const useMemoryOptimization = () => {
  const cleanupFunctionsRef = React.useRef<(() => void)[]>([]);

  React.useEffect(() => {
    return () => {
      // Cleanup all subscriptions and timers
      cleanupFunctionsRef.current.forEach(cleanup => cleanup());
      cleanupFunctionsRef.current = [];
    };
  }, []);

  const addCleanup = React.useCallback((cleanup: () => void) => {
    cleanupFunctionsRef.current.push(cleanup);
  }, []);

  return { addCleanup };
};

// Image optimization hook
export const useOptimizedImage = (src: string, options?: {
  lazy?: boolean;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}) => {
  const [optimizedSrc, setOptimizedSrc] = React.useState(src);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const optimizeImage = async () => {
      setIsLoading(true);
      try {
        // Apply optimizations
        let finalSrc = src;

        // Add quality parameter
        if (options?.quality) {
          finalSrc += `?q=${options.quality}`;
        }

        // Add format parameter
        if (options?.format) {
          finalSrc += `${options?.quality ? '&' : '?'}fmt=${options.format}`;
        }

        setOptimizedSrc(finalSrc);
      } catch (error) {
        console.error('Image optimization failed:', error);
        setOptimizedSrc(src);
      } finally {
        setIsLoading(false);
      }
    };

    optimizeImage();
  }, [src, options]);

  return { optimizedSrc, isLoading };
};

// Debounced search hook
export const useDebouncedSearch = (delay: number = 300) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [debouncedTerm, setDebouncedTerm] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return { searchTerm, setSearchTerm, debouncedTerm };
};

// Virtual scrolling hook
export const useVirtualScrolling = (itemHeight: number, containerHeight: number) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 0 });

  React.useEffect(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + 1,
      Math.floor(containerHeight / itemHeight)
    );

    setVisibleRange({ start, end });
  }, [scrollTop, itemHeight, containerHeight]);

  return { visibleRange, setScrollTop };
};

// Bundle size monitoring
export const useBundleSizeMonitoring = () => {
  React.useEffect(() => {
    // Monitor bundle size in development
    if (process.env.NODE_ENV === 'development') {
      const checkBundleSize = () => {
        // This would be injected by webpack
        const bundleSize = (window as any).__bundle_size__;
        if (bundleSize > 1024 * 1024) { // 1MB
          console.warn(`Bundle size is large: ${(bundleSize / 1024 / 1024).toFixed(2)}MB`);
        }
      };

      checkBundleSize();
    }
  }, []);
};

// Performance budget checker
export const usePerformanceBudget = (budget: {
  js?: number;
  css?: number;
  images?: number;
  fonts?: number;
}) => {
  React.useEffect(() => {
    const checkBudget = () => {
      // Check JavaScript bundle size
      if (budget.js && (window as any).performance?.getEntriesByType) {
        const resources = performance.getEntriesByType('resource');
        const jsResources = resources.filter(r => r.name.includes('.js'));

        const totalJSSize = jsResources.reduce((total, resource) => {
          return total + (resource as any).transferSize || 0;
        }, 0);

        if (totalJSSize > budget.js) {
          console.warn(`JavaScript budget exceeded: ${totalJSSize} > ${budget.js}`);
        }
      }
    };

    // Check after page load
    window.addEventListener('load', checkBudget);
    return () => window.removeEventListener('load', checkBudget);
  }, [budget]);
};

// Critical resource preloader
export const useCriticalResourcePreloader = (resources: {
  images?: string[];
  fonts?: string[];
  scripts?: string[];
}) => {
  React.useEffect(() => {
    const preloadCritical = () => {
      // Preload critical images
      resources.images?.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });

      // Preload fonts
      resources.fonts?.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.href = href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // Preload scripts
      resources.scripts?.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    preloadCritical();
  }, [resources]);
};