/**
 * University Page Content API
 * ContentBuilder uchun ma'lumotlarni tayyorlash
 * Bu fayl Universitet sahifasi uchun dinamik kontent bloklar yaratadi
 */

import { ContentBlock } from '@/components/shared/ContentBuilder';
import { UniversityContent } from '@/types/university.types';

/**
 * UniversityContent ma'lumotlarini ContentBlock[] ga o'zgartiradi (Grid layout)
 * 
 * Har bir reason 1 ta grid item bo'ladi
 * 
 * @param {UniversityContent} content - API dan kelgan universitet ma'lumotlari
 * @returns {ContentBlock[]} ContentBuilder uchun tayyor bloklar
 * 
 * @example
 * const blocks = transformUniversityContentToBlocks(universityData);
 * <ContentBuilder blocks={blocks} />
 */
export const transformUniversityContentToBlocks = (
  content: UniversityContent
): ContentBlock[] => {
  const blocks: ContentBlock[] = [
    // 0. University Image
    {
      id: 'university-image',
      type: 'image',
      data: {
        src: content.heroImage || 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Universitet'
      },
      className: 'rounded-none' // Remove border radius
    }
  ];

  // Add each reason as heading + paragraph + optional faculties list
  content.reasons.forEach((reason, index) => {
    blocks.push(
      {
        id: `reason-heading-${reason.id}`,
        type: 'heading',
        data: { level: 4, content: `• ${reason.title}` },
        className: 'text-blue-600' // Primary color for headings
      },
      {
        id: `reason-text-${reason.id}`,
        type: 'paragraph',
        data: {
          content: reason.description
        }
      }
    );

    // Add faculties list if available
    if (reason.items && reason.items.length > 0) {
      blocks.push({
        id: `reason-faculties-${reason.id}`,
        type: 'list',
        data: {
          title: '',
          items: reason.items
        },
        className: 'ml-4'
      });
    }
  });

  return blocks;
};

/**
 * Alternativ: Reasons ni accordion sifatida ko'rsatish
 */
export const transformUniversityContentToAccordion = (
  content: UniversityContent
): ContentBlock[] => {
  return [
    {
      id: 'hero-highlight',
      type: 'highlight',
      data: {
        title: content.title,
        content: content.description,
      },
      className: 'mb-8',
    },

    {
      id: 'subtitle-heading',
      type: 'heading',
      data: {
        level: 2,
        content: content.subtitle,
      },
      className: 'mt-12 mb-8',
    },

    // Accordion sifatida reasons
    {
      id: 'reasons-accordion',
      type: 'accordion',
      data: {
        title: 'Universitetni tanlashning asosiy sabablari',
        items: content.reasons.map((reason) => ({
          question: `${reason.id}. ${reason.title}`,
          answer: `${reason.description}${reason.items
              ? `\n\nFakultetlar:\n${reason.items.map((item) => `• ${item}`).join('\n')}`
              : ''
            }`,
        })),
      },
      className: 'mt-8',
    },

    {
      id: 'welcome-section',
      type: 'section',
      data: {
        title: content.welcomeTitle,
        content: content.welcomeDescription,
        background: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg',
      },
      className: 'mt-12',
    },

    {
      id: 'cta-button',
      type: 'button',
      data: {
        text: content.welcomeCallToAction,
        variant: 'primary',
        onClick: () => {
          window.location.href = '/appeals';
        },
      },
      className: 'mt-6 text-center',
    },
  ];
};

/**
 * Alternativ: Reasons ni cards sifatida ko'rsatish
 */
