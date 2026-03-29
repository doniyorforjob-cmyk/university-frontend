import { fetchInternationalStudentsData, InternationalStudentEntry } from '../api/http/international-students.http';

export const getInternationalStudents = async (locale?: string): Promise<InternationalStudentEntry | null> => {
    return fetchInternationalStudentsData(locale);
};

export type { InternationalStudentEntry };
