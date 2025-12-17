/**
 * Global Constants
 * Loyiha bo'ylab ishlatiladigan barcha konstantalar
 */

// ===== LOYIHA MA'LUMOTLARI =====
export const APP_NAME = 'Namangan davlat texnika universiteti';
export const APP_FULL_NAME = 'Namangan Davlat Texnika Universiteti';
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

export const CACHE_TIME = {
  short: 5 * 60 * 1000, // 5 daqiqa
  medium: 15 * 60 * 1000, // 15 daqiqa
  long: 60 * 60 * 1000, // 1 soat
} as const;

// ===== SECTION CACHE CONFIG =====
export const SECTION_CACHE_CONFIG = {
  'hero': { ttlMinutes: 60 }, // 1 soat - kam o'zgaradi
  'stats': { ttlMinutes: 30 }, // 30 daqiqa - o'rtacha o'zgaradi
  'news': { ttlMinutes: 15 }, // 15 daqiqa - tez o'zgaradi
  'faculties': { ttlMinutes: 120 }, // 2 soat - kam o'zgaradi
  'video-gallery': { ttlMinutes: 45 }, // 45 daqiqa - o'rtacha o'zgaradi
  'media-gallery': { ttlMinutes: 45 }, // 45 daqiqa - o'rtacha o'zgaradi
  'interactive-services': { ttlMinutes: 90 }, // 1.5 soat - kam o'zgaradi
  'university-systems': { ttlMinutes: 60 }, // 1 soat - kam o'zgaradi
} as const;

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

