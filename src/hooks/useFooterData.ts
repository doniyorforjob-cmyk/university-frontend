import { useQuery } from '@tanstack/react-query';
import { fetchFooterData } from '../api/footerApi';
import { FooterData } from '../types/footer';

export const useFooterData = () => {
  return useQuery<FooterData, Error>({
    queryKey: ['footerData'],
    queryFn: fetchFooterData,
  });
};