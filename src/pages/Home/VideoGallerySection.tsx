import React, { useState } from "react";
import Container from "../../components/shared/Container";
import { useStandardSection } from './hooks/useStandardSection';
import { homeApi, HomeMediaData } from '../../api/homeApi';
import { MediaGalleryHeader } from './components/SectionHeader';

const MediaGallery: React.FC = () => {
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

  const calculateTimeAgo = (uploadDate: string) => {
    const now = new Date();
    const upload = new Date(uploadDate);
    const diffInMs = now.getTime() - upload.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInYears > 0) return `${diffInYears} yil oldin`;
    if (diffInMonths > 0) return `${diffInMonths} oy oldin`;
    if (diffInDays > 0) return `${diffInDays} kun oldin`;
    if (diffInHours > 0) return `${diffInHours} soat oldin`;
    return "Hozir";
  };

  const renderPhotoGallery = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {(data.photos || []).map((photo: HomeMediaData['photos'][0], index: number) => (
        <div
          key={photo.id}
          className="bg-white overflow-hidden shadow-md border-2 border-gray-200 transition-all duration-300 w-full text-left aspect-square group hover:shadow-lg"
        >
          {/* Photo Image */}
          <div className="h-[75%] relative cursor-pointer overflow-hidden">
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="w-12 h-12 bg-white bg-opacity-90 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="h-[25%] bg-white px-3 py-2 flex flex-col justify-between">
            <h4 className="text-base font-semibold text-gray-800 line-clamp-2 mb-1">{photo.title}</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600">{photo.category}</span>
              <span className="text-xs text-gray-500">{calculateTimeAgo(photo.uploadDate)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderVideoGallery = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {(data.videos || []).map((video: HomeMediaData['videos'][0], index: number) => (
        <div
          key={video.id}
          className={`bg-white overflow-hidden shadow-md border-2 transition-all duration-300 w-full text-left aspect-square ${
            activeVideo === index
              ? "border-blue-500 shadow-lg"
              : "border-gray-200"
          }`}
        >
          {/* Top 15% - Logo and Time */}
          <div className="h-[15%] bg-white flex items-center justify-between px-3 py-1 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-2">
                <span className="text-white text-sm font-bold">U</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">Namangan Davlat Texnika Universiteti</span>
            </div>
            <span className="text-sm text-gray-600">{calculateTimeAgo(video.uploadDate)}</span>
          </div>

          {/* Middle 60% - Video Thumbnail */}
          <div className="h-[60%] relative cursor-pointer" onClick={() => setActiveVideo(index)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveVideo(index); }}>
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-90 flex items-center justify-center rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom 25% - Title, Category and YouTube */}
          <div className="h-[25%] bg-white px-3 py-2 flex flex-col justify-between">
            <h4 className="text-base font-semibold text-gray-800 line-clamp-2 mb-1">{video.title}</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600">{video.category}</span>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-red-600 hover:text-red-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
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
          title="Media resurslar"
          photoTabText="Fotogalareya"
          videoTabText="Videogalareya"
          seeAllText="Barchasi"
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
                      <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center mr-3">
                        <span className="text-white text-lg font-bold">U</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-800">Namangan Davlat Texnika Universiteti</span>
                    </div>
                    <span className="text-sm text-gray-600">{calculateTimeAgo(data.videos[activeVideo].uploadDate)}</span>
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
                        <path d="M8 5v10l8-5-8-5z"/>
                      </svg>
                      <span className="relative z-10">Tomosha qilish</span>
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