/**
 * Route Paths
 * Loyihadagi barcha route yo'llari
 */

export const ROUTES = {
  // Asosiy sahifalar
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  
  // Axborot xizmati
  NEWS: '/news',
  NEWS_DETAIL: '/news/:slug',
  ANNOUNCEMENTS: '/announcements',
  ANNOUNCEMENT_DETAIL: '/announcements/:slug',
  MEDIA_ABOUT_US: '/media-about-us',
  
  // Tuzilma
  ORGANIZATIONAL_STRUCTURE: '/organizational-structure',
  DEPARTMENTS: '/departments',
  DEPARTMENT_DETAIL: '/departments/:id',
  FACULTIES: '/faculties',
  FACULTY_DETAIL: '/faculties/:id',
  
  // Foydalanuvchilar
  STUDENTS: '/students',
  TEACHERS: '/teachers',
  
  // Murojaat
  APPEALS: '/appeals',
  
  // Xizmatlar
  INTERACTIVE_SERVICES: '/interactive-services',
} as const;

/**
 * Route yo'lini yaratish helper funksiyasi
 */
export const createRoute = {
  newsDetail: (slug: string) => `/news/${slug}`,
  announcementDetail: (slug: string) => `/announcements/${slug}`,
  departmentDetail: (id: string | number) => `/departments/${id}`,
  facultyDetail: (id: string | number) => `/faculties/${id}`,
} as const;

/**
 * Breadcrumb labels
 */
export const ROUTE_LABELS: Record<string, string> = {
  [ROUTES.HOME]: 'Bosh sahifa',
  [ROUTES.ABOUT]: 'Biz haqimizda',
  [ROUTES.CONTACT]: "Bog'lanish",
  [ROUTES.NEWS]: 'Yangiliklar',
  [ROUTES.ANNOUNCEMENTS]: "E'lonlar",
  [ROUTES.MEDIA_ABOUT_US]: 'OAV biz haqimizda',
  [ROUTES.ORGANIZATIONAL_STRUCTURE]: 'Tashkiliy tuzilma',
  [ROUTES.DEPARTMENTS]: "Bo'limlar",
  [ROUTES.FACULTIES]: 'Fakultetlar',
  [ROUTES.STUDENTS]: 'Talabalar',
  [ROUTES.TEACHERS]: "O'qituvchilar",
  [ROUTES.APPEALS]: 'Murojaatlar',
  [ROUTES.INTERACTIVE_SERVICES]: 'Interaktiv xizmatlar',
};

