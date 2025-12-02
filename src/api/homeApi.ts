/**
 * Home Page API - Static data for all home sections
 * This will be replaced with real API calls in the future
 */

import { HomeSectionBlock, HomeSectionType } from '../pages/Home/types';

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
  title: string;
  subtitle: string;
  backgroundVideo?: string;
  backgroundImage?: string; // Keep for fallback
  ctaButton: {
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
    id: number;
    name: string;
    image: string;
    iconImage: string;
    color: string;
  }>;
}

export interface HomeVideoGalleryData {
  videos: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    uploadDate: string;
  }>;
}

export interface HomeInteractiveServicesData {
  services: Array<{
    id: number;
    title: string;
    description: string;
    href: string;
    icon: string;
  }>;
}

// Static data - will be replaced with API calls
const homeHeroData: HomeHeroData = {
  title: "Namangan davlat texnika universiteti",
  subtitle: "Zamonaviy texnologiyalar va innovatsion yechimlar bilan kelajakni shakllantiruvchi yetakchi texnika ta'lim muassasasi.",
  backgroundVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Google's sample video - more reliable
  backgroundImage: "https://images.unsplash.com/photo-1523050853548-1d7deb8cf421?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
  ctaButton: {
    text: "Biz haqimizda",
    link: "/about",
    variant: "primary"
  },
  overlay: {
    opacity: 0.3, // Lighter overlay so video is more visible
    color: "#000000"
  },
  carouselItems: [
    {
      id: 'bridge-1',
      img: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: 'Bridge',
      desc: 'A breathtaking view of a city illuminated by countless lights, showcasing the vibrant and bustling nightlife.',
      sliderName: 'bridge',
      order: 1,
      enabled: true,
    },
    {
      id: 'mountains-2',
      img: "https://images.unsplash.com/photo-1518972734183-c5b490a7c637?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: 'Mountains View',
      desc: 'A serene lake reflecting the surrounding mountains and trees, creating a mirror-like surface.',
      sliderName: 'mountains',
      order: 2,
      enabled: true,
    },
    {
      id: 'autumn-3',
      img: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: 'Autumn',
      desc: 'A picturesque path winding through a dense forest adorned with vibrant autumn foliage.',
      sliderName: 'autumn',
      order: 3,
      enabled: true,
    },
    {
      id: 'foggy-4',
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop",
      title: 'Foggy',
      desc: 'A stunning foggy view over the forest, with the sun casting a golden glow across the trees.',
      sliderName: 'foggy',
      order: 4,
      enabled: true,
    },
  ]
};

const homeStatsData: HomeStatsData = {
  stats: [
    { id: 1, text: "Fakultetlar soni", end: 18, plus: false },
    { id: 2, text: "Bo'limlar soni", end: 25, plus: false },
    { id: 3, text: "Professor-o'qituvchilar soni", end: 850, plus: false },
    { id: 4, text: "Ilmiy unvonlilar", end: 320, plus: false },
    { id: 5, text: "Bakalavr talabalar soni", end: 28500, plus: false },
    { id: 6, text: "Magistr talabalar soni", end: 1450, plus: false },
  ],
  universityArea: {
    area: 3200,
    unit: "m²",
    image: "/static/auzcoder/logo/namdu.jpg"
  }
};

