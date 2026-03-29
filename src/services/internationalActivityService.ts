import { fetchInternationalActivities, InternationalActivityEntry } from '../api/http/internationalActivity.http';

export const getInternationalActivities = async (locale?: string): Promise<InternationalActivityEntry[]> => {
    return fetchInternationalActivities(locale);
};
