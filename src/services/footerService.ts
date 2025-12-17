import { fetchFooterData as mockFetchFooterData } from '../api/mock/footer.mock';
import { fetchFooterData as httpFetchFooterData } from '../api/http/footer.http';
import { FooterData } from '../types/footer.types';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchFooterData = useMock ? mockFetchFooterData : httpFetchFooterData;