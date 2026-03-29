export type HomeSectionType =
  | 'hero'
  | 'stats'
  | 'news'
  | 'faculties'
  | 'video-gallery'
  | 'media-gallery'
  | 'interactive-services'
  | 'university-systems';

export type LayoutVariant =
  | 'centered-hero'
  | 'centered-content'
  | 'centered-cards'
  | 'left-aligned'
  | 'full-width';

export type BackgroundType =
  | 'color'
  | 'gradient'
  | 'image'
  | 'none';

export interface BackgroundConfig {
  type: BackgroundType;
  value: string;
  opacity?: number;
}

export interface StylingConfig {
  padding: string;
  margin: string;
  maxWidth: string;
  textAlign: 'left' | 'center' | 'right';
  fontSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

export interface HomeSectionConfig {
  id: string;
  type: HomeSectionType;
  title?: string;
  subtitle?: string;
  layout: LayoutVariant;
  background: BackgroundConfig;
  styling: StylingConfig;
  showTitle?: boolean;
  showSubtitle?: boolean;
  animation?: {
    enabled: boolean;
    type: 'fade' | 'slide' | 'scale';
    delay: number;
  };
  responsive?: {
    mobile?: Partial<HomeSectionConfig>;
    tablet?: Partial<HomeSectionConfig>;
    desktop?: Partial<HomeSectionConfig>;
  };
}

export interface HomeSectionBlock {
  id: string;
  type: HomeSectionType;
  config: HomeSectionConfig;
  data: any;
  order: number;
  enabled: boolean;
  // API dan kelgan har xil content block'larni qo'llab-quvvatlash uchun
  contentBlocks?: any[];
}