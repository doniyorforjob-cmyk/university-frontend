import React from "react";
import { useStandardSection } from './hooks/useStandardSection';
import { transformHeroData } from './transformers/heroTransformer';
import { homeApi } from '../../api/homeApi';
import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from '@/components/ui/progressive-carousel';

interface CarouselItem {
  id: string;
  img: string;
  title: string;
  desc: string;
  sliderName: string;
  order?: number;
  enabled?: boolean;
}

export default function HeroSection() {
  // Yangi arxitektura: useStandardSection hook with API
  const { data, loading } = useStandardSection(
    'hero',
    homeApi.getHeroData,
    {
      ttlMinutes: 60, // 1 soat cache
      transformData: transformHeroData
    }
  );

  // Loading state - show nothing until data is loaded to prevent text from showing
  if (loading || !data) {
    return null;
  }

  const carouselItems: CarouselItem[] = data?.carouselItems || [];
  const enabledItems = carouselItems
    .filter((item: CarouselItem) => item.enabled !== false)
    .sort((a: CarouselItem, b: CarouselItem) => (a.order || 0) - (b.order || 0));

  return (
    <section className="relative min-h-[60vh] overflow-hidden">
      <ProgressSlider vertical={false} activeSlider='bridge'>
        <SliderContent>
          {enabledItems.map((item: CarouselItem, index: number) => (
            <SliderWrapper key={item.id} value={item.sliderName}>
              <img
                className='w-full h-[60vh] xl:h-[80vh] object-cover'
                src={item.img}
                alt={item.desc}
              />
            </SliderWrapper>
          ))}
        </SliderContent>

        <SliderBtnGroup className='absolute bottom-0 h-fit dark:text-white text-black dark:bg-black/40 bg-white/40 backdrop-blur-md overflow-hidden grid grid-cols-2 md:grid-cols-4 rounded-md'>
          {enabledItems.map((item: CarouselItem, index: number) => (
            <SliderBtn
              key={item.id}
              value={item.sliderName}
              className='text-left cursor-pointer p-3 border-r'
              progressBarClass='dark:bg-black bg-white h-full'
            >
              <h2 className='relative px-4 rounded-full w-fit dark:bg-white dark:text-black text-white bg-gray-900 mb-2'>
                {item.title}
              </h2>
              <p className='text-sm font-medium line-clamp-2'>{item.desc}</p>
            </SliderBtn>
          ))}
        </SliderBtnGroup>
      </ProgressSlider>
    </section>
  );
}
