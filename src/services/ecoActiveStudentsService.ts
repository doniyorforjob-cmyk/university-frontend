import { fetchEcoActiveStudentsData as mockFetchEcoActiveStudentsData } from '../api/mock/ecoActiveStudents.mock';
import { fetchEcoActiveStudentsData as httpFetchEcoActiveStudentsData } from '../api/http/ecoActiveStudents.http';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchEcoActiveStudentsData = useMock ? mockFetchEcoActiveStudentsData : httpFetchEcoActiveStudentsData;