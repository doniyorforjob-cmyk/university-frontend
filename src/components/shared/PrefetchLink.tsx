import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { prefetchRoute } from '../../config/routesConfig';

/**
 * Custom LinkProps to support all Link attributes + custom prefetch props
 */
interface PrefetchLinkProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, 'to'> {
  to: string | any;
  prefetch?: boolean;
  prefetchDelay?: number;
}

/**
 * Link komponenti bilan prefetching qo'llab-quvvatlashi
 * Hover qilganda sahifani oldindan yuklaydi
 * 
 * DIQQAT: Tilni aniqlashda Context (useLocale) dan foydalanmaydi, 
 * to'g'ridan-to'g'ri URL (useLocation) dan oladi.
 * Bu state yangilanishidagi kechikishlar tufayli noto'g'ri link generatsiyasini oldini oladi.
 */
const PrefetchLink: React.FC<PrefetchLinkProps> = ({
  to,
  prefetch = true,
  prefetchDelay = 100,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  ...props
}) => {
  const location = useLocation();

  // 1. URL dan joriy tilni aniqlash (State ga ishonmaymiz, URL har doim to'g'ri)
  const currentLocale = React.useMemo(() => {
    const pathParts = location.pathname.split('/');
    const firstSegment = pathParts[1]; // [0] bo'sh satr
    if (['uz', 'ru', 'en'].includes(firstSegment)) {
      return firstSegment;
    }
    return 'uz'; // Default til (agar URL da prefiks bo'lmasa)
  }, [location.pathname]);

  // Helper to resolve localized path
  const localizedTo = React.useMemo(() => {
    // If 'to' is not a string (e.g., an object), return as is
    if (typeof to !== 'string') return to;

    // 1. Absolute URL check
    if (/^https?:\/\//i.test(to.trim()) || to.startsWith('#') || to.startsWith('mailto:')) return to;

    // 2. Kiruvchi linkdan BARCHA eski prefikslarni tozalash (masalan /en/ru/uz/news -> news yoki /uzuznews -> news)
    // Regex: ixtiyoriy sonda (uz|ru|en) va ixtiyoriy / belgilarini olib tashlaydi
    const cleanTo = to.replace(/^\/?((uz|ru|en)\/?)*/, '');

    // 3. Tozalangan linkka joriy til prefiksini qo'shish
    if (cleanTo === '') {
      if (currentLocale === 'uz') return '/';
      return `/${currentLocale}`;
    }

    return `/${currentLocale}/${cleanTo}`;
  }, [to, currentLocale]);

  const handlePrefetch = useCallback(() => {
    if (prefetch && typeof localizedTo === 'string') {
      setTimeout(() => {
        prefetchRoute(localizedTo);
      }, prefetchDelay);
    }
  }, [localizedTo, prefetch, prefetchDelay]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    handlePrefetch();
    onMouseEnter?.(e);
  }, [handlePrefetch, onMouseEnter]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    onMouseLeave?.(e);
  }, [onMouseLeave]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLAnchorElement>) => {
    handlePrefetch();
    onFocus?.(e);
  }, [handlePrefetch, onFocus]);

  const isExternalOrMfe = React.useMemo(() => {
    if (typeof localizedTo !== 'string') return false;
    
    if (/^https?:\/\//i.test(localizedTo) || localizedTo.startsWith('#') || localizedTo.startsWith('mailto:')) {
      return true;
    }

    let cleanHref = localizedTo.replace(/^\/[a-z]{2}\//, '/');
    if (cleanHref === 'uz' || cleanHref === 'ru' || cleanHref === 'en') cleanHref = '/';
    if (!cleanHref.startsWith('/')) cleanHref = '/' + cleanHref;

    const shellRoutes = [
      '/',
      '/search',
      '/contact',
      '/organizational-structure',
      '/administration',
      '/leadership'
    ];
    
    // Check if it's a shell route. 
    // IMPORTANT: Profile details like /leadership/123 are in the MFE, so only the main list root is in the Shell.
    const isShell = shellRoutes.some(route => {
      if (route === '/leadership' || route === '/administration') {
        return cleanHref === route;
      }
      return cleanHref === route || cleanHref.startsWith(`${route}/`) || cleanHref.startsWith(`${route}?`);
    });
    
    if (!isShell) {
      return true;
    }

    return false;
  }, [localizedTo]);

  if (isExternalOrMfe) {
    const isAbsoluteExt = typeof localizedTo === 'string' && /^https?:\/\//i.test(localizedTo);
    return (
      <a
        href={localizedTo}
        target={isAbsoluteExt ? "_blank" : undefined}
        rel={isAbsoluteExt ? "noopener noreferrer" : undefined}
        onClick={onClick as any}
        onMouseEnter={handleMouseEnter as any}
        onMouseLeave={handleMouseLeave as any}
        onFocus={handleFocus as any}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={localizedTo}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PrefetchLink;