/**
 * Formatting Utilities
 * Sana, raqam, matn formatlash funksiyalari
 */

/**
 * Sanani formatlash
 * @param date - Sana (string yoki Date)
 * @param locale - Til (default: 'uz-UZ')
 * @returns Formatlangan sana
 */
export const formatDate = (
  date: string | Date,
  locale: string = 'uz-UZ',
  options?: Intl.DateTimeFormatOptions
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  };
  
  return dateObj.toLocaleDateString(locale, defaultOptions);
};

/**
 * Sana va vaqtni formatlash
 */
export const formatDateTime = (
  date: string | Date,
  locale: string = 'uz-UZ'
): string => {
  return formatDate(date, locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Nisbiy vaqtni formatlash (masalan: "2 soat oldin")
 */
export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Hozirgina';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} daqiqa oldin`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} soat oldin`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} kun oldin`;
  
  return formatDate(dateObj);
};

/**
 * Raqamni formatlash (masalan: 1000 -> 1,000)
 */
export const formatNumber = (
  num: number,
  locale: string = 'uz-UZ'
): string => {
  return num.toLocaleString(locale);
};

/**
 * Pul miqdorini formatlash
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'UZS',
  locale: string = 'uz-UZ'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Foizni formatlash
 */
export const formatPercent = (
  value: number,
  decimals: number = 0
): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Telefon raqamini formatlash
 * @example formatPhone('+998901234567') => '+998 90 123 45 67'
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('998') && cleaned.length === 12) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
  }
  
  return phone;
};

/**
 * Matnni qisqartirish
 * @param text - Matn
 * @param maxLength - Maksimal uzunlik
 * @param suffix - Qo'shimcha (default: '...')
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix: string = '...'
): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Slug yaratish (URL uchun)
 * @example createSlug('Namangan Davlat Universiteti') => 'namangan-davlat-universiteti'
 */
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Birinchi harfni katta qilish
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Har bir so'zning birinchi harfini katta qilish
 */
export const capitalizeWords = (text: string): string => {
  return text
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * File size ni formatlash
 * @example formatFileSize(1024) => '1 KB'
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

