import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { prefetchRoute } from '../../config/routesConfig';

interface PrefetchLinkProps {
  to: string;
  prefetch?: boolean;
  prefetchDelay?: number;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
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
  onFocus,
  ...props
}) => {
  const handlePrefetch = useCallback(() => {
    if (prefetch) {
      // Delay bilan prefetch qilish (hover va focus uchun)
      setTimeout(() => {
        prefetchRoute(to);
      }, prefetchDelay);
    }
  }, [to, prefetch, prefetchDelay]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    handlePrefetch();
    onMouseEnter?.(e);
  }, [handlePrefetch, onMouseEnter]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLAnchorElement>) => {
    handlePrefetch();
    onFocus?.(e);
  }, [handlePrefetch, onFocus]);

  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PrefetchLink;