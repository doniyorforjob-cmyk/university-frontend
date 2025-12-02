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

// Preview components
const HeroPreview: React.FC<{ config: HomeSectionConfig }> = ({ config }) => (
  <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-3"></div>
      <h3 className="font-semibold text-gray-800">Hero Section</h3>
      <p className="text-sm text-gray-600">Full-width hero with centered content</p>
    </div>
  </div>
);

const StatsPreview: React.FC<{ config: HomeSectionConfig }> = ({ config }) => (
  <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-teal-50">
    <div className="text-center">
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="w-8 h-8 bg-green-500 rounded"></div>
        <div className="w-8 h-8 bg-teal-500 rounded"></div>
      </div>
      <h3 className="font-semibold text-gray-800">Statistics</h3>
      <p className="text-sm text-gray-600">Animated counters in grid</p>
    </div>
  </div>
);

const NewsPreview: React.FC<{ config: HomeSectionConfig }> = ({ config }) => (
  <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50">
    <div className="text-center">
      <div className="flex justify-center gap-1 mb-3">
        <div className="w-6 h-6 bg-purple-500 rounded"></div>
        <div className="w-6 h-6 bg-pink-500 rounded"></div>
        <div className="w-6 h-6 bg-purple-500 rounded"></div>
      </div>
      <h3 className="font-semibold text-gray-800">News Section</h3>
      <p className="text-sm text-gray-600">Tabbed news with gallery</p>
    </div>
  </div>
);

const FacultiesPreview: React.FC<{ config: HomeSectionConfig }> = ({ config }) => (
  <div className="border rounded-lg p-4 bg-gradient-to-r from-indigo-50 to-blue-50">
    <div className="text-center">
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
      </div>
      <h3 className="font-semibold text-gray-800">Faculties</h3>
      <p className="text-sm text-gray-600">Interactive faculty cards</p>
    </div>
  </div>
);

const VideoGalleryPreview: React.FC<{ config: HomeSectionConfig }> = ({ config }) => (
  <div className="border rounded-lg p-4 bg-gradient-to-r from-red-50 to-orange-50">
    <div className="text-center">
      <div className="flex justify-center gap-1 mb-3">
        <div className="w-8 h-6 bg-red-500 rounded"></div>
        <div className="w-8 h-6 bg-orange-500 rounded"></div>
      </div>
      <h3 className="font-semibold text-gray-800">Video Gallery</h3>
      <p className="text-sm text-gray-600">YouTube video grid</p>
    </div>
  </div>
);

const InteractiveServicesPreview: React.FC<{ config: HomeSectionConfig }> = ({ config }) => (
  <div className="border rounded-lg p-4 bg-gradient-to-r from-cyan-50 to-blue-50">
    <div className="text-center">
      <div className="grid grid-cols-3 gap-1 mb-3">
        <div className="w-6 h-6 bg-cyan-500 rounded"></div>
        <div className="w-6 h-6 bg-blue-500 rounded"></div>
        <div className="w-6 h-6 bg-cyan-500 rounded"></div>
      </div>
      <h3 className="font-semibold text-gray-800">Services</h3>
      <p className="text-sm text-gray-600">Interactive service cards</p>
    </div>
  </div>
);

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
    preview: HeroPreview,
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
    preview: StatsPreview,
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
    preview: NewsPreview,
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
    preview: FacultiesPreview,
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
    preview: VideoGalleryPreview,
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
    preview: InteractiveServicesPreview,
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

// Template registry
export const homeSectionTemplates = {
  hero: heroTemplates,
  stats: statsTemplates,
  news: newsTemplates,
  faculties: facultiesTemplates,
  'video-gallery': videoGalleryTemplates,
  'media-gallery': videoGalleryTemplates, // Use same templates for now
  'interactive-services': interactiveServicesTemplates,
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