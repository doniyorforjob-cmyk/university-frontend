import apiClient from '../client';
import { ContentBlock } from '../../components/shared/ContentBuilder';

export const fetchOrganizationalStructureData = async (): Promise<{ blocks: ContentBlock[] }> => {
  // TODO: Haqiqiy API so'rovi shu yerda yoziladi
  console.warn("fetchOrganizationalStructureData: http versiyasi hali yozilmagan.");
  return { blocks: [] };
};