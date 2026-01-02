import React, { Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
// MainLayout import removed (moved to AppRoutes)
import GlobalLayout from '@/components/templates/GlobalLayout';
import { ScrollToTop } from '@/components/shared';
import { LocaleProvider, useLocale } from '@/contexts/LocaleContext';
// Error Pages & Components
// NetworkError imported
// NotFound moved to AppRoutes
import NetworkError from '@/pages/Errors/NetworkError';
import ErrorBoundary from '@/components/shared/error-boundary';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useSettingsStore } from '@/store/settingsStore';

import LocaleWrapper from '@/components/shared/LocaleWrapper';
import AppRoutes from './AppRoutes';
import { Toaster } from 'react-hot-toast';

// Lazy load HomePage for root path
const HomePage = React.lazy(() => import('./pages/Home'));

// Redirect component
const NavigateToUz = () => {
  const location = useLocation();
  return <Navigate to={`/uz${location.pathname}`} replace />;
};

function App() {
  const location = useLocation();
  const { locale } = useLocale();
  const { fetchSettings } = useSettingsStore();

  // Network Status Hook
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  React.useEffect(() => {
    fetchSettings(locale);
  }, [fetchSettings, locale]);

  // Home sahifa uchun fallbackni boshqacha qiling
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen text-gray-900">
      {/* Network Error Overlay */}
      {!isOnline && <NetworkError />}

      <Layout>
        <ErrorBoundary>
          <Suspense fallback={isHome ? null : <GenericPageSkeleton showSidebar={true} showBanner={true} />}> {/* This fallback is for the initial load of the entire app */}
            <Routes>
              {/* Russian Locale */}
              <Route path="ru/*" element={<LocaleWrapper lang="ru" />}>
                <Route path="*" element={<AppRoutes />} />
              </Route>

              {/* English Locale */}
              <Route path="en/*" element={<LocaleWrapper lang="en" />}>
                <Route path="*" element={<AppRoutes />} />
              </Route>

              {/* Uzbek Locale - Explicit for inner pages */}
              <Route path="uz/*" element={<LocaleWrapper lang="uz" />}>
                <Route path="*" element={<AppRoutes />} />
              </Route>

              {/* Special Case: Root path is Uzbek Home Page */}
              <Route path="/" element={<LocaleWrapper lang="uz" />}>
                <Route index element={<HomePage />} />
              </Route>

              {/* Any other top-level path (e.g. /news) -> Redirect to /uz/news */}
              <Route path="*" element={<NavigateToUz />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>

      {/* Global Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Global "Yuqoriga qaytish" tugmasi */}
      <ScrollToTop />
    </div>
  );
}

export default App;