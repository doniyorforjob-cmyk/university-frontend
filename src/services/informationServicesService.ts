import { fetchInformationServicesData as mockFetchInformationServicesData } from '../api/mock/informationServices.mock';
import { fetchInformationServicesData as httpFetchInformationServicesData, InformationServiceData } from '../api/http/informationServices.http';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

export type { InformationServiceData };

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchInformationServicesData = useMock ? mockFetchInformationServicesData : httpFetchInformationServicesData;