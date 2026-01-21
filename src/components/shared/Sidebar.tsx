import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchNavItems, NavItem } from '@/services/navbarService';
import { useCachedApi } from '@/hooks/useCachedApi';
import { useLocale } from '@/contexts/LocaleContext';
import { getLocalized } from '@/utils/apiUtils';
import PrefetchLink from '@/components/shared/PrefetchLink';
import { BuildingLibraryIcon, PlayIcon } from '@heroicons/react/24/solid';

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

  // Find the active group based on the tree
  const findActiveGroup = (items: NavItem[]): { parentTitle: string; links: NavItem[] } | null => {
    for (const item of items) {
      const itemHref = normalizePath(item.href || '');

      // If current path matches or starts with parent path (e.g. /news/slug starts with /news)
      const isParentMatch = itemHref !== '/' && (normalizedCurrentPath === itemHref || normalizedCurrentPath.startsWith(itemHref + '/'));

      if (isParentMatch && item.children && item.children.length > 0) {
        return {
          parentTitle: getLocalized(item.title, locale),
          links: item.children
        };
      }

      // Check children level
      if (item.children) {
        for (const child of item.children) {
          const childHref = normalizePath(child.href || '');
          const isChildMatch = childHref !== '/' && (normalizedCurrentPath === childHref || normalizedCurrentPath.startsWith(childHref + '/'));

          if (isChildMatch) {
            return {
              parentTitle: getLocalized(item.title, locale),
              links: item.children
            };
          }

          // Check subchildren
          if (child.children) {
            for (const subChild of child.children) {
              const subChildHref = normalizePath(subChild.href || '');
              if (subChildHref !== '/' && (normalizedCurrentPath === subChildHref || normalizedCurrentPath.startsWith(subChildHref + '/'))) {
                return {
                  parentTitle: getLocalized(child.title, locale),
                  links: child.children
                };
              }
            }
          }
        }
      }
    }
    return null;
  };

  const activeGroup = navItemsRaw ? findActiveGroup(navItemsRaw) : null;
  const sidebarLinks = activeGroup?.links || [];

  if (sidebarLinks.length === 0) return null;

  const sidebarTitle = activeGroup?.parentTitle || '';

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
            // Check if active: either exact match or current page is a sub-page of this link
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
                {/* Active Indicator Bar - Absolute to prevent layout issues and gray borders */}
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