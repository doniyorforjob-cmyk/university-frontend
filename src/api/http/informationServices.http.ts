import apiClient from '../client';
import { InformationServicesData } from '../../types/informationServices.types';

export const fetchInformationServicesData = async (): Promise<InformationServicesData> => {
  // TODO: Haqiqiy API so'rovi shu yerda yoziladi
  console.warn("fetchInformationServicesData: http versiyasi hali yozilmagan.");
  return { blocks: [] };
};