import { HomeInteractiveServicesData } from '../../../types/home.types'; // Fixed import path
import { getImageUrl } from '../../../utils/apiUtils';

export const transformInteractiveServicesData = (apiData: any): HomeInteractiveServicesData => {
  const rawItems = Array.isArray(apiData)
    ? apiData
    : (Array.isArray(apiData?.data) ? apiData.data : (apiData?.data ? [apiData.data] : []));

  const services = rawItems.map((item: any) => {
    const fields = item.fields || {};

    // Icon can be an SVG string or a key name.
    // If it's an image object (rare for icon but possible), handle it.
    let iconValue = fields.icon || item.icon || 'DocumentTextIcon';
    if (typeof iconValue === 'object') {
      iconValue = iconValue.url || iconValue.path || 'DocumentTextIcon';
    }

    return {
      id: item.uuid || item.id || Math.random(),
      title: fields.title || item.title || '',
      description: fields.description || item.description || '',
      href: fields.url || fields.href || item.url || '#',
      icon: iconValue,
      color: fields.color || item.color || '', // Map backend color
      createdAt: item.created_at || item.createdAt || ''
    };
  }).sort((a: any, b: any) => {
    // Sort: Newest First (Descending)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).slice(0, 6); // Limit to 6 items

  return {
    services: services
  };
};