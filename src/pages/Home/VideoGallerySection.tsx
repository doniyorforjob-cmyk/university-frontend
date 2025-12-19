import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import Container from "../../components/shared/Container";
import { useStandardSection } from './hooks/useStandardSection';
import { homeApi, HomeMediaData } from '../../services/homeService';
import { MediaGalleryHeader } from './components/SectionHeader';
import MediaCard from './components/MediaCard';

const formatDate = (dateString: string, language: string) => {
  const date = new Date(dateString);

  const time = date.toLocaleTimeString(language, {
    hour: '2-digit',
    minute: '2-digit'
  });

  return `${time} ${date.toLocaleDateString(language, { day: 'numeric', month: 'short' })}`;
};


const MediaGallery: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('videos');
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const { data, loading } = useStandardSection(
    'media-gallery',
    homeApi.getMediaData
  );

  // Debug: log the data structure
  console.log('MediaGallery data:', data);
  console.log('MediaGallery data.photos:', data?.photos);
  console.log('MediaGallery data.videos:', data?.videos);

  if (loading || !data) return null;


  const renderPhotoGallery = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {(data.photos || []).map((photo: HomeMediaData['photos'][0], index: number) => (
        <MediaCard
          key={photo.id}
          type="photo"
          title={photo.title}
          thumbnail={photo.image}
          date={formatDate(photo.uploadDate || new Date().toISOString(), i18n.language)}
          views={736}
          photos={6}
          imageUrl={photo.image}
          slug={photo.id}
        />
      ))}
    </div>
  );

  const renderVideoGallery = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {(data.videos || []).map((video: HomeMediaData['videos'][0], index: number) => (
        <div key={video.id} onClick={() => setActiveVideo(index)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveVideo(index); }}>
          <MediaCard
            type="video"
            title={video.title}
            thumbnail={video.thumbnail}
            date={formatDate(video.uploadDate, i18n.language)}
            views={123}
            videoId={video.id}
            embedUrl={`https://www.youtube.com/embed/${video.id}`}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-16">
      <Container>
        {/* Media Gallery Header Component */}
        <MediaGalleryHeader
          onTabChange={setActiveTab}
          activeTab={activeTab}
          seeAllText={t('seeAllMedia') as string}
        />

        {/* Tab Content */}
        <div className="tab-content relative">
          {activeTab === 'photos' && (
            <div className="animate-fade-in">
              {renderPhotoGallery()}
            </div>
          )}
          {activeTab === 'videos' && (
            <div className="animate-fade-in">
              {renderVideoGallery()}
            </div>
          )}
        </div>

        {/* Modal for Video Player */}
        {activeVideo !== null && activeTab === 'videos' && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setActiveVideo(null)} role="button" tabIndex={-1} onKeyDown={(e) => { if (e.key === 'Escape') setActiveVideo(null); }}>
            <div className="bg-white w-full max-w-6xl h-[60vh] overflow-hidden shadow-2xl relative">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-2 right-2 z-20 text-gray-600 hover:text-gray-800 bg-white rounded-full p-1 shadow-lg transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex h-full">
                {/* Left side - Video */}
                <div className="w-1/2 bg-black">
                  <div className="h-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${data.videos[activeVideo].id}?autoplay=1`}
                      title={data.videos[activeVideo].title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>

                {/* Right side - Info */}
                <div className="w-1/2 bg-gray-50 p-6 flex flex-col">
                  {/* Header with logo and time */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded flex items-center justify-center mr-3">
                        <img src="/images/logo.png" alt="University Logo" className="w-full h-full object-contain p-1" />
                      </div>
                      <span className="text-lg font-semibold text-gray-800">Namangan Davlat Texnika Universiteti</span>
                    </div>
                    <span className="text-sm text-gray-600">{formatDate(data.videos[activeVideo].uploadDate, i18n.language)}</span>
                  </div>

                  {/* Video title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-3">{data.videos[activeVideo].title}</h3>

                  {/* Watch button */}
                  <div className="flex justify-start">
                    <a
                      href={`https://www.youtube.com/watch?v=${data.videos[activeVideo].id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent text-primary border-2 border-primary py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-base w-auto shadow-lg hover:shadow-xl"
                    >
                      <span className="bg-primary absolute inset-0 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10 rounded-lg"></span>
                      <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l8-5-8-5z" />
                      </svg>
                      <span className="relative z-10">{t('watchVideo')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MediaGallery;