import {
    fetchStudents as httpFetchStudents,
    getStudentBySlug as httpGetStudentBySlug
} from '../api/http/students.http';

export const fetchStudents = httpFetchStudents;
export const getStudentBySlug = httpGetStudentBySlug;
