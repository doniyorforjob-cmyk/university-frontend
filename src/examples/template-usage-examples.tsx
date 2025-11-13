import React from 'react';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import DetailTemplate from '@/components/templates/DetailTemplate';
import PageTemplate from '@/components/shared/PageTemplate';

// 1. YANGILIKLAR SAHIFASI - SectionTemplate ishlatish
export const NewsPage: React.FC = () => {
  const newsItems: SectionItem[] = [
    {
      id: '1',
      title: 'Yangi o\'quv yili tantanali ravishda boshlandi',
      description: 'NamDTU da 2024-2025 o\'quv yili tantanali marosim bilan boshlandi. Marosimda 1500 dan ortiq yangi talabalar ishtirok etdi.',
      date: '2024-09-01',
      category: 'Ta\'lim yangiliklari',
      priority: 'high',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
      author: 'Axborot xizmati',
      tags: ['o\'quv yili', 'talabalar', 'marosim'],
      href: '/news/new-academic-year-2024'
    },
    {
      id: '2',
      title: 'Xalqaro ilmiy konferensiya muvaffaqiyatli yakunlandi',
      description: 'Universitetda o\'tkazilgan "Zamonaviy texnologiyalar" mavzusidagi xalqaro konferensiyada 15 mamlakatdan 200 dan ortiq olim ishtirok etdi.',
      date: '2024-08-25',
      category: 'Ilmiy yangiliklar',
      priority: 'medium',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43',
      author: 'Ilmiy bo\'lim',
      tags: ['konferensiya', 'xalqaro', 'ilm'],
      href: '/news/international-conference-2024'
    },
    {
      id: '3',
      title: 'Talabalar olimpiadasi g\'oliblari e\'lon qilindi',
      description: 'Universitetda o\'tkazilgan fanlar olimpiadasida 50 dan ortiq talaba ishtirok etdi. G\'oliblar maxsus stipendiya bilan taqdirlandi.',
      date: '2024-08-20',
      category: 'Talabalar hayoti',
      priority: 'low',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      author: 'Talabalar bo\'limi',
      tags: ['olimpiada', 'talabalar', 'g\'olib'],
      href: '/news/student-olympiad-2024'
    }
  ];

  return (
    <SectionTemplate
      parentTitle="Universitet"
      sectionTitle="Yangiliklar"
      sectionType="news"
      items={newsItems}
      totalItems={25} // API dan kelgan umumiy soni
      layoutType="grid"
      itemsPerPage={9}
      showFilters={true}
      showSearch={true}
      showPagination={true}
      showSorting={true}
      onItemClick={(item) => {
        // Yangilik tafsilotiga o'tish
        window.location.href = item.href;
      }}
      onFilterChange={(filters) => {
        console.log('Filters changed:', filters);
        // API ga filter so'rovi yuborish
      }}
      onPageChange={(page) => {
        console.log('Page changed:', page);
        // API ga sahifa so'rovi yuborish
      }}
    />
  );
};

// 2. E'LONLAR SAHIFASI - SectionTemplate ishlatish
export const AnnouncementsPage: React.FC = () => {
  const announcements: SectionItem[] = [
    {
      id: '1',
      title: 'Qabul hujjatlari topshirish muddati uzaytirildi',
      description: 'Bakalavriat yo\'nalishlariga hujjat topshirish muddati 5 sentyabrgacha uzaytirildi. Barcha abituriyentlar diqqatiga!',
      date: '2024-08-30',
      category: 'Qabul e\'lonlari',
      priority: 'high',
      author: 'Qabul komissiyasi',
      tags: ['qabul', 'hujjatlar', 'muddat'],
      href: '/announcements/admission-deadline-extended'
    },
    {
      id: '2',
      title: 'Stipendiya konkursi e\'lon qilinadi',
      description: 'Yuqori natijalarga erishgan talabalar uchun maxsus stipendiya konkursi. Ariza berish muddati: 15 sentyabr.',
      date: '2024-08-28',
      category: 'Stipendiya e\'lonlari',
      priority: 'medium',
      author: 'Talabalar bo\'limi',
      tags: ['stipendiya', 'konkurs', 'talabalar'],
      href: '/announcements/scholarship-competition'
    }
  ];

  return (
    <SectionTemplate
      parentTitle="Axborot xizmati"
      sectionTitle="E'lonlar"
      sectionType="announcements"
      items={announcements}
      layoutType="list"
    />
  );
};

