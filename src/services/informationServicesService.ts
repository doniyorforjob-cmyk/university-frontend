import { fetchInformationServicesData as mockFetchInformationServicesData } from '../api/mock/informationServices.mock';
import { fetchInformationServicesData as httpFetchInformationServicesData } from '../api/http/informationServices.http';
import { ContentBlock } from '@/components/shared/ContentBuilder';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchInformationServicesData = useMock ? mockFetchInformationServicesData : httpFetchInformationServicesData;