// Section data interfaces
export interface CarouselItem {
  id: string;
  img: string;
  title: string;
  desc: string;
  sliderName: string;
  order?: number;
  enabled?: boolean;
}

export interface HomeHeroData {
  title?: string;
  subtitle?: string;
  backgroundVideo?: string;
  backgroundImage?: string; // Keep for fallback
  ctaButton?: {
    text: string;
    link: string;
    variant?: 'primary' | 'secondary';
  };
  overlay?: {
    opacity: number;
    color: string;
  };
  carouselItems?: CarouselItem[];
}

export interface HomeStatsData {
  stats: Array<{
    id: number;
    text: string;
    end: number;
    plus?: boolean;
  }>;
  universityArea?: {
    area: number;
    unit: string;
    image: string;
  };
}

export interface HomeNewsData {
  news: Array<{
    id: number;
    title: string;
    description: string;
    image_url: string;
    published_at: string;
    slug: string;
  }>;
  announcements: Array<{
    id: number;
    text: string;
    description: string;
    date: string;
  }>;
  events: Array<{
    id: number;
    title: string;
    description: string;
    date: string;
  }>;
  corruption: Array<{
    id: number;
    title: string;
    description: string;
    date: string;
  }>;
  sport: Array<{
    id: number;
    title: string;
    description: string;
    date: string;
  }>;
}

export interface HomeFacultiesData {
  faculties: Array<{
    id: number | string;
    name: string;
    description: string;
    image: string;
    icon: string;
    departments: Array<{
      id: number | string;
      title: string;
      image: string;
    }>;
  }>;
}

export interface HomeMediaData {
  photos: Array<{
    id: string | number;
    title: string;
    cover_image: string;
    gallery: string[];
    created_at: string;
    updated_at: string;
    views?: number;
  }>;
  videos: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    created_at: string;
    updated_at: string;
    views?: number;
  }>;
}

// Keep backward compatibility
export interface HomeVideoGalleryData extends HomeMediaData { }

export interface HomeInteractiveServicesData {
  services: Array<{
    id: number;
    title: string;
    description: string;
    href: string;
    icon: string;
  }>;
}

export interface HomeUniversitySystemsData {
  title: string;
  subtitle: string;
  systems: Array<{
    id: number;
    title: string;
    description: string;
    href: string;
    icon: string;
    color: string;
  }>;
  quickLinks: Array<{
    id: number;
    title: string;
    href: string;
  }>;
}