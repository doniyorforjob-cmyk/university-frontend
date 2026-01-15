import apiClient from '../client';
import { Announcement, AnnouncementDetail } from '../../types/announcement.types';

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    slug: 'qabul-2024',
    title: 'Bugungi e\'lon (Bugun)',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
    excerpt: 'Bugungi sana: 15-Yanvar, 2026. Bu e\'lon "Bugun" filtri bosilganda ko\'rinishi kerak.',
    published_at: '2026-01-15T09:00:00Z',
    views: 4500,
  },
  {
    id: 2,
    slug: 'kutubxona-ish-vaqti',
    title: 'Kecha qo\'shilgan e\'lon (Shu hafta)',
    image_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Bu e\'lon 14-yanvarda qo\'yilgan. "Bugun"da chiqmasligi, "Hafta"da chiqishi kerak.',
    published_at: '2026-01-14T18:00:00Z',
    views: 1800,
  },
  {
    id: 3,
    slug: 'sport-musobaqalari',
    title: 'O\'tgan haftadagi e\'lon (Shu oy)',
    image_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop',
    excerpt: 'Bu e\'lon 8-yanvarda qo\'yilgan. Faqat "Oy" va "Barchasi"da ko\'rinishi kerak.',
    published_at: '2026-01-08T11:00:00Z',
    views: 2500,
  },
  {
    id: 4,
    slug: 'yozgi-maktab',
    title: 'Dushanba kungi e\'lon (Shu hafta)',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
    excerpt: '12-yanvar dushanba. Haftaning boshlanishi.',
    published_at: '2026-01-12T14:30:00Z',
    views: 3200,
  },
  {
    id: 9,
    slug: 'yanvar-boshi',
    title: 'Yanvar oyi boshi (Shu oy)',
    image_url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    excerpt: '1-yanvar kuni qo\'yilgan e\'lon.',
    published_at: '2026-01-01T09:00:00Z',
    views: 1200,
  },
  {
    id: 10,
    slug: 'dekabr-oxiri',
    title: 'Dekabr oxiridagi e\'lon',
    image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop',
    excerpt: '2025-yil dekabr. Faqat "Barchasi"da ko\'rinishi kerak.',
    published_at: '2025-12-25T17:00:00Z',
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
