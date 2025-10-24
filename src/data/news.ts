import { NewsArticleDetail } from '../types/news'; // <-- O'zgartirildi: News -> NewsArticleDetail

// Eslatma: Bu fayl endi asosiy mantiqda ishlatilmaydi.
// U faqat kompilyatsiya xatoligini to'xtatish uchun tuzatildi.
export const mockNews: NewsArticleDetail[] = [
    {
        id: 1,
        slug: 'birinchi-kurslarga-bagishlov',
        title: "Birinchi kurslarga bag'ishlov tadbiri bo'lib o'tdi",
        image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
        excerpt: "Namangan davlat universitetida 2023-2024 o'quv yili uchun qabul qilingan birinchi kurs talabalariga bag'ishlangan an'anaviy 'Birinchi kurslarga bag'ishlov' tadbiri bo'lib o'tdi.",
        content: `
            <p>Tadbirda universitet rektori, prorektorlar, fakultet dekanlari va professor-o'qituvchilar ishtirok etishdi.</p>
            <p>Rektor o'z nutqida talabalarni yangi o'quv yili bilan tabriklab, ularga kelgusi o'qishlarida muvaffaqiyatlar tiladi. Tadbir davomida turli xil musiqiy chiqishlar va sahna ko'rinishlari namoyish etildi.</p>
        `,
        published_at: "2023-09-15T10:00:00Z",
        views: 1250,
        author: { name: 'Matbuot xizmati' },
        category: { id: 1, name: "Universitet hayoti" },
    },
    {
        id: 2,
        slug: 'xalqaro-konferensiya',
        title: "Xalqaro ilmiy-amaliy konferensiya o'tkazildi",
        image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
        excerpt: "Universitetimizda 'Raqamli transformatsiya sharoitida ta'limni modernizatsiya qilish' mavzusida xalqaro ilmiy-amaliy konferensiya bo'lib o'tdi.",
        content: `
            <p>Konferensiyada AQSh, Germaniya, Janubiy Koreya kabi davlatlardan yetakchi olimlar o'z ma'ruzalari bilan ishtirok etishdi. Ishtirokchilar ta'lim sohasidagi so'nggi tendensiyalar va innovatsiyalar bilan tanishishdi.</p>
        `,
        published_at: "2023-10-22T14:30:00Z",
        views: 890,
        author: { name: 'Ilmiy bo\'lim' },
        category: { id: 2, name: "Ilm-fan" },
    },
];