import { MediaArticle } from '../types/media';

const mockMediaArticles: MediaArticle[] = [
    {
        id: 1,
        title: "Namangan davlat texnika universitetida xalqaro anjuman",
        source: "Kun.uz",
        url: "https://kun.uz/news/2023/10/12/namangan-davlat-texnika-universitetida-xalqaro-anjuman",
        published_at: "2023-10-12T10:00:00Z",
    },
    {
        id: 2,
        title: "Namangan Davlat Texnika Universiteti talabalari respublika tanlovida g'olib bo'lishdi",
        source: "Daryo.uz",
        url: "https://daryo.uz/2023/11/05/namdtu-talabalari-respublika-tanlovida-golib-bolishdi",
        published_at: "2023-11-05T14:30:00Z",
    },
    {
        id: 3,
        title: "Yangi texnopark: Namangan Davlat Texnika Universitetida innovatsiyalarga keng yo'l",
        source: "O'zbekiston 24",
        url: "https://www.uzbekistan24.uz/uz/news/view/yangi-texnopark-namdtuda-innovatsiyalarga-keng-yol",
        published_at: "2023-09-20T18:00:00Z",
    },
];

export const getMediaArticles = (): Promise<MediaArticle[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockMediaArticles);
        }, 500);
    });
};