// 3. YANGILIK TAFSILOTI - DetailTemplate ishlatish
export const NewsDetailPage: React.FC = () => {
  const relatedNews = [
    {
      id: '2',
      title: 'Xalqaro konferensiya',
      description: 'Ilmiy konferensiya muvaffaqiyatli yakunlandi',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43',
      href: '/news/international-conference-2024',
      date: '2024-08-25'
    },
    {
      id: '3',
      title: 'Talabalar olimpiadasi',
      description: 'G\'oliblar e\'lon qilindi',
      href: '/news/student-olympiad-2024',
      date: '2024-08-20'
    }
  ];

  return (
    <DetailTemplate
      title="Yangi o'quv yili tantanali ravishda boshlandi"
      contentType="news"
      content={`
        <p>Namangan Davlat Texnika Universitetida 2024-2025 o'quv yili tantanali marosim bilan boshlandi. Marosimda universitetning barcha fakultetlaridan 1500 dan ortiq yangi talabalar ishtirok etdi.</p>
        
        <p>Marosimda universitet rektori Prof. Karimov Jasur Abdurahmonovich yangi talabalarni tabriklab, ularga muvaffaqiyat tiladi. "Siz universitetimizning kelajagi va umidisiz. Bilim olishda g'ayrat va shijoat ko'rsating", dedi rektor o'z nutqida.</p>
        
        <h3>Marosim dasturi</h3>
        <ul>
          <li>Davlat madhiyasi ijrosi</li>
          <li>Rektor nutqi</li>
          <li>Fakultet dekanlarining tabrik so'zlari</li>
          <li>Talabalar qasami qabul qilish</li>
          <li>Madaniy dastur</li>
        </ul>
        
        <p>Marosim davomida eng faol talabalar va o'qituvchilar taqdirlandi. Yangi o'quv yilida universitetda 15 ta yangi ta'lim dasturi ishga tushiriladi.</p>
      `}
      meta={{
        publishDate: '2024-09-01',
        author: 'Axborot xizmati',
        category: 'Ta\'lim yangiliklari',
        tags: ['o\'quv yili', 'talabalar', 'marosim', 'universitet'],
        priority: 'high',
        views: 1250,
        lastUpdated: '2024-09-01'
      }}
      heroImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
      heroImageAlt="Yangi o'quv yili marosimi"
      breadcrumbs={[
        { label: 'Bosh sahifa', href: '/' },
        { label: 'Universitet', href: '/university' },
        { label: 'Yangiliklar', href: '/news' },
        { label: 'Yangi o\'quv yili boshlandi' }
      ]}
      relatedItems={relatedNews}
      showRelated={true}
      showMeta={true}
      showSocialShare={true}
      showPrintButton={true}
      socialShare={{
        facebook: true,
        telegram: true,
        copy: true
      }}
      onShare={(platform) => {
        console.log(`Shared on ${platform}`);
      }}
      onRelatedClick={(item) => {
        window.location.href = item.href;
      }}
    />
  );
};

// 4. XIZMATLAR SAHIFASI - PageTemplate bilan maxsus sidebar
export const ServicesPage: React.FC = () => {
  return (
    <PageTemplate
      title="Onlayn Xizmatlar"
    > {/* PageTemplate no longer takes showSidebar or sidebarType */}
      <div className="space-y-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Onlayn Xizmatlar</h2>
          <p className="text-blue-700">
            Universitetimizning barcha xizmatlaridan onlayn foydalaning. 
            Vaqtingizni tejang va samarali xizmat oling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📜</div>
            <h3 className="text-lg font-bold mb-2">Diplom nusxasi</h3>
            <p className="text-gray-600 mb-4">Diplom nusxasini onlayn buyurtma qiling</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Buyurtma berish
            </button>
          </div>

          <div className="bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-bold mb-2">Ma'lumotnoma</h3>
            <p className="text-gray-600 mb-4">Turli ma'lumotnomalarni olish</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              So'rov yuborish
            </button>
          </div>

          <div className="bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-lg font-bold mb-2">To'lov qilish</h3>
            <p className="text-gray-600 mb-4">Onlayn to'lov amalga oshirish</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              To'lov qilish
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

// 5. QANDAY ISHLATISH - Qo'llanma
export const TemplateUsageGuide = `
## 📚 Template Tizimi Qo'llanmasi

### 1. SectionTemplate - Bo'lim sahifalari uchun
**Ishlatish:** Yangiliklar, e'lonlar, xizmatlar ro'yxati
**Xususiyatlari:**
- Grid/List/Card layout
- Search va filter
- Pagination
- Dinamik sidebar
- Responsive design

### 2. DetailTemplate - Tafsilot sahifalari uchun  
**Ishlatish:** Yangilik tafsiloti, e'lon tafsiloti
**Xususiyatlari:**
- Social sharing
- Print button
- Related items
- Meta ma'lumotlar
- Gallery support

### 3. PageTemplate (yangilangan) - Umumiy sahifalar
**Ishlatish:** Asosiy sahifalar, ma'lumot sahifalari
**Xususiyatlari:**
- Dinamik sidebar
- Hero section variants
- ContentBuilder support
- Flexible layout

### 4. SidebarManager - Dinamik sidebar
**Turlar:**
- 'news' - Yangiliklar uchun
- 'announcements' - E'lonlar uchun  
- 'services' - Xizmatlar uchun
- 'info' - Ma'lumot sahifalari uchun
- 'default' - UniversitySystems
- 'none' - Sidebar yo'q

### Qo'llash misoli:
\`\`\`tsx
// Yangiliklar sahifasi
<SectionTemplate
  sectionType="news"
  items={newsItems}
  layoutType="grid"
  showFilters={true}
/>

// Yangilik tafsiloti
<DetailTemplate
  contentType="news"
  title="Sarlavha"
  content="HTML content"
  showSocialShare={true}
/>

// Maxsus sahifa
<PageTemplate
  sidebarType="services"
  heroGradient="from-blue-500 to-purple-600"
>
  Content
</PageTemplate>
\`\`\`
`;

export default {
  NewsPage,
  AnnouncementsPage,
  NewsDetailPage,
  ServicesPage,
  TemplateUsageGuide
};
