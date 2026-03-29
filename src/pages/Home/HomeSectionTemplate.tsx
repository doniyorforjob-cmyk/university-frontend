import React from 'react';
import {
  HomeSectionType,
  HomeSectionConfig,
  HomeSectionBlock,
  LayoutVariant,
  BackgroundConfig,
  StylingConfig
} from './types';

// Template interface
export interface HomeSectionTemplate {
  id: string;
  name: string;
  type: HomeSectionType;
  category: 'content' | 'media' | 'interactive' | 'data';
  defaultConfig: HomeSectionConfig;
  preview: React.ComponentType<{ config: HomeSectionConfig }>;
  generate: (data?: any) => HomeSectionBlock;
  validate: (config: HomeSectionConfig) => boolean;
}

// Base configurations
const createBaseConfig = (
  type: HomeSectionType,
  layout: LayoutVariant,
  background: BackgroundConfig,
  styling: Partial<StylingConfig>
): HomeSectionConfig => ({
  id: `${type}-${Date.now()}`,
  type,
  layout,
  background,
  styling: {
    padding: 'py-16',
    margin: 'mb-0',
    maxWidth: 'max-w-7xl',
    textAlign: 'center',
    fontSize: 'base',
    ...styling,
  },
  showTitle: true,
  showSubtitle: true,
  animation: {
    enabled: true,
    type: 'fade',
    delay: 0,
  },
});

// Preview placeholder — metadata only, never rendered in production
const PreviewPlaceholder: React.FC<{ config: HomeSectionConfig }> = () => null;

// Template definitions
export const heroTemplates: HomeSectionTemplate[] = [
  {
    id: 'hero-centered',
    name: 'Markazlashtirilgan Hero',
    type: 'hero',
    category: 'content',
    defaultConfig: createBaseConfig('hero', 'centered-hero', {
      type: 'gradient',
      value: 'from-blue-600 to-purple-600',
      opacity: 0.8,
    }, {
      padding: 'py-20 md:py-32',
      textAlign: 'center',
      fontSize: 'xl',
    }),
    preview: PreviewPlaceholder,
    generate: (data) => ({
      id: `hero-${Date.now()}`,
      type: 'hero',
      config: createBaseConfig('hero', 'centered-hero', {
        type: 'gradient',
        value: 'from-blue-600 to-purple-600',
      }, {}),
      data: data || {},
      order: 1,
      enabled: true,
    }),
    validate: (config) => config.type === 'hero' && config.layout === 'centered-hero',
  },
];

export const statsTemplates: HomeSectionTemplate[] = [
  {
    id: 'stats-centered',
    name: 'Markazlashtirilgan Statistika',
    type: 'stats',
    category: 'data',
    defaultConfig: createBaseConfig('stats', 'centered-cards', {
      type: 'gradient',
      value: 'from-green-50 to-teal-50',
    }, {
      padding: 'py-16',
      textAlign: 'center',
    }),
    preview: PreviewPlaceholder,
    generate: (data) => ({
      id: `stats-${Date.now()}`,
      type: 'stats',
      config: createBaseConfig('stats', 'centered-cards', {
        type: 'gradient',
        value: 'from-green-50 to-teal-50',
      }, {}),
      data: data || {},
      order: 6,
      enabled: true,
    }),
    validate: (config) => config.type === 'stats',
  },
];

export const newsTemplates: HomeSectionTemplate[] = [
  {
    id: 'news-centered',
    name: 'Markazlashtirilgan Yangiliklar',
    type: 'news',
    category: 'content',
    defaultConfig: createBaseConfig('news', 'left-aligned', {
      type: 'gradient',
      value: 'from-purple-50 to-pink-50',
    }, {
      padding: 'py-16',
      textAlign: 'left',
    }),
    preview: PreviewPlaceholder,
    generate: (data) => ({
      id: `news-${Date.now()}`,
      type: 'news',
      config: createBaseConfig('news', 'left-aligned', {
        type: 'gradient',
        value: 'from-purple-50 to-pink-50',
      }, {}),
      data: data || {},
      order: 3,
      enabled: true,
    }),
    validate: (config) => config.type === 'news',
  },
];

