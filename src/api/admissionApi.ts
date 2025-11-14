/**
 * Admission 2025 API
 * Qabul 2025 sahifasi uchun ma'lumotlarni taqdim etadi
 */

import { ContentBlock } from '@/components/shared/ContentBuilder';

/**
 * Qabul ma'lumotlarini ContentBlock[] ga o'zgartiradi
 */
export const transformAdmissionToBlocks = (admissionData: any[], year: number): ContentBlock[] => {
  return [
    // Hero Section
    {
      id: 'admission-hero',
      type: 'activities-hero',
      data: {
        title: `Qabul ${year}`,
        subtitle: `NAMDTU ga ${year}-yil qabul jarayoni va talablar`,
      },
    },

    // Admission Table
    {
      id: 'admission-table',
      type: 'table',
      data: {
        title: `Qabul Ko'rsatkichlari ${year}`,
        headers: ['Fakultet', 'Grant', 'To\'lov-kontrakt', 'Umumiy'],
        rows: [
          ['Muhandislik fakulteti', '150', '200', '350'],
          ['Iqtisodiyot fakulteti', '120', '180', '300'],
          ['Gumanitar fanlar fakulteti', '100', '150', '250'],
          ['Tabiiy fanlar fakulteti', '80', '120', '200'],
          ['Jami', '450', '650', '1100'],
        ],
      },
    },

    // Requirements Section
    {
      id: 'admission-requirements',
      type: 'list',
      data: {
        title: 'Qabul Talablari',
        items: [
          'O\'zbekiston Respublikasi fuqaroligi',
          'O\'rta ta\'lim muassasasini tamomlaganligi',
          'Davlat test sinovidan o\'tganligi',
          'Tibbiy ma\'lumotnoma',
          'Pasport nusxasi',
        ],
      },
    },
  ];
};

/**
 * Mock API - Qabul ma'lumotlarini olish
 */
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

/**
 * ContentBuilder bloklar bilan qabul ma'lumotlarini olish
 */
export const fetchAdmissionData = async (): Promise<ContentBlock[]> => {
  try {
    // Joriy yil + 1 (keyingi yil qabul)
    const admissionYear = new Date().getFullYear() + 1;

    // Mock data for admission
    const mockAdmissionData: any[] = [
      // Bu yerda haqiqiy qabul ma'lumotlari bo'ladi
    ];

    // Ma'lumotlarni ContentBlock[] ga o'zgartirish
    const blocks = transformAdmissionToBlocks(mockAdmissionData, admissionYear);

    return simulateApiCall(blocks, 300);
  } catch (error) {
    console.error('Qabul ma\'lumotlarini yuklashda xatolik:', error);
    throw error;
  }
};