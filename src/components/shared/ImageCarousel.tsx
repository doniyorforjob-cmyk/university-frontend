import React from 'react';
import { OptimizedImage } from './index';

interface CarouselImage {
    src: string;
    alt: string;
    caption?: string;
}

interface ImageCarouselProps {
    images: CarouselImage[];
    activeIndex?: number;
    className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
    activeIndex = 0,
    className = '',
}) => {
    if (!images || images.length === 0) return null;

    const image = images[activeIndex] ?? images[0];

    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            <div className="w-full h-64 sm:h-80 md:h-[420px] lg:h-[520px]">
                <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    lazy={false}
                    width={1200}
                    height={800}
                />
                {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-12">
                        <p className="text-white text-sm md:text-base font-medium line-clamp-2">
                            {image.caption}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageCarousel;
