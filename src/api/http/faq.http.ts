import apiClient from '../client';
import { FAQItem } from '../../types/faq.types';


export const faqApi = {
    getFAQs: async (locale: string = 'uz'): Promise<FAQItem[]> => {
        try {
            const projectId = process.env.REACT_APP_PROJECT_ID;
            const response = await apiClient.get(`/projects/${projectId}/content/faqs`, {
                params: { locale }
            });

            // Transform API response to FAQItem format
            const data = Array.isArray(response.data) ? response.data : response.data.data || [];

            // Extra safety: filter by locale if the backend returns all items
            return data
                .filter((entry: any) => !entry.locale || entry.locale === locale)
                .map((entry: any) => {
                    const categoryField = entry.fields?.category || entry.category || 'general';
                    const category = Array.isArray(categoryField) ? categoryField[0] : categoryField;

                    return {
                        id: entry.uuid || entry.id,
                        question: entry.fields?.question || entry.question,
                        answer: entry.fields?.answers || entry.fields?.answer || entry.answer,
                        category: category || 'general'
                    };
                });
        } catch (error) {
            console.error('Error fetching FAQs from API:', error);
            throw error;
        }
    }
};
