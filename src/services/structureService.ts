import { fetchStructureData as mockFetchStructureData } from '../api/mock/structure.mock';
import { fetchStructureData as httpFetchStructureData } from '../api/http/structure.http';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchStructureData = useMock ? mockFetchStructureData : httpFetchStructureData;