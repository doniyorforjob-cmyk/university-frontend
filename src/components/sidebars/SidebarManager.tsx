import React from 'react';
import UniversitySystems from '@/components/shared/UniversitySystems';

// Sidebar turlari
export type SidebarType = 'default' | 'news' | 'announcements' | 'services' | 'info' | 'none';

// Sidebar props
interface SidebarManagerProps {
  type: SidebarType;
  customContent?: React.ReactNode;
  pageContext?: {
    category?: string;
    tags?: string[];
    relatedItems?: any[];
  };
}

// News Sidebar komponenti
const NewsSidebar: React.FC<{ pageContext?: any }> = ({ pageContext }) => {
  const categories = [
    'Barcha yangiliklar',
    'Ta&apos;lim yangiliklari',
    'Ilmiy yangiliklar',
    'Talabalar hayoti',
    'Xalqaro hamkorlik',
    'Sport yangiliklari'
  ];

  const recentNews = [
    {
      title: 'Yangi o\'quv yili boshlandi',
      date: '2024-09-01',
      href: '/news/new-academic-year'
    },
    {
      title: 'Xalqaro konferensiya',
      date: '2024-08-25',
      href: '/news/international-conference'
    },
    {
      title: 'Talabalar olimpiadasi',
      date: '2024-08-20',
      href: '/news/student-olympiad'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Kategoriyalar */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">Kategoriyalar</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                pageContext?.category === category
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* So'nggi yangiliklar */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">So&apos;nggi yangiliklar</h3>
        <div className="space-y-4">
          {recentNews.map((news, index) => (
            <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
              <h4 className="font-medium text-black text-sm mb-1 line-clamp-2">
                {news.title}
              </h4>
              <p className="text-xs text-gray-500">
                {new Date(news.date).toLocaleDateString('uz-UZ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Arxiv */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">Arxiv</h3>
        <div className="space-y-2">
          <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
            2024 yil
          </button>
          <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
            2023 yil
          </button>
          <button className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
            2022 yil
          </button>
        </div>
      </div>
    </div>
  );
};

// Announcements Sidebar komponenti
const AnnouncementsSidebar: React.FC<{ pageContext?: any }> = ({ pageContext }) => {
  const priorities = [
    { label: 'Barcha e&apos;lonlar', value: 'all' },
    { label: 'Muhim e&apos;lonlar', value: 'high', color: 'text-red-600' },
    { label: 'O&apos;rta muhimlik', value: 'medium', color: 'text-yellow-600' },
    { label: 'Oddiy e&apos;lonlar', value: 'low', color: 'text-green-600' }
  ];

  const types = [
    'Qabul e&apos;lonlari',
    'Imtihon e&apos;lonlari',
    'Stipendiya e&apos;lonlari',
    'Tadbirlar e&apos;lonlari',
    'Ish o&apos;rinlari'
  ];

  return (
    <div className="space-y-6">
      {/* Muhimlik bo'yicha */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">Muhimlik bo&apos;yicha</h3>
        <div className="space-y-2">
          {priorities.map((priority, index) => (
            <button
              key={index}
              className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                priority.color || 'text-gray-600'
              } hover:bg-gray-100`}
            >
              {priority.label}
            </button>
          ))}
        </div>
      </div>

      {/* E'lon turlari */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">E&apos;lon turlari</h3>
        <div className="space-y-2">
          {types.map((type, index) => (
            <button
              key={index}
              className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Faol e'lonlar */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">Faol e&apos;lonlar</h3>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <h4 className="font-medium text-red-800 text-sm mb-1">
              Qabul hujjatlari topshirish
            </h4>
            <p className="text-xs text-red-600">
              Muddat: 31 Avgust 2024
            </p>
          </div>
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
            <h4 className="font-medium text-yellow-800 text-sm mb-1">
              Stipendiya konkursi
            </h4>
            <p className="text-xs text-yellow-600">
              Muddat: 15 Sentyabr 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Services Sidebar komponenti
const ServicesSidebar: React.FC<{ pageContext?: any }> = ({ pageContext }) => {
  const serviceCategories = [
    'Barcha xizmatlar',
    'Onlayn xizmatlar',
    'Hujjat rasmiylashtiruv',
    'To&apos;lov xizmatlari',
    'Kutubxona xizmatlari',
    'IT yordam'
  ];

  const quickActions = [
    { title: 'Diplom nusxasi', icon: '📜', href: '/services/diploma-copy' },
    { title: 'Ma&apos;lumotnoma', icon: '📋', href: '/services/certificate' },
    { title: 'To&apos;lov qilish', icon: '💳', href: '/services/payment' },
    { title: 'Kutubxona', icon: '📚', href: '/services/library' }
  ];

  return (
    <div className="space-y-6">
      {/* Xizmat kategoriyalari */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">Xizmat turlari</h3>
        <div className="space-y-2">
          {serviceCategories.map((category, index) => (
            <button
              key={index}
              className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tezkor amallar */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">Tezkor amallar</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-1">{action.icon}</div>
              <div className="text-xs text-gray-700">{action.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">Tez-tez so&apos;raladigan savollar</h3>
        <div className="space-y-3">
          <div className="text-sm">
            <h4 className="font-medium text-black mb-1">Diplom nusxasini qanday olish mumkin?</h4>
            <p className="text-gray-600 text-xs">2-qavatdagi hujjatlar bo&apos;limiga murojaat qiling...</p>
          </div>
          <div className="text-sm">
            <h4 className="font-medium text-black mb-1">Onlayn to&apos;lov qanday amalga oshiriladi?</h4>
            <p className="text-gray-600 text-xs">Talabalar portalida Click, Payme orqali...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Info Sidebar komponenti
const InfoSidebar: React.FC<{ pageContext?: any }> = ({ pageContext }) => {
  const infoSections = [
    'Tashkiliy tuzilma',
    'Universitet kengashi',
    'Jamoatchilik kengashi',
    'Nizomlar va qoidalar',
    'Hisobotlar'
  ];

  const documents = [
    { title: 'Universitet nizomi', type: 'PDF', size: '2.5 MB' },
    { title: 'Yillik hisobot 2023', type: 'PDF', size: '5.1 MB' },
    { title: 'Akkreditatsiya hujjati', type: 'PDF', size: '1.8 MB' }
  ];

  return (
    <div className="space-y-6">
      {/* Ma'lumot bo'limlari */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">Ma&apos;lumot bo&apos;limlari</h3>
        <div className="space-y-2">
          {infoSections.map((section, index) => (
            <button
              key={index}
              className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {/* Hujjatlar */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">Muhim hujjatlar</h3>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded">
              <div className="flex-1">
                <h4 className="font-medium text-black text-sm">{doc.title}</h4>
                <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                📥
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Aloqa */}
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-4">Aloqa</h3>
        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-medium text-black">Telefon</h4>
            <p className="text-gray-600">+998 69 227-02-00</p>
          </div>
          <div>
            <h4 className="font-medium text-black">Email</h4>
            <p className="text-gray-600">info@namdtu.uz</p>
          </div>
          <div>
            <h4 className="font-medium text-black">Manzil</h4>
            <p className="text-gray-600">Namangan sh., Uychi ko&apos;chasi, 12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Asosiy SidebarManager komponenti
const SidebarManager: React.FC<SidebarManagerProps> = ({
  type,
  customContent,
  pageContext
}) => {
  // Agar custom content berilgan bo'lsa, uni qaytarish
  if (customContent) {
    return <>{customContent}</>;
  }

  // Sidebar turini aniqlash
  switch (type) {
    case 'news':
      return <NewsSidebar pageContext={pageContext} />;
    
    case 'announcements':
      return <AnnouncementsSidebar pageContext={pageContext} />;
    
    case 'services':
      return <ServicesSidebar pageContext={pageContext} />;
    
    case 'info':
      return <InfoSidebar pageContext={pageContext} />;
    
    case 'none':
      return null;
    
    case 'default':
    default:
      return <UniversitySystems />;
  }
};

export default SidebarManager;
