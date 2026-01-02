import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@/components/shared/Container';
import Banner from '@/components/shared/Banner';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { CachedApiProvider } from '@/components/providers/CachedApiProvider';
import { PerformanceProvider } from '@/components/providers/PerformanceProvider';
import Sidebar from '@/components/shared/Sidebar';
import UniversitySystems from '@/components/shared/UniversitySystems';

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
  setSidebarType: (type?: 'info' | 'systems') => void;
  sidebarContent?: React.ReactNode;
}

export const GlobalLayoutContext = React.createContext<GlobalLayoutContextType | undefined>(undefined);

export const useGlobalLayout = () => {
  const context = React.useContext(GlobalLayoutContext);
  if (context === undefined) {
    // Return a mock context to prevent crash in fallback components
    console.warn('useGlobalLayout used outside GlobalLayoutProvider. Returning mock.');
    return {
      setBannerData: () => { },
      setBreadcrumbsData: () => { },
      setSidebarType: () => { },
      sidebarContent: undefined
    };
  }
  return context;
};


const GlobalLayout: React.FC = () => {
  const [banner, setBanner] = useState<BannerData | undefined>(undefined);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[] | undefined>(undefined);
  const [sidebarType, setSidebarType] = useState<'info' | 'systems' | undefined>(undefined);

  const setBannerData = useCallback((data?: BannerData) => {
    setBanner(data);
  }, []);

  const setBreadcrumbsData = useCallback((data?: BreadcrumbItem[]) => {
    setBreadcrumbs(data);
  }, []);

  const getSidebarContent = () => {
    if (sidebarType === 'info') return <Sidebar />;
    if (sidebarType === 'systems') return <UniversitySystems />;
    return undefined;
  };

  const sidebarContent = getSidebarContent();

  return (
    <CachedApiProvider config={{
      defaultTtl: 15,
      maxCacheSize: 50 * 1024 * 1024,
      enableOfflineMode: true,
      enableBackgroundSync: true,
      enableAutoCleanup: true
    }}>
      <PerformanceProvider>
        <GlobalLayoutContext.Provider value={{ setBannerData, setBreadcrumbsData, setSidebarType, sidebarContent }}>
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