import { fetchFooterData as httpFetchFooterData } from '../api/http/footer.http';
import { FooterData } from '../types/footer.types';

export const fetchFooterData = httpFetchFooterData;
export type { FooterData };