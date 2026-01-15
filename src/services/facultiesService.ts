import { facultiesData as mockFacultiesData, departmentsData as mockDepartmentsData } from '../api/mock/faculties.mock';
import {
    getFaculties as httpGetFaculties,
    getFacultyById as httpGetFacultyById,
    getDepartments as httpGetDepartments,
    getDepartmentById as httpGetDepartmentById,
    getDepartmentsByFacultyId as httpGetDepartmentsByFacultyId
} from '../api/http/faculties.http';
import { Faculty, Department } from '../types/faculty.types';

const useMock = process.env.REACT_APP_USE_MOCK_API === 'true';

// Aqlli switcher
export const getFaculties = useMock
    ? async (): Promise<Faculty[]> => mockFacultiesData
    : httpGetFaculties;

export const getFacultyById = useMock
    ? async (id: string | number): Promise<Faculty | null> => mockFacultiesData.find(f => String(f.id) === String(id)) || null
    : httpGetFacultyById;

export const getDepartments = useMock
    ? async (): Promise<Department[]> => mockDepartmentsData
    : httpGetDepartments;

export const getDepartmentById = useMock
    ? async (id: string | number): Promise<Department | null> => mockDepartmentsData.find(d => String(d.id) === String(id)) || null
    : httpGetDepartmentById;

export const getDepartmentsByFacultyId = useMock
    ? async (facultyId: string | number): Promise<Department[]> => mockDepartmentsData.filter(d => String(d.facultyId) === String(facultyId))
    : httpGetDepartmentsByFacultyId;