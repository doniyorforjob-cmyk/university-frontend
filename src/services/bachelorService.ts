import { fetchBachelors, fetchBachelorBySlug, BachelorEntry } from '@/api/http/bachelor.http';

/**
 * Service to get all bachelor entries
 */
export const getBachelors = async (locale?: string): Promise<BachelorEntry[]> => {
    return fetchBachelors(locale);
};

/**
 * Service to get a single bachelor entry by slug
 */
export const getBachelorBySlug = async (slug: string, locale?: string): Promise<BachelorEntry | null> => {
    return fetchBachelorBySlug(slug, locale);
};

export type { BachelorEntry };
