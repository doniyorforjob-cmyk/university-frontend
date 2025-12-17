import { getDepartments as mockGetDepartments } from '../api/mock/department.mock';
import { getDepartments as httpGetDepartments } from '../api/http/department.http';
import { Department } from '../types/department.types';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const getDepartments = useMock ? mockGetDepartments : httpGetDepartments;