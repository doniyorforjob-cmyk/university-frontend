import apiClient from '../client';
import { Post, PostDetail, PostCategory } from '../../types/post.types';
import { mockNews } from '../../data/news';

// --- Soxta ma'lumotlar (Backend tayyor bo'lguncha ishlatish uchun) ---
export const mockPosts: Post[] = [
    // News
    {
        id: 1,
        slug: 'namdtuda-yangi-oquv-yili-boshlandi',
        title: 'Namangan Davlat Texnika Universitetida yangi o\'quv yili boshlandi',
        image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
        description: 'Namangan davlat texnika universitetida yangi o\'quv yili tantanali ravishda boshlandi. Talabalar va o\'qituvchilar ishtirokida yig\'ilish bo\'lib o\'tdi.',
        published_at: '2023-09-05T10:00:00Z',
        views: 1250,
        category: 'news',
    },
    {
        id: 2,
        slug: 'universitetda-zamonaviy-texnopark-ishga-tushirildi',
        title: 'Universitetda zamonaviy texnopark ishga tushirildi',
        image_url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop',
        description: 'Talabalarning innovatsion g\'oyalarini qo\'llab-quvvatlash maqsadida universitetda yangi texnopark ochildi.',
        published_at: '2023-09-15T14:30:00Z',
        views: 2100,
        category: 'news',
    },
    {
        id: 3,
        slug: 'qishki-qabul-komissiyasi-ishini-boshladi',
        title: 'Qishki qabul komissiyasi o\'z ishini boshladi',
        image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
        description: 'Barcha yo\'nalishlar bo\'yicha qishki qabul uchun hujjatlar qabul qilinmoqda.',
        published_at: '2023-12-15T09:00:00Z',
        views: 789,
        category: 'announcements',
    },
    {
        id: 4,
        slug: 'korrupsiyaga-qarshi-kurash-oyligi',
        title: 'Korrupsiyaga qarshi kurash oyligi',
        image_url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1974&auto=format&fit=crop',
        description: 'Universitetda korrupsiyaga qarshi kurashish va uning oldini olish bo\'yicha tadbirlar o\'tkazilmoqda.',
        published_at: '2023-12-01T11:00:00Z',
        views: 321,
        category: 'corruption',
    },
    {
        id: 5,
        slug: 'navroz-bayrami-tadbirlari',
        title: 'Navro\'z bayrami tadbirlari',
        image_url: 'https://images.unsplash.com/photo-1559756978-c73a6243ea90?q=80&w=1974&auto=format&fit=crop',
        description: 'Universitetda Navro\'z umumxalq bayrami keng nishonlandi.',
        published_at: '2024-03-21T12:00:00Z',
        views: 987,
        category: 'events',
    },
    {
        id: 6,
        slug: 'universitetlararo-futbol-musobaqasi',
        title: 'Universitetlararo futbol musobaqasi',
        image_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop',
        description: 'Sog\'lom turmush tarzini targ\'ib qilish maqsadida futbol bo\'yicha musobaqalar o\'tkazildi.',
        published_at: '2024-04-15T09:00:00Z',
        views: 567,
        category: 'sport',
    },
    {
        id: 7,
        slug: 'yangi-laboratoriya-ochildi',
        title: 'Kimyo fakultetida yangi laboratoriya ochildi',
        image_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1974&auto=format&fit=crop',
        description: 'Talabalarning amaliy bilimlarini oshirish uchun zamonaviy kimyoviy laboratoriya ishga tushirildi.',
        published_at: '2024-05-02T15:00:00Z',
        views: 820,
        category: 'news',
    },
    {
        id: 8,
        slug: 'onlayn-talim-platformasi',
        title: 'Universitet o\'zining onlayn ta\'lim platformasini ishga tushirdi',
        image_url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
        description: 'Endi talabalar masofadan turib ham darslarda qatnashishlari va o\'quv materiallaridan foydalanishlari mumkin.',
        published_at: '2024-05-10T11:30:00Z',
        views: 1500,
        category: 'announcements',
    },
    {
        id: 9,
        slug: 'kutubxona-fondi-boyitildi',
        title: 'Universitet kutubxonasi yangi adabiyotlar bilan boyitildi',
        image_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop',
        description: 'Kutubxona fondiga 1000 dan ortiq yangi o\'quv va ilmiy adabiyotlar keltirildi.',
        published_at: '2024-05-18T09:00:00Z',
        views: 450,
        category: 'events',
    },
    {
        id: 10,
        slug: 'xalqaro-konferensiya',
        title: '“Raqamli iqtisodiyot: zamonaviy tendensiyalar va rivojlanish istiqbollari” mavzusida xalqaro ilmiy-amaliy konferensiya',
        image_url: 'https://images.unsplash.com/photo-1522202176988-6627374055f?q=80&w=2071&auto=format&fit=crop',
        description: 'Universitetimizda xalqaro miqyosdagi ilmiy-amaliy konferensiya bo\'lib o\'tdi. Unda mahalliy va xorijiy olimlar o\'z ma\'ruzalari bilan ishtirok etishdi.',
        published_at: '2024-05-25T10:00:00Z',
        views: 1800,
        category: 'news',
    },
    {
        id: 11,
        slug: 'bitiruvchilar-forumi',
        title: 'Bitiruvchilar forumi va Karyera kuni',
        image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
        description: 'Universitet bitiruvchilari va ish beruvchi tashkilotlar o\'rtasida muloqotni yo\'lga qo\'yish maqsadida "Bitiruvchilar forumi" tashkil etildi.',
        published_at: '2024-06-01T09:30:00Z',
        views: 950,
        category: 'events',
    },
    {
        id: 12,
        slug: 'yozgi-maktab',
        title: 'Talabalar uchun yozgi maktab dasturi',
        image_url: 'https://images.unsplash.com/photo-1503676260728-1c64c1a5f881?q=80&w=2070&auto=format&fit=crop',
        description: 'Yozgi ta\'til davomida talabalarning bilim va ko\'nikmalarini oshirish uchun maxsus yozgi maktab dasturi e\'lon qilindi.',
        published_at: '2024-06-10T14:00:00Z',
        views: 670,
        category: 'announcements',
    },
];

