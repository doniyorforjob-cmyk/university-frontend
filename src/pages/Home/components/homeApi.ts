/**
 * Home Page API
 * Bosh sahifadagi bo'limlar uchun ma'lumotlarni taqdim etadi.
 * Hozircha mock ma'lumotlar ishlatilmoqda.
 */

import { cacheManager } from '@/utils/cacheManager';

// Helper function to simulate network delay
const simulateApiCall = <T>(data: T, delay = 300): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Mock data for the Hero section
const mockHeroData = {
  title: "NAMANGAN DAVLAT UNIVERSITETI",
  subtitle: "Ilm va innovatsiyalar orqali kelajakni yaratamiz. Biz bilan birga yuksak marralarni zabt eting!",
  background_image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
  background_video: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
  cta_button: {
    text: "Batafsil ma'lumot",
    link: "/about"
  },
  feature_cards: [
    { title: 'HEMIS', href: 'https://hemis.namdu.uz', icon: 'BuildingLibraryIcon' },
    { title: 'Moodle', href: 'https://moodle.namdu.uz', icon: 'ComputerDesktopIcon' },
    { title: 'Akademik litsey', href: 'https://litsey.namdu.uz', icon: 'AcademicCapIcon' },
    { title: 'Texnikum', href: 'https://texnikum.namdu.uz', icon: 'BookOpenIcon' },
  ]
};

/**
 * Fetches data for the Hero section.
 * Uses a caching mechanism to avoid redundant API calls.
 */
const getHeroData = async () => {
  try {
    // In a real application, this would be an API call, e.g., `axios.get('/api/hero')`
    const data = await simulateApiCall(mockHeroData);
    return data;
  } catch (error) {
    console.error("Error fetching hero data:", error);
    throw new Error("Hero ma'lumotlarini yuklab bo'lmadi");
  }
};


export const homeApi = {
  getHeroData,
  // Other home page API functions can be added here
  // getStatsData,
  // getNewsData,
};