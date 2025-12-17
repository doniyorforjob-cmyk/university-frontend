import { getInteractiveServices as mockGetInteractiveServices } from '../api/mock/interactiveServices.mock';
import { getInteractiveServices as httpGetInteractiveServices } from '../api/http/interactiveServices.http';
import { Service } from '../types/service.types';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const getInteractiveServices = useMock ? mockGetInteractiveServices : httpGetInteractiveServices;