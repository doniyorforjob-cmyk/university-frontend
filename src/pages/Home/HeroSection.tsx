import React, { useState, useEffect } from "react";
import { useStandardSection } from './hooks';
import { transformHeroData } from './transformers/heroTransformer';
import { homeApi } from '../../services/homeService';
import { SectionSkeleton } from './components/SectionSkeleton';
import HeroActionCards from './components/HeroActionCards';
import { useLocale } from '@/contexts/LocaleContext';
import { CarouselItem } from '@/types/home.types';

export default function HeroSection({ data: propData }: { data?: any } = {}) {
  // If propData is provided, use it directly, otherwise fetch
  const shouldFetch = !propData;

  const { data, loading } = useStandardSection(
    'hero',
    homeApi.getHeroData,
    {
      transformData: transformHeroData,
      enabled: shouldFetch,
      revalidateThresholdMinutes: 0
    }
  );

  // Use prop data if available, otherwise use fetched data
  const heroData = propData || data;

  const items: CarouselItem[] = Array.isArray(heroData) ? heroData : heroData?.items || [];
  const enabledItems = items.filter((item: CarouselItem) => item.enabled !== false);
  const activeItem = enabledItems.length > 0 ? enabledItems[0] : null;

  // Loading state - show skeleton until data is loaded
  if ((shouldFetch && loading) || !heroData) {
    return <SectionSkeleton sectionType="hero" />;
  }

  // Hardcoded action links based on the design image
  // hardcoded action links removed
  const actionLinks = heroData.actionLinks || [];

  if (!activeItem) return null;

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[70vh] xl:h-[75vh] overflow-hidden flex flex-col justify-end bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {activeItem.video ? (
          <video
            className="w-full h-full object-cover opacity-0 animate-fade-in"
            onLoadedData={(e) => (e.target as HTMLVideoElement).style.opacity = '1'}
            src={activeItem.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={activeItem.img}
          />
        ) : activeItem.img ? (
          <img
            className="w-full h-full object-cover"
            src={activeItem.img}
            alt={activeItem.title}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-[#111]" />
        )}
      </div>

      {/* Content Layer */}
      <div className="relative z-20 w-full mb-10 lg:mb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

            {/* Empty Space / Left Side - Title Area */}
            <div className="lg:col-span-12">
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-8 animate-fade-in-up max-w-4xl">
                {activeItem.title}
              </h1>

              {/* Dynamic Timeline aligned with Action Cards */}
              <div className={`hidden md:grid w-full grid-cols-${Math.max(1, actionLinks.length)} relative mt-12`}>
                <div className="absolute left-0 -top-8 italic text-white/90 text-xl font-light col-span-full">
                  {activeItem.desc}
                </div>

                {actionLinks.map((_: any, idx: number) => (
                  <div key={idx} className="flex items-center w-full relative pr-4">
                    <span className="w-3 h-3 rounded-full border-2 border-white bg-transparent flex-shrink-0 z-10" />
                    <div className="h-[2px] border-t-2 border-dashed border-white/40 flex-grow ml-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side / Extra Info? - Currently mostly empty in design, but Action Cards are below everything */}
          </div>

          {/* Action Cards Integrated at the bottom - INSIDE CONTAINER */}
          <div className="mt-8">
            <HeroActionCards links={actionLinks} />
          </div>
        </div>
      </div>
    </section>
  );
}
