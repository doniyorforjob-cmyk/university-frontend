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
      type: 'heading',
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
        headers: ['Fakultet', 'Grant', 'To\'lum-kontrakt', 'Umumiy'],
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

    // Call Center Section
    {
      id: 'admission-call-center',
      type: 'table',
      data: {
        title: 'CALL-CENTER',
        headers: ['Xizmat turi', 'Telefon raqami'],
        rows: [
          ['Bakalvriatning kunduzgi shakli uchun', '+99871 245-42-43'],
          ['Sirtqi ta\'lim shakli uchun', '+99871 239-28-79'],
          ['Magistratura mutaxassisliklari va xorijiy oliy ta\'lim muassasalari bilan hamkorlikdagi qo\'shma ta\'lim shakli uchun', '+99871 239-01-59\n+99871 239-28-77'],
          ['Talabalar o\'qishini ko\'chirish va tiklash uchun', '+99871 239-28-78'],
          ['Ishonch telefoni', '+99871 232-6446'],
          ['Xalqaro talabalarga', '+99871 239-28-19'],
        ],
      },
    },

    // Admission Process Section
    {
      id: 'admission-process',
      type: 'rich-text',
      data: {
        content: `<h3>2025/2026 O'quv Yili Qabul Jarayoni</h3>
<p>2025/2026 o'quv yilidan boshlab davlat oliy ta'lim muassasalarida bakalavriatiga qabul jarayoni quyidagi ikki bosqichda amalga oshiriladi:</p>

<h4>1-bosqich:</h4>
<p>Abituriyentlar <strong>5-iyundan 25-iyunga</strong> qadar test sinovi topshirish uchun ro'yxatdan o'tadi hamda <strong>iyul, avgust</strong> oylarida o'qishga qabul qilish bo'yicha kirish imtixonlaridan o'tkaziladi.</p>

<h4>2-bosqich:</h4>
<p>Abituriyentlar test sinovlari to'liq yakunlanganidan so'ng <strong>15 kun</strong> davomida oliy ta'lim muassasasi, bakalavriat ta'lim yo'nalishi va ta'lim shaklini tanlaydi.</p>

<h4>Onlayn ro'yhatdan o'tish:</h4>
<ul>
<li>Bilim va malakalarni baholash agentligining rasmiy veb-sayti (<a href="https://my.uzbmb.uz" target="_blank">my.uzbmb.uz</a>)</li>
<li>Yagona interaktiv davlat xizmatlari portali (<a href="https://my.gov.uz" target="_blank">my.gov.uz</a>) orqali amalga oshiriladi.</li>
</ul>

<p><strong>Izoh:</strong> ish vaqti soat <strong>09:00 dan 18:00 ga</strong> qadar, tushlik <strong>13:00 dan 14:00 ga</strong> qadar.<br>
<strong>Dam olish kuni:</strong> Yakshanba kuni</p>`
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
