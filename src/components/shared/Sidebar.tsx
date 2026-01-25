import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchNavItems, NavItem } from '@/services/navbarService';
import { useCachedApi } from '@/hooks/useCachedApi';
import { useLocale } from '@/contexts/LocaleContext';
import { getLocalized } from '@/utils/apiUtils';
import PrefetchLink from '@/components/shared/PrefetchLink';
import { BuildingLibraryIcon, PlayIcon } from '@heroicons/react/24/solid';
import { slugify } from '@/utils/transliterate';

export const Sidebar: React.FC = () => {
  useTranslation(['common', 'pages']);
  const { locale } = useLocale();
  const location = useLocation();

  const { data: navItemsRaw } = useCachedApi<NavItem[]>({
    key: `navbar-items`,
    fetcher: () => fetchNavItems(),
    ttlMinutes: 5,
    keepPreviousData: true
  });

  // State for dynamic content (mirroring Navbar for consistency)
  const [viceRectors, setViceRectors] = React.useState<any[]>([]);
  const [adminDepartments, setAdminDepartments] = React.useState<any[]>([]);
  const [academicDepartments, setAcademicDepartments] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchDynamicContent = async () => {
      try {
        const { getLeadershipApi } = await import('../../api/http/leadership.http');
        const { getAdministrativeDepartments, getDepartments } = await import('../../api/http/department.http');

        const [leadership, admins, academics] = await Promise.all([
          getLeadershipApi(locale),
          getAdministrativeDepartments(locale),
          getDepartments(locale)
        ]);

        setViceRectors(leadership);
        setAdminDepartments(admins);
        setAcademicDepartments(academics);
      } catch (err) {
        console.error('Failed to fetch dynamic sidebar content:', err);
      }
    };
    fetchDynamicContent();
  }, [locale]);

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

    return p || '/';
  };

  const normalizedCurrentPath = normalizePath(currentPath);

  // Find the active group based on the tree with longest prefix match strategy
  const findActiveGroup = React.useCallback((items: NavItem[]): { parentTitle: string; links: NavItem[] } | null => {
    let bestMatch: { parentTitle: string; links: NavItem[], pathLength: number } | null = null;

    for (const item of items) {
      const itemHref = normalizePath(item.href || '');
      if (itemHref !== '/' && (normalizedCurrentPath === itemHref || normalizedCurrentPath.startsWith(itemHref + '/'))) {
        if (item.children && item.children.length > 0) {
          if (!bestMatch || itemHref.length > bestMatch.pathLength) {
            bestMatch = {
              parentTitle: getLocalized(item.title, locale),
              links: item.children,
              pathLength: itemHref.length
            };
          }
        }
      }

      if (item.children) {
        for (const child of item.children) {
          const childHref = normalizePath(child.href || '');
          if (childHref !== '/' && (normalizedCurrentPath === childHref || normalizedCurrentPath.startsWith(childHref + '/'))) {
            if (!bestMatch || childHref.length > bestMatch.pathLength) {
              bestMatch = {
                parentTitle: getLocalized(item.title, locale), // Level 1 Title
                links: item.children, // Level 2 Links
                pathLength: childHref.length
              };
            }
          }

          if (child.children) {
            for (const subChild of child.children) {
              const subChildHref = normalizePath(subChild.href || '');
              if (subChildHref !== '/' && (normalizedCurrentPath === subChildHref || normalizedCurrentPath.startsWith(subChildHref + '/'))) {
                if (!bestMatch || subChildHref.length > bestMatch.pathLength) {
                  bestMatch = {
                    parentTitle: getLocalized(child.title, locale), // Level 2 Title
                    links: child.children, // Level 3 Links
                    pathLength: subChildHref.length
                  };
                }
              }
            }
          }
        }
      }
    }

    return bestMatch;
  }, [locale, normalizedCurrentPath]);

  // 1. Find the active group (RAW data)
  const activeGroup = React.useMemo(() => {
    if (!navItemsRaw) return null;
    return findActiveGroup(navItemsRaw);
  }, [navItemsRaw, findActiveGroup]);

  // 2. Prepare the links for rendering (DYNAMIC transformation without mutation)
  const sidebarData = React.useMemo(() => {
    if (!activeGroup) return null;

    const parentTitle = activeGroup.parentTitle;
    let links = [...(activeGroup.links || [])]; // Shallow copy

    const isAdminSection = (
      parentTitle === 'Ma\'muriyat' ||
      parentTitle === 'Rahbariyat' ||
      parentTitle === 'Administration' ||
      parentTitle === 'Leadership' ||
      parentTitle === 'Руководство'
    );

    if (isAdminSection && viceRectors.length > 0) {
      const leadershipOnly = viceRectors.filter(v =>
        v.isMain ||
        v.position.toLowerCase().includes('prorektor') ||
        v.position.toLowerCase().includes('ректор') ||
        v.position.toLowerCase().includes('rector')
      );
      links = leadershipOnly.map(v => ({
        title: v.position,
        href: `/leadership/${v.slug || v.id}`
      }));
    }

    const isCentersSection = (
      parentTitle === 'Markazlar' ||
      parentTitle === 'Centers' ||
      parentTitle === 'Центры'
    );

    if (isCentersSection) {
      links = links.map(link => {
        const title = getLocalized(link.title, locale);
        let stableSlug = slugify(title);
        const lowerTitle = title.toLowerCase();

        if (lowerTitle.includes('raqamli') || lowerTitle.includes('цифровых') || lowerTitle.includes('digital')) {
          stableSlug = 'raqamli-talim-markazi';
        } else if (lowerTitle.includes('innovatsiya') || lowerTitle.includes('инноваций') || lowerTitle.includes('innovation')) {
          stableSlug = 'innovatsiyalar-markazi';
        } else if (lowerTitle.includes('axborot') || lowerTitle.includes('информационно') || lowerTitle.includes('information')) {
          stableSlug = 'axborot-resurs-markazi';
        } else if (lowerTitle.includes('bandlik') || lowerTitle.includes('karyera') || lowerTitle.includes('карьеры') || lowerTitle.includes('career')) {
          stableSlug = 'karyera-markazi';
        }

        if (stableSlug) {
          return { ...link, href: `/centers/${stableSlug}` };
        }
        return link;
      });
    }

    const isSectionsSection = (
      parentTitle === 'Bo\'limlar' ||
      parentTitle === 'Bo‘limlar' ||
      parentTitle === 'Sections' ||
      parentTitle === 'Отделы'
    );

    if (isSectionsSection && adminDepartments.length > 0) {
      links = adminDepartments.map(d => ({
        title: d.name,
        href: `/sections/${d.slug}`
      }));
    }

    const isAcademicDeptsSection = (
      parentTitle === 'Kafedralar' ||
      parentTitle === 'Academic Departments' ||
      parentTitle === 'Кафедры'
    );

    if (isAcademicDeptsSection && academicDepartments.length > 0) {
      links = academicDepartments.map(d => ({
        title: d.name,
        href: `/departments/${d.slug}`
      }));
    }

    return { parentTitle, links };
  }, [activeGroup, viceRectors, adminDepartments, academicDepartments, locale]);

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