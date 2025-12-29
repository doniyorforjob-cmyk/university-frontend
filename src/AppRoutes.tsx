import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/shared/MainLayout';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';

// Page imports (lazy)
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
const ServerError = React.lazy(() => import('./pages/Error/ServerError'));
const NotFound = React.lazy(() => import('./pages/Errors/NotFound'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<GenericPageSkeleton showSidebar={true} showBanner={true} />}>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="contact" element={<ContactPage />} />

                {/* "Axborot xizmati" uchun doimiy Sidebar bilan ishlaydigan sahifalar */}
                <Route element={<MainLayout />}>
                    <Route path="news" element={<NewsPage />} />
                    <Route path="news/:slug" element={<NewsDetailPage />} />
                    <Route path="announcements" element={<AnnouncementsPage />} />
                    <Route path="media-about-us" element={<MediaAboutUsPage />} />
                    <Route path="appeals" element={<AppealsPage />} />
                </Route>

                {/* "UniversitySystems" Sidebar bilan ishlaydigan sahifalar */}
                <Route element={<MainLayout />}>
                    <Route path="university" element={<UniversityPage />} />
                    <Route path="information-services" element={<InformationServicesPage />} />
                    <Route path="organizational-structure" element={<OrganizationalStructurePage />} />
                    <Route path="activities" element={<ActivitiesPage />} />
                    <Route path="admission" element={<AdmissionPage />} />
                    <Route path="yashil-universitet" element={<YashilUniversitetPage />} />
                    <Route path="eco-active-students" element={<EcoActiveStudentsPage />} />
                    <Route path="photos/:id" element={<PhotoDetailPage />} />
                </Route>

                <Route path="server-error" element={<ServerError />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
