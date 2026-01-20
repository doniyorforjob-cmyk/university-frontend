import { useCachedApi } from './useCachedApi';

/**
 * Standard page hook - barcha sahifalar uchun umumiy konfiguratsiya
 * DRY prinsipi bo'yicha cache logikasini soddalshtiradi
 */
export const useStandardPage = <T = any>(
  pageName: string,
  fetcher: (locale?: string) => Promise<T>,
  options?: {
    ttlMinutes?: number;
    enabled?: boolean;
  }
) => {
  const {
    ttlMinutes = 0.5,
    enabled = true
  } = options || {};

  return useCachedApi({
    key: pageName,
    fetcher,
    ttlMinutes,
    enabled,
    keepPreviousData: true,
    onError: (error) => {
      console.error(`${pageName} sahifasi xatolik:`, error);
      // Bu yerda keyinchalik error reporting qo'shish mumkin
    },
    onSuccess: (data) => {
      console.log(`${pageName} sahifasi ma'lumotlari yuklandi:`, data?.length || 'Noma\'lum');
    }
  });
};

export default useStandardPage;