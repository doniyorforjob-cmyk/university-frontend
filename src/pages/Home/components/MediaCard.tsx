import React from 'react';
import { Link } from 'react-router-dom';
import { AspectRatio } from '../../../components/ui/aspect-ratio';
import { CalendarDaysIcon, EyeIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { PlayIcon as SolidPlayIcon, PhotoIcon as SolidPhotoIcon } from '@heroicons/react/24/solid';

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

const MediaCard: React.FC<MediaCardProps> = (props) => {
  const { type, title, thumbnail, date, views } = props;

  const isVideo = type === 'video';

  const className = `g-card _1 _1-2 group cursor-pointer`;
  const photos = !isVideo ? ((props as PhotoCardProps).photos ?? 0) : 0;

  const CardContent = () => (
    <div className="flex flex-col h-full">
      <div className="g-card-image relative overflow-hidden rounded-2xl md:rounded-[2rem] shadow-sm group-hover:shadow-xl transition-all duration-500">
        <AspectRatio ratio={1}>
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </AspectRatio>

        {/* Overlay Gradient for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating Icon Badge */}
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-2.5 z-20 shadow-lg transform group-hover:scale-110 transition-transform duration-500">
          {type === 'video' ? (
            <SolidPlayIcon className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
          ) : (
            <SolidPhotoIcon className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
          )}
        </div>

        {/* Metadata Overlay - Glassmorphism */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 z-10 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-center text-white w-full gap-2 font-medium text-xs md:text-sm">
            <span className="flex items-center gap-1.5">
              <CalendarDaysIcon className="w-4 h-4 opacity-80" />
              {date}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <EyeIcon className="w-4 h-4 opacity-80" />
                {views}
              </span>
              {photos > 0 && (
                <span className="flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded-lg">
                  <PhotoIcon className="w-4 h-4" />
                  {photos}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="g-card-info mt-4 px-1">
        <h3 className="text-base md:text-lg font-bold text-brand-dark group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
          {title}
        </h3>
      </div>
    </div>
  );

  const containerClasses = `${className} hover:-translate-y-1 transition-transform duration-500`;

  if (type === 'photo' && (props as PhotoCardProps).slug) {
    return (
      <Link to={`/photos/${(props as PhotoCardProps).slug}`} className={containerClasses}>
        <CardContent />
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
      <CardContent />
    </div>
  );
};

export default MediaCard;
