import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Container from '../../../components/shared/Container';

interface SectionHeaderProps {
  title: string;
  seeAllLink?: string;
  seeAllText?: string | null;
  className?: string;
  noContainer?: boolean;
}

interface MediaGalleryHeaderProps {
  onTabChange: (tab: 'photos' | 'videos') => void;
  activeTab: 'photos' | 'videos';
  className?: string;
  title?: string;
  photoTabText?: string;
  videoTabText?: string;
  seeAllText?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  seeAllLink,
  seeAllText,
  className = '',
  noContainer = false
}) => {
  const content = (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-1 bg-primary h-8 mr-4"></div>
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="flex-1 mx-8">
        <div className="h-px bg-gray-300"></div>
      </div>
      {seeAllLink && seeAllText && (
        <Link
          to={seeAllLink}
          className="bg-secondary text-white px-4 py-2 inline-flex items-center text-lg font-semibold hover:bg-secondary-dark transition-colors group"
        >
          <span className="mr-2">{seeAllText}</span>
          <div
            className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-primary"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              willChange: 'background-color, transform',
              contain: 'layout style paint'
            }}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </div>
        </Link>
      )}
    </div>
  );

  return (
    <div className={`mb-8 ${className}`}>
      {noContainer ? content : <Container>{content}</Container>}
    </div>
  );
};

// Media Gallery Header Component
export const MediaGalleryHeader: React.FC<MediaGalleryHeaderProps> = ({
  onTabChange,
  activeTab,
  className = '',
  title,
  photoTabText,
  videoTabText,
  seeAllText
}) => {
  const { t } = useTranslation();
  const [activePosition, setActivePosition] = useState({ left: 0, width: 0 });
  const photoRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLButtonElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const finalTitle = title || t('mediaResources');
  const finalPhotoTabText = photoTabText || t('photoGallery');
  const finalVideoTabText = videoTabText || t('videoGallery');
  const finalSeeAllText = seeAllText || t('seeAllMedia');

  const handleTabChange = (tab: 'photos' | 'videos') => {
    onTabChange(tab);
  };

  useEffect(() => {
    const updateActivePosition = () => {
      const activeRef = activeTab === 'photos' ? photoRef : videoRef;
      if (activeRef.current && tabContainerRef.current) {
        const rect = activeRef.current.getBoundingClientRect();
        const containerRect = tabContainerRef.current.getBoundingClientRect();
        setActivePosition({
          left: rect.left - containerRect.left,
          width: rect.width
        });
      }
    };

    // Initial position update
    updateActivePosition();

    // Update position on window resize
    window.addEventListener('resize', updateActivePosition);
    return () => window.removeEventListener('resize', updateActivePosition);
  }, [activeTab]);

  const content = (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 overflow-hidden">
      {/* Title */}
      <div className="flex items-center mb-4 md:mb-0">
        <div className="w-1 bg-primary h-8 mr-4"></div>
        <h2 className="text-3xl font-bold text-gray-900">{finalTitle}</h2>
      </div>
      {/* Line for desktop between title and tabs */}
      <div className="hidden md:flex flex-1 mx-8 h-px bg-gray-400"></div>
      {/* Line for mobile between title and tabs */}
      <div className="md:hidden h-px bg-gray-300 mb-4"></div>
      {/* Tabs */}
      <div className="flex items-center justify-start md:justify-center mb-4 md:mb-0">
        <div
          ref={tabContainerRef}
          className="relative inline-flex rounded-lg border-gray-200 p-1"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          <div
            className="absolute top-0 left-0 h-full bg-secondary rounded transition-all duration-300 ease-out"
            style={{
              left: activePosition.left,
              width: activePosition.width,
              transform: 'translateZ(0)',
              willChange: 'width, left, transform',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          />
          <button
            ref={photoRef}
            role="tab"
            className={`relative z-10 px-6 py-2 text-lg font-medium transition-colors duration-200 inline-flex items-center ${activeTab === 'photos' ? 'text-white font-bold' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => handleTabChange('photos')}
            aria-selected={activeTab === 'photos'}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{finalPhotoTabText}</span>
          </button>
          <button
            ref={videoRef}
            role="tab"
            className={`relative z-10 px-6 py-2 text-lg font-medium transition-colors duration-200 inline-flex items-center ${activeTab === 'videos' ? 'text-white font-bold' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => handleTabChange('videos')}
            aria-selected={activeTab === 'videos'}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{finalVideoTabText}</span>
          </button>
        </div>
      </div>
      {/* Line for desktop between tabs and link */}
      <div className="hidden md:flex flex-1 mx-8 h-px bg-gray-400"></div>
      {/* Line for mobile between tabs and link */}
      <div className="md:hidden h-px bg-gray-300 mb-4"></div>
      {/* Link */}
      <Link
        to="/gallery"
        className="self-start bg-secondary text-white px-4 py-2 inline-flex items-center text-lg font-semibold hover:bg-secondary-dark transition-colors group"
      >
        <span className="mr-2">{seeAllText}</span>
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-primary">
            <ChevronRightIcon className="w-6 h-6 group-hover:text-white" />
          </div>
      </Link>
    </div>
  );

  return (
    <div className={className}>
      {content}
    </div>
  );
};

export default SectionHeader;