import React, { Suspense } from 'react';

// Loading komponenti
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Lazy loaded pages
const HomePage = React.lazy(() => import('../pages/Home'));
const NewsPage = React.lazy(() => import('../pages/News'));
const NewsDetailPage = React.lazy(() => import('../pages/NewsDetail'));
const AnnouncementsPage = React.lazy(() => import('../pages/Announcements'));
const MediaAboutUsPage = React.lazy(() => import('../pages/MediaAboutUs'));
const AppealsPage = React.lazy(() => import('../pages/Appeals'));
const ContactPage = React.lazy(() => import('../pages/Contact'));
const OrganizationalStructurePage = React.lazy(() => import('../pages/OrganizationalStructure'));
const ActivitiesPage = React.lazy(() => import('../pages/Activities'));
const AdmissionPage = React.lazy(() => import('../pages/Admission'));
const YashilUniversitetPage = React.lazy(() => import('../pages/YashilUniversitet'));
const EcoActiveStudentsPage = React.lazy(() => import('../pages/EcoActiveStudents'));

// Route configuration with lazy loading
export const routeConfig: any[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/news',
    element: <NewsPage />,
  },
  {
    path: '/news/:slug',
    element: <NewsDetailPage />,
  },
  {
    path: '/announcements',
    element: <AnnouncementsPage />,
  },
  {
    path: '/media-about-us',
    element: <MediaAboutUsPage />,
  },
  {
    path: '/appeals',
    element: <AppealsPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/organizational-structure',
    element: <OrganizationalStructurePage />,
  },
  {
    path: '/activities',
    element: <ActivitiesPage />,
  },
  {
    path: '/admission',
    element: <AdmissionPage />,
  },
  {
    path: '/yashil-universitet',
    element: <YashilUniversitetPage />,
  },
  {
    path: '/eco-active-students',
    element: <EcoActiveStudentsPage />,
  },
];

// Wrapper for Suspense
export const createLazyRoute = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// Route prefetching utility
export const prefetchRoute = (routePath: string) => {
  const routeMap: Record<string, () => Promise<any>> = {
    '/': () => import('../pages/Home'),
    '/news': () => import('../pages/News'),
    '/news/:slug': () => import('../pages/NewsDetail'),
    '/announcements': () => import('../pages/Announcements'),
    '/media-about-us': () => import('../pages/MediaAboutUs'),
    '/appeals': () => import('../pages/Appeals'),
    '/contact': () => import('../pages/Contact'),
    '/organizational-structure': () => import('../pages/OrganizationalStructure'),
    '/activities': () => import('../pages/Activities'),
    '/admission': () => import('../pages/Admission'),
    '/yashil-universitet': () => import('../pages/YashilUniversitet'),
    '/eco-active-students': () => import('../pages/EcoActiveStudents'),
  };

  const importFn = routeMap[routePath];
  if (importFn) {
    importFn().catch((error) => {
      console.warn(`Failed to prefetch route: ${routePath}`, error);
    });
  }
};

// Get route component by path
export const getRouteComponent = (path: string): React.ComponentType | null => {
  const componentMap: Record<string, React.ComponentType> = {
    '/': HomePage,
    '/news': NewsPage,
    '/news/:slug': NewsDetailPage,
    '/announcements': AnnouncementsPage,
    '/media-about-us': MediaAboutUsPage,
    '/appeals': AppealsPage,
    '/contact': ContactPage,
    '/organizational-structure': OrganizationalStructurePage,
    '/activities': ActivitiesPage,
    '/admission': AdmissionPage,
    '/yashil-universitet': YashilUniversitetPage,
    '/eco-active-students': EcoActiveStudentsPage,
  };

  return componentMap[path] || null;
};

// Route metadata for SEO and prefetching
export const routeMetadata = {
  '/': {
    title: 'Bosh sahifa',
    prefetch: true,
    priority: 'high',
  },
  '/news': {
    title: 'Yangiliklar',
    prefetch: true,
    priority: 'high',
  },
  '/contact': {
    title: 'Aloqa',
    prefetch: true,
    priority: 'medium',
  },
  '/announcements': {
    title: 'E\'lonlar',
    prefetch: false,
    priority: 'medium',
  },
  '/media-about-us': {
    title: 'OAV biz haqimizda',
    prefetch: false,
    priority: 'low',
  },
  '/appeals': {
    title: 'Murojaatlar',
    prefetch: false,
    priority: 'low',
  },
  '/organizational-structure': {
    title: 'Tashkiliy tuzilma',
    prefetch: false,
    priority: 'low',
  },
  '/activities': {
    title: 'Faoliyat',
    prefetch: false,
    priority: 'medium',
  },
  '/admission': {
    title: 'Qabul',
    prefetch: false,
    priority: 'medium',
  },
  '/yashil-universitet': {
    title: 'Yashil Universitet',
    prefetch: false,
    priority: 'medium',
  },
  '/eco-active-students': {
    title: 'Ekofaol talabalar',
    prefetch: false,
    priority: 'medium',
  },
} as const;

export type RoutePath = keyof typeof routeMetadata;