const homeNewsData: HomeNewsData = {
  news: [
    {
      id: 1,
      title: "Qishki qabul-2024 jarayonlari boshlandi!",
      description: "Barcha abituriyentlar diqqatiga! 2024-2025 o'quv yili uchun qishki qabul jarayonlari boshlandi.",
      image_url: "https://picsum.photos/seed/picsum1/800/600",
      published_at: "2024-07-20T00:00:00Z",
      slug: "winter-admission-2024"
    },
    {
      id: 2,
      title: "Universitetda yangi sport majmuasi ochildi",
      description: "Talabalarimiz uchun zamonaviy sport majmuasi foydalanishga topshirildi.",
      image_url: "https://picsum.photos/seed/picsum2/800/600",
      published_at: "2024-07-19T00:00:00Z",
      slug: "new-sports-complex"
    },
    {
      id: 3,
      title: "Xalqaro anjuman o'tkazilishi rejalashtirilmoqda",
      description: "Anjumanda dunyoning yetakchi olimlari ishtirok etishi kutilmoqda.",
      image_url: "https://picsum.photos/seed/picsum3/800/600",
      published_at: "2024-07-18T00:00:00Z",
      slug: "international-conference-planned"
    },
    {
      id: 4,
      title: "Talabalar uchun grant tanlovi e'lon qilindi",
      description: "Iqtidorli talabalar uchun maxsus grant tanlovi e'lon qilindi. Shoshiling!",
      image_url: "https://picsum.photos/seed/picsum4/800/600",
      published_at: "2024-07-17T00:00:00Z",
      slug: "student-grant-announcement"
    },
    {
      id: 5,
      title: "Yangi o'quv yili uchun dars jadvallari tasdiqlandi",
      description: "Barcha yo'nalishlar uchun dars jadvallari bilan tanishishingiz mumkin.",
      image_url: "https://picsum.photos/seed/picsum5/800/600",
      published_at: "2024-07-16T00:00:00Z",
      slug: "academic-schedule-approved"
    },
    {
      id: 6,
      title: "Kutubxonaga yangi kitoblar keltirildi",
      description: "Kutubxona fondi eng so'nggi ilmiy va badiiy adabiyotlar bilan boyitildi.",
      image_url: "https://picsum.photos/seed/picsum6/800/600",
      published_at: "2024-07-15T00:00:00Z",
      slug: "new-books-library"
    }
  ],
  announcements: [
    {
      id: 1,
      text: "Qishki qabul-2024 jarayonlari boshlandi!",
      description: "Barcha abituriyentlar diqqatiga! 2024-2025 o'quv yili uchun qishki qabul jarayonlari boshlandi.",
      date: "2024-07-20"
    },
    {
      id: 2,
      text: "Universitetda yangi sport majmuasi ochildi",
      description: "Talabalarimiz uchun zamonaviy sport majmuasi foydalanishga topshirildi.",
      date: "2024-07-19"
    },
    {
      id: 3,
      text: "Xalqaro anjuman o'tkazilishi rejalashtirilmoqda",
      description: "Anjumanda dunyoning yetakchi olimlari ishtirok etishi kutilmoqda.",
      date: "2024-07-18"
    },
    {
      id: 4,
      text: "Talabalar uchun grant tanlovi e'lon qilindi",
      description: "Iqtidorli talabalar uchun maxsus grant tanlovi e'lon qilindi. Shoshiling!",
      date: "2024-07-17"
    },
    {
      id: 5,
      text: "Yangi o'quv yili uchun dars jadvallari tasdiqlandi",
      description: "Barcha yo'nalishlar uchun dars jadvallari bilan tanishishingiz mumkin.",
      date: "2024-07-16"
    }
  ],
  events: [
    {
      id: 1,
      title: "Universitet kuni",
      description: "Universitetimizning 30 yillik yubileyi",
      date: "2025-01-15"
    }
  ],
  corruption: [
    {
      id: 1,
      title: "Korrupsiyaga qarshi kurash",
      description: "Universitetda korrupsiyaga qarshi choralarni kuchaytirish",
      date: "2024-10-01"
    }
  ],
  sport: [
    {
      id: 1,
      title: "Sport musobaqasi",
      description: "Talabalar o'rtasida sport musobaqasi o'tkaziladi",
      date: "2024-12-10"
    }
  ]
};

