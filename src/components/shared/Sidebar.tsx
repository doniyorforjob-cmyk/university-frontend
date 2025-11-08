import React, { useState, useEffect, useMemo, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchNavItems, NavItem } from '../../api/navbarApi';

// Kesh – faqat bir marta fetch
let cachedNavItems: NavItem[] | null = null;
let fetchPromise: Promise<NavItem[]> | null = null;

const fetchNavItemsOnce = async (): Promise<NavItem[]> => {
  if (cachedNavItems) return cachedNavItems;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetchNavItems().then(items => {
    cachedNavItems = items;
    fetchPromise = null;
    return items;
  });

  return fetchPromise;
};

// Sidebar – memoized
const Sidebar = memo(() => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    fetchNavItemsOnce().then(items => {
      if (mounted) setNavItems(items);
    });
    return () => { mounted = false; };
  }, []);

  const informationService = useMemo(() => {
    return navItems.find(item => item.title === 'Axborot xizmati');
  }, [navItems]);

  const filteredChildren = useMemo(() => {
    return informationService?.children || [];
  }, [informationService]);

  const renderLink = useMemo(() => {
    return filteredChildren.map((child, index) => {
      const href = child.href === '/media' ? '/media-about-us' : child.href;
      const isActive = location.pathname.startsWith(href!);
      const isLast = index === filteredChildren.length - 1;

      return (
        <Link
          key={href || index}
          to={href!}
          className={`block px-8 py-3 text-lg text-gray-800 transition-all duration-200 ${
            isActive
              ? 'bg-secondary/10 border-l-4 border-l-secondary pl-[31px]'
              : 'hover:bg-gray-50 border-l-4 border-l-transparent pl-[31px]'
          } ${!isLast ? 'border-b border-gray-300' : ''}`}
        >
          {child.title === "E'lonlar" ? "E'lonlar" : child.title}
        </Link>
      );
    });
  }, [filteredChildren, location.pathname]);

  if (!informationService) return null;

  return (
    <div className="w-full md:w-96 mb-4 space-y-4">
      {/* 1-BOX: Axborot xizmati */}
      <div className="overflow-hidden shadow-lg bg-white border border-gray-300">
        <div className="bg-primary px-8 py-3 flex items-center gap-2 border-b border-gray-300">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Axborot xizmati
          </h3>
        </div>
        <div className="bg-gray-50">
          {renderLink}
        </div>
      </div>

      {/* 2-BOX: Rektorga murojaat */}
      <div className="overflow-hidden shadow-lg bg-white border border-gray-300">
        <div className="bg-gray-50 px-8 py-3 flex flex-col justify-between h-full">
          {/* Sarlavha va kichik tugma – CHAPGA */}
          <div className="mb-4">
            <h4 className="text-md font-bold text-gray-800 mb-2">
              Rektorga murojaat
            </h4>
            <Link
              to="/appeal-to-rector"
              className="inline-block px-5 py-1.5 text-sm bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
            >
              Murojaat qilish
            </Link>
          </div>

          {/* Rektor rasmi – eng pastki chegaragacha, bo‘shliq bor */}
          <div className="-mx-8 -mb-3">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Rektor rasmi"
              className="w-full h-auto object-cover block"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;