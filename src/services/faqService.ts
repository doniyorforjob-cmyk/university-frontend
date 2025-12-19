import { faqApi as mockFaqApi } from '../api/mock/faq.mock';
import { faqApi as httpFaqApi } from '../api/http/faq.http';
import { FAQItem } from '../types/faq.types';

const isUsingMock = process.env.REACT_APP_USE_MOCK_API === 'true';

export const faqApi = isUsingMock ? mockFaqApi : httpFaqApi;
export type { FAQItem };
