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

    // If external link or anchor, return as is
    if (to.startsWith('http') || to.startsWith('#') || to.startsWith('mailto:')) return to;

    // 2. Kiruvchi linkdan eski prefikslarni tozalash (masalan /en/news -> news)
    let cleanTo = to.startsWith('/') ? to.substring(1) : to;

    const localePrefixes = ['uz/', 'ru/', 'en/', 'uz', 'ru', 'en'];
    for (const prefix of localePrefixes) {
      if (cleanTo === prefix) {
        cleanTo = '';
        break;
      }
      if (cleanTo.startsWith(prefix)) {
        cleanTo = cleanTo.substring(prefix.length);
        if (cleanTo.startsWith('/')) cleanTo = cleanTo.substring(1);
        break;
      }
    }

    // 3. Tozalangan linkka joriy til prefiksini qo'shish
    // CASE 1: Bosh sahifa
    if (cleanTo === '') {
      if (currentLocale === 'uz') return '/';
      return `/${currentLocale}`;
    }

    // CASE 2: Ichki sahifalar
    if (currentLocale === 'uz') {
      // O'zbek tilida (Default) odatda prefiks bo'lmaydi, LEKIN...
      // Agar loyiha arxitekturasi /uz/ ni talab qilmasa, shunday qoldiramiz.
      // Agar oldingi kodda /uz/ ishlatilgan bo'lsa, uni qo'shamiz.
      // Tekshiruv: Oldingi kodda `if (locale === 'uz') return '/';` va `/${locale}/${cleanTo}` ishlatilgan.
      // Demak, uz tili uchun ham prefiks qo'shilayotgan bo'lishi mumkin?
      // YO'Q. Oldingi kodga qaraymiz: `if (locale === 'uz') return '/';` - bu root uchun.
      // `return /${locale}/${cleanTo};` - va bu boshqa sahifalar uchun.
      // Demak, o'zbek tilida ham /uz/news bo'lishi kerak.

      return `/uz/${cleanTo}`;
    }

    // Boshqa tillar
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