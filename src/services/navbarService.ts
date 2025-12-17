import { fetchNavItems as mockFetchNavItems, socialLinks, quickLinks } from '../api/mock/navbar.mock';
import { fetchNavItems as httpFetchNavItems, NavItem } from '../api/http/navbar.http';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher: env'ga qarab mock yoki http API'ni tanlash
export const fetchNavItems = useMock ? mockFetchNavItems : httpFetchNavItems;
export { socialLinks, quickLinks };
export type { NavItem };