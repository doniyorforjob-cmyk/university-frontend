import React from 'react';
import { HomeSectionType } from '../types';

interface SectionSkeletonProps {
  sectionType: HomeSectionType;
  className?: string;
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({
  sectionType,
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (sectionType) {
      case 'hero':
        return <HeroSkeleton />;
      case 'stats':
        return <StatsSkeleton />;
      case 'news':
        return <NewsSkeleton />;
      case 'faculties':
        return <FacultiesSkeleton />;
      case 'video-gallery':
        return <VideoGallerySkeleton />;
      case 'interactive-services':
        return <InteractiveServicesSkeleton />;
      default:
        return <GenericSkeleton />;
    }
  };

  return (
    <div className={`section-skeleton animate-pulse ${className}`}>
      {renderSkeleton()}
    </div>
  );
};

// Hero Section Skeleton
const HeroSkeleton: React.FC = () => (
  <section className="relative min-h-[60vh] xl:min-h-[80vh] overflow-hidden bg-gray-100">
    {/* Carousel Image Skeleton - Solid background to prevent text bleed-through */}
    <div className="w-full h-[60vh] xl:h-[80vh] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

    {/* Carousel Buttons Skeleton - Opaque background */}
    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-left p-3 border-r border-gray-300 last:border-r-0">
            <div className="h-4 bg-gray-400 rounded-full w-16 mb-2"></div>
            <div className="h-3 bg-gray-400 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-400 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Stats Section Skeleton
const StatsSkeleton: React.FC = () => (
  <div className="py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="h-8 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// News Section Skeleton
const NewsSkeleton: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-6">
            <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Faculties Section Skeleton
const FacultiesSkeleton: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-6 text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Video Gallery Section Skeleton
const VideoGallerySkeleton: React.FC = () => (
  <div className="py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg overflow-hidden">
            <div className="w-full h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-5 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Interactive Services Section Skeleton
const InteractiveServicesSkeleton: React.FC = () => (
  <div className="py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-6 flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-5 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Generic Section Skeleton (fallback)
const GenericSkeleton: React.FC = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-6">
            <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);