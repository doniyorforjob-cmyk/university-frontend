import React, { Suspense, lazy, useCallback } from 'react';
import { HomeSectionBlock, HomeSectionType } from './types';
import { SectionSkeleton } from './components/SectionSkeleton';
import { SectionErrorBoundary } from './components/SectionErrorBoundary';

// Dynamic section renderers - API data ga qarab component tanlanadi
const sectionRenderers = {
  // Section types (Home sahifasi uchun maxsus)
  hero: lazy(() => import('./HeroSection')),
  stats: lazy(() => import('./Stats')),
  news: lazy(() => import('./NewsSection')),
  faculties: lazy(() => import('./FacultiesSection')),
  'video-gallery': lazy(() => import('./VideoGallerySection')),
  'interactive-services': lazy(() => import('./InteractiveServicesSection')),
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
  const LazyComponent = sectionRenderers[block.type as keyof typeof sectionRenderers];

  if (!LazyComponent) {
    console.warn(`Section component not found for type: ${block.type}`);
    return <SectionSkeleton sectionType={block.type as HomeSectionType} />;
  }

  const content = (
    <Suspense fallback={<SectionSkeleton sectionType={block.type as HomeSectionType} />}>
      {block.type === 'hero' ? (
        <LazyComponent {...block.data} data={block.data} />
      ) : (
        <LazyComponent {...block.data} />
      )}
    </Suspense>
  );

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