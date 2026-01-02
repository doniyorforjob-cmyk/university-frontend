import { MediaArticle } from '../../types/media.types';

const mockMediaArticles: MediaArticle[] = [
    {
        id: 1,
        slug: "namangan-davlat-texnika-universitetida-xalqaro-anjuman",
        title: "Namangan davlat texnika universitetida xalqaro anjuman",
        source: "Kun.uz",
        url: "https://kun.uz/news/2023/10/12/namangan-davlat-texnika-universitetida-xalqaro-anjuman",
        published_at: "2023-10-12T10:00:00Z",
        excerpt: "Universitetda 'Zamonaviy texnika va texnologiyalarning istiqbollari' mavzusida xalqaro ilmiy-amaliy konferensiya bo'lib o'tdi. Unda 10 dan ortiq davlat olimlari ishtirok etishdi.",
        image: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=1200&auto=format&fit=crop&q=80",
        type: 'online'
    },
    {
        id: 2,
        slug: "namdtu-talabalari-respublika-tanlovida-golib-bolishdi",
        title: "Namangan Davlat Texnika Universiteti talabalari respublika tanlovida g'olib bo'lishdi",
        source: "Daryo.uz",
        url: "https://daryo.uz/2023/11/05/namdtu-talabalari-respublika-tanlovida-golib-bolishdi",
        published_at: "2023-11-05T14:30:00Z",
        excerpt: "Talabalarimiz 'Yil intellektual salohiyatli yoshi' tanlovida munosib ishtirok etib, faxrli birinchi o'rinni egallashdi va qimmatbaho sovg'alar bilan taqdirlanishdi.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80",
        type: 'online'
    },
    {
        id: 3,
        slug: "yangi-texnopark-namdtuda-innovatsiyalarga-keng-yol",
        title: "Yangi texnopark: Namangan Davlat Texnika Universitetida innovatsiyalarga keng yo'l",
        source: "O'zbekiston 24",
        url: "https://www.uzbekistan24.uz/uz/news/view/yangi-texnopark-namdtuda-innovatsiyalarga-keng-yol",
        published_at: "2023-09-20T18:00:00Z",
        excerpt: "Teleradiokanal reportajida universitetimizda yangi tashkil etilgan innovatsion texnopark faoliyati va undagi ixtirochilarning yutuqlari keng yoritib berildi.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
        type: 'tv'
    },
    {
        id: 4,
        slug: "ilm-fan-va-ishlab-chiqarish-integratsiyasi-misolida",
        title: "Ilm-fan va ishlab chiqarish integratsiyasi misolida",
        source: "Yangi O'zbekiston",
        url: "#",
        published_at: "2023-08-15T09:00:00Z",
        excerpt: "Gazetaning bugungi sonida NamDTU olimlarining sanoat korxonalari bilan hamkorligi va erishilayotgan natijalar haqida batafsil maqola chop etildi.",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&auto=format&fit=crop&q=80",
        type: 'print'
    }
];

export const getMediaArticles = (): Promise<MediaArticle[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockMediaArticles);
        }, 500);
    });
};