const homeFacultiesData: HomeFacultiesData = {
  faculties: [
    {
      id: 1,
      name: 'Muhandislik-axborot texnologiyalari',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      iconImage: 'https://img.icons8.com/material-outlined/48/000000/processor.png',
      color: 'from-sky-500 to-indigo-500',
    },
    {
      id: 2,
      name: 'Transport',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      iconImage: 'https://img.icons8.com/material-outlined/48/000000/truck.png',
      color: 'from-slate-500 to-slate-700',
    },
    {
      id: 3,
      name: 'Biznesni boshqarish',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      iconImage: 'https://img.icons8.com/material-outlined/48/000000/business.png',
      color: 'from-emerald-500 to-green-600',
    },
    {
      id: 4,
      name: 'Iqtisodiyot',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      iconImage: 'https://img.icons8.com/material-outlined/48/000000/money.png',
      color: 'from-lime-500 to-green-500',
    },
    {
      id: 5,
      name: 'Qurilish',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      iconImage: 'https://img.icons8.com/material-outlined/48/000000/construction.png',
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 6,
      name: 'Texnologiya',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      iconImage: 'https://img.icons8.com/material-outlined/48/000000/gear.png',
      color: 'from-purple-500 to-violet-600',
    },
    {
      id: 7,
      name: 'Energetika',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      iconImage: 'https://img.icons8.com/material-outlined/48/000000/lightning-bolt.png',
      color: 'from-yellow-400 to-amber-500',
    },
    {
      id: 8,
      name: 'Mexanika',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      iconImage: 'https://img.icons8.com/material-outlined/48/000000/wrench.png',
      color: 'from-gray-500 to-slate-600',
    },
    {
      id: 9,
      name: 'To\'qimachilik sanoati enjiniringi',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      iconImage: 'https://img.icons8.com/material-outlined/48/000000/roller-skates.png',
      color: 'from-pink-500 to-rose-500',
    }
  ]
};

const homeVideoGalleryData: HomeVideoGalleryData = {
  videos: [
    {
      id: "dQw4w9WgXcQ",
      title: "Universitet tanishtiruvi",
      description: "Qisqacha tanishtiruv videosi.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      category: "Tanishuv",
      uploadDate: "2023-10-15T10:00:00Z"
    },
    {
      id: "ScMzIvxBSi4",
      title: "Talabalar hayoti",
      description: "Talabalar kundalik hayotidan lavhalar.",
      thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
      category: "Hayot",
      uploadDate: "2023-09-20T14:30:00Z"
    },
    {
      id: "9bZkp7q19f0",
      title: "Ilmiy tadqiqotlar",
      description: "Universitetda olib borilgan ilmiy ishlar.",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
      category: "Ilmiy",
      uploadDate: "2023-08-12T09:15:00Z"
    },
    {
      id: "kJQP7kiw5Fk",
      title: "Tadbirlar va marosimlar",
      description: "Universitetda o'tkazilgan tadbirlar.",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
      category: "Tadbir",
      uploadDate: "2023-11-05T16:45:00Z"
    }
  ]
};

const homeInteractiveServicesData: HomeInteractiveServicesData = {
  services: [
    {
      id: 1,
      title: "Online Ro'yxatdan o'tish",
      description: "Talaba bo'lish uchun ariza topshiring",
      href: "/admission",
      icon: "DocumentTextIcon"
    },
    {
      id: 2,
      title: "Elektron kutubxona",
      description: "Online kutubxona resurslariga kirish",
      href: "/library",
      icon: "BookOpenIcon"
    },
    {
      id: 3,
      title: "Dars jadvali",
      description: "Talabalar uchun dars jadvali",
      href: "/schedule",
      icon: "ComputerDesktopIcon"
    },
    {
      id: 4,
      title: "E'lonlar",
      description: "Universitet e'lonlarini ko'rish",
      href: "/announcements",
      icon: "EnvelopeIcon"
    },
    {
      id: 5,
      title: "Ish o'rinlari",
      description: "Bitiruvchilar uchun ish o'rinlari",
      href: "/careers",
      icon: "BriefcaseIcon"
    },
    {
      id: 6,
      title: "Shikoyatlar",
      description: "Shikoyat va takliflar uchun",
      href: "/complaints",
      icon: "ExclamationTriangleIcon"
    }
  ]
};

