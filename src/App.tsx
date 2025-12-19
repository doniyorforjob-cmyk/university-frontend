import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import MainLayout from '@/components/shared/MainLayout';
import GlobalLayout from '@/components/templates/GlobalLayout';
import { ScrollToTop } from '@/components/shared';
// Error Pages & Components
import NotFound from '@/pages/Errors/NotFound';
import NetworkError from '@/pages/Errors/NetworkError';
import ErrorBoundary from '@/components/shared/error-boundary';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useSettingsStore } from '@/store/settingsStore';

// Code splitting bilan lazy loading
const HomePage = React.lazy(() => import('./pages/Home'));
const NewsPage = React.lazy(() => import('./pages/News'));
const NewsDetailPage = React.lazy(() => import('./pages/NewsDetail'));
const AnnouncementsPage = React.lazy(() => import('./pages/Announcements'));
const MediaAboutUsPage = React.lazy(() => import('./pages/MediaAboutUs'));
const AppealsPage = React.lazy(() => import('./pages/Appeals'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const OrganizationalStructurePage = React.lazy(() => import('./pages/OrganizationalStructure'));
const ActivitiesPage = React.lazy(() => import('./pages/Activities'));
const AdmissionPage = React.lazy(() => import('./pages/Admission'));
const YashilUniversitetPage = React.lazy(() => import('./pages/YashilUniversitet'));
const EcoActiveStudentsPage = React.lazy(() => import('./pages/EcoActiveStudents'));
const UniversityPage = React.lazy(() => import('./pages/University'));
const InformationServicesPage = React.lazy(() => import('./pages/InformationServices'));
const PhotoDetailPage = React.lazy(() => import('./pages/PhotoDetail'));

function App() {
  const location = useLocation();
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
    fetchSettings();
  }, [fetchSettings]);

  // Home sahifa uchun fallbackni boshqacha qiling
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen text-gray-900">
      {/* Network Error Overlay */}
      {!isOnline && <NetworkError />}

      <Layout>
        <ErrorBoundary>
          <Suspense fallback={isHome ? null : <GenericPageSkeleton showSidebar={true} showBanner={true} />}> {/* This fallback is for the initial load of the entire app */}
            <Routes> {/* Routes should be wrapped by GlobalLayout */}
              <Route element={<GlobalLayout />}> {/* GlobalLayout will handle Banner and Breadcrumbs */}
                <Route index element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* "Axborot xizmati" uchun doimiy Sidebar bilan ishlaydigan sahifalar */}
                <Route element={<MainLayout />}>
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/news/:slug" element={<NewsDetailPage />} />
                  <Route path="/announcements" element={<AnnouncementsPage />} />
                  <Route path="/media-about-us" element={<MediaAboutUsPage />} />
                  <Route path="/appeals" element={<AppealsPage />} />
                </Route>

                {/* "UniversitySystems" Sidebar bilan ishlaydigan sahifalar */}
                <Route element={<MainLayout />}>
                  <Route path="/university" element={<UniversityPage />} />
                  <Route path="/information-services" element={<InformationServicesPage />} />
                  <Route
                    path="/organizational-structure"
                    element={<OrganizationalStructurePage />}
                  />
                  <Route path="/activities" element={<ActivitiesPage />} />
                  <Route path="/admission" element={<AdmissionPage />} />
                  <Route path="/yashil-universitet" element={<YashilUniversitetPage />} />
                  <Route path="/eco-active-students" element={<EcoActiveStudentsPage />} />
                  <Route path="/photos/:id" element={<PhotoDetailPage />} />
                  {/* Boshqa sahifalarni shu yerga qo'shish mumkin */}
                </Route>
                {/* 404 Catch-All Route - Eng oxirida bo'lishi shart */}
                {/* 404 Catch-All Route - Eng oxirida bo'lishi shart */}
                <Route path="*" element={<NotFound />} />
              </Route> {/* End of GlobalLayout route */}
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>

      {/* Global "Yuqoriga qaytish" tugmasi */}
      <ScrollToTop />
    </div>
  );
}

export default App;