import { fetchEcoActiveStudentsData as mockFetchEcoActiveStudentsData } from '../api/mock/ecoActiveStudents.mock';
import { fetchGreenUniversityList } from './yashilUniversitetService';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher
export const fetchEcoActiveStudentsData = useMock
    ? mockFetchEcoActiveStudentsData
    : (locale?: string) => fetchGreenUniversityList(locale, 'eco-active-students');

export const fetchEcoActiveStudentsDetail = async (slug: string, locale?: string): Promise<any | null> => {
    // Detail ham yashil universitet API'dan olinadi
    const { getGreenUniversityBySlug } = await import('./yashilUniversitetService');
    return getGreenUniversityBySlug(slug, locale);
};