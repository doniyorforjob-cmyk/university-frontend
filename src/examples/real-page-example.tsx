import React from 'react';
import PageTemplate from '../components/shared/PageTemplate';
import GenericPageSkeleton from '../components/shared/GenericPageSkeleton';
import { useStandardPage } from '../hooks/useStandardPage';
import { ContentBlock } from '../components/shared/ContentBuilder';

// API'dan kelgan raw ma'lumotlar interfeysi
interface ApiResponse {
  title: string;
  description: string;
  departments: Array<{
    id: number;
    name: string;
    head: string;
    phone: string;
    email: string;
    staff_count: number;
  }>;
  statistics: {
    total_staff: number;
    total_students: number;
    total_departments: number;
    established_year: number;
  };
  news: Array<{
    id: number;
    title: string;
    content: string;
    date: string;
  }>;
  gallery: Array<{
    id: number;
    url: string;
    caption: string;
  }>;
}

// API ma'lumotlarini ContentBuilder formatiga o'tkazish
const formatApiDataToContentBlocks = (apiData: ApiResponse): ContentBlock[] => {
  return [
    // 1. Intro highlight
    {
      id: 'intro',
      type: 'highlight',
      data: {
        title: apiData.title,
        content: apiData.description
      }
    },

    // 2. Statistika
    {
      id: 'statistics',
      type: 'stats',
      data: {
        title: 'Asosiy ko\'rsatkichlar',
        stats: [
          { value: apiData.statistics.total_staff.toString(), label: 'Xodimlar' },
          { value: apiData.statistics.total_students.toString(), label: 'Talabalar' },
          { value: apiData.statistics.total_departments.toString(), label: 'Bo\'limlar' },
          { value: apiData.statistics.established_year.toString(), label: 'Tashkil etilgan' }
        ]
      }
    },

    // 3. Bo'limlar grid
    {
      id: 'departments',
      type: 'grid',
      data: {
        title: 'Bo\'limlar ro\'yxati',
        columns: 2,
        items: apiData.departments.map(dept => ({
          title: dept.name,
          description: `${dept.head} rahbarligida`,
          details: {
            'Rahbar': dept.head,
            'Xodimlar soni': dept.staff_count.toString(),
            'Telefon': dept.phone,
            'Email': dept.email
          }
        }))
      }
    },

    // 4. Yangiliklar accordion
    {
      id: 'news',
      type: 'accordion',
      data: {
        title: 'So\'nggi yangiliklar',
        items: apiData.news.map(news => ({
          question: `${news.title} (${news.date})`,
          answer: news.content
        }))
      }
    },

    // 5. Galereya rasmlari
    ...apiData.gallery.map((image, index) => ({
      id: `gallery-${image.id}`,
      type: 'image' as const,
      data: {
        title: `Galereya ${index + 1}`,
        src: image.url,
        alt: image.caption,
        caption: image.caption
      }
    })),

    // 6. Aloqa jadvali
    {
      id: 'contact-table',
      type: 'table',
      data: {
        title: 'Aloqa ma\'lumotlari',
        headers: ['Bo\'lim', 'Rahbar', 'Telefon', 'Email'],
        rows: apiData.departments.map(dept => [
          dept.name,
          dept.head,
          dept.phone,
          dept.email
        ])
      }
    }
  ];
};

// Mock API funksiyasi
const fetchPageData = async (): Promise<{ blocks: ContentBlock[] }> => {
  // Real API'dan ma'lumot olish
  const response = await fetch('/api/departments'); // Bu sizning API endpoint'ingiz
  const apiData: ApiResponse = await response.json();
  
  // Yoki mock ma'lumotlar (test uchun)
  const mockApiData: ApiResponse = {
    title: 'Bo\'limlar va Markazlar',
    description: 'Universitetimizda turli bo\'limlar va markazlar faoliyat yuritadi',
    departments: [
      {
        id: 1,
        name: 'O\'quv bo\'limi',
        head: 'Aliyev Bobur Karimovich',
        phone: '+998 69 227-02-01',
        email: 'education@namdtu.uz',
        staff_count: 15
      },
      {
        id: 2,
        name: 'Ilmiy bo\'lim',
        head: 'Karimova Sevara Rustamovna',
        phone: '+998 69 227-02-02',
        email: 'science@namdtu.uz',
        staff_count: 12
      }
    ],
    statistics: {
      total_staff: 150,
      total_students: 5000,
      total_departments: 8,
      established_year: 1990
    },
    news: [
      {
        id: 1,
        title: 'Yangi o\'quv yili boshlandi',
        content: 'Universitetda yangi o\'quv yili tantanali ravishda boshlandi. Barcha talabalar o\'z darslariga qatnashishni boshladilar.',
        date: '2024-09-01'
      },
      {
        id: 2,
        title: 'Ilmiy konferensiya',
        content: 'Universitetda xalqaro ilmiy konferensiya o\'tkazildi. 15 mamlakatdan 200 dan ortiq olim ishtirok etdi.',
        date: '2024-10-15'
      }
    ],
    gallery: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1562774053-701939374585',
        caption: 'Universitet asosiy binosi'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
        caption: 'Kutubxona zali'
      }
    ]
  };

  // Ma'lumotlarni ContentBuilder formatiga o'tkazish
  const contentBlocks = formatApiDataToContentBlocks(mockApiData);
  
  return { blocks: contentBlocks };
};

// Sahifa komponenti
const DepartmentsPage: React.FC = () => {
  const { data, loading, error, refetch } = useStandardPage(
    'departments-example',
    fetchPageData
  );

  if (loading) {
    return <GenericPageSkeleton showSidebar={true} showHeroImage={false} contentBlocks={6} />;
  }

  if (error || !data) {
    return (
      <PageTemplate
        title="Bo'limlar"
      > {/* PageTemplate no longer takes showSidebar */}
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error?.message || 'Ma\'lumot topilmadi'}</p>
          <button 
            onClick={refetch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Qayta yuklash
          </button>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      title="Bo'limlar"
      contentBlocks={data.blocks} // PageTemplate no longer takes showSidebar
    />
  );
};

export default DepartmentsPage;
