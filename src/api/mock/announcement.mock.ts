import apiClient from '../client';
import { Announcement, AnnouncementDetail } from '../../types/announcement.types';

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    slug: 'qabul-2024',
    title: '2024-2025 o\'quv yili uchun qabul komissiyasi o\'z ishini boshladi',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
    excerpt: 'Namangan davlat texnika universitetiga hujjatlar qabuli boshlandi. Barcha abituriyentlarni kutib qolamiz!',
    published_at: '2025-11-24T09:00:00Z',
    views: 4500,
  },
  {
    id: 2,
    slug: 'kutubxona-ish-vaqti',
    title: 'Kutubxona ish vaqtidagi o\'zgarishlar',
    image_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Imtihonlar davrida talabalarga qulaylik yaratish maqsadida kutubxona ish vaqti uzaytirildi.',
    published_at: '2025-11-23T18:00:00Z',
    views: 1800,
  },
  {
    id: 3,
    slug: 'sport-musobaqalari',
    title: 'Universitetlararo sport musobaqalari',
    image_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop',
    excerpt: 'Futbol va basketbol bo\'yicha universitetlararo musobaqalarga tayyorgarlik boshlandi. Qatnashish uchun sport klubiga murojaat qiling.',
    published_at: '2025-11-22T11:00:00Z',
    views: 2500,
  },
  {
    id: 4,
    slug: 'yozgi-maktab',
    title: 'Xalqaro yozgi maktabga qabul',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Germaniyaning yetakchi universitetlarida tashkil etiladigan yozgi maktabga arizalar qabuli boshlandi.',
    published_at: '2025-11-21T14:30:00Z',
    views: 3200,
  },
  {
    id: 5,
    slug: 'ilmiy-konferensiya',
    title: 'Yosh olimlar uchun ilmiy-amaliy konferensiya',
    image_url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Konferensiya 20-noyabr kuni universitetning asosiy binosida bo\'lib o\'tadi. Maqolalar 15-noyabrgacha qabul qilinadi.',
    published_at: '2025-11-20T09:00:00Z',
    views: 1200,
  },
  {
    id: 6,
    slug: 'bitiruv-kechasi',
    title: 'Bitiruvchilar uchun tantanali kecha',
    image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop',
    excerpt: '2025-yil bitiruvchilariga bag\'ishlangan tantanali bitiruv kechasi 28-noyabr kuni bo\'lib o\'tadi.',
    published_at: '2025-11-19T17:00:00Z',
    views: 5500,
  },
  {
    id: 7,
    slug: 'texnopark-sayohat',
    title: 'Texnoparkga sayohat uyushtiriladi',
    image_url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop',
    excerpt: 'Dasturlash va muhandislik yo\'nalishi talabalari uchun Toshkentdagi texnoparkga sayohat rejalashtirilmoqda.',
    published_at: '2025-11-18T10:00:00Z',
    views: 980,
  },
  {
    id: 8,
    slug: 'zakovat-turniri',
    title: '“Zakovat” intellektual o\'yini final bosqichi',
    image_url: 'https://images.unsplash.com/photo-1541848093281-83a1b3d58546?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Fakultetlararo “Zakovat” turnirining final bosqichi 1-noyabr kuni bo\'lib o\'tadi. Barcha jamoalarga omad tilaymiz!',
    published_at: '2025-11-17T13:00:00Z',
    views: 2100,
  },
];

const mockAnnouncementDetail: AnnouncementDetail = {
  id: 1,
  slug: 'qabul-2024',
  title: '2024-2025 o\'quv yili uchun qabul komissiyasi o\'z ishini boshladi',
  image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
  excerpt: 'Namangan davlat texnika universitetiga hujjatlar qabuli boshlandi. Barcha abituriyentlarni kutib qolamiz!',
  published_at: '2025-11-24T09:00:00Z',
  content: '<p>Batafsil ma\'lumotlar va hujjatlar ro\'yxati universitetning rasmiy veb-saytida e\'lon qilingan.</p>',
  author: { name: 'Qabul komissiyasi' },
  views: 4500,
  category: { id: 5, name: 'E\'lonlar' }
};

export const getAnnouncements = async (): Promise<Announcement[]> => {
  try {
    // Vaqtinchalik soxta ma'lumotlarni qaytarish
    return new Promise(resolve => setTimeout(() => resolve(mockAnnouncements), 500));
  } catch (error) {
    console.error("E'lonlarni yuklashda xatolik:", error);
    throw error;
  }
};

export const getAnnouncementBySlug = async (slug: string, locale?: string): Promise<AnnouncementDetail> => {
  try {
    // Vaqtinchalik soxta ma'lumotlarni qaytarish
    const announcement = mockAnnouncements.find(a => a.slug === slug);
    const detail = { ...mockAnnouncementDetail, ...announcement };
    return new Promise(resolve => setTimeout(() => resolve(detail), 500));
  } catch (error) {
    console.error(`'${slug}' e'lonini yuklashda xatolik:`, error);
    throw error;
  }
};
