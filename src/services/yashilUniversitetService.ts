import { fetchYashilUniversitetData as mockFetchYashilUniversitetData } from '../api/mock/yashilUniversitet.mock';
import { fetchYashilUniversitetData as httpFetchYashilUniversitetData, YashilUniversitetEntry } from '../api/http/yashilUniversitet.http';
export type { YashilUniversitetEntry };

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchYashilUniversitetData = useMock ? mockFetchYashilUniversitetData : httpFetchYashilUniversitetData;