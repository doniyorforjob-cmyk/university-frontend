import apiClient from './client';
import { NewsArticle, NewsArticleDetail } from '../types/news';

// --- Soxta ma'lumotlar (Backend tayyor bo'lguncha ishlatish uchun) ---
const mockNews: NewsArticle[] = [
    {
        id: 1,
        slug: 'birinchi-maqola',
        title: 'NamDTUda yangi o\'quv yili boshlandi',
        image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
        excerpt: 'Namangan davlat texnika universitetida yangi o\'quv yili tantanali ravishda boshlandi. Talabalar va o\'qituvchilar ishtirokida yig\'ilish bo\'lib o\'tdi.',
        published_at: '2023-09-05T10:00:00Z',
        views: 1250,
    },
    {
        id: 2,
        slug: 'texnopark-ochilishi',
        title: 'Universitetda zamonaviy texnopark ishga tushirildi',
        image_url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop',
        excerpt: 'Talabalarning innovatsion g\'oyalarini qo\'llab-quvvatlash maqsadida universitetda yangi texnopark ochildi.',
        published_at: '2023-09-15T14:30:00Z',
        views: 2100,
    },
    {
        id: 3,
        slug: 'sport-musobaqalari',
        title: 'Talabalar o\'rtasida sport musobaqalari',
        image_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop',
        excerpt: 'Sog\'lom turmush tarzini targ\'ib qilish maqsadida futbol va voleybol bo\'yicha musobaqalar o\'tkazildi.',
        published_at: '2023-10-02T09:00:00Z',
        views: 890,
    },
    {
        id: 4,
        slug: 'xalqaro-konferensiya',
        title: 'Xalqaro ilmiy-amaliy konferensiya bo\'lib o\'tdi',
        image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
        excerpt: 'Dunyoning yetakchi olimlari ishtirokida "Raqamli transformatsiya" mavzusida konferensiya bo\'lib o\'tdi.',
        published_at: '2023-10-11T11:00:00Z',
        views: 1520,
    },
    {
        id: 5,
        slug: 'yangi-laboratoriya',
        title: 'Kimyo fakultetida yangi laboratoriya ochildi',
        image_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1974&auto=format&fit=crop',
        excerpt: 'Zamonaviy uskunalar bilan jihozlangan yangi laboratoriya talabalarga amaliyot o\'tash imkonini beradi.',
        published_at: '2023-10-20T16:00:00Z',
        views: 980,
    },
    {
        id: 6,
        slug: 'bitiruv-marosimi',
        title: 'Bitiruvchilarga diplomlar topshirildi',
        image_url: 'https://images.unsplash.com/photo-1577065223695-47453ab457f2?q=80&w=2070&auto=format&fit=crop',
        excerpt: '2023-yil bitiruvchilariga diplom topshirish marosimi bo\'lib o\'tdi.',
        published_at: '2023-06-25T10:00:00Z',
        views: 3200,
    },
    {
        id: 7,
        slug: 'qabul-jarayonlari',
        title: '2024-2025 o\'quv yili uchun qabul jarayonlari boshlandi',
        image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
        excerpt: 'Abituriyentlar uchun hujjatlarni onlayn topshirish imkoniyati yaratildi.',
        published_at: '2024-06-15T09:00:00Z',
        views: 4500,
    },
    {
        id: 8,
        slug: 'madaniy-tadbirlar',
        title: 'Navro\'z bayrami munosabati bilan madaniy tadbirlar',
        image_url: 'https://images.unsplash.com/photo-1559756978-c73a6243ea90?q=80&w=1974&auto=format&fit=crop',
        excerpt: 'Universitetda Navro\'z umumxalq bayrami keng nishonlandi.',
        published_at: '2024-03-21T12:00:00Z',
        views: 1100,
    },
];

const mockNewsDetail: NewsArticleDetail = {
    id: 1,
    slug: 'yangi-oqish-yili-tantanalari',
    title: 'Yangi o\'quv yili tantanalari!',
    image_url: 'https://via.placeholder.com/800x450.png/007bff/ffffff?text=Universitet',
    excerpt: 'Universitetimizda yangi o\'quv yili boshlanishi munosabati bilan tantanali tadbir bo\'lib o\'tdi. Tadbirda...',
    published_at: '2023-09-02T10:00:00Z',
    content: '<p>To\'liq matn shu yerda bo\'ladi. Bu matn <strong>HTML</strong> teglari bilan formatlangan bo\'lishi mumkin.</p><p>Batafsil ma\'lumotlar va voqealar rivoji haqida o\'qing.</p>',
    author: { name: 'Matbuot xizmati' },
    views: 1250,
    category: { id: 1, name: 'Universitet hayoti' }
};
// --- Soxta ma'lumotlar tugadi ---


// Barcha yangiliklar ro'yxatini olish
export const getNews = async (): Promise<NewsArticle[]> => {
  try {
    // // Haqiqiy API chaqiruvi (Backend tayyor bo'lganda ishlatiladi)
    // const response = await apiClient.get('/news');
    // return response.data;

    // Vaqtinchalik soxta ma'lumotlarni qaytarish
    return new Promise(resolve => setTimeout(() => resolve(mockNews), 500));
  } catch (error) {
    console.error("Yangiliklarni yuklashda xatolik:", error);
    throw error;
  }
};

// Bitta yangilikni 'slug' orqali olish
export const getNewsBySlug = async (slug: string): Promise<NewsArticleDetail> => {
  try {
    // // Haqiqiy API chaqiruvi (Backend tayyor bo'lganda ishlatiladi)
    // const response = await apiClient.get(`/news/${slug}`);
    // return response.data;

    // Vaqtinchalik soxta ma'lumotlarni qaytarish
    return new Promise(resolve => setTimeout(() => resolve(mockNewsDetail), 500));
  } catch (error) {
    console.error(`'${slug}' yangiligini yuklashda xatolik:`, error);
    throw error;
  }
};