export const mockNewsDetail: PostDetail = {
     id: 1,
    slug: 'yangi-oquv-yili-tantanalari',
    title: 'Yangi o\'quv yili tantanalari!',
    image_url: 'https://via.placeholder.com/800x450.png/007bff/ffffff?text=Universitet',
    description: 'Universitetimizda yangi o\'quv yili boshlanishi munosabati bilan tantanali tadbir bo\'lib o\'tdi. Tadbirda universitet rektori, professor-o\'qituvchilar va talabalar ishtirok etishdi.',
    published_at: '2023-09-01T10:00:00Z',
    content: '<p>To\'liq matn shu yerda bo\'ladi. Bu matn <strong>HTML</strong> teglari bilan formatlangan bo\'lishi mumkin.</p><p>Batafsil ma\'lumotlar va voqealar rivoji haqida o\'qing.</p>',
    author: { name: 'Matbuot xizmati' },
    views: 1250,
    category: 'news',
};
// --- Soxta ma'lumotlar tugadi ---


// Postlarni olish (kategoriya bo'yicha filtr bilan)
export const getPosts = async (category?: PostCategory): Promise<Post[]> => {
  try {
    // // Haqiqiy API chaqiruvi (Backend tayyor bo'lganda ishlatiladi)
    // const response = await apiClient.get('/posts', { params: { category } });
    // return response.data;

    // Vaqtinchalik soxta ma'lumotlarni qaytarish
    return new Promise(resolve => {
      setTimeout(() => {
        if (category) {
          const filteredPosts = mockNews.filter(p => p.category === category);
          resolve(filteredPosts.map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            image_url: p.image_url,
            description: p.description,
            published_at: p.published_at,
            views: p.views,
            category: p.category,
          })));
        } else {
          resolve(mockNews.map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            image_url: p.image_url,
            description: p.description,
            published_at: p.published_at,
            views: p.views,
            category: p.category,
          })));
        }
      }, 500);
    });
  } catch (error) {
    console.error("Postlarni yuklashda xatolik:", error);
    throw error;
  }
};

// Bitta postni 'slug' orqali olish
export const getPostBySlug = (slug: string): Promise<PostDetail | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const post = mockPosts.find((p) => p.slug === slug);
            if (post) {
                resolve({
                    ...post,
                    content: mockNewsDetail.content,
                    author: mockNewsDetail.author,
                });
            } else {
                resolve(undefined);
            }
        }, 500);
    });
};
