import { useCachedApi } from './useCachedApi';
import { fetchFooterData } from '../services/footerService';
import { FooterData } from '../types/footer.types';
import { useLocale } from '../contexts/LocaleContext';
import { useMemo } from 'react';

export const useFooterData = () => {
  const { locale } = useLocale();

  // Memozied fetcher to prevent infinite loops if useCachedApi dependency checking is strict
  const fetcher = useMemo(() => () => fetchFooterData(locale), [locale]);

  return useCachedApi<FooterData>({
    key: `footer-data-http-${locale}`, // Localized cache key
    fetcher: fetcher,
    ttlMinutes: 0.5 // 30 seconds as requested
  });
};