import { useQuery } from '@tanstack/react-query';
import { fetchStructureData } from '../services/structureService';

export const useStructureData = () => {
  return useQuery({
    queryKey: ['structureData'],
    queryFn: fetchStructureData,
  });
};