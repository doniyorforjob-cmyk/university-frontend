import { PostDetail } from '../types/post';

// Eslatma: Bu fayl endi asosiy mantiqda ishlatilmaydi.
// U faqat kompilyatsiya xatoligini to'xtatish uchun tuzatildi.
export const mockNews: PostDetail[] = [
    {
        id: 1,
        slug: 'birinchi-kurslarga-bagishlov',
        title: "Birinchi kurslarga bag'ishlov tadbiri bo'lib o'tdi",
        image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
        description: "Namangan davlat universitetida 2023-2024 o'quv yili uchun qabul qilingan birinchi kurs talabalariga bag'ishlangan an'anaviy 'Birinchi kurslarga bag'ishlov' tadbiri bo'lib o'tdi.",
        content: `
            <p>Tadbirda universitet rektori, prorektorlar, fakultet dekanlari va professor-o'qituvchilar ishtirok etishdi.</p>
            <p>Rektor o'z nutqida talabalarni yangi o'quv yili bilan tabriklab, ularga kelgusi o'qishlarida muvaffaqiyatlar tiladi. Tadbir davomida turli xil musiqiy chiqishlar va sahna ko'rinishlari namoyish etildi.</p>
        `,
        published_at: "2023-09-15T10:00:00Z",
        views: 1250,
        author: { name: 'Matbuot xizmati' },
        category: 'news',
    },
    {
        id: 2,
        slug: 'xalqaro-konferensiya',
        title: "Xalqaro ilmiy-amaliy konferensiya o'tkazildi",
        image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
        description: 'Iqtisodiyot, boshqaruv va ta\'lim sohalaridagi zamonaviy tendensiyalarga bag\'ishlangan xalqaro konferensiya bo\'lib o\'tdi.',
        content: '<p>Konferensiyada 10 dan ortiq mamlakatlardan olimlar o\'z ma\'ruzalari bilan ishtirok etishdi.</p>',
        published_at: '2023-10-20T14:00:00Z',
        views: 850,
        author: { name: 'Ilmiy bo\'lim' },
        category: 'events',
    },
    {
        id: 3,
        slug: 'talabalar-olimpiadasi',
        title: "Universitetda talabalar olimpiadasi g'oliblariga sertifikatlar topshirildi",
        image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
        description: "Namangan davlat texnika universitetida bo'lib o'tgan talabalar olimpiadasi g'oliblariga sertifikat va diplomlar topshirildi.",
        content: `
            <p>Olimpiadada matematika, fizika, informatika va boshqa texnik fanlar bo'yicha 200 dan ortiq talaba ishtirok etdi.</p>
            <p>Birinchi o'rin sohiblari qimmatbaho sovg'alar va stipendiyalar bilan taqdirlandi. Tadbirda rektor o'z nutqida talabalarni rag'batlantirdi.</p>
        `,
        published_at: "2023-11-05T12:00:00Z",
        views: 920,
        author: { name: 'Talim bo\'limi' },
        category: 'news',
    },
    {
        id: 4,
        slug: 'yangi-laboratoriya',
        title: "Zamonaviy kompyuter laboratoriyasi ochildi",
        image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
        description: "Universitetda yangi avlod kompyuter texnikasi bilan jihozlangan zamonaviy laboratoriya ochildi.",
        content: `
            <p>Yangi laboratoriyada 50 ta zamonaviy kompyuter va professional dasturiy ta'minot o'rnatildi.</p>
            <p>Laboratoriya talabalarga amaliy mashg'ulotlar o'tish uchun mo'ljallangan. Ochilish marosimida rektor va mehmonlar ishtirok etishdi.</p>
        `,
        published_at: "2023-11-12T09:30:00Z",
        views: 1100,
        author: { name: 'IT bo\'limi' },
        category: 'news',
    },
    {
        id: 5,
        slug: 'sport-musobaqasi',
        title: "Universitet jamoasi sport musobaqalarida g'olib bo'ldi",
        image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop',
        description: "Namangan davlat texnika universiteti sport jamoasi viloyat miqyosidagi sport musobaqalarida birinchi o'rinni egalladi.",
        content: `
            <p>Musobaqada futbol, basketbol va voleybol bo'yicha jamoalar ishtirok etdi.</p>
            <p>Talabalar jamoasi barcha nominatsiyalarda yuqori natijalarni ko'rsatdi. G'oliblar kubok va medal bilan taqdirlandi.</p>
        `,
        published_at: "2023-11-18T16:00:00Z",
        views: 780,
        author: { name: 'Sport bo\'limi' },
        category: 'news',
    },
    {
        id: 6,
        slug: 'xalqaro-hamkorlik',
        title: "Turkiya universiteti bilan hamkorlik memorandumi imzolandi",
        image_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop',
        description: "Namangan davlat texnika universiteti va Turkiya davlat universiteti o'rtasida hamkorlik memorandumi imzolandi.",
        content: `
            <p>Memorandum talaba va o'qituvchi almashinuvi, qo'shma loyihalar va ilmiy tadqiqotlarni o'z ichiga oladi.</p>
            <p>Hamkorlik ikki mamlakat ta'lim tizimini rivojlantirishga xizmat qiladi. Imzolash marosimida ikkala tomon vakillari ishtirok etdi.</p>
        `,
        published_at: "2023-11-25T11:00:00Z",
        views: 650,
        author: { name: 'Xalqaro bo\'lim' },
        category: 'news',
    },
    {
        id: 7,
        slug: 'innovatsion-loyihalar',
        title: "Talabalar innovatsion loyihalar ko'rgazmasida ishtirok etdi",
        image_url: 'https://images.unsplash.com/photo-1551818255-e80b9c79e8b1?q=80&w=2070&auto=format&fit=crop',
        description: "Universitet talabalari tomonidan yaratilgan innovatsion loyihalar ko'rgazmasi bo'lib o'tdi.",
        content: `
            <p>Ko'rgazmada 30 dan ortiq loyiha namoyish etildi, jumladan smart texnologiyalar va ekologik loyihalar.</p>
            <p>Eng yaxshi loyihalar mualliflari grantlar va sertifikatlar bilan taqdirlandi. Tadbir innovatsion fikrlashni rag'batlantirishga qaratilgan.</p>
        `,
        published_at: "2023-12-02T14:30:00Z",
        views: 890,
        author: { name: 'Innovatsiya markazi' },
        category: 'events',
    },
    {
        id: 8,
        slug: 'yangi-kitoblar',
        title: "Universitet kutubxonasiga yangi kitoblar qo'shildi",
        image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2070&auto=format&fit=crop',
        description: "Universitet kutubxonasiga 2000 dan ortiq yangi kitob va elektron resurslar qo'shildi.",
        content: `
            <p>Yangi kitoblar texnik, gumanitar va ilmiy adabiyotlardan iborat.</p>
            <p>Kutubxona fondini boyitish talabalarning bilim olishiga yordam beradi. Yangi kitoblar taqdimot marosimi o'tkazildi.</p>
        `,
        published_at: "2023-12-08T10:00:00Z",
        views: 720,
        author: { name: 'Kutubxona' },
        category: 'news',
    },
    // Announcements
    {
        id: 9,
        slug: 'qishki-qabul-boshlandi',
        title: "Qishki qabul komissiyasi ish boshladi",
        image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
        description: "Universitetga qishki qabul uchun hujjatlar qabul qilinmoqda. Barcha yo'nalishlar bo'yicha qabul davom etadi.",
        content: `
            <p>Qishki qabul komissiyasi o'z ishini boshladi.</p>
            <p>Barcha fakultetlar bo'yicha qabul uchun hujjatlar qabul qilinmoqda. Qabul muddati 2024-yil 15-yanvargacha davom etadi.</p>
        `,
        published_at: "2023-12-15T09:00:00Z",
        views: 850,
        author: { name: 'Qabul komissiyasi' },
        category: 'announcements',
    },
    {
        id: 10,
        slug: 'stipendiya-dasturi',
        title: "Iqtidorli talabalar uchun yangi stipendiya dasturi e'lon qilindi",
        image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
        description: "Universitetda iqtidorli talabalar uchun yangi stipendiya dasturi joriy etildi.",
        content: `
            <p>Yangi stipendiya dasturi iqtidorli talabalarni rag'batlantirish uchun mo'ljallangan.</p>
            <p>Dasturda qatnashish uchun GPA 4.0 dan yuqori bo'lishi kerak. Har oyda 500 ming so'm stipendiya beriladi.</p>
        `,
        published_at: "2023-12-20T11:00:00Z",
        views: 650,
        author: { name: 'Talim bo\'limi' },
        category: 'announcements',
    },
    // Corruption
    {
        id: 11,
        slug: 'korrupsiyaga-qarshi-oylik',
        title: "Korrupsiyaga qarshi kurash oyligi boshlandi",
        image_url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1974&auto=format&fit=crop',
        description: "Universitetda korrupsiyaga qarshi kurashish va uning oldini olish bo'yicha tadbirlar o'tkazilmoqda.",
        content: `
            <p>Korrupsiyaga qarshi kurash oyligi doirasida seminarlar va treninglar o'tkaziladi.</p>
            <p>Talabalar va xodimlar uchun korrupsiya xavfi va uning oldini olish usullari haqida ma'lumot beriladi.</p>
        `,
        published_at: "2023-12-01T10:00:00Z",
        views: 420,
        author: { name: 'Ichki nazorat bo\'limi' },
        category: 'corruption',
    },
    {
        id: 12,
        slug: 'ishonch-telefoni',
        title: "Korrupsiya holatlarini xabar qilish uchun ishonch telefoni ishga tushirildi",
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        description: "Universitetda korrupsiya holatlarini xabar qilish uchun maxsus ishonch telefoni ishga tushirildi.",
        content: `
            <p>Ishonch telefoni 24/7 rejimida ishlaydi.</p>
            <p>Barcha xabarlar maxfiy saqlanadi va tezkor tarzda ko'rib chiqiladi. Korrupsiya holatlariga nisbatan murosasiz munosabatda bo'lamiz.</p>
        `,
        published_at: "2023-12-05T14:00:00Z",
        views: 380,
        author: { name: 'Ichki nazorat bo\'limi' },
        category: 'corruption',
    },
    // Events
    {
        id: 13,
        slug: 'navroz-bayrami',
        title: "Navro'z bayrami tadbirlari",
        image_url: 'https://images.unsplash.com/photo-1559756978-c73a6243ea90?q=80&w=1974&auto=format&fit=crop',
        description: "Universitetda Navro'z umumxalq bayrami keng nishonlandi. Madaniy tadbirlar va sport musobaqalari o'tkazildi.",
        content: `
            <p>Navro'z bayrami munosabati bilan keng ko'lamli tadbirlar tashkil etildi.</p>
            <p>Madaniy chiqishlar, sport musobaqalari va umumxalq sayillari bo'lib o'tdi. Barcha talabalar va xodimlar bayramni nishonlashdi.</p>
        `,
        published_at: "2024-03-21T12:00:00Z",
        views: 920,
        author: { name: 'Madaniyat bo\'limi' },
        category: 'events',
    },
    {
        id: 14,
        slug: 'talabalar-festivali',
        title: "Bahoriy talabalar festivali bo'lib o'tdi",
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop',
        description: "Universitetda bahoriy talabalar festivali bo'lib o'tdi. Musiqiy chiqishlar va raqs tomoshalari namoyish etildi.",
        content: `
            <p>Bahoriy talabalar festivali juda ko'p sonli tomoshabinlarni jalb qildi.</p>
            <p>Turli fakultetlardan talabalar o'z chiqishlari bilan ishtirok etishdi. Festival g'oliblari taqdirlandi.</p>
        `,
        published_at: "2024-04-10T16:00:00Z",
        views: 780,
        author: { name: 'Talabalar ittifoqi' },
        category: 'events',
    },
    // Sport
    {
        id: 15,
        slug: 'futbol-musobaqasi',
        title: "Universitetlararo futbol musobaqasi g'oliblariga kubok topshirildi",
        image_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop',
        description: "Sog'lom turmush tarzini targ'ib qilish maqsadida futbol bo'yicha musobaqalar o'tkazildi.",
        content: `
            <p>Universitetlararo futbol musobaqasi juda qiziqarli kechdi.</p>
            <p>Bizning jamoa g'olib bo'ldi va kubok bilan taqdirlandi. Musobaqa sportni rivojlantirishga xizmat qildi.</p>
        `,
        published_at: "2024-04-15T15:00:00Z",
        views: 650,
        author: { name: 'Sport bo\'limi' },
        category: 'sport',
    },
    {
        id: 16,
        slug: 'basketbol-turniri',
        title: "Talabalar basketbol turniri yakunlandi",
        image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop',
        description: "Universitetda talabalar basketbol turniri bo'lib o'tdi. 8 ta jamoa ishtirok etdi.",
        content: `
            <p>Basketbol turniri ikki hafta davom etdi.</p>
            <p>Final o'yini juda qiziqarli bo'ldi. G'olib jamoa medal va kubok bilan taqdirlandi.</p>
        `,
        published_at: "2024-05-01T18:00:00Z",
        views: 580,
        author: { name: 'Sport bo\'limi' },
        category: 'sport',
    },
];
