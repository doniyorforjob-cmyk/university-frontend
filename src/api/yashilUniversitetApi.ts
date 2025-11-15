/**
 * Yashil Universitet API
 * Yashil Universitet sahifasi uchun ma'lumotlarni taqdim etadi
 */

import { ContentBlock } from '@/components/shared/ContentBuilder';
import { cacheManager } from '@/utils/cacheManager';

/**
 * Yashil Universitet ma'lumotlarini ContentBlock[] ga o'zgartiradi
 */
export const transformYashilUniversitetToBlocks = (data?: any): ContentBlock[] => {
  return [
    // Statistika - Yashil dizayn
    {
      id: 'yashil-stats',
      type: 'stats',
      data: {
        title: 'Ekologik Ko\'rsatkichlar',
        stats: [
          { value: '85%', label: 'Qayta ishlanadigan chiqindilar', icon: '♻️' },
          { value: '50%', label: 'Energiya tejamkorligi', icon: '⚡' },
          { value: '100+', label: 'Daraxt ekilgan', icon: '🌳' },
          { value: '0%', label: 'Plastik ishlatish', icon: '🚫' }
        ]
      },
      className: 'bg-green-50 border-green-200 p-6 rounded-xl'
    },

    // Loyihalar - Yashil card dizayn
    {
      id: 'yashil-projects',
      type: 'cards',
      data: {
        title: 'Ekologik Loyihalar',
        cards: [
          {
            title: 'Energiya Tejash',
            description: 'LED chiroqlar va smart boshqaruv tizimlari joriy etish',
            icon: '⚡',
            color: 'green'
          },
          {
            title: 'Qayta Ishlash',
            description: 'Chiqindilarni qayta ishlanadigan qilib ajratish tizimi',
            icon: '♻️',
            color: 'green'
          },
          {
            title: 'Yashil Hudud',
            description: 'Kampusda daraxtlar ekish va yashil maydonlar yaratish',
            icon: '🌳',
            color: 'green'
          },
          {
            title: 'Suv Tejash',
            description: 'Suv tejovchi vositalar va ongni oshirish kampaniyalari',
            icon: '💧',
            color: 'green'
          }
        ]
      }
    },

    // Galereya - Yashil border
    {
      id: 'yashil-gallery',
      type: 'gallery',
      data: {
        title: 'Yashil Universitet Galereyasi',
        images: [
          { src: '/images/green-1.jpg', alt: 'Daraxt ekish marosimi' },
          { src: '/images/green-2.jpg', alt: 'LED chiroqlar o\'rnatish' },
          { src: '/images/green-3.jpg', alt: 'Qayta ishlash punktlari' },
          { src: '/images/green-4.jpg', alt: 'Yashil maydonlar' }
        ]
      },
      className: 'border-green-300'
    },

    // Timeline - Ekologik yutuqlar
    {
      id: 'yashil-timeline',
      type: 'timeline-vertical',
      data: {
        title: 'Ekologik Yutuqlar Tarixi',
        events: [
          {
            date: '2023',
            title: 'LED Chiroqlar O\'rnatildi',
            description: 'Barcha auditoriyalarda energiya tejovchi LED chiroqlar o\'rnatildi. Energiya sarfi 40% ga kamaydi.'
          },
          {
            date: '2024',
            title: 'Qayta Ishlash Tizimi',
            description: 'Chiqindi ajratish punktlari tashkil etildi. Qayta ishlanadigan chiqindilar ulushi 85% ga yetdi.'
          },
          {
            date: '2024',
            title: 'Yashil Hudud Loyihasi',
            description: 'Kampusda 100 dan ortiq daraxt ekildi va yashil maydonlar yaratildi.'
          }
        ]
      }
    },

    // Aloqa - Yashil dizayn
    {
      id: 'yashil-contact',
      type: 'list',
      data: {
        title: 'Aloqa va Ma\'lumot',
        items: [
          '📞 Ekologiya bo\'limi: +99871 239-28-80',
          '📧 Email: green@university.uz',
          '📍 Manzil: Universitet, Yashil hudud',
          '🌐 Veb-sayt: university.uz/green',
          '📱 Telegram: @GreenUniversity'
        ]
      },
      className: 'bg-green-50 border-green-200 p-6 rounded-xl'
    }
  ];
};

/**
 * Mock API - Yashil Universitet ma'lumotlarini olish
 */
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

/**
 * ContentBuilder bloklar bilan yashil universitet ma'lumotlarini olish
 */
export const fetchYashilUniversitetData = async (): Promise<ContentBlock[]> => {
  try {
    // Cache bilan API chaqiruvi
    return await cacheManager.cachedApiCall(
      'yashil-universitet-data',
      async () => {
        // Ma'lumotlarni ContentBlock[] ga o'zgartirish
        const blocks = transformYashilUniversitetToBlocks();

        return simulateApiCall(blocks, 300);
      },
      30 // 30 daqiqa cache
    );
  } catch (error) {
    console.error('Yashil Universitet ma\'lumotlarini yuklashda xatolik:', error);
    throw error;
  }
};