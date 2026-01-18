import { useQuery } from '@tanstack/react-query';
import { fetchStructureData } from '../services/structureService';
import { useLocale } from '../contexts/LocaleContext';

export const useStructureData = () => {
  const { locale } = useLocale();
  return useQuery({
    queryKey: ['structureData', locale],
    queryFn: () => fetchStructureData(locale),
  });
};