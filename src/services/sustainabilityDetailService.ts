import { getSustainabilityDetailBySlug, SustainabilityDetailEntry } from '../api/http/sustainabilityDetail.http';

export const fetchSustainabilityDetail = async (slug: string, locale?: string): Promise<SustainabilityDetailEntry | null> => {
    return getSustainabilityDetailBySlug(slug, locale);
};
