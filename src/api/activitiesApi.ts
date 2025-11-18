/**
 * Activities API
 * Universitet faoliyati sahifasi uchun ma'lumotlarni taqdim etadi
 */

import { ContentBlock } from '@/components/shared/ContentBuilder';

/**
 * Faoliyat turi
 */
interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'scientific' | 'educational' | 'social' | 'cultural' | 'sports' | 'partnership' | 'administrative' | 'international';
  date?: string;
  imageUrl?: string;
  status?: 'completed' | 'ongoing' | 'upcoming';
  impact?: string;
  participants?: string;
}

/**
 * Activities ma'lumotlarini ContentBlock[] ga o'zgartiradi
 */
export const transformActivitiesToBlocks = (activities: Activity[]): ContentBlock[] => {
  // Statistika hisoblash
  const stats = {
    scientific: activities.filter(a => a.category === 'scientific').length,
    educational: activities.filter(a => a.category === 'educational').length,
    social: activities.filter(a => a.category === 'social').length,
    cultural: activities.filter(a => a.category === 'cultural').length,
    sports: activities.filter(a => a.category === 'sports').length,
    partnership: activities.filter(a => a.category === 'partnership').length,
    administrative: activities.filter(a => a.category === 'administrative').length,
    international: activities.filter(a => a.category === 'international').length,
  };

  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.status === 'completed').length;
  const ongoingActivities = activities.filter(a => a.status === 'ongoing').length;

  return [
    {
      id: 'activities-categories',
      type: 'activities-categories',
      data: {
        title: 'Faoliyat Yonalishlari',
        subtitle: 'Universitet faoliyatining asosiy yonalishlari va ularning ahamiyati',
        categories: [
          {
            title: 'Ilmiy Tadqiqotlar',
            description: `${stats.scientific} ta ilmiy loyiha va fundamental tadqiqotlar. Scopus va Web of Science bazalarida nashrlar`,
            icon: '🔬',
          },
          {
            title: 'Ta\'lim Dasturlari',
            description: `${stats.educational} ta innovatsion o\'quv dasturi va malaka oshirish kurslari`,
            icon: '🎓',
          },
          {
            title: 'Xalqaro Hamkorlik',
            description: `${stats.international} ta xalqaro loyiha va akademik almashinuv dasturlari`,
            icon: '🌍',
          },
          {
            title: 'Ijtimoiy Loyihalar',
            description: `${stats.social} ta ijtimoiy mas\'uliyat loyihalari va jamoatchilik tadbirlari`,
            icon: '🤝',
          },
          {
            title: 'Madaniy-Sport Tadbirlar',
            description: `${stats.cultural + stats.sports} ta madaniy va sport tadbirlari, talaba klublari faoliyati`,
            icon: '🎭',
          },
          {
            title: 'Hamkorlik Dasturlari',
            description: `${stats.partnership} ta sanoat hamkorligi va innovatsion loyihalar`,
            icon: '🏢',
          },
        ],
      },
    },

    // Achievements Timeline with original design
    {
      id: 'activities-timeline',
      type: 'activities-timeline',
      data: {
        title: 'Songgi Yutuqlar',
        subtitle: 'Universitet faoliyatining muhim yutuqlari va natijalari',
        events: [
          {
            year: '2024',
            description: '5 ta xalqaro grant loyihasi g\'olib bo\'ldi, 50+ ilmiy maqola nashr etildi, 1000+ talaba malaka oshirdi'
          },
          {
            year: '2023',
            description: 'Xalqaro akkreditatsiya olish, 3 ta yangi magistratura dasturi joriy etish, sport musobaqalarida 15 ta medal'
          },
          {
            year: '2022',
            description: 'Raqamli transformatsiya loyihasi boshlandi, 200+ hamkor tashkilot bilan shartnomalar imzolanadi'
          },
        ],
      },
    },

    // Future Plans with original design
    {
      id: 'activities-future-plans',
      type: 'activities-future-plans',
      data: {
        title: 'Kelajak Rejalari',
        subtitle: 'Universitetimizning 2025-2030 yillar uchun rivojlanish strategiyasi',
        plans: [
          'Sun\'iy intellekt va raqamli texnologiyalar markazini tashkil etish',
          'Xalqaro qo\'shma ta\'lim dasturlarini kengaytirish',
          'Yashil universitet konsepsiyasini to\'liq joriy etish',
          'Innovatsion startap-inkubator faoliyatini boshlash',
          'Xalqaro ilmiy konferensiyalar va seminarlar tashkil etish'
        ],
      },
    },
  ];
};

