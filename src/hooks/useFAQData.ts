import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { faqApi } from '../services/faqService';
import { FAQItem } from '../types/faq.types';

export const useFAQData = () => {
    const { i18n } = useTranslation();
    const locale = i18n.language;

    return useQuery<FAQItem[], Error>({
        queryKey: ['faqs', locale],
        queryFn: () => faqApi.getFAQs(locale),
    });
};
