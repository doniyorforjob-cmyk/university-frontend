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

  // Find the active group based on the tree with longest prefix match strategy
  const findActiveGroup = (items: NavItem[]): { parentTitle: string; links: NavItem[] } | null => {
    let bestMatch: { parentTitle: string; links: NavItem[], pathLength: number } | null = null;

    for (const item of items) {
      // Check Level 1 (Top) - usually we don't show siblings of top level, but if it matches, its children are the context
      // Actually, if Top Level matches, we usually want to show ITs children as the sidebar links.
      // So if item matches, parentTitle is item.title, links is item.children.
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

      // Check Level 2 (Children)
      if (item.children) {
        for (const child of item.children) {
          // If child matches, we want to show shared siblings (item.children) OR child's children?
          // Standard logic: Show siblings. parentTitle = item.title.
          // Exception: If child has children and we are INSIDE child, maybe show child's children?
          // The recursion logic above was:
          // If Child Matches -> Return Parent Title + Parent Children (Siblings)
          // If Child Matches AND has Subchildren -> What did we do?
          // The old logic returned the first match.

          // Let's stick to standard sidebar: Show SIBLINGS of the active item, unless active item is a section root?
          // Actually, if I click "University", I want to see "University" sub-pages.
          // If I click "University Council" (sub-page), I want to see "University" sub-pages (my siblings).

          // So:
          // 1. If Child Matches (University): matched path /university. 
          // We want to show Child's Siblings (Level 2 items) OR Child's Children (Level 3)?
          // IF "University" is a section header in the menu, we usually want to show its children.
          // But here "University" is a LINK.

          // Let's look at the old logic:
          // if (isParentMatch && item.children) -> return parentTitle=item.title, links=item.children (Show children of matched item)
          // if (isChildMatch) -> return parentTitle=item.title, links=item.children (Show siblings of matched item)

          // So if Parent matches, show Parent's children.
          // If Child matches, show Child's siblings (Parent's children).
          // If SubChild matches, show SubChild's siblings (Child's children).

          // Match Level 2 (Child)
          const childHref = normalizePath(child.href || '');
          if (childHref !== '/' && (normalizedCurrentPath === childHref || normalizedCurrentPath.startsWith(childHref + '/'))) {
            // If child has children, and we are deeper?
            // Actually, if we are at /university/council, Child (/university) matches.
            // SubChild (/university/council) matches.
            // SubChild is longer. 
            // So we should pick SubChild match.

            // What context for SubChild match?
            // Old logic:
            // if (subChildMatch) return parentTitle: child.title, links: child.children
            // (Show siblings of subChild, i.e., Level 3 items)

            // So we just need to collect matches and their corresponding contexts.

            // Context for Child match: Parent Title (Level 1), Links (Level 2 - Child's siblings)
            // WAIT, old logic for Child Match:
            // return { parentTitle: getLocalized(item.title, locale), links: item.children };
            // Yes, siblings.

            // Use this context for Level 2 match:
            if (!bestMatch || childHref.length > bestMatch.pathLength) {
              bestMatch = {
                parentTitle: getLocalized(item.title, locale), // Level 1 Title
                links: item.children, // Level 2 Links
                pathLength: childHref.length
              };
            }
          }

          // Check Level 3 (SubChildren)
          if (child.children) {
            for (const subChild of child.children) {
              const subChildHref = normalizePath(subChild.href || '');
              if (subChildHref !== '/' && (normalizedCurrentPath === subChildHref || normalizedCurrentPath.startsWith(subChildHref + '/'))) {
                // Context for SubChild match: Child Title (Level 2), Links (Level 3 - SubChild's siblings)
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

    // Check if we found nothing, but maybe Top Level match should have been caught?
    // Added Level 1 check above.

    return bestMatch;
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