import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { OptimizedImage } from './index';

interface CarouselImage {
    src: string;
    alt: string;
    caption?: string;
}

interface ImageCarouselProps {
    images: CarouselImage[];
    className?: string;
    autoplayDelay?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
    className = '',
    autoplayDelay = 5000
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: autoplayDelay, stopOnInteraction: false })
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    if (!images || images.length === 0) return null;

    return (
        <div className={`relative group rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100 ${className}`}>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y cursor-grab active:cursor-grabbing">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative flex-[0_0_100%] min-w-0" // Slide
                        >
                            <div className="aspect-[16/9] relative w-full overflow-hidden">
                                <OptimizedImage
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                    lazy={index !== 0} // Priority load first image
                                    width={1200}
                                />

                                {/* Caption overlay if exists */}
                                {image.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-12">
                                        <p className="text-white text-sm md:text-base font-medium line-clamp-2">
                                            {image.caption}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons (Only if > 1 image) */}
            {images.length > 1 && (
                <>


                    {/* Dots Pagination */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex
                                    ? 'bg-white w-8 shadow-sm'
                                    : 'bg-white/50 hover:bg-white/80 w-4'
                                    }`}
                                onClick={() => scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageCarousel;
