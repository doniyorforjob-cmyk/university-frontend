import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
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
          className="group inline-flex items-center text-[#0E104B] font-semibold transform transition-all duration-200 hover:scale-105 hover:text-[#0E104B]-focus"
        >
          {seeAllText}
          <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
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
  className = ''
}) => {
  const handleTabChange = (tab: 'photos' | 'videos') => {
    console.log('Tab changed to:', tab);
    onTabChange(tab);
  };

  const content = (
    <div className="g-section-header mb-8">
      <div className="flex items-center">
        <div className="w-1 bg-primary h-8 mr-4"></div>
        <h2 className="text-3xl font-bold text-gray-900">Media resurslar</h2>
      </div>
      <div className="g-section-header-line"></div>
      <div className="g-section-header-tab" role="tablist">
        <button
          data-bs-toggle="tab"
          data-bs-target="#photogallery"
          role="tab"
          className={`g-button button_link ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => handleTabChange('photos')}
          aria-selected={activeTab === 'photos'}
        >
          <i className="icon-photo">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </i>
          <span> Fotogalareya</span>
        </button>
        <button
          data-bs-toggle="tab"
          data-bs-target="#videogallery"
          role="tab"
          className={`g-button button_link ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => handleTabChange('videos')}
          aria-selected={activeTab === 'videos'}
        >
          <i className="icon-video">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </i>
          <span> Videogalareya</span>
        </button>
      </div>
      <div className="g-section-header-line"></div>
      <Link to="/gallery" className="update_link">
        <button className="g-button">
          <span>Barchasi</span>
          <ChevronRightIcon className="w-5 h-5 ml-1" />
        </button>
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