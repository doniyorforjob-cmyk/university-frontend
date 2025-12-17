import apiClient from '../client';
import { Department } from '../../types/department.types';

export const getDepartments = async (): Promise<Department[]> => {
  try {
    const response = await apiClient.get('/departments');
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};