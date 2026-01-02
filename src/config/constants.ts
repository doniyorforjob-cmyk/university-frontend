/**
 * Global Constants
 * Loyiha bo'ylab ishlatiladigan barcha konstantalar
 */

// ===== LOYIHA MA'LUMOTLARI =====
export const APP_NAME = 'NamDTU';
export const APP_FULL_NAME = 'Namangan Davlat Texnika Universiteti'; // Keep for now as baseline fallback, but we will ensure settings override it. Actually, user said delete static name.
export const APP_DESCRIPTION = "Zamonaviy ta'lim standartlari asosida yuqori malakali mutaxassislarni tayyorlaymiz";

// ===== API KONFIGURATSIYASI =====
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 30000; // 30 soniya

// ===== PAGINATION =====
export const ITEMS_PER_PAGE = 10;
export const NEWS_PER_PAGE = 6;
export const ANNOUNCEMENTS_PER_PAGE = 6;

// ===== RANGLAR =====
export const COLORS = {
  primary: '#0E104B',
  secondary: '#3B82F6',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
} as const;

// ===== BREAKPOINTS (Tailwind) =====
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ===== TILLAR =====
export const LANGUAGES = {
  uz: 'O\'zbekcha',
  ru: 'Русский',
  en: 'English',
} as const;

export const DEFAULT_LANGUAGE = 'uz';

// ===== SANA FORMATLARI =====
export const DATE_FORMATS = {
  short: 'DD.MM.YYYY',
  long: 'DD MMMM YYYY',
  full: 'DD MMMM YYYY, HH:mm',
} as const;

export const UZ_MONTHS = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
];

/**
 * Loyiha bo'ylab standart sana formatini qaytaradi (SectionTemplate dagi kabi)
 * Format: "2 Yanvar 2026 | 12:30"
 */
export const formatStandardDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate();
  const month = UZ_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${year} | ${hours}:${minutes}`;
};

/**
 * Matndan HTML teglarini olib tashlaydi
 */
export const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ');
};

// ===== SOCIAL MEDIA =====
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/namdtu',
  instagram: 'https://instagram.com/namdtu',
  telegram: 'https://t.me/namdtu',
  youtube: 'https://youtube.com/@namdtu',
} as const;

// ===== CONTACT =====
export const CONTACT_INFO = {
  phone: '+998 69 227 00 00',
  email: 'info@namdtu.uz',
  address: 'Namangan shahri, Kosonsoy ko\'chasi, 12',
} as const;

// ===== VALIDATION =====
export const VALIDATION = {
  minPasswordLength: 8,
  maxPasswordLength: 50,
  minNameLength: 2,
  maxNameLength: 100,
  phoneRegex: /^\+998\d{9}$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// ===== FILE UPLOAD =====
export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocTypes: ['application/pdf', 'application/msword'],
} as const;

// ===== CACHE =====
export const CACHE_KEYS = {
  news: 'news',
  announcements: 'announcements',
  departments: 'departments',
  faculties: 'faculties',
  stats: 'stats',
} as const;

// ===== CACHE CONFIGURATION =====
export const CACHE_CONFIG = {
  // Default TTL in minutes (Butun loyiha uchun umumiy 30 soniya)
  DEFAULT_TTL: 0.5,

  // Specific TTLs in minutes
  TTL: {
    SHORT: 0.5,   // 30 soniya
    MEDIUM: 0.5,    // Hamma joyda 30 soniya
    LONG: 0.5,     // Hamma joyda 30 soniya
    VERY_LONG: 0.5 // Hamma joyda 30 soniya
  },

  // Cache Keys Prefixes
  KEYS: {
    NEWS_DETAIL: 'news-detail',
    ANNOUNCEMENT_DETAIL: 'announcement-detail',
    NAVBAR: 'navbar-items-global',
    SIDEBAR: 'sidebar',
    SECTIONS: 'section',
  },

  // Component/Page specific configs
  SIDEBAR: {
    ttlMinutes: 0.5, // 30 soniya
  },
  NAVBAR: {
    ttlMinutes: 0.5, // 30 soniya
  },
  NEWS_DETAIL: {
    ttlMinutes: 0.5, // 30 soniya
  },
  ANNOUNCEMENT_DETAIL: {
    ttlMinutes: 0.5, // 30 soniya
  },
  SECTIONS: {
    'hero': { ttlMinutes: 0.5 },
    'stats': { ttlMinutes: 0.5 },
    'news': { ttlMinutes: 0.5 },
    'faculties': { ttlMinutes: 0.5 },
    'video-gallery': { ttlMinutes: 0.5 },
    'media-gallery': { ttlMinutes: 0.5 },
    'interactive-services': { ttlMinutes: 0.5 },
    'university-systems': { ttlMinutes: 0.5 },
  }
} as const;

// Backwards compatibility for existing imports (if any, though we will replace them)
export const SECTION_CACHE_CONFIG = CACHE_CONFIG.SECTIONS;

// ===== NEWS TABS =====
export const NEWS_TABS = [
  { id: 'news', label: 'Yangiliklar' },
  { id: 'announcements', label: 'E`lonlar' },
  { id: 'corruption', label: 'Korrupsiyaga qarshi kurashish' },
  { id: 'events', label: 'Tadbirlar' },
  { id: 'sport', label: 'Sport' },
] as const;

// ===== AOS ANIMATSIYASI =====
export const AOS_CONFIG = {
  enabled: true,
  defaultAnimation: 'fade-up',
  defaultDuration: 800,
  defaultDelay: 0,
  staggerDelay: 100,
} as const;

