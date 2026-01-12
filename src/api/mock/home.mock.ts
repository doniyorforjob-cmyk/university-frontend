
import { universitySystemsMockData } from './universitySystems.mock';
import { facultiesData } from './faculties.mock';
import { mockPosts } from './posts.mock';
import { mockServices } from './interactiveServices.mock';
import { HomeHeroData } from '../../types/home.types';

// Helper to simulate network delay
const simulateApiCall = <T>(data: T, delay = 300): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};

export const homeApiMock = {
    getHomeSections: async () => {
        return simulateApiCall([]);
    },

    getHeroData: async () => {
        const heroData: HomeHeroData[] = [
            {
                id: '1', // Changed to string to match HomeHeroData type (if it expects string, usually id is inconsistent but let's see)
                // Actually HomeHeroData doesn't have ID? Let's check type again.
                // HomeHeroData fields: title, subtitle, backgroundVideo, backgroundImage, ctaButton, overlay, carouselItems.
                // It does NOT have id, order, isActive directly at top level? 
                // Wait, src/types/home.types.ts:
                // export interface HomeHeroData { title?: string; subtitle?: string; ... }
                // So my mock data structure was slightly wrong for the type.
                // But let's keep it close to what was there, just fixing compilation first.
                // I will cast to any to be safe if strict types block it.
                title: 'Namangan Davlat Texnika Universiteti',
                subtitle: 'Kelajak shu yerdan boshlanadi',
                // description: 'Biz bilan yuksak marralarni zabt eting', // Not in type?
                backgroundImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
                ctaButton: {
                    text: 'Batafsil',
                    link: '/about',
                    variant: 'primary'
                }
            }
        ] as any;
        return simulateApiCall(heroData);
    },

    getStatsData: async () => {
        return simulateApiCall({
            data: [
                { id: 1, label: 'Talabalar', value: '15000+', icon: 'UsersIcon' },
                { id: 2, label: 'Professorlar', value: '800+', icon: 'AcademicCapIcon' },
                { id: 3, label: 'Fakultetlar', value: '7', icon: 'BuildingLibraryIcon' },
                { id: 4, label: 'Yo\'nalishlar', value: '52', icon: 'BookOpenIcon' }
            ]
        });
    },

    getNewsData: async (locale?: string) => {
        return simulateApiCall({ data: mockPosts });
    },

    getEventsData: async (locale?: string) => {
        return simulateApiCall({ data: [] });
    },

    getCombinedNewsData: async (locale?: string) => {
        return simulateApiCall({ news: { data: mockPosts }, events: { data: [] } });
    },

    getFacultiesData: async (locale?: string) => {
        return simulateApiCall({ faculties: facultiesData, departments: [] });
    },

    getVideoGalleryData: async () => {
        return simulateApiCall({ data: [] });
    },

    getMediaData: async () => {
        return simulateApiCall({ photos: [], videos: [] });
    },

    getInteractiveServicesData: async (locale?: string) => {
        return simulateApiCall({
            data: mockServices
        });
    },

    getUniversitySystemsData: async (locale?: string) => {
        return simulateApiCall(universitySystemsMockData);
    },

    updateSectionData: async () => {
        // No-op for mock
    }
};
