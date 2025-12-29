import { useCachedApi } from './useCachedApi';
import { useLocale } from '../contexts/LocaleContext';

/**
 * Standard page hook - barcha sahifalar uchun umumiy konfiguratsiya
 * DRY prinsipi bo'yicha cache logikasini soddalshtiradi
 */
export const useStandardPage = <T = any>(
  pageName: string,
  fetcher: () => Promise<T>,
  options?: {
    ttlMinutes?: number;
    enabled?: boolean;
  }
) => {
  const { locale } = useLocale();
  const {
    ttlMinutes = 0.5,
    enabled = true
  } = options || {};

  return useCachedApi({
    key: `${pageName}-data-${locale}`,
    fetcher,
    ttlMinutes,
    enabled,
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