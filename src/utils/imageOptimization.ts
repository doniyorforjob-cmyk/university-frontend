/**
 * Image Optimization Utilities
 * WebP format support and image optimization functions
 */

// WebP formatini qo'llab-quvvatlashini tekshirish
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Rasm URL'ini WebP formatiga o'zgartirish
export const getWebPUrl = (url: string): string => {
  if (!url) return url;
  if (url.includes('.webp')) return url;

  // Faqat local static assetlar uchun transformatsiya
  if (url.startsWith('/static/') || url.startsWith('/images/')) {
    return url.replace(/\.(jpg|jpeg|png|tiff)$/i, '.webp');
  }
  return url;
};

// Rasm URL'ini AVIF formatiga o'zgartirish
export const getAvifUrl = (url: string): string => {
  if (!url) return url;
  if (url.includes('.avif')) return url;

  if (url.startsWith('/static/') || url.startsWith('/images/')) {
    return url.replace(/\.(jpg|jpeg|png|tiff)$/i, '.avif');
  }
  return url;
};

// Rasm yuklash uchun optimizatsiya qilingan komponent
export const getOptimizedImageProps = async (src: string, alt: string) => {
  const webpSupported = await supportsWebP();

  if (webpSupported) {
    return {
      src: getWebPUrl(src),
      alt,
    };
  }

  return {
    src,
    alt,
  };
};

// Lazy loading uchun Intersection Observer
export const createImageObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry);
        }
      });
    },
    {
      rootMargin: '50px', // 50px oldin yuklash
      threshold: 0.1,
    }
  );
};

// Rasmni preload qilish
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Multiple rasmlarni preload qilish
export const preloadImages = (sources: string[]): Promise<void[]> => {
  return Promise.all(sources.map(preloadImage));
};

// Rasm o'lchamini optimizatsiya qilish (responsive images)
export const getResponsiveImageSrc = (
  baseUrl: string,
  sizes: { width: number; height?: number }[]
): string => {
  // Eng kichik o'lchamni default qilib olish
  const smallest = sizes.reduce((prev, current) =>
    prev.width < current.width ? prev : current
  );

  return `${baseUrl}?w=${smallest.width}${smallest.height ? `&h=${smallest.height}` : ''}&fit=crop&auto=format`;
};

// Blur placeholder yaratish (base64)
export const generateBlurPlaceholder = (width: number = 10, height: number = 6): string => {
  // Minimal SVG blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};