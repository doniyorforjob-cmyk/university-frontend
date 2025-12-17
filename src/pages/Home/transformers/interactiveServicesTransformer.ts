import { HomeInteractiveServicesData } from '../../../services/homeService';

export const transformInteractiveServicesData = (apiData: any): HomeInteractiveServicesData => {
  return {
    services: apiData.services || apiData.interactiveServices || []
  };
};