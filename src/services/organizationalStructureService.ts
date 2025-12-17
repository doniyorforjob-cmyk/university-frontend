import { fetchOrganizationalStructureData as mockFetchOrganizationalStructureData } from '../api/mock/organizationalStructure.mock';
import { fetchOrganizationalStructureData as httpFetchOrganizationalStructureData } from '../api/http/organizationalStructure.http';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchOrganizationalStructureData = useMock ? mockFetchOrganizationalStructureData : httpFetchOrganizationalStructureData;