// API functions - currently return static data, will be replaced with real API calls
export const homeApi = {
  // Get all home sections data
  getHomeSections: async (): Promise<HomeSectionBlock[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return [
      {
        id: 'hero-section',
        type: 'hero',
        config: {
          id: 'hero-section',
          type: 'hero',
          layout: 'centered-hero',
          background: { type: 'gradient', value: 'from-blue-600 to-purple-600' },
          styling: { padding: 'py-20 md:py-32', margin: 'mb-0', maxWidth: 'max-w-7xl', textAlign: 'center', fontSize: 'xl' },
          showTitle: true,
          showSubtitle: true,
          animation: { enabled: true, type: 'fade', delay: 0 }
        },
        data: homeHeroData,
        order: 1,
        enabled: true
      },
      {
        id: 'stats-section',
        type: 'stats',
        config: {
          id: 'stats-section',
          type: 'stats',
          layout: 'centered-cards',
          background: { type: 'gradient', value: 'from-green-50 to-teal-50' },
          styling: { padding: 'py-16', margin: 'mb-0', maxWidth: 'max-w-6xl', textAlign: 'center', fontSize: 'base' },
          showTitle: true,
          showSubtitle: true,
          animation: { enabled: true, type: 'fade', delay: 200 }
        },
        data: homeStatsData,
        order: 2,
        enabled: true
      },
      {
        id: 'news-section',
        type: 'news',
        config: {
          id: 'news-section',
          type: 'news',
          layout: 'left-aligned',
          background: { type: 'gradient', value: 'from-purple-50 to-pink-50' },
          styling: { padding: 'py-16', margin: 'mb-0', maxWidth: 'max-w-7xl', textAlign: 'left', fontSize: 'base' },
          showTitle: true,
          showSubtitle: true,
          animation: { enabled: true, type: 'fade', delay: 400 }
        },
        data: homeNewsData,
        order: 3,
        enabled: true
      },
      {
        id: 'faculties-section',
        type: 'faculties',
        config: {
          id: 'faculties-section',
          type: 'faculties',
          layout: 'centered-content',
          background: { type: 'gradient', value: 'from-indigo-50 to-blue-50' },
          styling: { padding: 'py-16', margin: 'mb-0', maxWidth: 'max-w-7xl', textAlign: 'center', fontSize: 'base' },
          showTitle: true,
          showSubtitle: true,
          animation: { enabled: true, type: 'fade', delay: 600 }
        },
        data: homeFacultiesData,
        order: 4,
        enabled: true
      },
      {
        id: 'video-gallery-section',
        type: 'video-gallery',
        config: {
          id: 'video-gallery-section',
          type: 'video-gallery',
          layout: 'centered-cards',
          background: { type: 'gradient', value: 'from-red-50 to-orange-50' },
          styling: { padding: 'py-16', margin: 'mb-0', maxWidth: 'max-w-6xl', textAlign: 'center', fontSize: 'base' },
          showTitle: true,
          showSubtitle: true,
          animation: { enabled: true, type: 'fade', delay: 800 }
        },
        data: homeVideoGalleryData,
        order: 5,
        enabled: true
      },
      {
        id: 'interactive-services-section',
        type: 'interactive-services',
        config: {
          id: 'interactive-services-section',
          type: 'interactive-services',
          layout: 'centered-cards',
          background: { type: 'gradient', value: 'from-cyan-50 to-blue-50' },
          styling: { padding: 'py-16', margin: 'mb-0', maxWidth: 'max-w-6xl', textAlign: 'center', fontSize: 'base' },
          showTitle: true,
          showSubtitle: true,
          animation: { enabled: true, type: 'fade', delay: 1000 }
        },
        data: homeInteractiveServicesData,
        order: 6,
        enabled: true
      }
    ];
  },

  // Get individual section data
  getHeroData: async (): Promise<HomeHeroData> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return homeHeroData;
  },

  getStatsData: async (): Promise<HomeStatsData> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return homeStatsData;
  },

  getNewsData: async (): Promise<HomeNewsData> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return homeNewsData;
  },

  getFacultiesData: async (): Promise<HomeFacultiesData> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return homeFacultiesData;
  },

  getVideoGalleryData: async (): Promise<HomeVideoGalleryData> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return homeVideoGalleryData;
  },

  getInteractiveServicesData: async (): Promise<HomeInteractiveServicesData> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return homeInteractiveServicesData;
  },

  // Update section data (for future admin panel)
  updateSectionData: async (sectionType: HomeSectionType, data: any): Promise<void> => {
    // This will be implemented when real API is available
    console.log(`Updating ${sectionType} data:`, data);
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};

// Types are already exported as interfaces above