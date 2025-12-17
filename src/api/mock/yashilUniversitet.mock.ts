import { ContentBlock } from '@/components/shared/ContentBuilder';

const transformYashilUniversitetToBlocks = (data?: any): ContentBlock[] => {
  return [
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
    {
      id: 'yashil-gallery',
      type: 'gallery',
      data: {
        title: 'Yashil Universitet Galereyasi',
        images: [
          { src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzIyYzU1ZSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiPkRhcmF4dCBlZ2lzaCBtYXJvc2ltaTwvdGV4dD48L3N2Zz4=', alt: 'Daraxt ekish marosimi' },
          { src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzE2YTM0YSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiPkxFRCBjaGlyb3FsYXIgb8Kcm5hdGlzaDwvdGV4dD48L3N2Zz4=', alt: 'LED chiroqlar o\'rnatish' },
          { src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzE1ODAzZCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiPlFheXRhIGlzaGxhc2ggcHVua3RsYXJpPC90ZXh0Pjwvc3ZnPg==', alt: 'Qayta ishlash punktlari' },
          { src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzE2NjUzNCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiPllBU2lsIG1heWRvbmxhcg==', alt: 'Yashil maydonlar' }
        ]
      },
      className: 'border-green-300'
    },
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

const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const fetchYashilUniversitetData = async (): Promise<ContentBlock[]> => {
  console.warn('Yashil Universitet ma\'lumotlari uchun mock API dan foydalanilmoqda');
  
  const blocks = transformYashilUniversitetToBlocks();
  return simulateApiCall(blocks, 300);
};