import { HomeSectionBlock } from '../types';

export const createHeroSectionBlock = (data: any): HomeSectionBlock => ({
  id: 'hero-section',
  type: 'hero',
  config: {
    id: 'hero-section',
    type: 'hero',
    layout: 'centered-hero',
    background: { type: 'gradient', value: 'from-blue-600 to-purple-600' },
    styling: { padding: 'py-20 md:py-32', margin: 'mb-0', maxWidth: 'max-w-7xl', textAlign: 'center', fontSize: 'xl' },
    showTitle: true,
    showSubtitle: true,
    animation: { enabled: true, type: 'fade', delay: 0 }
  },
  data,
  order: 1,
  enabled: true
});

export const createStatsSectionBlock = (data: any): HomeSectionBlock => ({
  id: 'stats-section',
  type: 'stats',
  config: {
    id: 'stats-section',
    type: 'stats',
    layout: 'centered-cards',
    background: { type: 'gradient', value: 'from-green-50 to-teal-50' },
    styling: { padding: 'py-16', margin: 'mb-0', maxWidth: 'max-w-6xl', textAlign: 'center', fontSize: 'base' },
    showTitle: true,
    showSubtitle: true,
    animation: { enabled: true, type: 'fade', delay: 200 }
  },
  data,
  order: 7,
  enabled: true
});

export const createNewsSectionBlock = (data: any): HomeSectionBlock => ({
  id: 'news-section',
  type: 'news',
  config: {
    id: 'news-section',
    type: 'news',
    layout: 'left-aligned',
    background: { type: 'gradient', value: 'from-purple-50 to-pink-50' },
    styling: { padding: 'py-16', margin: 'mb-0', maxWidth: 'max-w-7xl', textAlign: 'left', fontSize: 'base' },
    showTitle: true,
    showSubtitle: true,
    animation: { enabled: true, type: 'fade', delay: 400 }
  },
  data,
  order: 3,
  enabled: true
});

export const createFacultiesSectionBlock = (data: any): HomeSectionBlock => ({
  id: 'faculties-section',
  type: 'faculties',
  config: {
    id: 'faculties-section',
    type: 'faculties',
    layout: 'centered-content',
    background: { type: 'gradient', value: 'from-indigo-50 to-blue-50' },
    styling: { padding: 'py-16', margin: 'mb-0', maxWidth: 'max-w-7xl', textAlign: 'center', fontSize: 'base' },
    showTitle: true,
    showSubtitle: true,
    animation: { enabled: true, type: 'fade', delay: 600 }
  },
  data,
  order: 5,
  enabled: true
});

export const createVideoGallerySectionBlock = (data: any): HomeSectionBlock => ({
  id: 'video-gallery-section',
  type: 'video-gallery',
  config: {
    id: 'video-gallery-section',
    type: 'video-gallery',
    layout: 'centered-cards',
    background: { type: 'gradient', value: 'from-red-50 to-orange-50' },
    styling: { padding: 'py-16', margin: 'mb-0', maxWidth: 'max-w-6xl', textAlign: 'center', fontSize: 'base' },
    showTitle: true,
    showSubtitle: true,
    animation: { enabled: true, type: 'fade', delay: 800 }
  },
  data,
  order: 6,
  enabled: true
});

export const createInteractiveServicesSectionBlock = (data: any): HomeSectionBlock => ({
  id: 'interactive-services-section',
  type: 'interactive-services',
  config: {
    id: 'interactive-services-section',
    type: 'interactive-services',
    layout: 'centered-cards',
    background: { type: 'gradient', value: 'from-cyan-50 to-blue-50' },
    styling: { padding: 'py-16', margin: 'mb-0', maxWidth: 'max-w-6xl', textAlign: 'center', fontSize: 'base' },
    showTitle: true,
    showSubtitle: true,
    animation: { enabled: true, type: 'fade', delay: 1000 }
  },
  data,
  order: 2,
  enabled: true
});

export const createUniversitySystemsSectionBlock = (data: any): HomeSectionBlock => ({
  id: 'university-systems-section',
  type: 'university-systems',
  config: {
    id: 'university-systems-section',
    type: 'university-systems',
    layout: 'centered-cards',
    background: { type: 'gradient', value: 'from-yellow-50 to-orange-50' },
    styling: { padding: 'py-16', margin: 'mb-0', maxWidth: 'max-w-6xl', textAlign: 'center', fontSize: 'base' },
    showTitle: true,
    showSubtitle: true,
    animation: { enabled: true, type: 'fade', delay: 1200 }
  },
  data,
  order: 4,
  enabled: true
});