export const transformUniversityContentToCards = (
  content: UniversityContent
): ContentBlock[] => {
  return [
    {
      id: 'hero-highlight',
      type: 'highlight',
      data: {
        title: content.title,
        content: content.description,
      },
      className: 'mb-8',
    },

    {
      id: 'subtitle-heading',
      type: 'heading',
      data: {
        level: 2,
        content: content.subtitle,
      },
      className: 'mt-12 mb-8',
    },

    // Cards sifatida reasons
    {
      id: 'reasons-cards',
      type: 'cards',
      data: {
        title: '',
        cards: content.reasons.map((reason) => ({
          title: `${reason.id}. ${reason.title}`,
          description: reason.description.substring(0, 150) + '...',
          icon: getReasonIcon(reason.id),
        })),
      },
      className: 'mt-8',
    },

    {
      id: 'welcome-section',
      type: 'section',
      data: {
        title: content.welcomeTitle,
        content: content.welcomeDescription,
        background: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg',
      },
      className: 'mt-12',
    },

    {
      id: 'cta-button',
      type: 'button',
      data: {
        text: content.welcomeCallToAction,
        variant: 'primary',
        onClick: () => {
          window.location.href = '/appeals';
        },
      },
      className: 'mt-6 text-center',
    },
  ];
};

/**
 * Reason ID bo'yicha icon olish
 */
function getReasonIcon(id: number): string {
  const icons: { [key: number]: string } = {
    1: '📚',
    2: '🏆',
    3: '🎓',
    4: '🏢',
    5: '👨‍🏫',
    6: '🌍',
    7: '💼',
  };
  return icons[id] || '✨';
}

/**
 * Mock API - Universitet ma'lumotlarini olish
 */
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

/**
 * ContentBuilder bloklar bilan universitet ma'lumotlarini olish
 */
