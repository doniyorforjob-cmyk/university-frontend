import React, { useState, useRef, useEffect, JSX } from 'react';
import { useLocation } from 'react-router-dom';
import useClickOutside from '../../../hooks/useClickOutside';
import { fetchNavItems, NavItem } from '../../../services/navbarService';
import { useCachedApi } from '../../../hooks/useCachedApi';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../../contexts/LocaleContext';
import Container from '../../shared/Container';
import { PrefetchLink } from '../../shared';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import NavbarSkeleton from './NavbarSkeleton';
import { AnimatePresence, motion } from 'framer-motion';
import { getLocalized } from '../../../utils/apiUtils';
import { getFaculties } from '../../../api/http/faculties.http';
import { getDepartments } from '../../../api/http/department.http';

interface NavbarProps {
  isSticky: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSticky }) => {
  const { t } = useTranslation('common');
  const { locale } = useLocale();
  const { data: navItemsRaw, loading } = useCachedApi<NavItem[]>({
    key: `navbar-items`, // Match prefetchService key
    fetcher: () => fetchNavItems(),
    ttlMinutes: 0.5, // 30 seconds
    keepPreviousData: true
  });

  // State for dynamic content
  const [faculties, setFaculties] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  // Fetch dynamic content when locale changes
  useEffect(() => {
    const fetchDynamicContent = async () => {
      try {
        const [facs, depts] = await Promise.all([
          getFaculties(locale),
          getDepartments(locale)
        ]);
        console.log('RAW API Departments Response:', depts);
        setFaculties(facs);
        setDepartments(depts);
      } catch (err) {
        console.error('Failed to fetch dynamic navbar content:', err);
      }
    };
    fetchDynamicContent();
  }, [locale]);

  // Local locale-based transformation for instant switching
  const displayNavItems = React.useMemo(() => {
    if (!navItemsRaw || !Array.isArray(navItemsRaw)) return [];

    const transformRecursive = (item: NavItem): any => {
      // Basic transformation
      const transformed = {
        ...item,
        title: getLocalized(item.title, locale) || 'Menu Item',
        description: getLocalized(item.description, locale),
        children: item.children?.map(transformRecursive) || []
      };

      // Enrich "Tuzilma" -> "Fakultetlar"
      // Check distinct title in stable language (uz) to ensure it works across all locales
      const isFaculties = (item.title as any)?.uz === 'Fakultetlar' || (item.title as any)?.en === 'Faculties';

      if (isFaculties && faculties.length > 0) {
        transformed.children = faculties.map(f => ({
          title: f.name,
          href: `/faculties/${f.slug}`,
          children: []
        }));
      }

      // Enrich "Tuzilma" -> "Kafedralar"
      // FIX: Only target the specific "Kafedralar" node. 
      // Do NOT include 'Departments' check because it matches "Bo'limlar" (Functional Departments) which should come from Navigation.
      const isDepartments = (item.title as any)?.uz === 'Kafedralar' || (item.title as any)?.en === 'Academic Departments';

      if (isDepartments) {
        const hasDepts = departments && departments.length > 0;
        console.log('Enriching Kafedralar:', { hasDepts, count: hasDepts ? departments.length : 0 });

        if (hasDepts) {
          // Helper to generate slug locally if missing from API
          const slugify = (text: string) =>
            text
              .toLowerCase()
              .replace(/['"ʻ`]/g, '')
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .trim();

          transformed.children = departments.map((d, idx) => {
            const title = d.title || d.name || 'Nomsiz Kafedra';
            const finalSlug = d.slug || slugify(title);
            return {
              id: d.id || `dept-${idx}`,
              title: title,
              href: `/departments/${finalSlug || d.id}`,
              children: []
            };
          });
        }
      }

      return transformed;
    };

    return navItemsRaw.map(transformRecursive);
  }, [navItemsRaw, locale, faculties, departments]);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredCategoryTitle, setHoveredCategoryTitle] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // DERIVE THE CURRENT HOVERED OBJECT FROM LATEST DATA
  // This ensures that when displayNavItems updates (API data arrives), the UI updates too.
  const currentHoveredCategory = React.useMemo(() => {
    if (!activeDropdown || !hoveredCategoryTitle) return null;
    const activeItem = displayNavItems.find((item: any) => item.title === activeDropdown);
    if (!activeItem || !activeItem.children) return null;
    return activeItem.children.find((child: any) => child.title === hoveredCategoryTitle) || null;
  }, [displayNavItems, activeDropdown, hoveredCategoryTitle]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
    setIsSearchOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useClickOutside(navRef, () => {
    setActiveDropdown(null);
    setHoveredCategoryTitle(null);
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
    setIsSearchOpen(false);
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileSubmenu = (title: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === title ? null : title);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    setHoveredCategoryTitle(null);
  };

  const getSectionIcon = (): JSX.Element => {
    return <BuildingLibraryIcon className="h-9 w-9 text-[#0E104B]" />;
  };

  return (
    <div className="font-sans bg-primary" ref={navRef}>
      {/* ==== DESKTOP NAVBAR ==== */}
      <Container>
        <nav className="relative hidden lg:flex items-center justify-between w-full h-16">
          {loading && !displayNavItems.length ? (
            <NavbarSkeleton isSticky={isSticky} />
          ) : (
            <div className="flex h-full items-center transition-opacity duration-500 opacity-100">
              <AnimatePresence>
                {isSticky && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden h-full"
                  >
                    <PrefetchLink
                      to="/"
                      className="flex items-center h-full px-4 text-[#0E104B] bg-white hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap"
                      title="Bosh sahifa"
                      onClick={closeDropdown}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </PrefetchLink>
                  </motion.div>
                )}
              </AnimatePresence>

              {displayNavItems.map((item: any) => {
                const hasCategories = item.children && item.children.some((child: any) => child.children && child.children.length > 0);

                return (
                  <div key={String(item.title)} className="group h-full">
                    <PrefetchLink
                      to={item.href || '#'}
                      onMouseEnter={async () => {
                        const { prefetchService } = await import('../../../services/prefetchService');
                        if (item.href === '/news') prefetchService.prefetchNewsPage();
                        if (item.href === '/') prefetchService.prefetchHomeNews();

                        if (item.children) {
                          setActiveDropdown(String(item.title));
                          if (item.children.length > 0) {
                            setHoveredCategoryTitle(item.children[0].title);
                          }
                        }
                      }}
                      onClick={() => {
                        closeDropdown();
                        if (item.children) {
                          (document.activeElement as HTMLElement)?.blur();
                        }
                      }}
                      className={`group flex items-center h-full px-4 text-base font-bold transition-colors duration-300 cursor-pointer relative text-white`}
                    >
                      {item.title}
                      {item.children && <ChevronDownIcon className="w-5 h-5 ml-1" />}
                      <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                    </PrefetchLink>

                    {/* ==== DROPDOWN ==== */}
                    {item.children && activeDropdown === item.title && (
                      <div
                        className="absolute top-full left-0 right-0 z-50 pointer-events-none bg-white"
                        onMouseEnter={() => setActiveDropdown(String(item.title))}
                        onMouseLeave={() => {
                          setActiveDropdown(null);
                          setHoveredCategoryTitle(null);
                        }}
                      >
                        <div className="pointer-events-auto">
                          <div className="bg-white border-t border-gray-100 shadow-2xl overflow-hidden animate-slide-in-bottom">
                            <div className="grid grid-cols-3 divide-x divide-gray-100">
                              {/* LEFT PANEL (1/3) */}
                              <div className="p-8 space-y-6">
                                <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                                  <div className="p-3 bg-gray-50 rounded-lg">
                                    {getSectionIcon()}
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-bold text-[#0E104B]">{String(item.title)}</h3>
                                    <p className="text-xs font-bold text-primary uppercase tracking-wider">{t('university')}</p>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed italic">
                                  {String(item.description || t('navbar.about_university_sections'))}
                                </p>
                              </div>

                              {/* CENTER AND RIGHT PANELS (The remaining 2/3) */}
                              {hasCategories ? (
                                <>
                                  {/* CENTER - Parent Categories (1/3) */}
                                  <div className="p-6">
                                    <h4 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-4">{t('navbar.sections')}</h4>
                                    <div className="flex flex-col space-y-1">
                                      {item.children!.map((parent: any, idx: number) => (
                                        <div
                                          key={parent.id || parent.title || idx}
                                          onMouseEnter={() => setHoveredCategoryTitle(parent.title)}
                                          className={`
                                            cursor-pointer transition-all duration-150 border-r-2
                                            ${currentHoveredCategory?.title === parent.title
                                              ? 'bg-gray-200 text-primary border-primary'
                                              : 'text-gray-700 hover:bg-gray-200 border-transparent'
                                            }
                                          `}
                                        >
                                          <PrefetchLink
                                            to={parent.href || '#'}
                                            onClick={closeDropdown}
                                            className="block w-full"
                                          >
                                            <motion.div
                                              whileHover={{ x: 8 }}
                                              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                              className="flex items-center justify-between px-4 py-3"
                                            >
                                              <span className="font-bold">{parent.title}</span>
                                              <ChevronRightIcon className={`h-4 w-4 transition-transform ${currentHoveredCategory?.title === parent.title ? 'translate-x-1' : 'opacity-0'}`} />
                                            </motion.div>
                                          </PrefetchLink>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* RIGHT - Child Links (1/3) */}
                                  <div className="p-6 bg-gray-50/30">
                                    {currentHoveredCategory ? (
                                      <div className="animate-fade-in">
                                        <div className="flex items-center justify-between mb-4">
                                          <h4 className="text-xs font-black text-gray-300 uppercase tracking-widest">{t('navbar.links')}</h4>
                                          {currentHoveredCategory.children && currentHoveredCategory.children.length > 7 && (
                                            <PrefetchLink
                                              to={currentHoveredCategory.href || '#'}
                                              onClick={closeDropdown}
                                              className="text-xs font-black text-primary hover:underline uppercase tracking-tight"
                                            >
                                              {t('navbar.all')}
                                            </PrefetchLink>
                                          )}
                                        </div>
                                        <div className="grid grid-cols-1 gap-1">
                                          {currentHoveredCategory.children && currentHoveredCategory.children.length > 0 ? (
                                            currentHoveredCategory.children.slice(0, 7).map((child: any, idx: number) => (
                                              <PrefetchLink
                                                key={child.id || child.title || idx}
                                                to={child.href || '#'}
                                                className="
                                                  block text-gray-800 hover:text-black hover:bg-gray-300/40 hover:shadow-sm
                                                  transition-all duration-150 border-b border-transparent rounded-md group/link
                                                "
                                              >
                                                <motion.div
                                                  whileHover={{ x: 8 }}
                                                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                  className="flex items-center gap-3 py-2 px-3"
                                                >
                                                  <div className="h-1.5 w-1.5 bg-gray-500 group-hover/link:bg-black rounded-full flex-shrink-0" />
                                                  <span className="text-base font-semibold text-gray-900 relative z-10 flex-1">
                                                    {child.title || 'Untitled'}
                                                  </span>
                                                </motion.div>
                                              </PrefetchLink>
                                            ))
                                          ) : (
                                            <div className="p-6 text-center border-2 border-dashed border-gray-100 rounded-lg">
                                              <p className="text-gray-400 text-sm italic">{t('navbar.no_links')}</p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                        <BuildingLibraryIcon className="h-12 w-12 text-gray-200 mb-2" />
                                        <p className="text-gray-400 text-sm">{t('navbar.select_section')}</p>
                                      </div>
                                    )}
                                  </div>
                                </>
                              ) : (
                                /* FLAT LAYOUT (2/3) */
                                <div className="col-span-2 p-8 grid grid-cols-2 gap-x-8 gap-y-2 content-start">
                                  {item.children!.map((link: any, idx: number) => (
                                    <PrefetchLink
                                      key={link.id || link.title || idx}
                                      to={link.href || '#'}
                                      onClick={closeDropdown}
                                      className="
                                          flex h-full items-center text-gray-800 hover:text-black hover:bg-gray-200
                                          transition-all duration-150 border-b border-black/10
                                        "
                                    >
                                      <motion.div
                                        whileHover={{ x: 8 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        className="flex items-center gap-3 py-3 px-4 w-full"
                                      >
                                        <ChevronRightIcon className="h-4 w-4 text-black" />
                                        <span className="text-base font-bold">{link.title}</span>
                                      </motion.div>
                                    </PrefetchLink>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* SEARCH ICON */}
          <div className="relative h-full ml-16 group">
            <button
              onClick={toggleSearch}
              className="flex items-center h-full px-4 text-base font-medium text-white hover:bg-navbar-dropdown hover:text-black transition-colors duration-300 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </button>

            {/* SEARCH DROPDOWN */}
            <div className={`absolute top-[100%] right-0 w-80 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="relative p-4">
                <input
                  type="text"
                  placeholder="Saytdan qidirish..."
                  className="w-full px-4 py-3 pr-14 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </Container>

      {/* ==== MOBILE MENU ==== */}
      <div className="lg:hidden flex justify-between items-center h-16 px-4 sm:px-6 shadow-md bg-primary">
        <PrefetchLink to="/" className="text-white font-bold text-xl">
          NAMDTU
        </PrefetchLink>
        <button
          onClick={toggleMobileMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
        >
          <span className="sr-only">Open main menu</span>
          {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg overflow-y-auto max-h-[80vh]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {displayNavItems.map((item: any) => (
              <div key={item.title}>
                {item.children && item.children.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubmenu(String(item.title))}
                      className="w-full flex justify-between items-center text-gray-700 px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-100"
                    >
                      <span>{String(item.title)}</span>
                      <ChevronDownIcon className={`w-5 h-5 transform transition-transform ${openMobileSubmenu === String(item.title) ? 'rotate-180' : ''}`} />
                    </button>
                    {openMobileSubmenu === item.title && (
                      <div className="pl-6 mt-1 space-y-1">
                        {item.children.map((child: any) => (
                          <PrefetchLink
                            key={String(child.title)}
                            to={child.href || '#'}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#0E104B] hover:bg-gray-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {String(child.title)}
                          </PrefetchLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <PrefetchLink
                    to={item.href || '#'}
                    className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {String(item.title)}
                  </PrefetchLink>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;