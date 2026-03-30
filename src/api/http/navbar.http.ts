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
      const normalize = (s: string) => (s || '').toLowerCase().replace(/[‘’ʻʼ]/g, "'").trim();

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
        'International relations': '/international-activities',
        'Xalqaro aloqalar': '/international-activities',
        'Международное сотрудничество': '/international-activities',
        'International activity': '/international-activities',
        'Xalqaro faoliyat': '/international-activities',
        'Международная деятельность': '/international-activities',
        'News': '/news',
        'Announcements': '/announcements',
        'Events': '/announcements',
        'Public Council': '/public-council',
        'Jamoatchilik kengashi': '/public-council',
        'Общественный совет': '/public-council',
        'University Council': '/university/council',
        'Board of Trustees': '/university/council',
        'Council': '/university/council',
        'Kengash': '/university/council',
        'Universitet kengashi': '/university/council',
        'Universitetimiz kengashi': '/university/council',
        'Попечительский совет': '/university/council',
        'Учёный совет': '/university/council',
        'Ilmiy darajalar beruvchi ilmiy kengashlar': '/scientific-councils-awarding-academic-degrees',
        'Scientific Councils Awarding Academic Degrees': '/scientific-councils-awarding-academic-degrees',
        'Scientific councils': '/scientific-councils-awarding-academic-degrees',
        'Ilmiy kengashlar': '/scientific-councils-awarding-academic-degrees',
        'Научные советы': '/scientific-councils-awarding-academic-degrees',
        'About University': '/university',
        'University Rector': '/leadership/rector',
        'Universitet rektori': '/leadership/rector',
        'University': '/university',
        'Structure': '/organizational-structure',
        'Rectorate': '/organizational-structure',
        'Faculties': '/faculties',
        'Academic Departments': '/departments',
        'Kafedralar': '/departments',
        'Bo’limlar': '/sections',
        'Bo‘limlar': '/sections',
        'Bo\'limlar': '/sections',
        'Sections': '/sections',
        'Administrative Departments': '/sections',
        'Отделы': '/sections',
        'Departments': '/departments',
        'Students': '/students',
        'Talabalar': '/students',
        'Cтуденты': '/students',
        'Foreign Students': '/students/foreign',
        'Horijiy talabalar': '/students/foreign',
        'Иностранные студенты': '/students/foreign',
        'Corruption': '/corruption',
        'Fight against corruption': '/corruption',
        'Documents': '/documents',
        'Hujjatlar': '/documents',
        'Me\'yoriy hujjatlar': '/documents',
        'Нормативные документы': '/documents',
        'Regulatory documents': '/documents',
        'Step Into The Future': '/step-forward',
        'Kelajakka qadam': '/step-forward',
        'Activities': '/activities',
        'Faoliyat': '/activities',
        'Деятельность': '/activities',
        'Admission': '/admission',
        'Qabul': '/admission',
        'Приём': '/admission',
        'Admission Quota': '/admission-quota',
        'Qabul kvotasi': '/admission-quota',
        'Квота приема': '/admission-quota',
        'Masters Program': '/masters-program',
        'Magistratura': '/masters-program',
        'Магистратура': '/masters-program',
        'Green University': '/yashil-universitet',
        'Yashil Universitet': '/yashil-universitet',
        'Зеленый университет': '/yashil-universitet',
        'Eco-active students': '/eco-active-students',
        'Ekofaol talabalar': '/eco-active-students',
        'Экоактивные студенты': '/eco-active-students',
        'Ilmiy loyihalar': '/scientific-projects',
        'Scientific projects': '/scientific-projects',
        'Научные проекты': '/scientific-projects',
        'Ilmiy va ilmiy texnik tadbirlar': '/scientific-and-technical-events',
        'Scientific and scientific-technical events': '/scientific-and-technical-events',
        'Научные и научно-технические мероприятия': '/scientific-and-technical-events',
        'Oliy ta\'limdan keyingi ta\'lim': '/postgraduate-education',
        'Postgraduate Education': '/postgraduate-education',
        'Послевузовское образование': '/postgraduate-education',
        'Yakuniy nazorat savollar banki': 'https://quizbank.namdtu.uz/',
        'Final exam questions bank': 'https://quizbank.namdtu.uz/',
        'Банк вопросов итогового контроля': 'https://quizbank.namdtu.uz/',
        'Grant uchun ariza': 'https://grant.namdtu.uz/',
        'Application for grant': 'https://grant.namdtu.uz/',
        'Заявка pada grant': 'https://grant.namdtu.uz/',
        'Prezident qarorlari va farmoyishlari': '/presidential-decrees',
        'Presidential decrees and orders': '/presidential-decrees',
        'Указы и постановления Президента': '/presidential-decrees',
        'Bakalavriat': '/students/bachelor',
        'Bachelor': '/students/bachelor',
        'Бакалавриат': '/students/bachelor',
        'Measures of success': '/research-areas/isr/measures-for-isr',
        'ISR Measures': '/research-areas/isr/measures-for-isr',
      };


      let allTitles = '';
      if (typeof titles === 'string') {
        allTitles = titles;
      } else if (titles && typeof titles === 'object') {
        allTitles = Object.values(titles).join(' ');
      }

      const normalizedAll = normalize(allTitles);

      const key = Object.keys(map)
        .sort((a, b) => b.length - a.length) // Prioritize longer, more specific matches
        .find(k => {
          const normalizedK = normalize(k);
          // Precise matching for segments
          if (normalizedK === 'faoliyat' || normalizedK === 'activities') {
            return normalizedAll === normalizedK;
          }
          return normalizedAll.includes(normalizedK);
        });
      return key ? map[key] : '#';
    };

    // Transform API response to NavItem format (preserving all locales for instant switching)
    const transformItem = (item: any): NavItem => {
      // Robust URL extraction: check multiple possible fields from different API versions
      const backendUrl = item.url_uz || item.url_en || item.url_ru || item.url || item.path || item.href || item.link;

      // Ensure item.title is consistently an object for our overrides
      if (typeof item.title === 'string') {
        const t = item.title;
        item.title = { uz: t, ru: t, en: t };
      }

      // Rename "Hujjatlar" to "Me'yoriy hujjatlar" - check common variants using normalized comparison
      const normalize = (s: string) => (s || '').toLowerCase().replace(/[‘’ʻʼ]/g, "'").trim();
      const uzTitle = normalize(item.title?.uz);
      const enTitle = normalize(item.title?.en);

      if (uzTitle === 'hujjatlar' || enTitle === 'documents' || uzTitle === normalize("Me'yoriy hujjatlar")) {
        item.title = {
          uz: 'Me\'yoriy hujjatlar',
          ru: 'Нормативные документы',
          en: 'Regulatory documents'
        };
      }

      const mappedRoute = getRouteByTitle(item.title);
      
      // FORCE: For ISR related research areas, always show English title in the navbar
      // regardless of the CRM input for other languages as requested by user.
      if (mappedRoute.includes('/research-areas/isr')) {
        const enTitle = item.title?.en || (typeof item.title === 'string' ? item.title : 'ISR Research');
        item.title = {
          uz: enTitle,
          ru: enTitle,
          en: enTitle
        };
      }

      // FIX: Rename "Departments" (Kafedralar) to "Academic Departments" in English to avoid conflict with "Departments" (Bo'limlar)
      if (normalize(item.title?.uz) === 'kafedralar' || normalize(item.title?.en) === 'departments') {
        // Only rename if it's actually the academic departments node (usually identified by 'Kafedralar' in UZ)
        if (normalize(item.title?.uz) === 'kafedralar') {
          if (!item.title) item.title = {};
          item.title.en = 'Academic Departments';
        }
      }

      // URL normalization: fix known backend URL shortcuts
      const normalizeHref = (url: string): string => {
        if (!url || url === '#') return url;
        const u = url.toLowerCase().replace(/\/$/, '');
        // /council → /university/council (but not /public-council)
        if ((u === '/council' || u === 'council') && !u.includes('public')) return '/university/council';
        // /public-council → /public-council (already correct, keep as is)
        return url;
      };

      const rawHref = mappedRoute !== '#' ? mappedRoute : (backendUrl || '#');

      return {
        key: `${item.title?.en || 'nav-item'}-${item.id || Math.random()}`,
        title: item.title, // Keep as object {uz, ru, en}
        description: item.description, // Keep as object {uz, ru, en}
        href: normalizeHref(rawHref),
        children: item.children?.map(transformItem) || []
      };
    };

    // NEW: Recursive filtering based on locale
    const currentLocale = localeOverride || (typeof window !== 'undefined' ? localStorage.getItem('locale') || 'uz' : 'uz');
    
    const filterByLocale = (items: NavItem[], locale: string): NavItem[] => {
      const isEn = locale === 'en';
      
      return items.filter(item => {
        const href = item.href?.toLowerCase() || '';
        
        // Safer title extraction
        let titleEn = '';
        let titleUz = '';
        
        if (typeof item.title === 'object' && item.title !== null) {
          titleEn = String(item.title.en || '').toLowerCase();
          titleUz = String(item.title.uz || '').toLowerCase();
        } else if (typeof item.title === 'string') {
          titleEn = item.title.toLowerCase();
          titleUz = item.title.toLowerCase();
        }
        
        // Comprehensive check: if it's ISR related and not English locale, HIDE IT
        const isIsrRelated = 
          href.includes('research-areas/isr') || 
          href.includes('measures-for-isr') ||
          titleEn.includes('measures of success') ||
          titleEn.includes('isr research') ||
          titleUz.includes('measures of success'); 

        if (isIsrRelated && !isEn) {
          return false;
        }
        
        // Recursively filter children
        if (item.children && item.children.length > 0) {
          item.children = filterByLocale(item.children, locale);
        }
        return true;
      });
    };

    const navItems = items.map(transformItem);
    return filterByLocale(navItems, currentLocale);

  } catch (error) {
    console.error('Error fetching navbar items from API:', error);
    throw error;
  }
};