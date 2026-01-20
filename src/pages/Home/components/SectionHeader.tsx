import React, { useState, useRef, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Container from '../../../components/shared/Container';
import PrefetchLink from '../../../components/shared/PrefetchLink';

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
        <PrefetchLink
          to={seeAllLink}
          prefetch={true}
          prefetchDelay={150}
          onMouseEnter={async () => {
            const { prefetchService } = await import('../../../services/prefetchService');
            if (seeAllLink === '/news') {
              prefetchService.prefetchNewsPage();
            } else if (seeAllLink === '/announcements') {
              // Future: prefetchService.prefetchAnnouncementsPage();
            }
          }}
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
        </PrefetchLink>
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
  const { t } = useTranslation(['common', 'pages']);
  const [activePosition, setActivePosition] = useState({ left: 0, width: 0 });
  const photoRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLButtonElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const finalTitle = title || t('pages:mediaResources');
  const finalPhotoTabText = photoTabText || t('pages:photoGallery');
  const finalVideoTabText = videoTabText || t('pages:videoGallery');
  const finalSeeAllText = seeAllText || t('common:seeAllMedia');

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
          className="relative inline-flex rounded-2xl bg-slate-100/50 p-1.5 border border-slate-200/60 backdrop-blur-sm"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          <div
            className="absolute top-1.5 bottom-1.5 bg-white rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm"
            style={{
              left: activePosition.left,
              width: activePosition.width,
              transform: 'translateZ(0)',
              willChange: 'width, left, transform',
            }}
          />
          <button
            ref={photoRef}
            role="tab"
            className={`relative z-10 px-5 md:px-8 py-2.5 text-base md:text-lg font-bold transition-all duration-300 inline-flex items-center rounded-xl ${activeTab === 'photos' ? 'text-primary' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => handleTabChange('photos')}
            aria-selected={activeTab === 'photos'}
          >
            <svg className={`w-5 h-5 mr-2 transition-transform duration-300 ${activeTab === 'photos' ? 'scale-110' : 'opacity-70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{finalPhotoTabText}</span>
          </button>
          <button
            ref={videoRef}
            role="tab"
            className={`relative z-10 px-5 md:px-8 py-2.5 text-base md:text-lg font-bold transition-all duration-300 inline-flex items-center rounded-xl ${activeTab === 'videos' ? 'text-primary' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => handleTabChange('videos')}
            aria-selected={activeTab === 'videos'}
          >
            <svg className={`w-5 h-5 mr-2 transition-transform duration-300 ${activeTab === 'videos' ? 'scale-110' : 'opacity-70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{finalVideoTabText}</span>
          </button>
        </div>
      </div>
      {/* Line for desktop between tabs and link */}
      <div className="hidden md:flex flex-1 mx-8 h-px bg-slate-200"></div>
      {/* Line for mobile between title and tabs */}
      <div className="md:hidden h-px bg-slate-200 mb-4"></div>
      {/* Link */}
      <PrefetchLink
        to="/gallery"
        prefetch={true}
        prefetchDelay={150}
        className="bg-secondary text-white px-4 py-2 inline-flex items-center text-lg font-semibold hover:bg-secondary-dark transition-colors group"
      >
        <span className="mr-2">{finalSeeAllText}</span>
        <div
          className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-primary"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'background-color, transform',
          }}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </div>
      </PrefetchLink>
    </div>
  );

  return (
    <div className={className}>
      {content}
    </div>
  );
};

export default SectionHeader;