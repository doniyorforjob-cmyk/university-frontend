import apiClient from '../client';
import { FooterData } from '../../types/footer.types';

export const fetchFooterData = async (): Promise<FooterData> => {
  try {
    const response = await apiClient.get('/footer');
    return response.data;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    // Agar API da xatolik bo'lsa, uni yuqoriga uzatamiz, komponent o'zi handle qiladi
    throw error;
  }
};