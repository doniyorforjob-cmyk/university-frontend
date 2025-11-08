import React, { useState } from "react";
import Container from "../../components/shared/Container";

const VideoGallery: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const videos = [
    {
      id: "dQw4w9WgXcQ",
      title: "Universitet tanishtiruvi",
      description: "Qisqacha tanishtiruv videosi.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      category: "Tanishuv",
      uploadDate: "2023-10-15T10:00:00Z"
    },
    {
      id: "ScMzIvxBSi4",
      title: "Talabalar hayoti",
      description: "Talabalar kundalik hayotidan lavhalar.",
      thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
      category: "Hayot",
      uploadDate: "2023-09-20T14:30:00Z"
    },
    {
      id: "9bZkp7q19f0",
      title: "Ilmiy tadqiqotlar",
      description: "Universitetda olib borilgan ilmiy ishlar.",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
      category: "Ilmiy",
      uploadDate: "2023-08-12T09:15:00Z"
    },
    {
      id: "kJQP7kiw5Fk",
      title: "Tadbirlar va marosimlar",
      description: "Universitetda o‘tkazilgan tadbirlar.",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
      category: "Tadbir",
      uploadDate: "2023-11-05T16:45:00Z"
    },
    
  ];

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

  return (
    <div className="py-12">
      <Container>
        <div className="flex items-center mb-8">
          <span className="inline-block w-1 h-8 bg-primary mr-4"></span>
          <h2 className="text-3xl font-bold text-gray-800">
            Videogalereya
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
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
                  <span className="text-sm font-semibold text-gray-800">NamDTU</span>
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

        {/* Modal for Video Player */}
        {activeVideo !== null && (
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
                      src={`https://www.youtube.com/embed/${videos[activeVideo].id}?autoplay=1`}
                      title={videos[activeVideo].title}
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
                      <span className="text-lg font-semibold text-gray-800">NamDTU</span>
                    </div>
                    <span className="text-sm text-gray-600">{calculateTimeAgo(videos[activeVideo].uploadDate)}</span>
                  </div>

                  {/* Video title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-3">{videos[activeVideo].title}</h3>

                  {/* Watch button */}
                  <div className="flex justify-start">
                    <a
                      href={`https://www.youtube.com/watch?v=${videos[activeVideo].id}`}
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

export default VideoGallery;