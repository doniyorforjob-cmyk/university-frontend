// src/utils/responsive.ts
// Universal responsive design utilities for the entire project

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

// Fluid typography scale using clamp()
export const fluidTypography = {
  xs: 'clamp(0.75rem, 2vw, 0.875rem)',      // 12px - 14px
  sm: 'clamp(0.875rem, 2.5vw, 1rem)',       // 14px - 16px
  base: 'clamp(1rem, 3vw, 1.125rem)',       // 16px - 18px
  lg: 'clamp(1.125rem, 3.5vw, 1.25rem)',    // 18px - 20px
  xl: 'clamp(1.25rem, 4vw, 1.5rem)',        // 20px - 24px
  '2xl': 'clamp(1.5rem, 5vw, 2rem)',        // 24px - 32px
  '3xl': 'clamp(2rem, 6vw, 3rem)',          // 32px - 48px
};

// Fluid spacing scale
export const fluidSpacing = {
  xs: 'clamp(0.5rem, 1vw, 0.75rem)',        // 8px - 12px
  sm: 'clamp(0.75rem, 2vw, 1rem)',          // 12px - 16px
  md: 'clamp(1rem, 2.5vw, 1.5rem)',         // 16px - 24px
  lg: 'clamp(1.5rem, 3vw, 2rem)',           // 24px - 32px
  xl: 'clamp(2rem, 4vw, 3rem)',             // 32px - 48px
  '2xl': 'clamp(3rem, 5vw, 4rem)',          // 48px - 64px
};

// Container max-widths
export const containerSizes = {
  sm: 'max-w-2xl',      // 672px
  md: 'max-w-4xl',      // 896px
  lg: 'max-w-6xl',      // 1152px
  xl: 'max-w-screen-xl', // 1280px
  full: 'max-w-full',   // 100%
};

// Responsive utility functions
export const getResponsiveText = (size: TextSize): string => {
  return fluidTypography[size] || fluidTypography.base;
};

export const getResponsiveSpacing = (size: SpacingSize): string => {
  return fluidSpacing[size] || fluidSpacing.md;
};

export const getContainerClass = (size: ContainerSize = 'lg'): string => {
  return `${containerSizes[size]} mx-auto px-4 sm:px-6 lg:px-8`;
};

// Combined responsive classes for common patterns
export const responsiveClasses = {
  // Typography
  heading1: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold',
  heading2: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold',
  heading3: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium',
  body: 'text-sm md:text-base lg:text-lg',
  caption: 'text-xs md:text-sm',

  // Spacing
  sectionPadding: 'py-8 md:py-12 lg:py-16 xl:py-20',
  containerPadding: 'px-4 sm:px-6 lg:px-8',
  elementGap: 'gap-4 md:gap-6 lg:gap-8',

  // Layout
  gridCols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  flexDirection: 'flex-col md:flex-row',
};

// Breakpoint utilities
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
};

// Hook for responsive values (client-side only)
export const useResponsiveValue = <T>(
  values: { default: T; sm?: T; md?: T; lg?: T; xl?: T; '2xl'?: T }
): T => {
  // This would use window.innerWidth in a real implementation
  // For SSR compatibility, return default
  if (typeof window === 'undefined') {
    return values.default;
  }

  const width = window.innerWidth;
  if (width >= breakpoints['2xl'] && values['2xl']) return values['2xl'];
  if (width >= breakpoints.xl && values.xl) return values.xl;
  if (width >= breakpoints.lg && values.lg) return values.lg;
  if (width >= breakpoints.md && values.md) return values.md;
  if (width >= breakpoints.sm && values.sm) return values.sm;

  return values.default;
};

// Type-safe responsive props interface
export interface ResponsiveProps {
  responsiveText?: TextSize;
  responsiveSpacing?: SpacingSize;
  responsiveContainer?: ContainerSize;
}

// Utility to combine classes
export const combineClasses = (...classes: (string | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Generate responsive class string
export const generateResponsiveClass = (
  baseClass: string,
  responsiveValues: Record<string, string>
): string => {
  const classes = [baseClass];

  Object.entries(responsiveValues).forEach(([breakpoint, value]) => {
    if (breakpoint === 'default') {
      classes.push(value);
    } else {
      classes.push(`${breakpoint}:${value}`);
    }
  });

  return classes.join(' ');
};