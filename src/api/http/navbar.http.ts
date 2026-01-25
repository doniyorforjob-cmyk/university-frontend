import apiClient from '../client';
import { NavItem } from '../../types/navbar.types';


export type { NavItem };

export const fetchNavItems = async (localeOverride?: string): Promise<NavItem[]> => {
  try {
    const projectId = process.env.REACT_APP_PROJECT_ID;

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
        // Check specific council types BEFORE generic ones
        'Public Council': '/university/public-council',
        'Jamoatchilik kengashi': '/university/public-council',
        'University Council': '/university/council',
        'Board of Trustees': '/university/council',
        'Council': '/university/council',
        'About University': '/university', // Must be before 'University'
        'University Rector': '/leadership/rector',
        'Universitet rektori': '/leadership/rector',
        'University': '/university',
        'Structure': '/organizational-structure',
        'Rectorate': '/organizational-structure',
        'Faculties': '/faculties',
        'Academic Departments': '/departments',
        'Departments': '/departments',
        'Corruption': '/corruption',
        'Fight against corruption': '/corruption'
      };

      const key = Object.keys(map).find(k => titleEn?.includes(k));
      return key ? map[key] : '#';
    };

    // Transform API response to NavItem format (preserving all locales for instant switching)
    const transformItem = (item: any): NavItem => {
      const backendUrl = item.url_uz || item.url_en || item.url_ru;
      const mappedRoute = getRouteByTitle(item.title?.en || '');

      // FIX: Rename "Departments" (Kafedralar) to "Academic Departments" in English to avoid conflict with "Departments" (Bo'limlar)
      if (item.title?.uz === 'Kafedralar' || item.title?.en === 'Departments') {
        // Only rename if it's actually the academic departments node (usually identified by 'Kafedralar' in UZ)
        if (item.title?.uz === 'Kafedralar') {
          if (!item.title) item.title = {};
          item.title.en = 'Academic Departments';
        }
      }

      return {
        key: item.title?.en,
        title: item.title, // Keep as object {uz, ru, en}
        description: item.description, // Keep as object {uz, ru, en}
        href: mappedRoute !== '#' ? mappedRoute : (backendUrl || '#'),
        children: item.children?.map(transformItem) || []
      };
    };

    const navItems = items.map(transformItem);
    return navItems;

  } catch (error) {
    console.error('Error fetching navbar items from API:', error);
    throw error;
  }
};