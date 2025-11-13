import { ContentBlock } from '../components/shared/ContentBuilder';

// 📝 1. MATN TURLARI
export const headingExamples: ContentBlock[] = [
  {
    id: 'heading-h1',
    type: 'heading',
    data: {
      level: 1,
      content: 'Asosiy sarlavha (H1)'
    }
  },
  {
    id: 'heading-h2',
    type: 'heading',
    data: {
      level: 2,
      content: 'Ikkinchi darajali sarlavha (H2)'
    }
  },
  {
    id: 'heading-h3',
    type: 'heading',
    data: {
      level: 3,
      content: 'Uchinchi darajali sarlavha (H3)'
    }
  }
];

export const paragraphExample: ContentBlock = {
  id: 'paragraph-1',
  type: 'paragraph',
  data: {
    content: 'Bu oddiy paragraf matni. API dan kelgan har qanday matn bu formatda ko\'rsatiladi. Matn uzun bo\'lishi mumkin va bir necha qatorga bo\'linadi.'
  }
};

export const richTextExample: ContentBlock = {
  id: 'rich-text-1',
  type: 'rich-text',
  data: {
    content: '<p>Bu <strong>formatlangan matn</strong>. Bu yerda <em>kursiv</em>, <u>tagiga chizilgan</u> va <a href="#">linklar</a> bo\'lishi mumkin.</p><ul><li>Ro\'yxat elementi 1</li><li>Ro\'yxat elementi 2</li></ul>'
  }
};

export const citationExample: ContentBlock = {
  id: 'citation-1',
  type: 'citation',
  data: {
    content: 'Ta\'lim - eng katta boylik, bilim - eng qimmatli xazina.',
    author: 'Alisher Navoiy'
  }
};

// 🖼️ 2. MEDIA TURLARI
export const galleryExample: ContentBlock = {
  id: 'gallery-1',
  type: 'gallery',
  data: {
    title: 'Universitet galereya',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1562774053-701939374585',
        alt: 'Universitet binosi',
        caption: 'Asosiy bino'
      },
      {
        src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
        alt: 'Kutubxona',
        caption: 'Zamonaviy kutubxona'
      },
      {
        src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        alt: 'Laboratoriya',
        caption: 'Ilmiy laboratoriya'
      }
    ]
  }
};

export const videoExamples: ContentBlock[] = [
  {
    id: 'video-youtube',
    type: 'video',
    data: {
      title: 'Universitet haqida video',
      type: 'youtube',
      videoId: 'dQw4w9WgXcQ',
      description: 'Universitetimiz haqida qisqacha ma\'lumot'
    }
  },
  {
    id: 'video-local',
    type: 'video',
    data: {
      title: 'Mahalliy video',
      type: 'local',
      src: '/videos/university-intro.mp4',
      poster: '/images/video-poster.jpg',
      description: 'Universitet tanishtiruv videosi'
    }
  }
];

export const audioExample: ContentBlock = {
  id: 'audio-1',
  type: 'audio',
  data: {
    title: 'Rektor nutqi',
    src: '/audio/rector-speech.mp3',
    description: 'Yangi o\'quv yili munosabati bilan rektor nutqi'
  }
};

// 🧩 3. LAYOUT BLOKLARI
export const sectionExample: ContentBlock = {
  id: 'section-1',
  type: 'section',
  data: {
    title: 'Fakultetlar bo\'limi',
    content: 'Bu bo\'limda barcha fakultetlar haqida ma\'lumot berilgan.',
    background: 'bg-gray-100'
  }
};

export const columnsExample: ContentBlock = {
  id: 'columns-1',
  type: 'columns',
  data: {
    title: 'Xizmatlarimiz',
    columns: 3,
    items: [
      {
        title: 'Ta\'lim',
        content: 'Yuqori sifatli ta\'lim xizmatlari',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'
      },
      {
        title: 'Tadqiqot',
        content: 'Ilmiy tadqiqot ishlari',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
      },
      {
        title: 'Innovatsiya',
        content: 'Zamonaviy texnologiyalar',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43'
      }
    ]
  }
};

export const dividerExample: ContentBlock = {
  id: 'divider-1',
  type: 'divider',
  data: {
    style: 'solid', // yoki 'dashed'
    color: 'border-blue-300'
  }
};

export const spacerExamples: ContentBlock[] = [
  {
    id: 'spacer-small',
    type: 'spacer',
    data: { size: 'small' } // 16px
  },
  {
    id: 'spacer-medium',
    type: 'spacer',
    data: { size: 'medium' } // 32px
  },
  {
    id: 'spacer-large',
    type: 'spacer',
    data: { size: 'large' } // 64px
  }
];

// 🔗 4. INTERAKTIV ELEMENTLAR
export const buttonExample: ContentBlock = {
  id: 'button-1',
  type: 'button',
  data: {
    text: 'Batafsil ma\'lumot',
    variant: 'primary', // 'primary', 'secondary', 'default'
    onClick: () => alert('Tugma bosildi!')
  }
};

