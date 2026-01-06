import React from 'react';
import { HomeSectionBlock, HomeSectionType } from './types';
import { SectionSkeleton } from './components/SectionSkeleton';
import { SectionErrorBoundary } from './components/SectionErrorBoundary';

// Dynamic section renderers - API data ga qarab component tanlanadi
// Home sahifasi uchun lazy loading o'rniga to'g'ridan-to'g'ri import
import HeroSection from './HeroSection';
import Stats from './Stats';
import NewsSection from './NewsSection';
import FacultiesSection from './FacultiesSection';
import VideoGallerySection from './VideoGallerySection';
import InteractiveServicesSection from './InteractiveServicesSection';
import UniversitySystemsSection from './UniversitySystemsSection';

const sectionRenderers = {
  // Section types (Home sahifasi uchun maxsus) - lazy loading olib tashlandi
  hero: HeroSection,
  stats: Stats,
  news: NewsSection,
  faculties: FacultiesSection,
  'video-gallery': VideoGallerySection,
  'interactive-services': InteractiveServicesSection,
  'university-systems': UniversitySystemsSection,
} as const;

// Future: Content block renderers for API-driven content
// const contentBlockRenderers = { ... }

interface HomeContentBuilderProps {
  sections: HomeSectionBlock[];
  globalLayout?: 'stacked' | 'masonry' | 'grid';
  enableErrorBoundaries?: boolean;
}

const DynamicSection: React.FC<{
  block: HomeSectionBlock;
  enableErrorBoundaries?: boolean;
}> = ({ block, enableErrorBoundaries = true }) => {
  const Component = sectionRenderers[block.type as keyof typeof sectionRenderers];

  // Component topilmagan bo'lsa hech narsa chiqmasin
  if (!Component) {
    return null;
  }

  // Section o'zining loading holatini o'zi boshqarishi uchun data ni uzatamiz
  // Skeleton ko'rinishi uchun Component ichida mantiq bo'lishi kerak
  const content = block.type === 'hero'
    ? <Component {...block.data} data={block.data} />
    : <Component {...block.data} />;

  if (enableErrorBoundaries) {
    return (
      <SectionErrorBoundary sectionType={block.type}>
        {content}
      </SectionErrorBoundary>
    );
  }

  return content;
};

const HomeContentBuilder: React.FC<HomeContentBuilderProps> = ({
  sections,
  globalLayout = 'stacked',
  enableErrorBoundaries = true
}) => {
  const enabledSections = sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);


  const getContainerClasses = () => {
    const baseClasses = 'home-content-builder';

    switch (globalLayout) {
      case 'masonry':
        return `${baseClasses} home-content-builder--masonry`;
      case 'grid':
        return `${baseClasses} home-content-builder--grid grid grid-cols-1 lg:grid-cols-2 gap-8`;
      default:
        return `${baseClasses} home-content-builder--stacked space-y-0`;
    }
  };

  if (enabledSections.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">No sections configured</h2>
        <p className="text-gray-500">Please add sections to display content.</p>
      </div>
    );
  }

  return (
    <div className={getContainerClasses()}>
      {enabledSections.map((section) => (
        <DynamicSection
          key={section.id}
          block={section}
          enableErrorBoundaries={enableErrorBoundaries}
        />
      ))}
    </div>
  );
};

export default HomeContentBuilder;