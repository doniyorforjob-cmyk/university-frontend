import { ContentBlock } from '../components/shared/ContentBuilder';

// 📝 1. TEXT - Oddiy matn
export const textExample: ContentBlock = {
  id: 'text-1',
  type: 'text',
  data: {
    title: 'Sarlavha',
    content: 'Bu yerda matn yoziladi. API dan kelgan har qanday matn bu formatda ko\'rsatiladi.'
  }
};

// 🎯 2. HIGHLIGHT - Muhim ma'lumot
export const highlightExample: ContentBlock = {
  id: 'highlight-1',
  type: 'highlight',
  data: {
    title: 'Muhim e\'lon',
    content: 'Bu ko\'k fonli, ajratilgan matn. Muhim ma\'lumotlar uchun ishlatiladi.'
  }
};

// 📊 3. GRID - Kartalar to'plami
export const gridExample: ContentBlock = {
  id: 'grid-1',
  type: 'grid',
  data: {
    title: 'Xodimlar ro\'yxati',
    columns: 2, // 1, 2, yoki 3
    items: [
      {
        title: 'Aliyev Bobur',
        description: 'Fakultet dekani',
        details: {
          'Lavozim': 'Dekan',
          'Tajriba': '15 yil',
          'Telefon': '+998 69 227-01-01',
          'Email': 'aliyev@namdtu.uz'
        }
      },
      {
        title: 'Karimova Sevara',
        description: 'Prodekan',
        details: {
          'Lavozim': 'Prodekan',
          'Tajriba': '10 yil',
          'Telefon': '+998 69 227-01-02',
          'Email': 'karimova@namdtu.uz'
        }
      }
    ]
  }
};

// 📋 4. LIST - Ro'yxat
export const listExample: ContentBlock = {
  id: 'list-1',
  type: 'list',
  data: {
    title: 'Talablar ro\'yxati',
    items: [
      'Oliy ma\'lumotli bo\'lish',
      '5 yildan ortiq tajriba',
      'Ingliz tilini bilish',
      'Kompyuter savodxonligi'
    ]
  }
};

// 🖼️ 5. IMAGE - Rasm
export const imageExample: ContentBlock = {
  id: 'image-1',
  type: 'image',
  data: {
    title: 'Universitet binosi',
    src: 'https://images.unsplash.com/photo-1562774053-701939374585',
    alt: 'Universitet binosi',
    caption: 'NamDTU asosiy binosi - 2024 yil'
  }
};

// 📈 6. STATS - Statistika
export const statsExample: ContentBlock = {
  id: 'stats-1',
  type: 'stats',
  data: {
    title: 'Universitet statistikasi',
    stats: [
      { value: '5000+', label: 'Talabalar' },
      { value: '300+', label: 'O\'qituvchilar' },
      { value: '15', label: 'Fakultetlar' },
      { value: '98%', label: 'Bitiruvchilar ish bilan ta\'minlanganligi' }
    ]
  }
};

// ⏰ 7. TIMELINE - Vaqt chizig'i
export const timelineExample: ContentBlock = {
  id: 'timeline-1',
  type: 'timeline',
  data: {
    title: 'Universitet tarixi',
    events: [
      {
        year: '1990',
        description: 'Universitet tashkil etildi'
      },
      {
        year: '1995',
        description: 'Birinchi bitiruvchilar'
      },
      {
        year: '2000',
        description: 'Magistratura ochildi'
      },
      {
        year: '2024',
        description: 'Zamonaviy kampus qurildi'
      }
    ]
  }
};

// 🎴 8. CARDS - Gradient kartalar
export const cardsExample: ContentBlock = {
  id: 'cards-1',
  type: 'cards',
  data: {
    title: 'Xizmatlar',
    cards: [
      {
        title: 'Onlayn ta\'lim',
        description: 'Masofaviy ta\'lim imkoniyatlari'
      },
      {
        title: 'Kutubxona',
        description: 'Elektron va an\'anaviy kitoblar'
      },
      {
        title: 'Sport zali',
        description: 'Zamonaviy sport majmuasi'
      }
    ]
  }
};

// 💬 9. QUOTE - Iqtibos
export const quoteExample: ContentBlock = {
  id: 'quote-1',
  type: 'quote',
  data: {
    quote: 'Ta\'lim - kelajakning kalitidir',
    author: 'Universitet rektori'
  }
};

// 📊 10. TABLE - Jadval
export const tableExample: ContentBlock = {
  id: 'table-1',
  type: 'table',
  data: {
    title: 'Fakultetlar jadvali',
    headers: ['Fakultet', 'Dekan', 'Talabalar soni', 'Telefon'],
    rows: [
      ['Muhandislik', 'Aliyev B.', '850', '+998 69 227-01-01'],
      ['Iqtisodiyot', 'Karimova S.', '720', '+998 69 227-01-02'],
      ['IT', 'Rahimov A.', '650', '+998 69 227-01-03']
    ]
  }
};

// ❓ 11. ACCORDION - Savol-javob
export const accordionExample: ContentBlock = {
  id: 'accordion-1',
  type: 'accordion',
  data: {
    title: 'Tez-tez so\'raladigan savollar',
    items: [
      {
        question: 'Qabul qachon boshlanadi?',
        answer: 'Qabul har yili iyul oyida boshlanadi va avgust oxirigacha davom etadi.'
      },
      {
        question: 'Kontrakt to\'lovi qancha?',
        answer: 'Kontrakt to\'lovi yo\'nalishga qarab 8-15 million so\'m orasida.'
      }
    ]
  }
};

// 🔄 API ma'lumotlarini ContentBlock formatiga o'tkazish funksiyasi
export const convertApiDataToContentBlocks = (apiData: any): ContentBlock[] => {
  const blocks: ContentBlock[] = [];

  // Misol: API'dan kelgan ma'lumotlarni turli content turlariga ajratish
  if (apiData.intro) {
    blocks.push({
      id: 'intro',
      type: 'highlight',
      data: {
        title: apiData.intro.title,
        content: apiData.intro.description
      }
    });
  }

  if (apiData.staff && apiData.staff.length > 0) {
    blocks.push({
      id: 'staff-grid',
      type: 'grid',
      data: {
        title: 'Xodimlar',
        columns: 2,
        items: apiData.staff.map((person: any) => ({
          title: person.name,
          description: person.position,
          details: {
            'Telefon': person.phone,
            'Email': person.email,
            'Tajriba': person.experience
          }
        }))
      }
    });
  }

  if (apiData.statistics) {
    blocks.push({
      id: 'statistics',
      type: 'stats',
      data: {
        title: 'Statistika',
        stats: Object.entries(apiData.statistics).map(([key, value]) => ({
          value: value as string,
          label: key
        }))
      }
    });
  }

  return blocks;
};
