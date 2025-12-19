import apiClient from '../client';
import { FAQItem } from '../../types/faq.types';
import { faqApi as mockFaqApi } from '../mock/faq.mock';

export const faqApi = {
    getFAQs: async (): Promise<FAQItem[]> => {
        try {
            const response = await apiClient.get('/faqs');
            return response.data;
        } catch (error) {
            console.error('Error fetching FAQs from API. Falling back to mock data.', error);
            return mockFaqApi.getFAQs();
        }
    }
};
