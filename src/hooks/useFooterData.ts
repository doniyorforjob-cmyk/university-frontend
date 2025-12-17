import { useQuery } from '@tanstack/react-query';
import { fetchFooterData } from '../services/footerService';
import { FooterData } from '../types/footer.types';

export const useFooterData = () => {
  return useQuery<FooterData, Error>({
    queryKey: ['footerData'],
    queryFn: fetchFooterData,
  });
};