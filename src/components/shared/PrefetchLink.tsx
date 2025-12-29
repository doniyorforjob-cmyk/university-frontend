import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { prefetchRoute } from '../../config/routesConfig';
import { useLocale } from '@/contexts/LocaleContext';

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
  const { locale } = useLocale();

  // Helper to resolve localized path
  const localizedTo = React.useMemo(() => {
    // If 'to' is not a string (e.g., an object), return as is
    if (typeof to !== 'string') return to;

    // If external link or anchor, return as is
    if (to.startsWith('http') || to.startsWith('#') || to.startsWith('mailto:')) return to;

    // cleanTo removes leading slash
    const cleanTo = to.startsWith('/') ? to.substring(1) : to;

    // CASE 1: Root path requested
    // If original 'to' was '/' (so cleanTo is empty) OR explicit 'home' logic
    if (to === '/' || cleanTo === '') {
      if (locale === 'uz') return '/';
      return `/${locale}`;
    }

    // CASE 2: Inner pages
    // Check if already prefixed
    if (cleanTo.startsWith(`${locale}/`) || cleanTo === locale) return to;

    // For inner pages, return prefixed path for ALL locales including UZ
    return `/${locale}/${cleanTo}`;
  }, [to, locale]);

  const handlePrefetch = useCallback(() => {
    if (prefetch && typeof localizedTo === 'string') {
      // Delay bilan prefetch qilish (hover va focus uchun)
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