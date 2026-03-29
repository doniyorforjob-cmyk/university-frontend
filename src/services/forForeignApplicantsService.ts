import { fetchForForeignApplicantsData, ForeignApplicantEntry } from '@/api/http/for-foreign-applicants.http';

export const getForForeignApplicants = async (locale?: string): Promise<ForeignApplicantEntry | null> => {
    return fetchForForeignApplicantsData(locale);
};

export type { ForeignApplicantEntry };
