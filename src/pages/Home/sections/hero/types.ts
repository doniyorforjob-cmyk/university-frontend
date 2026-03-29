import { HomeSectionConfig } from '../../types';

export interface HeroSectionData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaButton: {
    text: string;
    link: string;
    variant?: 'primary' | 'secondary';
  };
  overlay?: {
    opacity: number;
    color: string;
  };
}

export interface HeroSectionProps {
  config?: HomeSectionConfig;
  data?: HeroSectionData;
}

export interface HeroBuilderProps {
  config: HomeSectionConfig;
  onUpdate: (updates: Partial<HomeSectionConfig>) => void;
  previewData?: HeroSectionData;
}