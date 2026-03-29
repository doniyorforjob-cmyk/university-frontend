import { cacheManager } from '../utils/cacheManager';
import { fetchNavItems } from './navbarService';
import { homeApi } from './homeService';
import { getPosts } from './postService';
import { settingsApi } from './settingsService';
import { fetchFooterData } from './footerService';
import { transformStatsData } from '../pages/Home/transformers/universityStatsTransformer';
import { transformInteractiveServicesData } from '../pages/Home/transformers/interactiveServicesTransformer';
import { transformUniversitySystemsData } from '../pages/Home/transformers/universitySystemsTransformer';
import { transformVideoGalleryData } from '../pages/Home/transformers/videoGalleryTransformer';
import { transformFacultiesData } from '../pages/Home/transformers/facultiesTransformer';
import { transformNewsData } from '../pages/Home/transformers/newsTransformer';
import { transformHeroData } from '../pages/Home/transformers/heroTransformer';

const STALE_THRESHOLD = 2 * 1000; // 2 seconds (Aggressive for manual refresh)

/**
 * Prefetch Service
 * Markazlashgan ma'lumotlarni barcha tillarda (uz, ru, en) oldindan yuklash xizmati.
 * Bu tildan-tilga o'tganda ma'lumotlarning darhol (kutishlarsiz) chiqishini ta'minlaydi.
 */
