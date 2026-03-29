import React from "react";
import { useTranslation } from "react-i18next";
import { useStandardSection } from './hooks';
import { transformHeroData } from './transformers/heroTransformer';
import { homeApi } from '../../services/homeService';
import { SectionSkeleton } from './components/SectionSkeleton';
import HeroActionCards from './components/HeroActionCards';
import { CarouselItem } from '@/types/home.types';
import Container from '@/components/shared/Container';

export default function HeroSection({ data: propData }: { data?: any } = {}) {
  const { t } = useTranslation('common');
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
  const actionLinks = [...(heroData.actionLinks || [])];

  // Add YDA link manually if it's not in the API data and we have space (up to 4)
  const hasYDA = actionLinks.some(l => l.url.includes('final-state-attestation'));
  if (!hasYDA && actionLinks.length < 4) {
    actionLinks.push({
      id: 'manual-yda',
      title: t('nav.yda', 'Yakuniy Davlat Attestatsiyasi'),
      url: '/final-state-attestation',
      isExternal: false,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.599 9.084a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 13v6c.333 1 2 3 6 3s5.667-2 6-3v-6"/><path d="M22 10v6"/></svg>'
    });
  }

  if (!activeItem) return null;

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[70vh] xl:h-[75vh] overflow-hidden flex flex-col justify-end bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {activeItem.video ? (
          <video
            className="w-full h-full object-cover animate-fade-in"
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
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* ... title area ... */}
            <div className="lg:col-span-12">
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-8 animate-fade-in-up max-w-4xl">
                {activeItem.title}
              </h1>

              {/* Dynamic Timeline aligned with Action Cards */}
              <div
                className="hidden md:grid w-full relative mt-12"
                style={{ gridTemplateColumns: `repeat(${actionLinks.length}, minmax(0, 1fr))` }}
              >
                <div className="absolute left-0 -top-8 italic text-white/90 text-xl font-light col-span-full">
                  {activeItem.desc}
                </div>

                {/* Timeline dots matching action links with trailing lines */}
                {actionLinks.map((_, idx) => (
                  <div key={idx} className="flex items-center w-full relative pl-4 lg:pl-6 pr-0">
                    <span className="w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full border-2 border-white/80 bg-transparent flex-shrink-0 z-10 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                    <div className="h-[1px] border-t border-dashed border-white/30 flex-grow ml-3 mr-[-10px] lg:mr-[-15px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Cards Integrated at the bottom - INSIDE CONTAINER */}
          <div className="mt-8">
            <HeroActionCards links={actionLinks} />
          </div>
        </Container>
      </div>
    </section>
  );
}
