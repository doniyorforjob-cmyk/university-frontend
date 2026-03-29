import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchNavItems, NavItem } from '@/services/navbarService';
import { useCachedApi } from '@/hooks/useCachedApi';
import { useLocale } from '@/contexts/LocaleContext';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { getLocalized } from '@/utils/apiUtils';
import PrefetchLink from '@/components/shared/PrefetchLink';
import { BuildingLibraryIcon, PlayIcon } from '@heroicons/react/24/solid';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation(['common', 'pages']);
  const { locale } = useLocale();
  const location = useLocation();
  const { sidebarRootPath } = useGlobalLayout();

  const { data: navItemsRaw } = useCachedApi<NavItem[]>({
    key: `navbar-items`,
    fetcher: () => fetchNavItems(),
    ttlMinutes: 5,
    keepPreviousData: true
  });

  const currentPath = location.pathname;

  // Extremely robust path normalization to ensure active state works everywhere
  const normalizePath = (path: string) => {
    if (!path || path === '#' || path === '/') return '/';

    let p = path;

    // 1. Remove domain if absolute URL
    if (p.includes('://')) {
      try {
        p = new URL(p).pathname;
      } catch (e) {
        p = p.split('://')[1].split('/').slice(1).join('/');
      }
    }

    // 2. Remove language prefix consistently (/uz/, /uz, /en/, etc.)
    p = p.replace(/^\/(uz|en|ru)(\/|$)/, '/');

    // 3. Ensure single leading slash
    if (!p.startsWith('/')) p = '/' + p;

    // 4. Remove trailing slash for comparison consistency
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);

    // 5. Clean up any double slashes
    p = p.replace(/\/+/g, '/');

    // 6. University Specific Alias Mapping (Static Redirects/Aliases)
    const aliases: Record<string, string> = {
      '/appeals': '/applications-suggestions-and-complaints',
      '/information-service': '/information-services',
      '/markazlar': '/centers',
      '/university/council': '/council',
      '/board-of-trustees': '/council',
      '/universitet-kengashi': '/council',
      '/university/public-council': '/public-council',
      '/jamoatchilik-kengashi': '/public-council',
      '/events': '/announcements'
    };

    // Check if the base path (first segment) is an alias
    const firstSegment = '/' + p.split('/')[1];
    if (aliases[firstSegment]) {
      p = p.replace(firstSegment, aliases[firstSegment]);
    }

    return p || '/';
  };

  const normalizedCurrentPath = normalizePath(currentPath);

  // Recursive helper to find the most specific match and its parent chain
  const findAncestry = React.useCallback((items: NavItem[], path: string, parents: NavItem[] = []): { item: NavItem; ancestors: NavItem[] } | null => {
    let bestMatch: { item: NavItem; ancestors: NavItem[]; pathLength: number } | null = null;

    for (const item of items) {
      const itemHref = normalizePath(item.href || '');
      // Longest prefix match strategy
      if (itemHref !== '/' && (path === itemHref || path.startsWith(itemHref + '/'))) {
        if (!bestMatch || itemHref.length > bestMatch.pathLength) {
          bestMatch = { item, ancestors: parents, pathLength: itemHref.length };
        }
      }

      if (item.children && item.children.length > 0) {
        const childMatchChain = findAncestry(item.children, path, [...parents, item]);
        if (childMatchChain) {
          const matchHref = normalizePath(childMatchChain.item.href || '');
          if (!bestMatch || matchHref.length > bestMatch.pathLength) {
            bestMatch = { ...childMatchChain, pathLength: matchHref.length };
          }
        }
      }
    }
    return bestMatch;
  }, []);

  // Recursive search helper for fallback/specific group finding
  const findItemDeep = React.useCallback((items: NavItem[] | undefined, searchStrings: string[]): NavItem | undefined => {
    if (!items) return undefined;
    for (const item of items) {
      const titleText = getLocalized(item.title, locale).toLowerCase();
      if (searchStrings.some(s => titleText.includes(s))) return item;
      const found = findItemDeep(item.children, searchStrings);
      if (found) return found;
    }
    return undefined;
  }, [locale]);

  const searchPath = sidebarRootPath ? normalizePath(sidebarRootPath) : normalizedCurrentPath;

  // Determine which navigation group to display
  const sidebarData = React.useMemo(() => {
    if (!navItemsRaw) return null;

    // Use override path if provided by GlobalLayoutContext, otherwise use normalized current path
    let matchChain = findAncestry(navItemsRaw, searchPath);

    // Explicit Fallback for Structure-related pages if direct match fails or parent is not found
    const isStructureRelated =
      normalizedCurrentPath.startsWith('/sections') ||
      normalizedCurrentPath.startsWith('/leadership') ||
      normalizedCurrentPath.startsWith('/departments') ||
      normalizedCurrentPath.startsWith('/faculties');

    let parentTitle = '';
    let links: NavItem[] = [];

    // 1. PRIORITY Overrides: Check for explicit sections like Admission or Structure first
    const isAdmissionPath =
      normalizedCurrentPath.startsWith('/admission') ||
      searchPath.startsWith('/admission') ||
      normalizedCurrentPath.includes('for-international-applicants') ||
      searchPath.includes('/admission');

    const isStudentPath =
      !isAdmissionPath && (
        normalizedCurrentPath.startsWith('/students') ||
        searchPath.startsWith('/students') ||
        normalizedCurrentPath.includes('foreign') ||
        normalizedCurrentPath.includes('magistratura') ||
        normalizedCurrentPath.includes('master') ||
        normalizedCurrentPath.includes('attestation') ||
        normalizedCurrentPath.includes('grant') ||
        normalizedCurrentPath.includes('presidential-decree')
      );

    const isScientificPath =
      normalizedCurrentPath.startsWith('/scientific') ||
      searchPath.startsWith('/scientific') ||
      normalizedCurrentPath.includes('scientific-council');

    const isActivityPath =
      normalizedCurrentPath.startsWith('/activities') ||
      searchPath.startsWith('/activities') ||
      normalizedCurrentPath.includes('cultural-educational-activities') ||
      normalizedCurrentPath.includes('tutoring') ||
      normalizedCurrentPath.includes('spiritual-educational') ||
      normalizedCurrentPath.includes('sports-club-life');

    if (isAdmissionPath) {
      // Search by href '/admission' first to get the correct top-level Qabul node (not a child like 'Qabul kvotasi')
      let admissionItem = navItemsRaw.find(item => normalizePath(item.href || '') === '/admission');
      if (!admissionItem) {
        // Fallback: find any item whose href is /admission at any depth
        const findByHref = (items: NavItem[], href: string): NavItem | undefined => {
          for (const item of items) {
            if (normalizePath(item.href || '') === href) return item;
            if (item.children) {
              const found = findByHref(item.children, href);
              if (found) return found;
            }
          }
          return undefined;
        };
        admissionItem = findByHref(navItemsRaw, '/admission');
      }
      if (!admissionItem) {
        admissionItem = findItemDeep(navItemsRaw, ['qabul', 'admission', 'приём']);
      }
      if (admissionItem) {
        parentTitle = t('pages:admission', 'Qabul');
        links = [...(admissionItem.children || [])];
      }
    } else if (isStudentPath) {
      // First try by title, then by href
      let studentItem = findItemDeep(navItemsRaw, ['talabalar', 'students', 'студенты']);
      if (!studentItem) {
        studentItem = navItemsRaw.find(item => normalizePath(item.href || '') === '/students');
      }
      if (studentItem) {
        parentTitle = t('pages:students', 'Talabalar');
        links = [...(studentItem.children || [])];
      }
    } else if (isStructureRelated) {
      const structureItem = findItemDeep(navItemsRaw, ['tuzilma', 'structure', 'структура']);
      if (structureItem) {
        parentTitle = getLocalized(structureItem.title, locale);
        links = [...(structureItem.children || [])];
      }
    } else if (isScientificPath) {
      // Find specific "Ilmiy faoliyat" node
      const findByHref = (items: NavItem[], href: string): NavItem | undefined => {
        for (const item of items) {
          const itemHref = normalizePath(item.href || '');
          if (itemHref === href || itemHref.includes('scientific-activity')) return item;
          if (item.children) {
            const found = findByHref(item.children, href);
            if (found) return found;
          }
        }
        return undefined;
      };

      let scientificItem = findByHref(navItemsRaw, '/scientific-activity');
      if (!scientificItem) {
        scientificItem = findItemDeep(navItemsRaw, ['ilmiy faoliyat', 'scientific activity', 'научная деятельность', 'ilm-fan']);
      }

      if (scientificItem) {
        parentTitle = getLocalized(scientificItem.title, locale);
        links = [...(scientificItem.children || [])];
      }
    } else if (isActivityPath) {
      // Find specific "Madaniy-ma'rifiy faoliyat" or similar activity node
      const findByHref = (items: NavItem[], href: string): NavItem | undefined => {
        for (const item of items) {
          if (normalizePath(item.href || '') === href) return item;
          if (item.children) {
            const found = findByHref(item.children, href);
            if (found) return found;
          }
        }
        return undefined;
      };

      let activityItem = findByHref(navItemsRaw, '/cultural-educational-activities');

      if (!activityItem) {
        activityItem = findByHref(navItemsRaw, '/activities');
      }

      if (!activityItem) {
        activityItem = findItemDeep(navItemsRaw, ['madaniy-ma’rifiy', 'cultural-educational', 'культурно-просветительская']);
      }

      if (!activityItem) {
        activityItem = findItemDeep(navItemsRaw, ['faoliyat', 'activity', 'деятельности']);
      }

      if (activityItem) {
        parentTitle = getLocalized(activityItem.title, locale);
        links = [...(activityItem.children || [])];
      }
    }

    // 2. Generic Ancestry Matching (only if no priority override matched or yielded links)
    if (links.length === 0 && matchChain) {
      const { item, ancestors } = matchChain;
      const itemTitle = getLocalized(item.title, locale).toLowerCase();
      const isStudentNode = itemTitle.includes('talabalar') || itemTitle.includes('student') || itemTitle.includes('magistratura') || itemTitle.includes('masters-program') || itemTitle.includes('grant') || itemTitle.includes('xorijiy') || itemTitle.includes('foreign') || itemTitle.includes('attestation') || itemTitle.includes('yakuniy');

      const isUnderBoLimlar = ancestors.some(a => {
        const t = getLocalized(a.title, locale).toLowerCase();
        return t.includes('bo\'limlar') || t.includes('bo‘limlar') || t.includes('sections');
      });

      if (isUnderBoLimlar && isStudentNode) {
        const realStudents = findItemDeep(navItemsRaw, ['talabalar', 'students']) || navItemsRaw.find(item => normalizePath(item.href || '') === '/students');
        if (realStudents && realStudents.children && realStudents.children.length > 0) {
          parentTitle = t('pages:students', 'Talabalar');
          links = [...(realStudents.children || [])];
        } else {
          const parent = ancestors.length > 0 ? ancestors[ancestors.length - 1] : item;
          parentTitle = getLocalized(parent.title, locale);
          links = [...(parent.children || [])];
        }
      } else if (ancestors.length > 0) {
        const parent = ancestors[ancestors.length - 1];
        parentTitle = getLocalized(parent.title, locale);
        links = [...(parent.children || [])];
      } else {
        parentTitle = getLocalized(item.title, locale);
        links = [...(item.children || [])];
      }
    }

    if (!parentTitle || links.length === 0) return null;

    // Final Pass: Ensure all links have correct targets based on their titles
    const localePrefix = locale === 'uz' ? '' : `/${locale}`;

    const finalLinks = links.map(link => {
      const titleText = getLocalized(link.title, locale).toLowerCase();

      // Only apply these global overrides if they are not already pointing to a specific slug/detail page
      const currentHref = normalizePath(link.href || '');
      const isRootPath = currentHref === '/sections' || currentHref === '/departments' || currentHref === '/centers' || currentHref.length < 5;

      if (isRootPath && (titleText.includes('bo\'limlar') || titleText.includes('bo‘limlar') || titleText.includes('bo’limlar') || titleText.includes('sections') || titleText.includes('отделы'))) {
        return { ...link, href: `${localePrefix}/sections` };
      }
      if (isRootPath && (titleText.includes('kafedralar') || (titleText.includes('departments') && !titleText.includes('administrative')))) {
        return { ...link, href: `${localePrefix}/departments` };
      }
      if (isRootPath && (titleText === 'markazlar' || titleText === 'centers' || titleText === 'центры')) {
        return { ...link, href: `${localePrefix}/centers` };
      }

      // Enrich activity specific links
      if (titleText.includes('tyutor') || titleText.includes('tutoring') || titleText.includes('тьютор')) {
        return { ...link, href: `${localePrefix}/tutoring-activities` };
      }
      if (titleText.includes('sport klub') || titleText.includes('sports club') || titleText.includes('спортив')) {
        return { ...link, href: `${localePrefix}/sports-club-life` };
      }
      return link;
    });

    return { parentTitle, links: finalLinks };
  }, [navItemsRaw, normalizedCurrentPath, searchPath, locale, t, findAncestry, findItemDeep]);

  const sidebarLinks = sidebarData?.links || [];
  if (sidebarLinks.length === 0) return null;
  const sidebarTitle = sidebarData?.parentTitle || '';

  return (
    <aside className="w-full">
      <div className="bg-white shadow-md border border-gray-200 rounded-none overflow-hidden">
        {/* Sidebar Header */}
        <div className="bg-primary p-5 flex items-center gap-4 border-b-2 border-secondary">
          <BuildingLibraryIcon className="w-6 h-6 text-white shrink-0" />
          <h3 className="text-lg font-bold text-white uppercase tracking-widest leading-tight">
            {sidebarTitle}
          </h3>
        </div>

        {/* Sidebar Links */}
        <div className="divide-y divide-gray-200 bg-white">
          {sidebarLinks.map((link, idx) => {
            const linkPath = normalizePath(link.href || '');
            const isActive = linkPath !== '/' && (normalizedCurrentPath === linkPath || normalizedCurrentPath.startsWith(linkPath + '/'));

            return (
              <PrefetchLink
                key={idx}
                to={link.href || '#'}
                className={`
                  relative flex items-center p-4 transition-all duration-200 group rounded-none
                  ${isActive
                    ? 'bg-secondary/10 text-secondary'
                    : 'text-[#374151] hover:bg-gray-50/80 hover:text-secondary'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-secondary" />
                )}

                <div className={`
                  flex items-center gap-2 transition-all duration-300 transform
                  ${isActive ? 'translate-x-3' : 'group-hover:translate-x-2'}
                `}>
                  <PlayIcon className={`
                    w-3 h-3 text-secondary shrink-0 transition-all duration-300
                    ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100'}
                  `} />
                  <span className="text-base font-bold">
                    {getLocalized(link.title, locale)}
                  </span>
                </div>
              </PrefetchLink>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;