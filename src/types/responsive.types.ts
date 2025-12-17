// src/types/responsive.ts
// Type definitions for responsive design system

import React from 'react';
import { TextSize, SpacingSize, ContainerSize } from '../utils/responsive';

export interface ResponsiveTypographyProps {
  fontSize?: TextSize;
  lineHeight?: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
}

export interface ResponsiveSpacingProps {
  padding?: SpacingSize;
  margin?: SpacingSize;
  gap?: SpacingSize;
}

export interface ResponsiveLayoutProps {
  container?: ContainerSize;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  direction?: 'row' | 'col';
}

export interface ResponsiveProps
  extends ResponsiveTypographyProps,
          ResponsiveSpacingProps,
          ResponsiveLayoutProps {
  // Combined interface for components that need all responsive features
}

export interface BreakpointValues<T> {
  default: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

export type ResponsiveValue<T> = T | BreakpointValues<T>;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export interface ResponsiveConfig {
  breakpoints: typeof breakpoints;
  containers: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  typography: {
    scale: Record<TextSize, string>;
    lineHeights: Record<string, string>;
  };
  spacing: {
    scale: Record<SpacingSize, string>;
  };
}

// Utility types for component props
export type ResponsiveClassName = string | undefined | null;
export type ResponsiveStyle = React.CSSProperties;

// Hook return types
export interface UseResponsiveReturn {
  breakpoint: keyof BreakpointValues<any>;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
  screenWidth: number;
  getValue: <T>(values: BreakpointValues<T>) => T;
}