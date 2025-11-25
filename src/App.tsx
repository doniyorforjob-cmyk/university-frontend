import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import MainLayout from '@/components/shared/MainLayout';
import GlobalLayout from '@/components/templates/GlobalLayout'; // Corrected import path
import { ScrollToTop } from '@/components/shared';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import Sidebar from '@/components/shared/Sidebar';
import UniversitySystems from '@/components/shared/UniversitySystems';

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

function App() {
  const location = useLocation();

  // Home sahifa uchun fallbackni boshqacha qiling
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen text-gray-900">
      <Layout>
        <Suspense fallback={isHome ? null : <GenericPageSkeleton showSidebar={true} showBanner={true} />}> {/* This fallback is for the initial load of the entire app */}
          <Routes> {/* Routes should be wrapped by GlobalLayout */}
            <Route element={<GlobalLayout />}> {/* GlobalLayout will handle Banner and Breadcrumbs */}
              <Route index element={<HomePage />} />
              <Route path="/appeals" element={<AppealsPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* "Axborot xizmati" uchun doimiy Sidebar bilan ishlaydigan sahifalar */}
              <Route element={<MainLayout sidebar={<Sidebar />} />}>
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:slug" element={<NewsDetailPage />} />
                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="/media-about-us" element={<MediaAboutUsPage />} />
              </Route>

              {/* "UniversitySystems" Sidebar bilan ishlaydigan sahifalar */}
              <Route element={<MainLayout sidebar={<UniversitySystems />} />}>
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
                {/* Boshqa sahifalarni shu yerga qo'shish mumkin */}
              </Route>
            </Route> {/* End of GlobalLayout route */}

          </Routes>
        </Suspense>
      </Layout>

      {/* Global "Yuqoriga qaytish" tugmasi */}
      <ScrollToTop />
    </div>
  );
}

export default App;