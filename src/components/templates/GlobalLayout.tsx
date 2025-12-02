import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@/components/shared/Container';
import Banner from '@/components/shared/Banner';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { CachedApiProvider } from '@/components/providers/CachedApiProvider';
import { PerformanceProvider } from '@/components/providers/PerformanceProvider';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BannerData {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

// Context to pass layout data from nested routes up to GlobalLayout
interface GlobalLayoutContextType {
  setBannerData: (data?: BannerData) => void;
  setBreadcrumbsData: (data?: BreadcrumbItem[]) => void;
}

export const GlobalLayoutContext = React.createContext<GlobalLayoutContextType | undefined>(undefined);

export const useGlobalLayout = () => {
  const context = React.useContext(GlobalLayoutContext);
  if (context === undefined) {
    throw new Error('useGlobalLayout must be used within a GlobalLayoutProvider');
  }
  return context;
};

const GlobalLayout: React.FC = () => {
  const [banner, setBanner] = useState<BannerData | undefined>(undefined);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[] | undefined>(undefined);

  const setBannerData = useCallback((data?: BannerData) => {
    setBanner(data);
  }, []);

  const setBreadcrumbsData = useCallback((data?: BreadcrumbItem[]) => {
    setBreadcrumbs(data);
  }, []);

  return (
    <CachedApiProvider config={{
      defaultTtl: 15,
      maxCacheSize: 50 * 1024 * 1024,
      enableOfflineMode: true,
      enableBackgroundSync: true,
      enableAutoCleanup: true
    }}>
      <PerformanceProvider>
        <GlobalLayoutContext.Provider value={{ setBannerData, setBreadcrumbsData }}>
          <div className="bg-gray-50 min-h-screen">
            {/* Render Banner outside the 70/30 split */}
            {banner && (
              <Banner
                title={banner.title}
                subtitle={banner.subtitle}
                backgroundImage={banner.backgroundImage}
              />
            )}

            {/* Render Breadcrumbs outside the 70/30 split */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <Container className="pt-8 pb-0">
                <Breadcrumbs items={breadcrumbs} />
              </Container>
            )}

            {/* This Outlet will render MainLayout or other page components */}
            <Outlet />
          </div>
        </GlobalLayoutContext.Provider>
      </PerformanceProvider>
    </CachedApiProvider>
  );
};

export default GlobalLayout;