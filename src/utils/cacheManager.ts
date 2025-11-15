/**
 * Global Cache Manager
 * Memory va localStorage cache management
 */

interface CacheItem {
  data: any;
  timestamp: number;
  expiresAt: number;
  version: string;
  size?: number;
}

interface CacheStats {
  memoryItems: number;
  storageItems: number;
  totalSize: number;
  hitRate: number;
}

class CacheManager {
  private static instance: CacheManager;
  private cache = new Map<string, CacheItem>();
  private readonly VERSION = 'v1.0';
  private readonly DEFAULT_TTL = 15 * 60 * 1000; // 15 minutes
  private readonly MAX_MEMORY_ITEMS = 100;
  private hits = 0;
  private misses = 0;

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private getStorageKey(key: string): string {
    return `cache_${this.VERSION}_${key}`;
  }

  private calculateSize(data: any): number {
    try {
      return JSON.stringify(data).length;
    } catch {
      return 0;
    }
  }

  private cleanupMemory(): void {
    if (this.cache.size <= this.MAX_MEMORY_ITEMS) return;

    // Remove oldest items
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

    const toRemove = entries.slice(0, this.cache.size - this.MAX_MEMORY_ITEMS + 10);
    toRemove.forEach(([key]) => this.cache.delete(key));
  }

  set(key: string, data: any, ttlMinutes: number = 15): void {
    const expiresAt = Date.now() + (ttlMinutes * 60 * 1000);
    const size = this.calculateSize(data);

    const cacheItem: CacheItem = {
      data,
      timestamp: Date.now(),
      expiresAt,
      version: this.VERSION,
      size
    };

    // Memory cache
    this.cache.set(key, cacheItem);
    this.cleanupMemory();

    // localStorage (try-catch for quota limits)
    try {
      localStorage.setItem(this.getStorageKey(key), JSON.stringify(cacheItem));
    } catch (error) {
      console.warn('localStorage cache failed:', error);
      // Clean up old entries if storage is full
      this.cleanupStorage();
      // Try again
      try {
        localStorage.setItem(this.getStorageKey(key), JSON.stringify(cacheItem));
      } catch {
        // If still fails, just use memory cache
      }
    }
  }

  get(key: string): any | null {
    // Check memory cache first
    const memoryItem = this.cache.get(key);
    if (memoryItem && memoryItem.expiresAt > Date.now()) {
      this.hits++;
      return memoryItem.data;
    }

    // Check localStorage
    try {
      const stored = localStorage.getItem(this.getStorageKey(key));
      if (stored) {
        const parsed: CacheItem = JSON.parse(stored);
        if (parsed.expiresAt > Date.now() && parsed.version === this.VERSION) {
          // Restore to memory cache
          this.cache.set(key, parsed);
          this.hits++;
          return parsed.data;
        } else {
          // Expired, remove
          localStorage.removeItem(this.getStorageKey(key));
        }
      }
    } catch (error) {
      console.warn('localStorage read failed:', error);
    }

    this.misses++;
    return null;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
    try {
      localStorage.removeItem(this.getStorageKey(key));
    } catch (error) {
      // Ignore
    }
  }

  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;

    try {
      // Clear only our cache entries
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(`cache_${this.VERSION}_`)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      // Ignore
    }
  }

  cleanupStorage(): void {
    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter(key => key.startsWith(`cache_${this.VERSION}_`));

      // Remove expired entries
      cacheKeys.forEach(key => {
        try {
          const item: CacheItem = JSON.parse(localStorage.getItem(key)!);
          if (item.expiresAt <= Date.now()) {
            localStorage.removeItem(key);
          }
        } catch (e) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      // Ignore
    }
  }

  getStats(): CacheStats {
    let storageItems = 0;
    let totalSize = 0;

    try {
      const keys = Object.keys(localStorage);
      const cacheKeys = keys.filter(key => key.startsWith(`cache_${this.VERSION}_`));
      storageItems = cacheKeys.length;

      // Calculate total size
      cacheKeys.forEach(key => {
        try {
          const item: CacheItem = JSON.parse(localStorage.getItem(key)!);
          totalSize += item.size || 0;
        } catch {
          // Ignore
        }
      });
    } catch (e) {
      // Ignore
    }

    const totalRequests = this.hits + this.misses;
    const hitRate = totalRequests > 0 ? (this.hits / totalRequests) * 100 : 0;

    return {
      memoryItems: this.cache.size,
      storageItems,
      totalSize,
      hitRate: Math.round(hitRate * 100) / 100
    };
  }

  // Background cleanup
  startBackgroundCleanup(intervalMinutes: number = 30): () => void {
    const interval = setInterval(() => {
      this.cleanupStorage();
      this.cleanupMemory();
    }, intervalMinutes * 60 * 1000);

    return () => clearInterval(interval);
  }

  // API call with caching
  async cachedApiCall<T>(
    key: string,
    apiCall: () => Promise<T>,
    ttlMinutes: number = 15
  ): Promise<T> {
    // Check cache first
    const cached = this.get(key);
    if (cached !== null) {
      return cached;
    }

    // Make API call
    const data = await apiCall();

    // Cache the result
    this.set(key, data, ttlMinutes);

    return data;
  }
}

export const cacheManager = CacheManager.getInstance();
export type { CacheStats };