import { cacheManager } from '../utils/cacheManager';
import { fetchNavItems } from './navbarService';
import { homeApi } from './homeService';
import { getPosts } from './postService';

/**
 * Prefetch Service
 * Markazlashgan ma'lumotlarni oldindan yuklash xizmati
 */
export const prefetchService = {
    /**
     * Navigatsiya menyusini prefetch qilish
     */
    prefetchNavbar: async () => {
        const key = 'navbar-items-global';
        if (!cacheManager.has(key)) {
            try {
                const navItems = await fetchNavItems();
                cacheManager.set(key, navItems, 60); // 60 minutes
            } catch (e) {
                console.warn('Navbar prefetch failed', e);
            }
        }
    },

    /**
     * Bosh sahifa yangiliklarini prefetch qilish
     */
    prefetchHomeNews: async () => {
        const key = `home-section-news-http`;
        if (!cacheManager.has(key)) {
            try {
                const newsData = await homeApi.getNewsData();
                cacheManager.set(key, newsData, 0.5);
            } catch (e) {
                console.warn('Home news prefetch failed', e);
            }
        }
    },

    /**
     * Fakultetlar ro'yxatini prefetch qilish
     */
    prefetchFaculties: async () => {
        const key = `home-section-faculties-http`;
        if (!cacheManager.has(key)) {
            try {
                const facultiesData = await homeApi.getFacultiesData();
                cacheManager.set(key, facultiesData, 0.5);
            } catch (e) {
                console.warn('Faculties prefetch failed', e);
            }
        }
    },

    /**
     * Yangiliklar sahifasi ma'lumotlarini prefetch qilish
     */
    prefetchNewsPage: async () => {
        const key = `news-data`;
        if (!cacheManager.has(key)) {
            try {
                const rawData = await getPosts('news');

                // Transform to SectionItem format to match NewsPage expectation
                const mappedData = rawData.map((post: any) => ({
                    id: post.id.toString(),
                    title: post.title,
                    description: post.description || '',
                    date: post.published_at,
                    image: post.image_url,
                    href: `/news/${post.slug}`,
                    category: 'Yangilik'
                }));

                cacheManager.set(key, mappedData, 0.5);
            } catch (e) {
                console.warn('News page data prefetch failed', e);
            }
        }
    }
};
