import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { safeLazy } from '@/utils/helpers';

// Page imports (lazy)
const HomePage = safeLazy(() => import('./pages/Home'));
const SearchPage = safeLazy(() => import('./pages/Search'));
const ContactPage = safeLazy(() => import('./pages/Contact'));
const OrganizationalStructurePage = safeLazy(() => import('./pages/OrganizationalStructure'));
const AdministrationPage = safeLazy(() => import('./pages/Administration'));
const ServerError = safeLazy(() => import('./pages/Error/ServerError'));
const NotFound = safeLazy(() => import('./pages/Errors/NotFound'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<GenericPageSkeleton showSidebar={true} showBanner={true} />}>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="organizational-structure" element={<OrganizationalStructurePage />} />
                <Route path="administration" element={<AdministrationPage />} />
                <Route path="leadership" element={<AdministrationPage />} />
                
                {/* MFE Proxy Routes - registering them in Shell to prevent client-side 404 */}
                <Route path="scientific-activity" element={<GenericPageSkeleton showSidebar={true} showBanner={true} />} />
                <Route path="research-areas/*" element={<GenericPageSkeleton showSidebar={true} showBanner={true} />} />
                
                <Route path="server-error" element={<ServerError />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
