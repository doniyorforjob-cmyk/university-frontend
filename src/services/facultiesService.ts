import { facultiesData as mockFacultiesData } from '../api/mock/faculties.mock';
import { facultiesData as httpFacultiesData } from '../api/http/faculties.http';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const facultiesData = useMock ? mockFacultiesData : httpFacultiesData;