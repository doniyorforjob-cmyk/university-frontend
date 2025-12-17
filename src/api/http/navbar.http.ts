import apiClient from '../client';
import { NavItem } from '../../types/navbar.types';

export type { NavItem };

export const fetchNavItems = async (): Promise<NavItem[]> => {
  try {
    console.log('Fetching navbar from API...');
    const response = await apiClient.get('/navbar');
    console.log('Navbar API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching navbar items:', error);
    throw error;
  }
};