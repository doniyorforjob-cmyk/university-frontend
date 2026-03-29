import { fetchStats as mockFetchStats } from '../api/mock/stats.mock';
import { fetchStats as httpFetchStats } from '../api/http/stats.http';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchStats = useMock ? mockFetchStats : httpFetchStats;