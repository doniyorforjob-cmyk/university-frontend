import React, { useState, useEffect } from "react";
import { useStandardSection } from './hooks/useStandardSection';
import { transformHeroData } from './transformers/heroTransformer';
import { homeApi } from '../../services/homeService';
import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from '@/components/ui/progressive-carousel';
import { SectionSkeleton } from './components/SectionSkeleton';

interface CarouselItem {
  id: string;
  img: string;
  title: string;
  desc: string;
  sliderName: string;
  order?: number;
  enabled?: boolean;
}

export default function HeroSection({ data: propData }: { data?: any } = {}) {
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);

  // If propData is provided, use it directly, otherwise fetch
  const shouldFetch = !propData;
  const { data, loading, isCached } = useStandardSection(
    'hero',
    homeApi.getHeroData,
    {
      transformData: transformHeroData,
      enabled: shouldFetch
    }
  );

  // Use prop data if available, otherwise use fetched data
  const heroData = propData || data;

  // Debug
  console.log('HeroSection:', { propData: !!propData, fetchedData: !!data, heroData: !!heroData, shouldFetch });

  const carouselItems: CarouselItem[] = heroData?.carouselItems || [];
  const enabledItems = carouselItems
    .filter((item: CarouselItem) => item.enabled !== false)
    .sort((a: CarouselItem, b: CarouselItem) => (a.order || 0) - (b.order || 0));

  // Check if first image is loaded
  useEffect(() => {
    if (enabledItems.length > 0) {
      const firstItem = enabledItems[0];
      const img = new Image();
      img.onload = () => setFirstImageLoaded(true);
      img.src = firstItem.img;
    } else {
      setFirstImageLoaded(false);
    }
  }, [enabledItems]);

  // Loading state - show skeleton until data is loaded
  if ((shouldFetch && loading) || !heroData) {
    return <SectionSkeleton sectionType="hero" />;
  }

  console.log('HeroSection rendering with', enabledItems.length, 'items');

  return (
    <section className="relative min-h-[60vh] overflow-hidden">
      <ProgressSlider
        vertical={false}
        activeSlider={enabledItems.length > 0 ? enabledItems[0].sliderName : ''}
      >
        <SliderContent>
          {enabledItems.map((item: CarouselItem, index: number) => (
            <SliderWrapper key={item.id} value={item.sliderName}>
              <img
                className='w-full h-[55vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] object-cover'
                src={item.img}
                alt={item.title}
              />
            </SliderWrapper>
          ))}
        </SliderContent>

        {firstImageLoaded && (
          <SliderBtnGroup className='absolute bottom-0 h-fit dark:text-white text-black dark:bg-black/40 bg-white/40 backdrop-blur-md overflow-hidden grid grid-cols-2 md:grid-cols-4'>
            {enabledItems.map((item: CarouselItem, index: number) => (
              <SliderBtn
                key={item.id}
                value={item.sliderName}
                className='text-left cursor-pointer p-3 border-r'
                progressBarClass='dark:bg-black bg-white h-full'
              >
                <h2 className='relative px-4 rounded-full w-fit dark:bg-secondary dark:text-white text-white bg-secondary mb-2 text-2xl'>
                  {item.title}
                </h2>
                <p className='text-lg font-medium line-clamp-2'>{item.desc}</p>
              </SliderBtn>
            ))}
          </SliderBtnGroup>
        )}
      </ProgressSlider>
    </section>
  );
}
