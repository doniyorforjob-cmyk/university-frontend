/**
 * Resource Preloading Utilities
 * Kritik resurslarni oldindan yuklash
 */

// Font preloading
export const preloadFonts = () => {
  const fonts = [
    '/fonts/inter-regular.woff2',
    '/fonts/inter-medium.woff2',
    '/fonts/inter-bold.woff2',
    '/fonts/montserrat-regular.woff2',
    '/fonts/montserrat-bold.woff2',
  ];

  fonts.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Critical CSS preloading
export const preloadCriticalCSS = () => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = '/css/critical.css';
  link.as = 'style';
  link.onload = () => {
    link.rel = 'stylesheet';
  };
  document.head.appendChild(link);
};

// Image preloading for above-the-fold content
export const preloadCriticalImages = (imageUrls: string[]) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Module preloading for likely navigation
export const preloadRoute = (route: string) => {
  const routes = {
    '/news': () => import('../pages/News'),
    '/contact': () => import('../pages/Contact'),
    '/announcements': () => import('../pages/Announcements'),
  };

  if (routes[route as keyof typeof routes]) {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = route;
    document.head.appendChild(link);
  }
};

// DNS prefetching for external resources
export const prefetchDNS = (domains: string[]) => {
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
};

// Preconnect to external origins
export const preconnectOrigins = (origins: string[]) => {
  origins.forEach(origin => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = '';
    document.head.appendChild(link);
  });
};

// Resource hints for performance
export const setupResourceHints = () => {
  // DNS prefetch for common external services
  prefetchDNS([
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'www.google-analytics.com',
    'www.googletagmanager.com',
    'new.namdtu.uz',
  ]);

  // Preconnect to critical origins
  preconnectOrigins([
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://new.namdtu.uz',
  ]);

  // Preload critical fonts
  preloadFonts();
};

// Intersection Observer for lazy loading
export const createLazyLoader = (
  callback: (entry: IntersectionObserverEntry) => void,
  options?: any
) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
  };

  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry);
        }
      });
    },
    { ...defaultOptions, ...options }
  );
};

// Dynamic import with error handling
export const loadComponent = async <T,>(
  importFn: () => Promise<{ default: T }>
): Promise<T> => {
  try {
    const module = await importFn();
    return module.default;
  } catch (error) {
    console.error('Failed to load component:', error);
    throw error;
  }
};

// Bundle preloading based on user interaction
export const preloadOnInteraction = (element: Element, route: string) => {
  const handleInteraction = () => {
    preloadRoute(route);
    element.removeEventListener('mouseenter', handleInteraction);
    element.removeEventListener('focus', handleInteraction);
  };

  element.addEventListener('mouseenter', handleInteraction);
  element.addEventListener('focus', handleInteraction);
};

// Service Worker registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered:', registration);
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  }
};

// Cache API for static assets
export const cacheStaticAssets = async (assets: string[]) => {
  if ('caches' in window) {
    try {
      const cache = await caches.open('static-v1');
      await cache.addAll(assets);
      console.log('Assets cached successfully');
    } catch (error) {
      console.error('Cache failed:', error);
    }
  }
};