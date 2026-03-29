import React from 'react';

/* global NodeJS */
/**
 * Helper Utilities
 * Umumiy yordamchi funksiyalar
 */

/**
 * Debounce funksiyasi
 * Funksiyani ma'lum vaqt o'tgandan keyin chaqiradi
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle funksiyasi
 * Funksiyani ma'lum vaqt oralig'ida faqat bir marta chaqiradi
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Sleep funksiyasi (async/await bilan)
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Array ni chunk'larga bo'lish
 * @example chunk([1,2,3,4,5], 2) => [[1,2], [3,4], [5]]
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Array dan dublikatlarni olib tashlash
 */
export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

/**
 * Array ni shuffle qilish (aralashtirib yuborish)
 */
export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Random element tanlash
 */
export const randomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Object dan bo'sh qiymatlarni olib tashlash
 */
export const removeEmpty = <T extends Record<string, any>>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== '')
  ) as Partial<T>;
};

/**
 * Deep clone (chuqur nusxa olish)
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Object'larni deep merge qilish
 */
export const deepMerge = <T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (source) {
    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        target[key] = deepMerge(targetValue as any, sourceValue as any);
      } else if (sourceValue !== undefined) {
        target[key] = sourceValue as any;
      }
    }
  }

  return deepMerge(target, ...sources);
};

/**
 * Query string yaratish
 * @example buildQueryString({ page: 1, limit: 10 }) => '?page=1&limit=10'
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const cleaned = removeEmpty(params);
  const searchParams = new URLSearchParams(
    Object.entries(cleaned).map(([key, value]) => [key, String(value)])
  );
  return searchParams.toString() ? `?${searchParams.toString()}` : '';
};

/**
 * Query string'dan object yaratish
 */
export const parseQueryString = (queryString: string): Record<string, string> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};

/**
 * Local storage ga saqlash (JSON bilan)
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Local storage dan o'qish
 */
export const getLocalStorage = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue ?? null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue ?? null;
  }
};

/**
 * Local storage dan o'chirish
 */
export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Clipboard ga nusxalash
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

/**
 * Scroll to top
 */
export const scrollToTop = (smooth: boolean = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
};

/**
 * Scroll to element
 */
export const scrollToElement = (
  elementId: string,
  offset: number = 0,
  smooth: boolean = true
): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Generate random ID
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format bytes to human readable
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};


/**
 * Detects if an error is related to chunk loading failure
 */
export const isChunkError = (error: any): boolean => {
  if (!error) return false;
  const message = (error.message || String(error)).toLowerCase();

  return (
    error.name === 'ChunkLoadError' ||
    message.includes('chunkloaderror') ||
    message.includes('loading chunk') ||
    message.includes('failed to fetch') || // Often dynamic import failure
    // SyntaxError often happens when server returns HTML index for a missing JS chunk
    // Chromium: "Unexpected token <"
    // Firefox: "expected expression, got '<'"
    message.includes('unexpected token <') ||
    message.includes("expected expression, got '<'") ||
    (message.includes('syntaxerror') && message.includes('<'))
  );
};

/**
 * Application version for forced cache invalidation
 * Bump this version string when you want to force all users to perform a "Nuclear" reload
 */
export const APP_VERSION = '1.0.12';

if (typeof window !== 'undefined') {
  console.log(`%c Application Version: ${APP_VERSION} `, 'background: #0E104B; color: #fff; padding: 2px 5px; border-radius: 3px;');
}

/**
 * Handles chunk loading errors by reloading the page once with a "Nuclear" approach
 * Returns true if a reload was triggered
 */
export const handleChunkError = () => {
  const reloadKey = 'emergency-reload-v1';
  const versionKey = 'app-version-v1';
  const lastReload = sessionStorage.getItem(reloadKey);
  const currentStoredVersion = localStorage.getItem(versionKey);
  const now = Date.now();

  // If version mismatch, force a reload regardless of the 10s cooldown
  const isVersionMismatch = currentStoredVersion !== APP_VERSION;

  // Allow only one reload every 10 seconds to avoid infinite loops,
  // OR if it's a version mismatch (first time)
  if (isVersionMismatch || !lastReload || now - parseInt(lastReload) > 10000) {
    if (isVersionMismatch) {
      console.log(`Version mismatch detected (${currentStoredVersion} -> ${APP_VERSION}). Forcing reset...`);
      localStorage.setItem(versionKey, APP_VERSION);
    }

    sessionStorage.setItem(reloadKey, now.toString());
    console.error("Critical: Version mismatch or Chunk error. Performing NUCLEAR hard reload...");

    const hasCaches = typeof window !== 'undefined' && 'caches' in window;
    const hasSW = typeof window !== 'undefined' && 'serviceWorker' in navigator;

    const cleanup = async () => {
      try {
        // 1. Unregister all service workers
        if (hasSW) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const reg of registrations) {
            await reg.unregister();
          }
        }

        // 2. Delete all caches
        if (hasCaches) {
          const names = await window.caches.keys();
          for (const name of names) {
            await window.caches.delete(name);
          }
        }
      } catch (e) {
        console.error("Cleanup failed during nuclear reload:", e);
      } finally {
        console.warn('Nuclear cleanup complete. Reloading page...');
        // Hard reload to fetch fresh assets from server
        window.location.reload();
      }
    };

    cleanup();
    return true;
  }
  return false;
};

/**
 * Safe Dynamic Import Wrapper
 * Use this for raw import() calls inside components (e.g. in useEffect or click handlers)
 */
export const safeImport = async <T>(importPromise: Promise<T>): Promise<T> => {
  try {
    return await importPromise;
  } catch (error: any) {
    if (isChunkError(error)) {
      if (handleChunkError()) {
        // Return a pending promise that will never resolve to let the page reload
        return new Promise(() => { });
      }
    }
    throw error;
  }
};

/**
 * Safe Lazy Loading Component Wrapper
 * Use this with React.lazy()
 */
export const safeLazy = (importFunc: () => Promise<{ default: React.ComponentType<any> }>) => {
  return React.lazy(async () => {
    try {
      return await importFunc();
    } catch (error: any) {
      if (isChunkError(error)) {
        if (handleChunkError()) {
          return new Promise(() => { });
        }
        console.error("Chunk loading failed repeatedly. Showing error UI.");
      }
      throw error;
    }
  });
};
