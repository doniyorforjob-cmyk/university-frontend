import { getYDAData, getYDABySlug } from '../api/http/yda.http';

export const getYDAEntries = (locale?: string) => getYDAData(locale);
export const getYDAEntryBySlug = (slug: string, locale?: string) => getYDABySlug(slug, locale);
