import { useQuery } from '@tanstack/react-query';
import { faqApi } from '../services/faqService';
import { FAQItem } from '../types/faq.types';

export const useFAQData = () => {
    return useQuery<FAQItem[], Error>({
        queryKey: ['faqs'],
        queryFn: faqApi.getFAQs,
    });
};