export const prefetchService = {
    /**
     * Navigation Menu (Barcha tillar uchun)
     */
    prefetchNavbar: async () => {
        const locales = ['uz', 'ru', 'en'];
        for (const locale of locales) {
            const key = `navbar-items_${locale}`;
            const item = cacheManager.getItem(key);
            const isStale = !item || !item.timestamp || (Date.now() - item.timestamp > STALE_THRESHOLD);

            if (isStale) {
                try {
                    const navItems = await fetchNavItems(locale);
                    cacheManager.set(key, navItems, 5); // 5 mins
                } catch (e) {
                    console.warn(`Navbar prefetch failed for ${locale}`, e);
                }
            }
        }
    },

    /**
     * Hero Section (Barcha tillar uchun)
     */
    prefetchHero: async () => {
        const locales = ['uz', 'ru', 'en'];
        for (const locale of locales) {
            const key = `home-section-hero-http-${locale}_v6`;
            const item = cacheManager.getItem(key);
            const isStale = !item || !item.timestamp || (Date.now() - item.timestamp > STALE_THRESHOLD);

            if (isStale) {
                try {
                    const rawData = await homeApi.getHeroData(locale);
                    const transformed = transformHeroData(rawData);
                    cacheManager.set(key, transformed, 15);
                } catch (e) {
                    console.warn(`Hero prefetch failed for ${locale}`, e);
                }
            }
        }
    },

    /**
     * Home News (Barcha tillar uchun)
     */
    prefetchHomeNews: async () => {
        const locales = ['uz', 'ru', 'en'];
        for (const locale of locales) {
            const key = `home-section-news-http-${locale}_v6`;
            const item = cacheManager.getItem(key);
            const isStale = !item || !item.timestamp || (Date.now() - item.timestamp > STALE_THRESHOLD);

            if (isStale) {
                try {
                    const rawData = await homeApi.getNewsData(locale);
                    const transformed = transformNewsData(rawData);
                    cacheManager.set(key, transformed, 15);
                } catch (e) {
                    console.warn(`Home news prefetch failed for ${locale}`, e);
                }
            }
        }
    },

    /**
     * Faculties (Barcha tillar uchun)
     */
    prefetchFaculties: async () => {
        const locales = ['uz', 'ru', 'en'];
        for (const locale of locales) {
            const key = `home-section-faculties-http-${locale}_v6`;
            const item = cacheManager.getItem(key);
            const isStale = !item || !item.timestamp || (Date.now() - item.timestamp > STALE_THRESHOLD);

            if (isStale) {
                try {
                    const rawData = await homeApi.getFacultiesData(locale);
                    const transformed = transformFacultiesData(rawData);
                    cacheManager.set(key, transformed, 15);
                } catch (e) {
                    console.warn(`Faculties prefetch failed for ${locale}`, e);
                }
            }
        }
    },

    /**
     * News Page Data (Barcha tillar uchun)
     */
    prefetchNewsPage: async () => {
        const locales = ['uz', 'ru', 'en'];
        for (const locale of locales) {
            const key = `news-data-${locale}`;
            const item = cacheManager.getItem(key);
            const isStale = !item || !item.timestamp || (Date.now() - item.timestamp > STALE_THRESHOLD);

            if (isStale) {
                try {
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
                    cacheManager.set(key, mappedData, 15);
                } catch (e) {
                    console.warn(`News page data prefetch failed for ${locale}`, e);
                }
            }
        }
    },

    /**
     * Global sozlamalar (Barcha tillar uchun)
     */
    prefetchSettings: async () => {
        const locales = ['uz', 'ru', 'en'];
        for (const locale of locales) {
            const key = `global-settings-${locale}`;
            const item = cacheManager.getItem(key);
            const isStale = !item || !item.timestamp || (Date.now() - item.timestamp > STALE_THRESHOLD);

            if (!item || isStale) {
                try {
                    const settingsData = await settingsApi.getSettings(locale);
                    cacheManager.set(key, settingsData, 30);
                } catch (e) {
                    console.warn(`Settings prefetch failed for ${locale}`, e);
                }
            }
        }
    },

    /**
     * Home Section: Stats (Barcha tillar uchun)
     */
    prefetchStats: async () => {
        const locales = ['uz', 'ru', 'en'];
        for (const locale of locales) {
            const key = `home-section-stats-http-${locale}_v6`;
            const item = cacheManager.getItem(key);
            const isStale = !item || !item.timestamp || (Date.now() - item.timestamp > STALE_THRESHOLD);

            if (isStale) {
                try {
                    const rawData = await homeApi.getStatsData(locale);
                    const transformed = transformStatsData(rawData);
                    cacheManager.set(key, transformed, 15);
                } catch (e) {
                    console.warn(`Stats prefetch failed for ${locale}`, e);
                }
            }
        }
    },

    /**
     * Home Section: Media Gallery (Barcha tillar uchun)
     */
    prefetchMedia: async () => {
        const locales = ['uz', 'ru', 'en'];
        for (const locale of locales) {
            const key = `home-section-video-gallery-http-${locale}_v6`;
            const item = cacheManager.getItem(key);
            const isStale = item && (Date.now() - item.timestamp > STALE_THRESHOLD);

            if (!item || isStale) {
                try {
                    const rawData = await homeApi.getMediaData(locale);
                    const transformed = transformVideoGalleryData(rawData);
                    cacheManager.set(key, transformed, 15);
                } catch (e) {
                    console.warn(`Media prefetch failed for ${locale}`, e);
                }
            }
        }
    },

    /**
     * Home Section: Interactive Services (Barcha tillar uchun)
     */
    prefetchInteractiveServices: async () => {
        const locales = ['uz', 'ru', 'en'];
        for (const locale of locales) {
            const key = `home-section-interactive-services-http-${locale}_v6`;
            const item = cacheManager.getItem(key);
            const isStale = item && (Date.now() - item.timestamp > STALE_THRESHOLD);

            if (!item || isStale) {
                try {
                    const rawData = await homeApi.getInteractiveServicesData(locale);
                    const transformed = transformInteractiveServicesData(rawData);
                    cacheManager.set(key, transformed, 15);
                } catch (e) {
                    console.warn(`Interactive Services prefetch failed for ${locale}`, e);
                }
            }
        }
    },

    /**
     * Home Section: University Systems (Barcha tillar uchun)
     */
    prefetchUniversitySystems: async () => {
        const locales = ['uz', 'ru', 'en'];
        for (const locale of locales) {
            const key = `home-section-university-systems-http-${locale}_v6`;
            const item = cacheManager.getItem(key);
            const isStale = item && (Date.now() - item.timestamp > STALE_THRESHOLD);

            if (!item || isStale) {
                try {
                    const rawData = await homeApi.getUniversitySystemsData(locale);
                    const transformed = transformUniversitySystemsData(rawData);
                    cacheManager.set(key, transformed, 15);
                } catch (e) {
                    console.warn(`University Systems prefetch failed for ${locale}`, e);
                }
            }
        }
    },

    /**
     * Footer Data (Barcha tillar uchun)
     */
    prefetchFooter: async () => {
        const locales = ['uz', 'ru', 'en'];
        for (const locale of locales) {
            const key = `footer-data-http-${locale}`;
            const item = cacheManager.getItem(key);
            const isStale = item && (Date.now() - item.timestamp > STALE_THRESHOLD);

            if (!item || isStale) {
                try {
                    const data = await fetchFooterData(locale);
                    cacheManager.set(key, data, 30);
                } catch (e) {
                    console.warn(`Footer prefetch failed for ${locale}`, e);
                }
            }
        }
    }
};
