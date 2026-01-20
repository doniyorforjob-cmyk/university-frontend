import { fetchAdmissionData as mockFetchAdmissionData } from '../api/mock/admission.mock';
import { fetchAdmissionData as httpFetchAdmissionData } from '../api/http/admission.http';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchAdmissionData = useMock ? mockFetchAdmissionData : httpFetchAdmissionData;