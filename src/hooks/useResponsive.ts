// src/hooks/useResponsive.ts
// Hook for responsive design utilities

import { useState, useEffect } from 'react';
import { breakpoints, BreakpointValues, UseResponsiveReturn } from '../types/responsive';

export const useResponsive = (): UseResponsiveReturn => {
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBreakpoint = (): keyof BreakpointValues<any> => {
    if (screenWidth >= breakpoints['2xl']) return '2xl';
    if (screenWidth >= breakpoints.xl) return 'xl';
    if (screenWidth >= breakpoints.lg) return 'lg';
    if (screenWidth >= breakpoints.md) return 'md';
    if (screenWidth >= breakpoints.sm) return 'sm';
    return 'default';
  };

  const getValue = <T>(values: BreakpointValues<T>): T => {
    const breakpoint = getBreakpoint();
    return values[breakpoint] ?? values.default;
  };

  return {
    breakpoint: getBreakpoint(),
    isMobile: screenWidth < breakpoints.md,
    isTablet: screenWidth >= breakpoints.md && screenWidth < breakpoints.lg,
    isDesktop: screenWidth >= breakpoints.lg && screenWidth < breakpoints.xl,
    isLarge: screenWidth >= breakpoints.xl,
    screenWidth,
    getValue,
  };
};

// Utility hook for responsive classes
export const useResponsiveClass = (
  baseClass: string,
  responsiveClasses: Partial<Record<keyof BreakpointValues<any>, string>>
): string => {
  const { breakpoint } = useResponsive();

  const classes = [baseClass];

  // Add responsive classes based on current breakpoint
  if (responsiveClasses.default) classes.push(responsiveClasses.default);
  const breakpointClass = responsiveClasses[breakpoint];
  if (breakpointClass) classes.push(breakpointClass);

  return classes.filter(Boolean).join(' ');
};

// Hook for responsive values with SSR support
export const useResponsiveValue = <T>(
  values: BreakpointValues<T>
): T => {
  const { getValue } = useResponsive();
  return getValue(values);
};

// Hook for media query matching
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

// Predefined media query hooks
export const useIsMobile = () => useMediaQuery(`(max-width: ${breakpoints.md - 1}px)`);
export const useIsTablet = () => useMediaQuery(`(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`);
export const useIsDesktop = () => useMediaQuery(`(min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`);
export const useIsLarge = () => useMediaQuery(`(min-width: ${breakpoints.xl}px)`);