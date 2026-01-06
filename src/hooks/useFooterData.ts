import { useCachedApi } from './useCachedApi';
import { fetchFooterData } from '../services/footerService';
import { FooterData } from '../types/footer.types';

export const useFooterData = () => {
  return useCachedApi<FooterData>({
    key: 'footer-data-http',
    fetcher: fetchFooterData,
    ttlMinutes: 30
  });
};