import apiClient from '../client';
import { NavItem } from '../../types/navbar.types';
import { fetchNavItems as mockFetchNavItems } from '../mock/navbar.mock';

export type { NavItem };

export const fetchNavItems = async (): Promise<NavItem[]> => {
  try {
    console.log('Fetching navbar from API...');
    const response = await apiClient.get('/navbar');
    return response.data;
  } catch (error) {
    console.error('Error fetching navbar items, falling back to mock:', error);
    // Fallback to mock data so the site doesn't crash
    return mockFetchNavItems();
  }
};