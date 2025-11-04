import { useQuery } from '@tanstack/react-query';
import { fetchStructureData } from '../api/structureApi';

export const useStructureData = () => {
  return useQuery({
    queryKey: ['structureData'],
    queryFn: fetchStructureData,
  });
};