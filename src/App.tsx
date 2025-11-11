import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ScrollToTop, LoadingSpinner, PageSkeleton } from './components/shared';

// Code splitting bilan lazy loading
const HomePage = React.lazy(() => import('./pages/Home'));
const NewsPage = React.lazy(() => import('./pages/News'));
const NewsDetailPage = React.lazy(() => import('./pages/NewsDetail'));
const AnnouncementsPage = React.lazy(() => import('./pages/Announcements'));
const MediaAboutUsPage = React.lazy(() => import('./pages/MediaAboutUs'));
const AppealsPage = React.lazy(() => import('./pages/Appeals'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const OrganizationalStructurePage = React.lazy(() => import('./pages/OrganizationalStructure'));
const UniversityPage = React.lazy(() => import('./pages/University'));

// Loading komponenti - har bir sahifa uchun skeleton
const PageLoader = ({ route }: { route?: string }) => {
  const getSkeletonType = (path: string) => {
    if (path === '/news' || path?.startsWith('/news/')) return 'news';
    if (path === '/announcements' || path?.startsWith('/announcements/')) return 'announcements';
    if (path === '/contact') return 'contact';
    if (path === '/appeals') return 'appeals';
    if (path === '/media-about-us') return 'media';
    if (path === '/organizational-structure') return 'default';
    if (path === '/university') return 'university';
    return 'default';
  };

  return <PageSkeleton type={getSkeletonType(route || '')} />;
};

// Vaqtinchalik sahifa
const AnnouncementDetailPage = () => (
  <div className="container mx-auto p-4">
    <h1>E&apos;lon detali</h1>
    <p>Bu yerda e&apos;lonning detal sahifasi bo&apos;ladi.</p>
  </div>
);

function App() {
  return (
    <div className="min-h-screen text-gray-900">
      <Layout>
        <Suspense fallback={<PageLoader route={window.location.pathname} />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/media-about-us" element={<MediaAboutUsPage />} />
            <Route path="/appeals" element={<AppealsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/organizational-structure"
              element={<OrganizationalStructurePage />}
            />
            <Route path="/university" element={<UniversityPage />} />
          </Routes>
        </Suspense>
      </Layout>

      {/* Global "Yuqoriga qaytish" tugmasi */}
      <ScrollToTop />
    </div>
  );
}

export default App;