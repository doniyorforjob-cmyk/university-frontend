import { CACHE_CONFIG } from '../config/constants';
import { cacheManager } from '../utils/cacheManager';
import { fetchNavItems } from './navbarService';
import { homeApi } from './homeService';
import { getPosts } from './postService';
import { settingsApi } from './settingsService';

/**
 * Prefetch Service
 * Markazlashgan ma'lumotlarni oldindan yuklash xizmati
 */
export const prefetchService = {
    /**
     * Navigation Menu
     */
    prefetchNavbar: async () => {
        const locale = localStorage.getItem('locale') || 'uz';
        const key = `navbar-items_${locale}`; // Match useCachedApi: key_locale
        if (!cacheManager.has(key)) {
            try {
                const navItems = await fetchNavItems();
                // 30 Seconds (= 0.5 mins) as requested
                cacheManager.set(key, navItems, 0.5);
            } catch (e) {
                console.warn('Navbar prefetch failed', e);
            }
        }
    },

    /**
     * Home News (Featured)
     */
    prefetchHomeNews: async () => {
        if (!cacheManager.has('home-news')) {
            try {
                const { news } = await homeApi.getNewsData();
                const mappedNews = news.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    date: item.published_at,
                    image: item.image_url,
                    href: `/news/${item.slug}`,
                    category: 'Yangilik'
                }));
                cacheManager.set('home-news', mappedNews, 0.5);
            } catch (e) {
                console.warn('Home news prefetch failed', e);
            }
        }
    },

    /**
     * Faculties
     */
    prefetchFaculties: async () => {
        if (!cacheManager.has('faculties-all')) {
            try {
                const { faculties } = await homeApi.getFacultiesData();
                cacheManager.set('faculties-all', faculties, 0.5);
            } catch (e) {
                console.warn('Faculties prefetch failed', e);
            }
        }
    },

    /**
     * News Page Data (Optimization for clicking "News" link)
     */
    prefetchNewsPage: async () => {
        const locale = localStorage.getItem('locale') || 'uz';
        const key = `news-data-${locale}`;
        if (!cacheManager.has(key)) {
            try {
                // ... logic same as ...
                // Note: imported from postService but we need simple logic here or duplicate?
                // Actually prefetchService calls getPosts.
                const data = await getPosts('news', locale);
                const mappedData = data.map((post: any) => ({
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
    },

    /**
     * Global sozlamalarni prefetch qilish
     */
    prefetchSettings: async () => {
        const locale = localStorage.getItem('locale') || 'uz';
        const key = `global-settings-${locale}`;
        if (!cacheManager.has(key)) {
            try {
                // We assume settingsApi gets locale from localStorage via headers/interceptors
                const settingsData = await settingsApi.getSettings(locale);
                // 30 Seconds (= 0.5 mins) as requested
                cacheManager.set(key, settingsData, 0.5);
            } catch (e) {
                console.warn('Settings prefetch failed', e);
            }
        }
    }
};
