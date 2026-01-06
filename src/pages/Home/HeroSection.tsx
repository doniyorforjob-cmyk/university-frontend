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
import { useLocale } from '@/contexts/LocaleContext';
import { useGlobalCache } from '@/components/providers/CachedApiProvider';

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
  const { locale } = useLocale();
  const { cacheManager } = useGlobalCache();

  // Stabilize the fetcher specifically for the current locale
  const fetcher = React.useMemo(() => () => homeApi.getHeroData(locale), [locale]);

  const { data, loading, isCached } = useStandardSection(
    'hero',
    fetcher,
    {
      transformData: transformHeroData,
      enabled: shouldFetch
    }
  );

  // Use prop data if available, otherwise use fetched data
  const heroData = propData || data;

  // Background prefetching for other locales
  useEffect(() => {
    if (!heroData || !shouldFetch) return;

    const otherLocales = ['uz', 'ru', 'en'].filter(l => l !== locale);

    otherLocales.forEach(async (targetLocale) => {
      // Construct cache key matching useStandardSection logic: home-section-{type}-http-{locale}
      const cacheKey = `home-section-hero-http-${targetLocale}`;

      if (!cacheManager.has(cacheKey)) {
        try {
          const rawData = await homeApi.getHeroData(targetLocale);
          // Manually transform data for consistency with useStandardSection
          const transformedData = transformHeroData(rawData);
          // Set to cache with same TTL as config (default 5 min or similar)
          cacheManager.set(cacheKey, transformedData, 5);
        } catch (e) {
          console.warn(`Failed to prefetch hero for ${targetLocale}`, e);
        }
      }
    });
  }, [heroData, locale, cacheManager, shouldFetch]);

  // Debug

  // Handle if heroData is the carouselItems array directly
  const carouselItems: CarouselItem[] = Array.isArray(heroData) ? heroData : heroData?.carouselItems || [];

  // Filter enabled items but DO NOT re-sort by order.
  // Reliance is on the transformer which sorts by createdAt (Newest First).
  const enabledItems = carouselItems
    .filter((item: CarouselItem) => item.enabled !== false);
  // .sort(...) removed to enforce "Newest First" from transformer

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


  return (
    <section className="relative overflow-hidden">
      <ProgressSlider
        vertical={false}
        activeSlider={enabledItems.length > 0 ? enabledItems[0].sliderName : ''}
      >
        <SliderContent>
          {enabledItems.map((item: CarouselItem, index: number) => (
            <SliderWrapper key={item.id} value={item.sliderName}>
              <img
                className='w-full h-[50vh] sm:h-[60vh] lg:h-[60vh] xl:h-[76vh] 2xl:h-[72vh] object-cover block'
                src={item.img}
                alt={item.title}
              />
            </SliderWrapper>
          ))}
        </SliderContent>

        {firstImageLoaded && (
          <SliderBtnGroup className='absolute bottom-0 w-full h-fit dark:text-white text-black dark:bg-black/40 bg-white/40 backdrop-blur-md overflow-hidden grid grid-cols-2 md:grid-cols-4'>
            {enabledItems.map((item: CarouselItem, index: number) => (
              <SliderBtn
                key={item.id}
                value={item.sliderName}
                className='text-left cursor-pointer p-3 xl:p-2 border-r border-white/20 last:border-r-0'
                progressBarClass='dark:bg-black bg-white h-full'
              >
                <h2 className='relative px-4 rounded-full w-fit dark:bg-secondary dark:text-white text-white bg-secondary mb-2 text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-lg truncate max-w-full'>
                  {item.title}
                </h2>
                <p className='font-medium line-clamp-2 text-sm md:text-base lg:text-base xl:text-base 2xl:text-sm'>{item.desc}</p>
              </SliderBtn>
            ))}
          </SliderBtnGroup>
        )}
      </ProgressSlider>
    </section>
  );
}
