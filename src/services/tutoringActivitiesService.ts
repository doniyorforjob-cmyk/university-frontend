import { fetchTutoringActivities, getTutoringActivityBySlug } from '../api/http/tutoringActivities.http';

export const tutoringActivitiesService = {
    getAll: (locale?: string) => fetchTutoringActivities(locale),
    getBySlug: (slug: string, locale?: string) => getTutoringActivityBySlug(slug, locale),
    getFirst: async (locale?: string) => {
        const all = await fetchTutoringActivities(locale);
        return all.length > 0 ? all[0] : null;
    }
};

export { getTutoringActivityBySlug };
