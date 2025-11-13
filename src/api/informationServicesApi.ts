/**
 * Information Services API
 * Axborot xizmatlari sahifasi uchun ma'lumotlarni taqdim etadi
 */

import { ContentBlock } from '@/components/shared/ContentBuilder';

interface InformationServicesData {
  blocks: ContentBlock[];
}

/**
 * Mock API - Axborot xizmatlari ma'lumotlarini olish
 */
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

/**
 * Axborot xizmatlari ma'lumotlarini olish
 */
export const fetchInformationServicesData = async (): Promise<InformationServicesData> => {
  const data: InformationServicesData = {
    blocks: [
      {
        id: 'intro',
        type: 'highlight',
        data: {
          title: 'Axborot Xizmatlari Markazi',
          content: 'NamDTU Axborot Xizmatlari Markazi talabalar, professor-o\'qituvchilar va xodimlar uchun keng ko\'lamli axborot va texnik xizmatlarni taqdim etadi.'
        }
      },
      {
        id: 'services',
        type: 'grid',
        className: 'no-rounded',
        data: {
          title: 'Asosiy xizmatlar',
          columns: 2,
          items: [
            {
              title: 'Ma\'lumotnoma xizmati',
              description: 'Talabalar va abituriyentlar uchun barcha savollarni javoblash',
              details: {
                'Ish vaqti': '9:00 - 18:00',
                'Telefon': '+998 69 227-02-01',
                'Joylashuv': 'Asosiy bino, 1-qavat',
                'Xizmat turi': 'Bepul'
              }
            },
            {
              title: 'Hujjatlar rasmiylashtirish',
              description: 'Diplom, ma\'lumotnoma va boshqa hujjatlarni rasmiylashtirish',
              details: {
                'Ish vaqti': '9:00 - 17:00',
                'Telefon': '+998 69 227-02-02',
                'Joylashuv': 'Asosiy bino, 2-qavat',
                'Xizmat turi': 'Pullik/Bepul'
              }
            },
            {
              title: 'IT qo\'llab-quvvatlash',
              description: 'Kompyuter, internet va dasturiy ta\'minot bo\'yicha yordam',
              details: {
                'Ish vaqti': '8:00 - 20:00',
                'Telefon': '+998 69 227-02-03',
                'Joylashuv': 'IT markaz, 3-qavat',
                'Xizmat turi': 'Bepul'
              }
            },
            {
              title: 'Kutubxona xizmatlari',
              description: 'Kitoblar, jurналlar va elektron resurslar',
              details: {
                'Ish vaqti': '8:00 - 22:00',
                'Telefon': '+998 69 227-02-04',
                'Joylashuv': 'Kutubxona binosi',
                'Xizmat turi': 'Bepul'
              }
            }
          ]
        }
      },
      {
        id: 'online-services',
        type: 'cards',
        data: {
          title: 'Onlayn xizmatlar',
          cards: [
            {
              title: 'Talabalar portali',
              description: 'Baholar, dars jadvali, to\'lovlar va boshqa ma\'lumotlar'
            },
            {
              title: 'Elektron kutubxona',
              description: 'Kitoblar, maqolalar va tadqiqot materiallariga onlayn kirish'
            },
            {
              title: 'Ariza berish tizimi',
              description: 'Turli arizalar va so\'rovlarni onlayn yuborish'
            },
            {
              title: 'Onlayn to\'lov',
              description: 'Kontrakt to\'lovlari va boshqa xizmatlar uchun to\'lov'
            },
            {
              title: 'Virtual sinf',
              description: 'Masofaviy ta\'lim va onlayn darslar'
            },
            {
              title: 'Mobil ilova',
              description: 'Barcha xizmatlarni mobil qurilmada foydalanish'
            }
          ]
        }
      },
      {
        id: 'working-hours',
        type: 'table',
        data: {
          title: 'Ish vaqti jadvali',
          headers: ['Xizmat', 'Dushanba-Juma', 'Shanba', 'Yakshanba'],
          rows: [
            ['Ma\'lumotnoma', '9:00 - 18:00', '9:00 - 14:00', 'Dam olish'],
            ['Hujjatlar', '9:00 - 17:00', '9:00 - 13:00', 'Dam olish'],
            ['IT qo\'llab-quvvatlash', '8:00 - 20:00', '9:00 - 15:00', '10:00 - 16:00'],
            ['Kutubxona', '8:00 - 22:00', '9:00 - 18:00', '10:00 - 18:00'],
            ['Onlayn xizmatlar', '24/7', '24/7', '24/7']
          ]
        }
      },
      {
        id: 'contact-info',
        type: 'grid',
        className: 'no-rounded',
        data: {
          title: 'Aloqa ma\'lumotlari',
          columns: 2,
          items: [
            {
              title: 'Asosiy ma\'lumotnoma',
              description: 'Umumiy savollar va yo\'naltirish',
              details: {
                'Telefon': '+998 69 227-02-00',
                'Email': 'info@namdtu.uz',
                'Telegram': '@namdtu_info',
                'Ish vaqti': '9:00 - 18:00'
              }
            },
            {
              title: 'Texnik qo\'llab-quvvatlash',
              description: 'IT va texnik muammolar',
              details: {
                'Telefon': '+998 69 227-02-03',
                'Email': 'support@namdtu.uz',
                'Telegram': '@namdtu_support',
                'Ish vaqti': '8:00 - 20:00'
              }
            }
          ]
        }
      },
      {
        id: 'stats',
        type: 'stats',
        data: {
          title: 'Xizmat ko\'rsatkichlari',
          stats: [
            { value: '5000+', label: 'Oylik so\'rovlar' },
            { value: '24/7', label: 'Onlayn xizmatlar' },
            { value: '15', label: 'Xizmat turlari' },
            { value: '98%', label: 'Mijoz mamnunligi' }
          ]
        }
      },
      {
        id: 'faq',
        type: 'accordion',
        data: {
          title: 'Tez-tez so\'raladigan savollar',
          items: [
            {
              question: 'Diplom nusxasini qanday olish mumkin?',
              answer: 'Diplom nusxasini olish uchun asosiy binoning 2-qavatidagi hujjatlar rasmiylashtirish bo\'limiga murojaat qiling. O\'zingiz bilan pasport va asl diplomni olib keling. Xizmat 3-5 ish kuni ichida bajariladi.'
            },
            {
              question: 'Onlayn to\'lov qanday amalga oshiriladi?',
              answer: 'Onlayn to\'lovni talabalar portalida yoki mobil ilovada amalga oshirishingiz mumkin. Click, Payme, Uzcard orqali to\'lov qilish imkoniyati mavjud. To\'lov darhol hisobga tushadi.'
            },
            {
              question: 'Kutubxonadan kitob qanday olish mumkin?',
              answer: 'Kutubxonadan kitob olish uchun talaba guvohnomangiz bilan kutubxonaga murojaat qiling. Elektron katalog orqali kerakli kitobni topib, kutubxonachiga aytishingiz mumkin. Kitobni 30 kungacha ushlab turishingiz mumkin.'
            },
            {
              question: 'IT yordam qanday olish mumkin?',
              answer: 'IT yordam uchun 3-qavatdagi IT markazga murojaat qiling yoki +998 69 227-02-03 raqamiga qo\'ng\'iroq qiling. Kompyuter, internet, dasturiy ta\'minot bo\'yicha barcha savollaringizga javob beramiz.'
            },
            {
              question: 'Talabalar portali parolini unutdim, qanday tiklash mumkin?',
              answer: 'Parolni tiklash uchun talabalar portalidagi "Parolni unutdim" tugmasini bosing yoki IT qo\'llab-quvvatlash xizmatiga murojaat qiling. Telefon raqami yoki email orqali parolni tiklashingiz mumkin.'
            },
            {
              question: 'Ariza berish tizimi qanday ishlaydi?',
              answer: 'Ariza berish tizimiga talabalar portali orqali kirishingiz mumkin. Kerakli ariza turini tanlab, ma\'lumotlarni to\'ldiring va yuborishingiz mumkin. Ariza holati haqida SMS yoki email orqali xabar beriladi.'
            }
          ]
        }
      },
      {
        id: 'image',
        type: 'image',
        data: {
          title: 'Axborot xizmatlari markazi',
          src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          alt: 'Axborot xizmatlari markazi',
          caption: 'Zamonaviy axborot xizmatlari markazi'
        }
      },
      {
        id: 'quote',
        type: 'quote',
        data: {
          quote: 'Bizning maqsadimiz - har bir talaba va xodimga sifatli va tezkor axborot xizmatlarini taqdim etishdir.',
          author: 'Axborot xizmatlari markazi rahbari'
        }
      }
    ]
  };

  return simulateApiCall(data, 500);
};
