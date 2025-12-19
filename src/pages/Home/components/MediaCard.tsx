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
    <>
      <div className="g-card-image relative overflow-hidden">
        <AspectRatio ratio={1}>
          <img src={thumbnail} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </AspectRatio>
        <div className="g-card-image-icon absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded p-2 z-20">
          {type === 'video' ? (
            <SolidPlayIcon className="w-8 h-8 text-white" fill="currentColor" />
          ) : (
            <SolidPhotoIcon className="w-8 h-8 text-white" fill="currentColor" />
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur rounded p-2 z-10">
          <div className="flex justify-between items-center text-secondary-500 w-full gap-2 font-bold text-sm md:text-base">
            <span className="flex items-center gap-1">
              <CalendarDaysIcon className="w-5 h-5" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <EyeIcon className="w-5 h-5" />
              {views}
            </span>
            {photos > 0 && (
              <span className="flex items-center gap-1">
                <PhotoIcon className="w-5 h-5" />
                {photos}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="g-card-info mt-3">
        <h3 className="text-lg font-bold text-[#0E104B] group-hover:text-primary transition-colors duration-300 line-clamp-2">{title}</h3>
      </div>
    </>
  );

  if (type === 'photo' && (props as PhotoCardProps).slug) {
    return (
      <Link to={`/photos/${(props as PhotoCardProps).slug}`} className={className}>
        <CardContent />
      </Link>
    );
  }

  return (
    <div className={className}>
      <CardContent />
    </div>
  );
};

export default MediaCard;