export const fetchUniversityContentBlocks = async (
  locale?: string,
  layout: 'grid' | 'accordion' | 'cards' = 'grid'
): Promise<ContentBlock[]> => {
  try {
    // Haqiqiy API chaqiruvi (Backend tayyor bo'lganda)
    // const response = await apiClient.get('/university/content');
    // const content = response.data;

    // Mock data
    const mockContent: UniversityContent = {
      id: 'namdtu-main',
      title:
        'Namangan Davlat Texnika Universitetida o&apos;z iqtidoringizni kashf qiling va texnika sohasida mukammalikka erishing!',
      subtitle:
        'Nega aynan Namangan Davlat Texnika Universitetini tanlashingiz kerak - 7 ta sabab:',
      description:
        'Agar siz texnika va muhandislik sohasida eng yuqori natijaga erishish istagida yurgan bo&apos;lsangiz, Namangan Davlat Texnika Universiteti sizga ajoyib takliflarni beradi. Bizning universitetimizda texnikadagi ilk qadamlaringizni boshlang!',
      heroImage:
        'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      reasons: [
        {
          id: 1,
          title: 'Boy va qadimiy tarix',
          description:
            'Namangan Davlat Texnika Universiteti 2000 yilda muhandislar, texnologlar va texnika sohasida boshqa yuqori malakali kadrlar tayyorlash maqsadida tashkil etilgan. NamDTU Farg&apos;ona vodiysidagi eng mashhur va yetakchi texnika oliy ta&apos;lim muassasalaridan biridir. Universitet O&apos;zbekiston Respublikasining texnika ta&apos;limi sohasidagi muhim markazlaridan biri bo&apos;lib, 20 yildan ortiq tajribaga ega.',
          color: 'border-green-500',
        },
        {
          id: 2,
          title: 'Xalqaro akkreditatsiya va tan olinish',
          description:
            'Namangan Davlat Texnika Universiteti O&apos;zbekistondagi yetakchi texnika oliy o&apos;quv yurti hisoblanadi. Texnika oliy ta&apos;lim muassasalari orasida mintaqada etakchi o&apos;rinlardan birini egallaydi. Universitetning ko&apos;plab ta&apos;lim dasturlari xalqaro standartlarga mos keladi va bitiruvchilar xorijiy kompaniyalarda ham tan olinadi.',
          color: 'border-blue-500',
        },
        {
          id: 3,
          title: 'Ta&apos;lim dasturlari',
          description:
            'NamDTU ixtisosligi doirasida keng qamrovli ta&apos;limni taklif qiluvchi ko&apos;p tarmoqli fakultetlar mavjud:',
          color: 'border-purple-500',
          items: [
            'Muhandislik va texnologiya fakulteti',
            'Axborot texnologiyalari va kompyuter muhandisligi',
            'Elektrotexnika va energetika fakulteti',
            'Qurilish va arxitektura fakulteti',
            'Iqtisodiyot va menejment fakulteti',
            'Tayyorgarlik va malaka oshirish fakulteti',
          ],
        },
        {
          id: 4,
          title: 'Zamonaviy kampus va infratuzilma',
          description:
            'NamDTU bo&apos;lajak muhandislarni amaliy o&apos;qitish uchun zarur bo&apos;lgan eng yangi texnologiyalar va barcha zarur uskunalar bilan jihozlangan zamonaviy laboratoriyalar, texnik markazlar va ishlab chiqarish o&apos;quv korxonalariga ega. Axborot-resurs markazi mintaqadagi eng zamonaviy texnik kutubxonalardan biri hisoblanadi. Sport majmualari va yashash joylari talabalar uchun qulay sharoit yaratadi.',
          color: 'border-orange-500',
        },
        {
          id: 5,
          title: 'Yuqori malakali professor-o&apos;qituvchilar jamoasi',
          description:
            'NamDTU ning barcha ustoz va professor-o&apos;qituvchilari xalqaro standartlarga javob beradigan yuqori malakali texnika mutaxassislaridir. Universitetda 50 dan ortiq professor va dotsent, 200 dan ortiq katta o&apos;qituvchi va o&apos;qituvchilar faoliyat yuritadi. Ko&apos;plab o&apos;qituvchilar xorijiy universitetlarda malaka oshirgan va amaliy tajribaga ega. Darslar o&apos;zbek, rus va ingliz tillarida olib boriladi.',
          color: 'border-red-500',
        },
        {
          id: 6,
          title: 'Xalqaro hamkorlik',
          description:
            'Namangan Davlat Texnika Universiteti butun dunyo bo&apos;ylab 30 dan ortiq yetakchi xorijiy texnika universitetlari bilan hamkorlik qiladi. Ustoz professorlar va universitet talabalari uchun xorijiy amaliyot va almashinuv dasturlari mavjud. Har yili xorijiy ekspertlar va mutaxassislar bilan seminar va konferensiyalar tashkil etiladi.',
          color: 'border-indigo-500',
        },
        {
          id: 7,
          title: 'Talabalarni qo&apos;llab-quvvatlash va ish bilan ta&apos;minlash',
          description:
            'Universitet har yili 1000 dan ortiq talabani qabul qiladi va ularga to&apos;liq qo&apos;llab-quvvatlash ko&apos;rsatadi. Hozirda 5000 dan ortiq talaba tahsil olmoqda. Universitet bitiruvchilari uchun ish bilan ta&apos;minlash dasturlari mavjud va ko&apos;plab yirik kompaniyalar bilan hamkorlik shartnomasi tuzilgan. Universitet hududida zamonaviy yotoqxonalar va ovqatlanish xizmatlari mavjud.',
          color: 'border-pink-500',
        },
      ],
      welcomeTitle: 'Namangan Davlat Texnika Universitetiga xush kelibsiz!',
      welcomeDescription:
        'NamDTUni tanlab malakali muhandis, texnolog yoki texnika sohasidagi rahbar bo&apos;ling. Bizning keng qamrovli dasturlarimiz va eng zamonaviy kampuslarimiz sizni texnika va muhandislik olamida muvaffaqiyatga erishishingiz uchun zarur bo&apos;lgan bilim, ko&apos;nikma va tajriba orttirishingiz uchun mo&apos;ljallangan.',
      welcomeCallToAction:
        'Keling safimizga qo&apos;shiling va texnika sohasidagi kelajagingizni biz bilan quring!',
    };

    // Layout bo'yicha o'zgartirish
    let blocks: ContentBlock[];
    switch (layout) {
      case 'accordion':
        blocks = transformUniversityContentToAccordion(mockContent);
        break;
      case 'cards':
        blocks = transformUniversityContentToCards(mockContent);
        break;
      case 'grid':
      default:
        blocks = transformUniversityContentToBlocks(mockContent);
    }

    return simulateApiCall(blocks, 500);
  } catch (error) {
    console.error('Universitet ma\'lumotlarini yuklashda xatolik:', error);
    throw error;
  }
};
