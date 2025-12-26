import { HomeFacultiesData, HomeHeroData, HomeStatsData, HomeNewsData, HomeMediaData, HomeInteractiveServicesData, HomeUniversitySystemsData } from '../types/home.types';
import { homeApi as httpHomeApi } from '../api/http/home.http';

export const homeApi = httpHomeApi;
export type { HomeFacultiesData, HomeHeroData, HomeStatsData, HomeNewsData, HomeMediaData, HomeInteractiveServicesData, HomeUniversitySystemsData };