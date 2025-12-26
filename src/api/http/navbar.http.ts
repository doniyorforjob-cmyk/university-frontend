import apiClient from '../client';
import { NavItem } from '../../types/navbar.types';


export type { NavItem };

export const fetchNavItems = async (localeOverride?: string): Promise<NavItem[]> => {
  try {
    console.log('Fetching navbar from Navigation API...');
    const projectId = process.env.REACT_APP_PROJECT_ID;
    const locale = localeOverride || localStorage.getItem('locale') || 'en';

    // Use navigation tree API
    const response = await apiClient.get(`/projects/${projectId}/navigation/main/tree`);

    if (!response.data || !response.data.success) {
      throw new Error('Navigation API returned unsuccessful response');
    }

    const items = response.data.data?.items || [];

    // Route mapping based on known titles (fallback if backend URL is missing)
    const getRouteByTitle = (titleEn: string): string => {
      const map: Record<string, string> = {
        'News': '/news',
        'Announcements': '/announcements',
        'Events': '/announcements',
        'University': '/university',
        'About University': '/university',
        'Structure': '/organizational-structure',
        'Activities': '/activities',
        'Admission': '/admission',
        'Green University': '/yashil-universitet',
        'Eco Active Students': '/eco-active-students',
        'Information Services': '/information-services',
        'Contact': '/contact',
        'Appeals': '/appeals',
        'Media about us': '/media-about-us',
        'Information Service': '#', // Parent menu usually
        'Rectorate': '/organizational-structure',
        'Faculties': '/faculties'
      };

      const key = Object.keys(map).find(k => titleEn?.includes(k));
      return key ? map[key] : '#';
    };

    // Transform API response to NavItem format
    const transformItem = (item: any): NavItem => {
      // Try to get explicit backend URL first, then fallback to mapped route
      const backendUrl = item.url_uz || item.url_en || item.url_ru;
      const mappedRoute = getRouteByTitle(item.title?.en || '');

      return {
        title: item.title?.[locale] || item.title?.en || item.title?.uz || 'Menu Item',
        description: item.description?.[locale] || item.description?.en || item.description?.uz,
        href: backendUrl || mappedRoute,
        children: item.children?.map(transformItem) || []
      };
    };

    const navItems = items.map(transformItem);
    console.log('Navigation items loaded:', navItems.length);
    return navItems;

  } catch (error) {
    console.error('Error fetching navbar items from API:', error);
    throw error;
  }
};