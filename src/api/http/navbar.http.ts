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
    const getRouteByTitle = (titles: any): string => {
      const map: Record<string, string> = {
        'Cultural and educational activities': '/cultural-educational-activities',
        'Madaniy-ma’rifiy faoliyat': '/cultural-educational-activities',
        'Культурно-просветительская деятельность': '/cultural-educational-activities',
        'Sports club life': '/sports-club-life',
        'Sport klubi hayoti': '/sports-club-life',
        'Жизнь спортивного клуба': '/sports-club-life',
        'Cultural and entertainment events': '/cultural-events',
        'Madaniy va ko‘ngilochar tadbirlar': '/cultural-events',
        'Культурно-развлекательные мероприятия': '/cultural-events',
        'Spiritual-educational section': '/spiritual-educational-section',
        'Ma’naviy-ma’rifiy rukn': '/spiritual-educational-section',
        'Духовно-просветительский раздел': '/spiritual-educational-section',
        'Scientific Activity': '/scientific-activity',
        'Ilmiy faoliyat': '/scientific-activity',
        'Научная деятельность': '/scientific-activity',
        'Financial Activity': '/financial-activity',
        'Moliyaviy faoliyat': '/financial-activity',
        'Финансовая деятельность': '/financial-activity',
        'International relations': '/sections/xalqaro-hamkorlik-bolimi',
        'Xalqaro aloqalar': '/sections/xalqaro-hamkorlik-bolimi',
        'Международное сотрудничество': '/sections/xalqaro-hamkorlik-bolimi',
        'News': '/news',
        'Announcements': '/announcements',
        'Events': '/announcements',
        'Public Council': '/university/public-council',
        'Jamoatchilik kengashi': '/university/public-council',
        'University Council': '/university/council',
        'Board of Trustees': '/university/council',
        'Council': '/university/council',
        'About University': '/university',
        'University Rector': '/leadership/rector',
        'Universitet rektori': '/leadership/rector',
        'University': '/university',
        'Structure': '/organizational-structure',
        'Rectorate': '/organizational-structure',
        'Faculties': '/faculties',
        'Academic Departments': '/departments',
        'Departments': '/departments',
        'Corruption': '/corruption',
        'Fight against corruption': '/corruption',
        'Documents': '/documents',
        'Hujjatlar': '/documents',
        'Step Into The Future': '/step-forward',
        'Kelajakka qadam': '/step-forward',
        'Activities': '/activities',
        'Faoliyat': '/activities',
        'Деятельность': '/activities'
      };

      let allTitles = '';
      if (typeof titles === 'string') {
        allTitles = titles.toLowerCase();
      } else if (titles && typeof titles === 'object') {
        allTitles = Object.values(titles).join(' ').toLowerCase();
      }

      const key = Object.keys(map).find(k => allTitles.includes(k.toLowerCase()));
      return key ? map[key] : '#';
    };

    // Transform API response to NavItem format (preserving all locales for instant switching)
    const transformItem = (item: any): NavItem => {
      const backendUrl = item.url_uz || item.url_en || item.url_ru;
      const mappedRoute = getRouteByTitle(item.title);

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