import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { cacheManager, type CacheStats } from '@/utils/cacheManager';

interface CacheConfig {
  defaultTtl: number;
  maxCacheSize: number;
  enableOfflineMode: boolean;
  enableBackgroundSync: boolean;
  enableAutoCleanup: boolean;
}

interface CacheContextType {
  cacheManager: typeof cacheManager;
  config: CacheConfig;
  setCacheConfig: (config: Partial<CacheConfig>) => void;
  clearCache: () => void;
  getCacheStats: () => CacheStats;
  isOnline: boolean;
}

const CacheContext = createContext<CacheContextType | null>(null);

export const useGlobalCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useGlobalCache must be used within CachedApiProvider');
  }
  return context;
};

interface CachedApiProviderProps {
  children: React.ReactNode;
  config?: Partial<CacheConfig>;
}

export const CachedApiProvider: React.FC<CachedApiProviderProps> = ({
  children,
  config = {}
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cacheConfig, setCacheConfigState] = useState<CacheConfig>({
    defaultTtl: 0.5, // 30 seconds
    maxCacheSize: 50 * 1024 * 1024, // 50MB
    enableOfflineMode: true,
    enableBackgroundSync: false,
    enableAutoCleanup: true,
    ...config
  });

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto cleanup
  useEffect(() => {
    if (!cacheConfig.enableAutoCleanup) return;

    const cleanup = cacheManager.startBackgroundCleanup(30); // Every 30 seconds
    return cleanup;
  }, [cacheConfig.enableAutoCleanup]);

  const setCacheConfig = useCallback((newConfig: Partial<CacheConfig>) => {
    setCacheConfigState(prev => ({ ...prev, ...newConfig }));
  }, []);

  const clearCache = useCallback(() => {
    cacheManager.clear();
  }, []);

  const getCacheStats = useCallback(() => {
    return cacheManager.getStats();
  }, []);

  const contextValue: CacheContextType = {
    cacheManager,
    config: cacheConfig,
    setCacheConfig,
    clearCache,
    getCacheStats,
    isOnline
  };

  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
};