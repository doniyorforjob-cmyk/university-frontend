import { useMemo } from 'react';
import { HomeSectionBlock } from '../types';
import { useStandardSection } from './useStandardSection';
import { homeApi } from '../../../api/homeApi';
import { generateDefaultSections } from '../HomeSectionTemplate';
import { transformHeroData } from '../transformers/heroTransformer';
import { transformStatsData } from '../transformers/statsTransformer';
import { transformNewsData } from '../transformers/newsTransformer';
import { transformFacultiesData } from '../transformers/facultiesTransformer';
import { transformVideoGalleryData } from '../transformers/videoGalleryTransformer';
import { transformInteractiveServicesData } from '../transformers/interactiveServicesTransformer';
import { transformUniversitySystemsData } from '../transformers/universitySystemsTransformer';
import {
  createHeroSectionBlock,
  createStatsSectionBlock,
  createNewsSectionBlock,
  createFacultiesSectionBlock,
  createVideoGallerySectionBlock,
  createInteractiveServicesSectionBlock,
  createUniversitySystemsSectionBlock
} from '../creators/sectionCreators';

export const useHomeSections = () => {
  // Individual section hooks with useStandardSection
  const heroSection = useStandardSection('hero',
    () => homeApi.getHeroData(),
    {
      ttlMinutes: 30, // Hero less frequent updates
      transformData: transformHeroData
    }
  );

  const statsSection = useStandardSection('stats',
    () => homeApi.getStatsData(),
    {
      ttlMinutes: 15,
      transformData: transformStatsData
    }
  );

  const newsSection = useStandardSection('news',
    () => homeApi.getNewsData(),
    {
      ttlMinutes: 10 // News updates more frequently
    }
  );

  const facultiesSection = useStandardSection('faculties',
    () => homeApi.getFacultiesData(),
    {
      ttlMinutes: 60, // Faculty data rarely changes
      transformData: transformFacultiesData
    }
  );

  const videoGallerySection = useStandardSection('video-gallery',
    () => homeApi.getVideoGalleryData(),
    {
      ttlMinutes: 30,
      transformData: transformVideoGalleryData
    }
  );

  const interactiveServicesSection = useStandardSection('interactive-services',
    () => homeApi.getInteractiveServicesData(),
    {
      ttlMinutes: 60, // Services rarely change
      transformData: transformInteractiveServicesData
    }
  );

  const universitySystemsSection = useStandardSection('university-systems',
    () => homeApi.getUniversitySystemsData(),
    {
      ttlMinutes: 60, // Systems rarely change
      transformData: transformUniversitySystemsData
    }
  );

  // Combined sections data
  const sections = useMemo(() => {
    const sectionBlocks: HomeSectionBlock[] = [];

    if (heroSection.data) {
      sectionBlocks.push(createHeroSectionBlock(heroSection.data));
    }
    if (statsSection.data) {
      sectionBlocks.push(createStatsSectionBlock(statsSection.data));
    }
    if (newsSection.data) {
      sectionBlocks.push(createNewsSectionBlock(newsSection.data));
    }
    if (facultiesSection.data) {
      sectionBlocks.push(createFacultiesSectionBlock(facultiesSection.data));
    }
    if (videoGallerySection.data) {
      sectionBlocks.push(createVideoGallerySectionBlock(videoGallerySection.data));
    }
    if (interactiveServicesSection.data) {
      sectionBlocks.push(createInteractiveServicesSectionBlock(interactiveServicesSection.data));
    }
    if (universitySystemsSection.data) {
      sectionBlocks.push(createUniversitySystemsSectionBlock(universitySystemsSection.data));
    }

    return sectionBlocks.sort((a, b) => a.order - b.order);
  }, [
    heroSection.data,
    statsSection.data,
    newsSection.data,
    facultiesSection.data,
    videoGallerySection.data,
    interactiveServicesSection.data,
    universitySystemsSection.data
  ]);

  // Combined loading state
  const loading = heroSection.loading || statsSection.loading || newsSection.loading ||
                  facultiesSection.loading || videoGallerySection.loading || interactiveServicesSection.loading ||
                  universitySystemsSection.loading;

  // Combined error state (first error encountered)
  const error = heroSection.error || statsSection.error || newsSection.error ||
                facultiesSection.error || videoGallerySection.error || interactiveServicesSection.error ||
                universitySystemsSection.error;

  // Refetch all sections
  const refetch = () => {
    heroSection.refetch();
    statsSection.refetch();
    newsSection.refetch();
    facultiesSection.refetch();
    videoGallerySection.refetch();
    interactiveServicesSection.refetch();
    universitySystemsSection.refetch();
  };

  return {
    sections,
    loading,
    error,
    refetch,
    // Individual section access for advanced use cases
    hero: heroSection,
    stats: statsSection,
    news: newsSection,
    faculties: facultiesSection,
    videoGallery: videoGallerySection,
    interactiveServices: interactiveServicesSection,
  };
};