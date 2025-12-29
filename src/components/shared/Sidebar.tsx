import React, { useState, useEffect, useMemo, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchNavItems, NavItem } from '../../services/navbarService';
import OptimizedImage from './OptimizedImage';
import { useCachedApi } from '../../hooks/useCachedApi';
import { useLocale } from '../../contexts/LocaleContext';
import PrefetchLink from './PrefetchLink';

const Sidebar = memo(() => {
  const { locale } = useLocale();
  const location = useLocation();

  const { data: navItemsRaw, loading } = useCachedApi<NavItem[]>({
    key: `navbar-items-${locale}`,
    fetcher: () => fetchNavItems(locale),
    ttlMinutes: 0.5,
  });

  const navItems = navItemsRaw || [];

  const informationService = useMemo(() => {
    // Find the navigation item whose title matches "Axborot xizmati" in any language
    return navItems.find(item => {
      // Robust check using key (English title)
      if (item.key === 'Information Service' || item.key === 'Information Services') {
        return true;
      }
      // Fallback: title check (existing logic)
      if (typeof item.title === 'string') {
        return item.title === 'Axborot xizmati' || item.title === 'Information Service' || item.title === 'Information Services' || item.title === 'Пресс-служба';
      }
      if (item.title && typeof item.title === 'object') {
        const values = Object.values(item.title) as string[];
        return values.some(val => val === 'Axborot xizmati' || val === 'Information Service' || val === 'Information Services');
      }
      return false;
    });
  }, [navItems]);

  const filteredChildren = useMemo(() => {
    return informationService?.children || [];
  }, [informationService]);

  const renderLink = useMemo(() => {
    return filteredChildren.map((child: NavItem, index: number) => {
      const href = child.href === '/media' ? '/media-about-us' : child.href;
      const isActive = location.pathname.startsWith(href!);
      const isLast = index === filteredChildren.length - 1;

      return (
        <PrefetchLink
          key={href || index}
          to={href!}
          prefetch={true}
          prefetchDelay={150}
          onMouseEnter={async () => {
            const { prefetchService } = await import('../../services/prefetchService');
            if (href === '/news') {
              prefetchService.prefetchNewsPage();
            } else if (href === '/') {
              prefetchService.prefetchHomeNews();
            }
          }}
          className={`block px-8 py-3 text-lg text-gray-800 transition-all duration-200 ${isActive
            ? 'bg-secondary/10 border-l-4 border-l-secondary pl-[31px]'
            : 'hover:bg-gray-50 border-l-4 border-l-transparent pl-[31px]'
            } ${!isLast ? 'border-b border-gray-300' : ''}`}
        >
          {child.title === "E'lonlar" ? "Elonlar" : child.title}
        </PrefetchLink>
      );
    });
  }, [filteredChildren, location.pathname]);

  if (loading && navItems.length === 0) {
    return (
      <div className="w-full space-y-4 animate-pulse">
        <div className="bg-gray-200 h-[300px] w-full shadow-lg border border-gray-300"></div>
        <div className="bg-gray-200 h-[200px] w-full shadow-lg border border-gray-300"></div>
      </div>
    );
  }

  if (!informationService) return null;

  return (
    <div className="w-full mb-4 space-y-4">
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
            {informationService.title}
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
              {locale === 'uz' ? 'Rektorga murojaat' : locale === 'ru' ? 'Обращение к ректору' : 'Appeal to Rector'}
            </h4>
            <PrefetchLink
              to="/appeals"
              prefetch={true}
              prefetchDelay={150}
              className="inline-block px-5 py-1.5 text-sm bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
            >
              {locale === 'uz' ? 'Murojaat qilish' : locale === 'ru' ? 'Отправить' : 'Send appeal'}
            </PrefetchLink>
          </div>

          {/* Rektor rasmi – eng pastki chegaragacha, bo‘shliq bor */}
          <div className="-mx-8 -mb-3">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Rektor rasmi"
              className="w-full h-auto object-cover block"
              lazy={true}
              width={384}
              height={256}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;