/**
 * Ekofaol Talabalar API
 * Ekofaol talabalar sahifasi uchun ma'lumotlarni taqdim etadi
 */

import { ContentBlock } from '@/components/shared/ContentBuilder';
import { cacheManager } from '@/utils/cacheManager';

/**
 * Ekofaol talabalar ma'lumotlarini ContentBlock[] ga o'zgartiradi
 */
export const transformEcoActiveStudentsToBlocks = (data?: any): ContentBlock[] => {
  return [
    // Aloqa - Ekofaol talabalar bilan bog'lanish
    {
      id: 'eco-contact',
      type: 'list',
      data: {
        title: 'Biz bilan bog\'laning',
        items: [
          '👥 Rahbar: Ekofaol talabalar klubi prezidenti',
          '📧 Email: ecoactive@university.uz',
          '📍 Manzil: Universitet, Ekofaol talabalar markazi',
          '🌐 Veb-sayt: university.uz/ecoactive',
          '📱 Telegram: @EcoActiveStudents',
          '📞 Telefon: +99871 239-28-85'
        ]
      },
      className: 'bg-green-50 border-green-200 p-6 rounded-xl'
    }
  ];
};

/**
 * Mock API - Ekofaol talabalar ma'lumotlarini olish
 */
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

/**
 * ContentBuilder bloklar bilan ekofaol talabalar ma'lumotlarini olish
 */
export const fetchEcoActiveStudentsData = async (): Promise<ContentBlock[]> => {
  try {
    // Cache bilan API chaqiruvi
    return await cacheManager.cachedApiCall(
      'eco-active-students-data',
      async () => {
        // Ma'lumotlarni ContentBlock[] ga o'zgartirish
        const blocks = transformEcoActiveStudentsToBlocks();

        return simulateApiCall(blocks, 300);
      },
      0.5 // 30 soniya cache
    );
  } catch (error) {
    console.error('Ekofaol talabalar ma\'lumotlarini yuklashda xatolik:', error);
    throw error;
  }
};
