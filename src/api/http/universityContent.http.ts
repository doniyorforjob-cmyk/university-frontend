import apiClient from '../client';
import { ContentBlock } from '@/components/shared/ContentBuilder';

export const fetchUniversityContentBlocks = async (layout: 'grid' | 'accordion' | 'cards' = 'grid'): Promise<ContentBlock[]> => {
  // TODO: Haqiqiy API so'rovi shu yerda yoziladi
  console.warn("fetchUniversityContentBlocks: http versiyasi hali yozilmagan.");
  return [];
};