export const tabsExample: ContentBlock = {
  id: 'tabs-1',
  type: 'tabs',
  data: {
    title: 'Fakultet ma\'lumotlari',
    tabs: [
      {
        title: 'Umumiy ma\'lumot',
        content: '<p>Fakultet 1995 yilda tashkil etilgan. Hozirda 850 nafar talaba tahsil oladi.</p>'
      },
      {
        title: 'Kafedralar',
        content: '<ul><li>Mashinasozlik kafedra</li><li>Energetika kafedra</li><li>Avtomatlashtirish kafedra</li></ul>'
      },
      {
        title: 'Rahbariyat',
        content: '<p><strong>Dekan:</strong> Prof. Aliyev Bobur Karimovich<br><strong>Prodekan:</strong> Dots. Karimova Sevara</p>'
      }
    ]
  }
};

// 👥 5. MA'LUMOTLI KOMPONENTLAR
export const testimonialsExample: ContentBlock = {
  id: 'testimonials-1',
  type: 'testimonials',
  data: {
    title: 'Bitiruvchilar fikrlari',
    testimonials: [
      {
        content: 'NamDTU da o\'qish mening hayotimdagi eng yaxshi qaror edi. Bu yerda olgan bilimlarim menga karyeramda juda yordam berdi.',
        name: 'Aliyev Bobur',
        position: 'Software Engineer, Google',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      },
      {
        content: 'Universitetdagi o\'qituvchilar juda malakali va tajribali. Ular bizga nafaqat nazariy, balki amaliy bilimlar ham berdilar.',
        name: 'Karimova Sevara',
        position: 'Project Manager, Microsoft',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786'
      }
    ]
  }
};

export const teamMemberExample: ContentBlock = {
  id: 'team-1',
  type: 'team-member',
  data: {
    title: 'Bizning jamoa',
    members: [
      {
        name: 'Prof. Aliyev Bobur Karimovich',
        position: 'Fakultet dekani',
        bio: '15 yillik tajribaga ega professor. Muhandislik sohasida 50 dan ortiq ilmiy maqola muallifi.',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        contact: {
          email: 'aliyev@namdtu.uz',
          phone: '+998 69 227-01-01'
        }
      },
      {
        name: 'Dots. Karimova Sevara Rustamovna',
        position: 'Prodekan',
        bio: '10 yillik o\'qituvchilik tajribasi. Talabalar bilan ishlash bo\'yicha mutaxassis.',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786',
        contact: {
          email: 'karimova@namdtu.uz',
          phone: '+998 69 227-01-02'
        }
      }
    ]
  }
};

// 🌍 6. INTEGRATSIYA ELEMENTLARI
export const mapExample: ContentBlock = {
  id: 'map-1',
  type: 'map',
  data: {
    title: 'Bizning manzil',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.4...',
    address: 'Namangan shahar, Uychi ko\'chasi, 12-uy'
  }
};

export const iframeExample: ContentBlock = {
  id: 'iframe-1',
  type: 'iframe',
  data: {
    title: 'Onlayn forma',
    src: 'https://forms.google.com/embed/...',
    aspectRatio: 'aspect-[4/3]',
    attributes: {
      allowFullScreen: true,
      loading: 'lazy'
    }
  }
};

// 🔄 API ma'lumotlarini yangi content turlariga o'tkazish
export const convertAdvancedApiData = (apiData: any): ContentBlock[] => {
  const blocks: ContentBlock[] = [];

  // Sarlavha
  if (apiData.title) {
    blocks.push({
      id: 'main-heading',
      type: 'heading',
      data: {
        level: 1,
        content: apiData.title
      }
    });
  }

  // Tavsif
  if (apiData.description) {
    blocks.push({
      id: 'description',
      type: 'paragraph',
      data: {
        content: apiData.description
      }
    });
  }

  // Galereya
  if (apiData.gallery && apiData.gallery.length > 0) {
    blocks.push({
      id: 'gallery',
      type: 'gallery',
      data: {
        title: 'Galereya',
        images: apiData.gallery.map((img: any) => ({
          src: img.url,
          alt: img.caption,
          caption: img.caption
        }))
      }
    });
  }

  // Video
  if (apiData.video) {
    blocks.push({
      id: 'video',
      type: 'video',
      data: {
        title: apiData.video.title,
        type: apiData.video.type,
        videoId: apiData.video.videoId || undefined,
        src: apiData.video.src || undefined,
        description: apiData.video.description
      }
    });
  }

  // Jamoa a'zolari
  if (apiData.team && apiData.team.length > 0) {
    blocks.push({
      id: 'team',
      type: 'team-member',
      data: {
        title: 'Bizning jamoa',
        members: apiData.team
      }
    });
  }

  // Tabs (agar kategoriyalar bo'lsa)
  if (apiData.categories && apiData.categories.length > 0) {
    blocks.push({
      id: 'categories-tabs',
      type: 'tabs',
      data: {
        title: 'Kategoriyalar',
        tabs: apiData.categories.map((cat: any) => ({
          title: cat.name,
          content: cat.content
        }))
      }
    });
  }

  return blocks;
};

// Sahifada ishlatish misoli
export const examplePageBlocks: ContentBlock[] = [
  ...headingExamples,
  paragraphExample,
  dividerExample,
  galleryExample,
  spacerExamples[1], // medium spacer
  videoExamples[0],
  columnsExample,
  testimonialsExample,
  teamMemberExample,
  mapExample
];
