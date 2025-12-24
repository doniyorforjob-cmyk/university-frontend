import { facultiesData as mockFacultiesData } from '../api/mock/faculties.mock';
import { getFaculties as httpGetFaculties } from '../api/http/faculties.http';
import { Faculty } from '../types/faculty.types';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher
export const getFaculties = useMock
    ? async (): Promise<Faculty[]> => mockFacultiesData
    : httpGetFaculties;