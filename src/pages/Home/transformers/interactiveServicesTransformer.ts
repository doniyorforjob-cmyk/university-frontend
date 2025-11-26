import { HomeInteractiveServicesData } from '../../../api/homeApi';

export const transformInteractiveServicesData = (apiData: any): HomeInteractiveServicesData => {
  return {
    services: apiData.services || apiData.interactiveServices || []
  };
};