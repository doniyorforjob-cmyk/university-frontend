import React from 'react';
import { AspectRatio } from '../../../components/ui/aspect-ratio';
import { CalendarDaysIcon, EyeIcon, PhotoIcon } from '@heroicons/react/24/outline'; // Keep these for date/views/photos
import { PlayIcon as SolidPlayIcon, PhotoIcon as SolidPhotoIcon } from '@heroicons/react/24/solid'; // For solid icons

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
};

type MediaCardProps = VideoCardProps | PhotoCardProps;

const MediaCard: React.FC<MediaCardProps> = (props) => {
  const { type, title, thumbnail, date, views } = props;

  const isVideo = type === 'video';

  // For video cards, we don't need href or data-fancybox here, as the parent div handles the click
  // For photo cards, we might still want data-fancybox if it's used for a photo gallery
  const href = isVideo ? (props as VideoCardProps).embedUrl : (props as PhotoCardProps).imageUrl;
  const className = `g-card _1 _1-2`; // Removed 'video_btn' class from here
  const photos = !isVideo ? ((props as PhotoCardProps).photos ?? 0) : 0; // Ensure photos is always a number

  return (
    <div className={className}> {/* MediaCard is always a div */}
      <div className="g-card-image relative">
        <AspectRatio ratio={1}>
          <img src={thumbnail} alt="news" className="h-full w-full object-cover" />
        </AspectRatio>
        <div className="g-card-image-icon absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded p-2">
          {type === 'video' ? (
            <SolidPlayIcon className="w-8 h-8 text-white" fill="currentColor" /> // Using Heroicon
          ) : (
            <SolidPhotoIcon className="w-8 h-8 text-white" fill="currentColor" /> // Using Heroicon
          )}
        </div>
        <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur rounded p-2 z-10">
          <div className="flex justify-between items-center text-secondary-500 w-full gap-2 font-bold">
            <span className="flex items-center gap-1 rounded px-1 py-0.5">
              <CalendarDaysIcon className="w-4 h-4" />
              {date}
            </span>
            <span className="flex items-center gap-1 rounded px-1 py-0.5">
              <EyeIcon className="w-4 h-4" />
              {views}
            </span>
            {photos > 0 && ( // Only render if photos is strictly greater than 0
              <span className="flex items-center gap-1 rounded px-1 py-0.5">
                <PhotoIcon className="w-4 h-4" />
                {photos}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="g-card-info">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default MediaCard;
