import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@/components/shared/Container';
import Banner from '@/components/shared/Banner';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { CachedApiProvider } from '@/components/providers/CachedApiProvider';
import { PerformanceProvider } from '@/components/providers/PerformanceProvider';
import Sidebar from '@/components/shared/Sidebar';
import UniversitySystems from '@/components/shared/UniversitySystems';
import PromoPopup from '@/components/shared/PromoPopup';

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
  setSidebarExtraContent: (content?: React.ReactNode) => void;
  sidebarContent?: React.ReactNode;
  sidebarExtraContent?: React.ReactNode;
  setSidebarMobileHidden: (hidden: boolean) => void;
  sidebarMobileHidden: boolean;
  setSidebarRootPath: (path?: string) => void;
  sidebarRootPath?: string;
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
      setSidebarExtraContent: () => { },
      sidebarContent: undefined,
      sidebarExtraContent: undefined,
      setSidebarMobileHidden: () => { },
      sidebarMobileHidden: false,
      setSidebarRootPath: () => { },
      sidebarRootPath: undefined
    };
  }
  return context;
};


const GlobalLayout: React.FC = () => {
  const [banner, setBanner] = useState<BannerData | undefined>(undefined);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[] | undefined>(undefined);
  const [sidebarType, setSidebarType] = useState<'info' | 'systems' | undefined>(undefined);
  const [sidebarExtra, setSidebarExtra] = useState<React.ReactNode | undefined>(undefined);
  const [sidebarMobileHidden, setSidebarMobileHidden] = useState(false);
  const [sidebarRootPath, setSidebarRootPath] = useState<string | undefined>(undefined);

  const setBannerData = useCallback((data?: BannerData) => {
    setBanner(data);
  }, []);

  const setBreadcrumbsData = useCallback((data?: BreadcrumbItem[]) => {
    setBreadcrumbs(data);
  }, []);

  const setSidebarTypeContent = useCallback((type?: 'info' | 'systems') => {
    setSidebarType(type);
  }, []);

  const setSidebarExtraContent = useCallback((content?: React.ReactNode) => {
    setSidebarExtra(content);
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
        <GlobalLayoutContext.Provider value={{
          setBannerData,
          setBreadcrumbsData,
          setSidebarType: setSidebarTypeContent,
          setSidebarExtraContent,
          sidebarContent,
          sidebarExtraContent: sidebarExtra,
          setSidebarMobileHidden,
          sidebarMobileHidden,
          setSidebarRootPath,
          sidebarRootPath
        }}>
          <div className="bg-gray-50 min-h-screen">
            {/* Render Banner outside the 70/30 split */}
            {banner && (
              <div className="no-print">
                <Banner
                  title={banner.title}
                  subtitle={banner.subtitle}
                  backgroundImage={banner.backgroundImage}
                />
              </div>
            )}

            {/* Render Breadcrumbs outside the 70/30 split */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <Container className="pt-8 pb-0 no-print">
                <Breadcrumbs items={breadcrumbs} />
              </Container>
            )}

            {/* This Outlet will render MainLayout or other page components */}
            <Outlet />
            <PromoPopup />
          </div>
        </GlobalLayoutContext.Provider>
      </PerformanceProvider>
    </CachedApiProvider>
  );
};

export default GlobalLayout;