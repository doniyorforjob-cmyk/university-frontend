import { fetchActivitiesData as mockFetchActivitiesData } from '../api/mock/activities.mock';
import { fetchActivitiesData as httpFetchActivitiesData } from '../api/http/activities.http';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchActivitiesData = useMock ? mockFetchActivitiesData : httpFetchActivitiesData;