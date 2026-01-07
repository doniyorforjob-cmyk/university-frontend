import { HomeFacultiesData, HomeHeroData, HomeStatsData, HomeNewsData, HomeMediaData, HomeInteractiveServicesData, HomeUniversitySystemsData } from '../types/home.types';
import { homeApi as httpHomeApi } from '../api/http/home.http';
import { homeApiMock } from '../api/mock/home.mock';

// TODO: Revert this to env check after verification
const useMock = false; // Using Real API as requested

export const homeApi = useMock ? homeApiMock : httpHomeApi;
export type { HomeFacultiesData, HomeHeroData, HomeStatsData, HomeNewsData, HomeMediaData, HomeInteractiveServicesData, HomeUniversitySystemsData };