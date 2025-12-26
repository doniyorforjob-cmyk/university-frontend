import { faqApi as httpFaqApi } from '../api/http/faq.http';
import { FAQItem } from '../types/faq.types';

export const faqApi = httpFaqApi;
export type { FAQItem };
