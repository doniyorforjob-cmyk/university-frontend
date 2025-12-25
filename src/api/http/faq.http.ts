import apiClient from '../client';
import { FAQItem } from '../../types/faq.types';
import { faqApi as mockFaqApi } from '../mock/faq.mock';

export const faqApi = {
    getFAQs: async (): Promise<FAQItem[]> => {
        try {
            const projectId = process.env.REACT_APP_PROJECT_ID;
            const response = await apiClient.get(`/projects/${projectId}/content/faqs`);

            // Transform API response to FAQItem format
            const data = Array.isArray(response.data) ? response.data : response.data.data;
            return data.map((entry: any) => ({
                id: entry.uuid || entry.id,
                question: entry.fields?.question || entry.question,
                answer: entry.fields?.answer || entry.answer,
                category: entry.fields?.category || entry.category
            }));
        } catch (error) {
            console.error('Error fetching FAQs from API. Falling back to mock data.', error);
            return mockFaqApi.getFAQs();
        }
    }
};
