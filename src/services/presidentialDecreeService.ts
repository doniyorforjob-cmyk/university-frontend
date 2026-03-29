import { fetchPresidentialDecreeData } from '@/api/http/presidential-decree.http';

export const getPresidentialDecree = (locale?: string) => fetchPresidentialDecreeData(locale);