export const facultiesTemplates: HomeSectionTemplate[] = [
  {
    id: 'faculties-centered',
    name: 'Markazlashtirilgan Fakultetlar',
    type: 'faculties',
    category: 'interactive',
    defaultConfig: createBaseConfig('faculties', 'centered-content', {
      type: 'gradient',
      value: 'from-indigo-50 to-blue-50',
    }, {
      padding: 'py-16',
    }),
    preview: PreviewPlaceholder,
    generate: (data) => ({
      id: `faculties-${Date.now()}`,
      type: 'faculties',
      config: createBaseConfig('faculties', 'centered-content', {
        type: 'gradient',
        value: 'from-indigo-50 to-blue-50',
      }, {}),
      data: data || {},
      order: 4,
      enabled: true,
    }),
    validate: (config) => config.type === 'faculties',
  },
];

export const videoGalleryTemplates: HomeSectionTemplate[] = [
  {
    id: 'video-gallery-centered',
    name: 'Markazlashtirilgan Video Galereya',
    type: 'video-gallery',
    category: 'media',
    defaultConfig: createBaseConfig('video-gallery', 'centered-cards', {
      type: 'gradient',
      value: 'from-red-50 to-orange-50',
    }, {
      padding: 'py-16',
    }),
    preview: PreviewPlaceholder,
    generate: (data) => ({
      id: `video-gallery-${Date.now()}`,
      type: 'video-gallery',
      config: createBaseConfig('video-gallery', 'centered-cards', {
        type: 'gradient',
        value: 'from-red-50 to-orange-50',
      }, {}),
      data: data || {},
      order: 5,
      enabled: true,
    }),
    validate: (config) => config.type === 'video-gallery',
  },
];

export const interactiveServicesTemplates: HomeSectionTemplate[] = [
  {
    id: 'services-centered',
    name: 'Markazlashtirilgan Xizmatlar',
    type: 'interactive-services',
    category: 'interactive',
    defaultConfig: createBaseConfig('interactive-services', 'centered-cards', {
      type: 'gradient',
      value: 'from-cyan-50 to-blue-50',
    }, {
      padding: 'py-16',
    }),
    preview: PreviewPlaceholder,
    generate: (data) => ({
      id: `interactive-services-${Date.now()}`,
      type: 'interactive-services',
      config: createBaseConfig('interactive-services', 'centered-cards', {
        type: 'gradient',
        value: 'from-cyan-50 to-blue-50',
      }, {}),
      data: data || {},
      order: 2,
      enabled: true,
    }),
    validate: (config) => config.type === 'interactive-services',
  },
];

export const universitySystemsTemplates: HomeSectionTemplate[] = [
  {
    id: 'university-systems-centered',
    name: 'Markazlashtirilgan Universitet Tizimlari',
    type: 'university-systems',
    category: 'interactive',
    defaultConfig: createBaseConfig('university-systems', 'centered-cards', {
      type: 'gradient',
      value: 'from-emerald-50 to-teal-50',
    }, {
      padding: 'py-16',
    }),
    preview: PreviewPlaceholder,
    generate: (data) => ({
      id: `university-systems-${Date.now()}`,
      type: 'university-systems',
      config: createBaseConfig('university-systems', 'centered-cards', {
        type: 'gradient',
        value: 'from-emerald-50 to-teal-50',
      }, {}),
      data: data || {},
      order: 7,
      enabled: true,
    }),
    validate: (config) => config.type === 'university-systems',
  },
];


// Template registry
export const homeSectionTemplates = {
  hero: heroTemplates,
  stats: statsTemplates,
  news: newsTemplates,
  faculties: facultiesTemplates,
  'video-gallery': videoGalleryTemplates,
  'media-gallery': videoGalleryTemplates, // Use same templates for now
  'interactive-services': interactiveServicesTemplates,
  'university-systems': universitySystemsTemplates,
};

// Utility functions
export const getTemplatesByType = (type: HomeSectionType): HomeSectionTemplate[] => {
  return homeSectionTemplates[type] || [];
};

export const getTemplateById = (id: string): HomeSectionTemplate | null => {
  for (const type of Object.keys(homeSectionTemplates) as HomeSectionType[]) {
    const template = homeSectionTemplates[type].find(t => t.id === id);
    if (template) return template;
  }
  return null;
};

export const generateDefaultSections = (): HomeSectionBlock[] => {
  return [
    heroTemplates[0].generate(),
    statsTemplates[0].generate(),
    newsTemplates[0].generate(),
    facultiesTemplates[0].generate(),
    videoGalleryTemplates[0].generate(),
    interactiveServicesTemplates[0].generate(),
  ];
};