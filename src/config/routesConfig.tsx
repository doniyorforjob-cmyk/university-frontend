import React, { Suspense } from 'react';
import { safeLazy } from '@/utils/helpers';

// Loading komponenti
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Lazy loaded pages - Only Shell pages kept here
const HomePage = safeLazy(() => import('../pages/Home'));
const SearchPage = safeLazy(() => import('../pages/Search'));
const ContactPage = safeLazy(() => import('../pages/Contact'));
const OrganizationalStructurePage = safeLazy(() => import('../pages/OrganizationalStructure'));
const AdministrationPage = safeLazy(() => import('../pages/Administration'));

// Route configuration
export const routeConfig: any[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
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
    path: '/administration',
    element: <AdministrationPage />,
  },
  {
    path: '/leadership',
    element: <AdministrationPage />,
  },
];

// Wrapper for Suspense
export const createLazyRoute = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// Route prefetching utility - Only for Shell paths
export const prefetchRoute = (routePath: string) => {
  const routeMap: Record<string, () => Promise<any>> = {
    '/': () => import('../pages/Home'),
    '/search': () => import('../pages/Search'),
    '/contact': () => import('../pages/Contact'),
    '/organizational-structure': () => import('../pages/OrganizationalStructure'),
    '/administration': () => import('../pages/Administration'),
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
    '/search': SearchPage,
    '/contact': ContactPage,
    '/organizational-structure': OrganizationalStructurePage,
    '/administration': AdministrationPage,
    '/leadership': AdministrationPage,
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
  '/search': {
    title: 'Qidiruv',
    prefetch: true,
    priority: 'high',
  },
  '/contact': {
    title: 'Aloqa',
    prefetch: true,
    priority: 'medium',
  },
  '/organizational-structure': {
    title: 'Tashkiliy tuzilma',
    prefetch: false,
    priority: 'low',
  },
} as const;

export type RoutePath = keyof typeof routeMetadata;