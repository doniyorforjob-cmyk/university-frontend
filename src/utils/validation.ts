/**
 * Validation Utilities
 * Form validation funksiyalari
 */

import { VALIDATION } from '@/config/constants';

/**
 * Email validatsiya
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION.emailRegex.test(email);
};

/**
 * Telefon raqam validatsiya (O'zbekiston formati)
 */
export const isValidPhone = (phone: string): boolean => {
  return VALIDATION.phoneRegex.test(phone);
};

/**
 * Parol validatsiya
 */
export const isValidPassword = (password: string): boolean => {
  return (
    password.length >= VALIDATION.minPasswordLength &&
    password.length <= VALIDATION.maxPasswordLength
  );
};

/**
 * Ism validatsiya
 */
export const isValidName = (name: string): boolean => {
  return (
    name.length >= VALIDATION.minNameLength &&
    name.length <= VALIDATION.maxNameLength
  );
};

/**
 * URL validatsiya
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Bo'sh emasligini tekshirish
 */
export const isNotEmpty = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value.trim().length > 0;
};

/**
 * Raqam ekanligini tekshirish
 */
export const isNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && value.trim() !== '';
};

/**
 * Musbat raqam ekanligini tekshirish
 */
export const isPositiveNumber = (value: string | number): boolean => {
  const num = typeof value === 'string' ? Number(value) : value;
  return !isNaN(num) && num > 0;
};

/**
 * Fayl hajmini tekshirish
 */
export const isValidFileSize = (file: File, maxSizeInBytes: number): boolean => {
  return file.size <= maxSizeInBytes;
};

/**
 * Fayl turini tekshirish
 */
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * Sana validatsiya (kelajakda emas)
 */
export const isNotFutureDate = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj <= new Date();
};

/**
 * Sana validatsiya (o'tmishda emas)
 */
export const isNotPastDate = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj >= new Date();
};

/**
 * Sana oralig'ini tekshirish
 */
export const isDateInRange = (
  date: Date | string,
  startDate: Date | string,
  endDate: Date | string
): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  return dateObj >= start && dateObj <= end;
};

/**
 * Validation error messages
 */
export const VALIDATION_MESSAGES = {
  required: 'Bu maydon to\'ldirilishi shart',
  email: 'Noto\'g\'ri email format',
  phone: 'Noto\'g\'ri telefon raqam format (+998XXXXXXXXX)',
  password: `Parol kamida ${VALIDATION.minPasswordLength} ta belgidan iborat bo'lishi kerak`,
  name: `Ism kamida ${VALIDATION.minNameLength} ta belgidan iborat bo'lishi kerak`,
  url: 'Noto\'g\'ri URL format',
  number: 'Faqat raqam kiritish mumkin',
  positiveNumber: 'Musbat raqam kiritish kerak',
  fileSize: 'Fayl hajmi juda katta',
  fileType: 'Noto\'g\'ri fayl turi',
  futureDate: 'Kelajakdagi sanani tanlash mumkin emas',
  pastDate: 'O\'tmishdagi sanani tanlash mumkin emas',
} as const;

