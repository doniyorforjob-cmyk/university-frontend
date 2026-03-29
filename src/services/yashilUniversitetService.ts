import { fetchYashilUniversitetData as mockFetchYashilUniversitetData } from '../api/mock/yashilUniversitet.mock';
import {
    fetchGreenUniversityList as httpFetchGreenUniversityList,
    getGreenUniversityBySlug as httpGetGreenUniversityBySlug,
    GreenUniversityEntry
} from '../api/http/yashilUniversitet.http';

export type { GreenUniversityEntry };

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher
export const fetchGreenUniversityList = useMock ? (locale?: string, categorySlug?: string) => Promise.resolve([]) : httpFetchGreenUniversityList;
export const getGreenUniversityBySlug = useMock ? (slug: string, locale?: string) => Promise.resolve(null) : httpGetGreenUniversityBySlug;

// Legacy support
export const fetchYashilUniversitetData = useMock ? mockFetchYashilUniversitetData : async (locale?: string) => {
    const list = await httpFetchGreenUniversityList(locale, 'green-university');
    return list.length > 0 ? list[0] : null;
};