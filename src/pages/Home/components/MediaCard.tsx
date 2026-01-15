import React from 'react';
import { Link } from 'react-router-dom';
import { AspectRatio } from '../../../components/ui/aspect-ratio';
import { CalendarDaysIcon, EyeIcon, PhotoIcon, PlayIcon } from '@heroicons/react/24/outline';

type BaseMediaCardProps = {
  title: string;
  thumbnail: string;
  date: string;
  views: number;
};

type VideoCardProps = BaseMediaCardProps & {
  type: 'video';
  videoId: string;
  embedUrl: string;
};

type PhotoCardProps = BaseMediaCardProps & {
  type: 'photo';
  imageUrl: string;
  photos?: number;
  slug?: string;
};

type MediaCardProps = VideoCardProps | PhotoCardProps;

type MediaCardContentProps = MediaCardProps & {
  photosCount: number;
};

const MediaCardContent: React.FC<MediaCardContentProps> = (props) => {
  const { type, title, thumbnail, date, views, photosCount } = props;
  return (
    <div className="flex flex-col h-full">
      <div className="g-card-image relative overflow-hidden rounded-2xl md:rounded-[2rem] shadow-sm transition-all duration-300">
        <AspectRatio ratio={1}>
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out"
          />
        </AspectRatio>

        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-100 transition-opacity duration-300" />

        {/* Floating Icon Badge */}
        <div className="absolute top-4 left-4 bg-[#5a5a5a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 z-20 shadow-lg">
          {type === 'video' ? (
            <PlayIcon className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
          ) : (
            <PhotoIcon className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
          )}
        </div>

        {/* Metadata Overlay - Glassmorphism */}
        <div className="absolute bottom-4 left-4 right-4 bg-[#5a5a5a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 z-10 shadow-md">
          <div className="flex justify-between items-center text-[#FFE082] w-full gap-2 font-bold text-base md:text-lg px-2">
            <span className="flex items-center gap-2">
              <CalendarDaysIcon className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
              {date}
            </span>
            <div className="flex items-center gap-4">
              {photosCount > 0 && (
                <span className="flex items-center gap-2 text-[#FFE082]">
                  <PhotoIcon className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
                  {photosCount}
                </span>
              )}
              <span className="flex items-center gap-2">
                <EyeIcon className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
                {views}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="g-card-info mt-4 px-1">
        <h3 className="text-lg md:text-xl font-black text-gray-900 line-clamp-2 leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
};

const MediaCard: React.FC<MediaCardProps> = (props) => {
  const { type } = props;
  const isVideo = type === 'video';

  const className = `g-card group cursor-pointer`;
  const photosCount = !isVideo ? ((props as PhotoCardProps).photos ?? 0) : 0;
  const containerClasses = `${className} transition-all duration-300`;

  const commonProps = { ...props, photosCount };

  if (type === 'photo' && (props as PhotoCardProps).slug) {
    return (
      <Link to={`/photos/${(props as PhotoCardProps).slug}`} className={containerClasses}>
        <MediaCardContent {...commonProps} />
      </Link>
    );
  }

  return (
    <div
      className={containerClasses}
      onClick={isVideo ? (props as any).onClick : undefined}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (isVideo && (props as any).onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          (props as any).onClick();
        }
      }}
    >
      <MediaCardContent {...commonProps} />
    </div>
  );
};

export default MediaCard;
