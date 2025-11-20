import { HomeInteractiveServicesData } from '../../../api/homeApi';

export const transformInteractiveServicesData = (apiData: any): HomeInteractiveServicesData => {
  const services = apiData.services || apiData.data || apiData.links || [];

  return {
    services: services.map((service: any) => ({
      id: service.id || Math.random(),
      title: service.title || service.name || '',
      description: service.description || service.content || '',
      href: service.href || service.link || service.url || '#',
      icon: service.icon || service.iconName || 'DocumentTextIcon'
    }))
  };
};