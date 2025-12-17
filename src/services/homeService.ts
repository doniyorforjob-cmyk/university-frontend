import { homeApi as mockHomeApi } from '../api/mock/home.mock';
import { HomeFacultiesData, HomeHeroData, HomeStatsData, HomeNewsData, HomeMediaData, HomeInteractiveServicesData, HomeUniversitySystemsData } from '../types/home.types';
import { homeApi as httpHomeApi } from '../api/http/home.http';

export const isUsingMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const homeApi = isUsingMock ? mockHomeApi : httpHomeApi;
export type { HomeFacultiesData, HomeHeroData, HomeStatsData, HomeNewsData, HomeMediaData, HomeInteractiveServicesData, HomeUniversitySystemsData };