/**
 * Kategoriya nomini olish
 */
function getCategoryName(category: string): string {
  const names: { [key: string]: string } = {
    scientific: 'Ilmiy Tadqiqot',
    educational: 'Ta\'lim Dasturlari',
    social: 'Ijtimoiy Loyihalar',
    cultural: 'Madaniy Tadbirlar',
    sports: 'Sport Faoliyati',
    partnership: 'Hamkorlik Dasturlari',
    administrative: 'Boshqaruv Faoliyati',
    international: 'Xalqaro Hamkorlik',
  };
  return names[category] || category;
}

/**
 * Status nomini olish
 */
function getStatusName(status?: string): string {
  const names: { [key: string]: string } = {
    completed: 'Yakunlangan',
    ongoing: 'Davom etmoqda',
    upcoming: 'Rejalashtirilgan',
  };
  return names[status || ''] || 'Faol';
}

/**
 * Mock API - Faoliyat ma'lumotlarini olish
 */
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};


/**
 * ContentBuilder bloklar bilan faoliyat ma'lumotlarini olish
 */
export const fetchActivitiesData = async (): Promise<ContentBlock[]> => {
  try {
    // Haqiqiy API chaqiruvi (Backend tayyor bo'lganda)
    // const response = await apiClient.get('/activities');
    // const activities = response.data;

    // Comprehensive mock data for university activities
    const mockActivities: Activity[] = [
      // Scientific Activities
      {
        id: 'scientific-1',
        title: 'Sun\'iy Intellekt Tadqiqotlari Markazi',
        description: 'Chuqur o\'rganish va mashina o\'rganish sohasida fundamental va amaliy tadqiqotlar olib borish',
        category: 'scientific',
        date: '2023-09-01',
        status: 'ongoing',
        impact: '5 ta patent, 25+ ilmiy maqola',
        participants: '15 tadqiqotchi, 50 talaba',
      },
      {
        id: 'scientific-2',
        title: 'Raqamli Transformatsiya Loyihasi',
        description: 'Universitet boshqaruv tizimlarini raqamlashtirish va smart-kampus konsepsiyasini joriy etish',
        category: 'scientific',
        date: '2024-01-15',
        status: 'ongoing',
        impact: '80% jarayonlar raqamlashtirildi',
        participants: 'IT bo\'limi, barcha fakultetlar',
      },
      {
        id: 'scientific-3',
        title: 'Yashil Energiya Tadqiqotlari',
        description: 'Quyosh va shamol energiyasidan foydalanish bo\'yicha innovatsion yechimlar ishlab chiqish',
        category: 'scientific',
        date: '2024-03-01',
        status: 'ongoing',
        impact: '3 ta patentga ariza berildi',
        participants: 'Muhandislik fakulteti',
      },

      // Educational Activities
      {
        id: 'educational-1',
        title: 'Innovatsion Ta\'lim Dasturlari',
        description: 'STEAM ta\'lim metodologiyasini joriy etish va interaktiv o\'quv materiallarini ishlab chiqish',
        category: 'educational',
        date: '2023-09-01',
        status: 'ongoing',
        impact: '5000+ talaba qamrab olindi',
        participants: 'Barcha fakultetlar, 200+ o\'qituvchi',
      },
      {
        id: 'educational-2',
        title: 'Malaka Oshirish Markazi',
        description: 'O\'qituvchilar uchun zamonaviy pedagogik va professional ko\'nikmalar dasturlari',
        category: 'educational',
        date: '2024-02-01',
        status: 'ongoing',
        impact: '300+ o\'qituvchi malaka oshirdi',
        participants: 'O\'qituvchilar, trenerlar',
      },
      {
        id: 'educational-3',
        title: 'Onlayn Ta\'lim Platformasi',
        description: 'Massive Open Online Courses (MOOC) platformasini rivojlantirish',
        category: 'educational',
        date: '2023-06-01',
        status: 'completed',
        impact: '10000+ foydalanuvchi',
        participants: 'IT bo\'limi, o\'qituvchilar',
      },

      // International Activities
      {
        id: 'international-1',
        title: 'Erasmus+ Hamkorlik Dasturlari',
        description: 'Yevropa Ittifoqi mamlakatlari bilan ta\'lim va tadqiqot hamkorligi',
        category: 'international',
        date: '2023-10-01',
        status: 'ongoing',
        impact: '50+ talaba almashinuvi',
        participants: '5 ta Yevropa universiteti',
      },
      {
        id: 'international-2',
        title: 'Xalqaro Konferensiyalar',
        description: 'Yillik xalqaro ilmiy konferensiyalar va seminarlar tashkil etish',
        category: 'international',
        date: '2024-04-15',
        status: 'upcoming',
        impact: '500+ ishtirokchi kutilmoqda',
        participants: 'Xalqaro hamjamiyat',
      },
      {
        id: 'international-3',
        title: 'Qo\'shma Ta\'lim Dasturlari',
        description: 'Chet el universitetlari bilan qo\'shma diplom beruvchi dasturlar',
        category: 'international',
        date: '2024-09-01',
        status: 'upcoming',
        impact: '3 ta yangi dastur',
        participants: 'Turkiya va Koreya universitetlari',
      },

      // Social Activities
      {
        id: 'social-1',
        title: 'Ijtimoiy Mas\'uliyat Dasturlari',
        description: 'Mahalla va jamoat bilan hamkorlikda ijtimoiy loyihalar amalga oshirish',
        category: 'social',
        date: '2023-03-01',
        status: 'ongoing',
        impact: '1000+ odamga yordam ko\'rsatildi',
        participants: 'Talabalar, mahalla faollari',
      },
      {
        id: 'social-2',
        title: 'Yashil Universitet Tashabbusi',
        description: 'Ekologik barqarorlik va atrof-muhitni muhofaza qilish loyihalari',
        category: 'social',
        date: '2024-01-01',
        status: 'ongoing',
        impact: '50% chiqindi kamaydi',
        participants: 'Barcha talabalar va xodimlar',
      },
      {
        id: 'social-3',
        title: 'Karyera Markazi',
        description: 'Bitiruvchilarga ish topish va professional rivojlanishda yordam berish',
        category: 'social',
        date: '2023-09-01',
        status: 'ongoing',
        impact: '85% bitiruvchilar ish bilan ta\'minlandi',
        participants: 'Bitiruvchilar, 50+ kompaniya',
      },

      // Cultural and Sports Activities
      {
        id: 'cultural-1',
        title: 'Madaniy Tadbirlar',
        description: 'Milliy va xalqaro madaniyat kunlari, festival va konsertlar tashkil etish',
        category: 'cultural',
        date: '2024-03-21',
        status: 'completed',
        impact: '2000+ tomoshabin',
        participants: 'Talaba klublari, san\'at jamoalari',
      },
      {
        id: 'sports-1',
        title: 'Universiada Sport Musobaqalari',
        description: 'Yillik universitetlararo sport musobaqalari va chempionatlari',
        category: 'sports',
        date: '2024-05-01',
        status: 'upcoming',
        impact: '15 ta sport turi',
        participants: 'Barcha universitetlar',
      },

      // Partnership Activities
      {
        id: 'partnership-1',
        title: 'Sanoat Hamkorligi',
        description: 'Yetakchi kompaniyalar bilan qo\'shma loyihalar va amaliyot dasturlari',
        category: 'partnership',
        date: '2023-11-01',
        status: 'ongoing',
        impact: '200+ talaba amaliyot o\'tdi',
        participants: '30+ yetakchi kompaniya',
      },
      {
        id: 'partnership-2',
        title: 'Innovatsion Inkubator',
        description: 'Talaba startap loyihalarini qo\'llab-quvvatlash va rivojlantirish markazi',
        category: 'partnership',
        date: '2024-06-01',
        status: 'upcoming',
        impact: '10 ta startap loyihasi',
        participants: 'Talabalar, investorlar, mentorlar',
      },
    ];

    // Ma'lumotlarni ContentBlock[] ga o'zgartirish
    const blocks = transformActivitiesToBlocks(mockActivities);

    return simulateApiCall(blocks, 300);
  } catch (error) {
    console.error('Faoliyat ma\'lumotlarini yuklashda xatolik:', error);
    throw error;
  }
};
