import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCachedApi } from '@/hooks/useCachedApi';
import { getFacultyById, getDepartmentsByFacultyId } from '@/api/http/faculties.http';
import { Faculty, Department } from '@/types/faculty.types';
import Container from '@/components/shared/Container';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import EmptyState from '@/components/shared/EmptyState';
import { DeanInfoCard } from './components/DeanInfoCard';
import { DepartmentGridCard } from '../Faculties/components/DepartmentGridCard';

const FacultyDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: faculty, loading: loadingFaculty } = useCachedApi<Faculty | null>({
        key: `faculty-detail-${id}`,
        fetcher: () => getFacultyById(id!),
        enabled: !!id,
        ttlMinutes: 5
    });

    const { data: departments, loading: loadingDepartments } = useCachedApi<Department[]>({
        key: `faculty-departments-${id}`,
        fetcher: () => getDepartmentsByFacultyId(id!),
        enabled: !!id,
        ttlMinutes: 5
    });

    useEffect(() => {
        if (!loadingFaculty && !faculty) {
            navigate('/faculties');
        }
    }, [loadingFaculty, faculty, navigate]);

    if (loadingFaculty) {
        return <GenericPageSkeleton />;
    }

    if (!faculty) {
        return null;
    }

    return (
        <section className="py-10 bg-white min-h-screen">
            <Container>
                {/* 1. Dean Info Card */}
                <div className="mb-8">
                    <DeanInfoCard
                        name={faculty.deanName}
                        position={faculty.deanPosition}
                        phone={faculty.deanPhone}
                        email={faculty.deanEmail}
                        image={faculty.deanImage}
                    />
                </div>

                {/* 2. Faculty Information */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#003B5C] mb-4">
                        {faculty.name}
                    </h1>
                    {faculty.description && (
                        <div className="prose prose-lg max-w-none text-gray-700">
                            <p>{faculty.description}</p>
                        </div>
                    )}
                </div>

                {/* 3. Related Departments */}
                {!loadingDepartments && departments && departments.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#003B5C]">
                                Kafedralar
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {departments.map((dept) => (
                                <DepartmentGridCard
                                    key={dept.id}
                                    name={dept.name}
                                    phone={dept.phone}
                                    email={dept.email}
                                    headName={dept.headName}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {!loadingDepartments && (!departments || departments.length === 0) && (
                    <EmptyState
                        resourceKey="departments"
                        title="Kafedralar topilmadi"
                        message="Ushbu fakultetga tegishli kafedralar hozircha mavjud emas."
                    />
                )}
            </Container>
        </section>
    );
};

export default FacultyDetailPage;
