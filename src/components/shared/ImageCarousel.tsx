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
                            <div className="relative w-full h-72 md:h-[40vh] lg:h-[50vh] min-h-[18rem] overflow-hidden">
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

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => emblaApi?.scrollPrev()}
                        aria-label="Previous image"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => emblaApi?.scrollNext()}
                        aria-label="Next image"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2.5 rounded-full transition-all duration-300 shadow-lg ${index === selectedIndex
                            ? 'bg-white w-12 opacity-100'
                            : 'bg-white/40 hover:bg-white/70 w-3.5 opacity-80'
                            }`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
