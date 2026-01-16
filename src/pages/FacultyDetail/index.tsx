import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCachedApi } from '@/hooks/useCachedApi';
import { getFacultyById, getDepartmentsByFacultyId } from '@/services/facultiesService';
import { Faculty, Department } from '@/types/faculty.types';
import Container from '@/components/shared/Container';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import EmptyState from '@/components/shared/EmptyState';
import { DeanInfoCard } from './components/DeanInfoCard';
import { DepartmentGridCard } from '../Faculties/components/DepartmentGridCard';
import { SectionTabs, OptimizedImage, ContentBuilder, Accordion } from '@/components/shared';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import {
    BuildingLibraryIcon,
    UserGroupIcon,
    ListBulletIcon,
    GlobeAltIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline';

const FacultyDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { setBreadcrumbsData } = useGlobalLayout();
    const [activeTab, setActiveTab] = useState('history');

    const { data: faculty, loading: loadingFaculty } = useCachedApi<Faculty | null>({
        key: `faculty-detail-${id}`,
        fetcher: () => getFacultyById(id!),
        enabled: !!id,
        ttlMinutes: 5
    });

    useEffect(() => {
        if (faculty) {
            console.log('DEBUG: Faculty Data:', faculty);
        }
    }, [faculty]);

    const { data: departments, loading: loadingDepartments } = useCachedApi<Department[]>({
        key: `faculty-departments-${faculty?.id}`,
        fetcher: () => getDepartmentsByFacultyId(faculty?.id!),
        enabled: !!faculty?.id,
        ttlMinutes: 5
    });

    useEffect(() => {
        if (!loadingFaculty && !faculty) {
            navigate('/faculties');
        }
    }, [loadingFaculty, faculty, navigate]);

    useEffect(() => {
        if (faculty) {
            setBreadcrumbsData([
                { label: 'Asosiy', href: '/' },
                { label: 'Fakultetlar', href: '/faculties' },
                { label: faculty.name }
            ]);
        }
        return () => setBreadcrumbsData([]);
    }, [faculty, setBreadcrumbsData]);

    if (loadingFaculty) {
        return <GenericPageSkeleton />;
    }

    if (!faculty) {
        return null;
    }

    const tabs = [
        { id: 'history', label: 'Fakultet haqida', icon: BuildingLibraryIcon },
        { id: 'departments', label: 'Kafedralar', icon: UserGroupIcon },
        { id: 'directions', label: "Yo'nalish va mutaxassisliklari", icon: ListBulletIcon },
        { id: 'cooperation', label: 'Xalqaro hamkorlik', icon: GlobeAltIcon },
    ];

    return (
        <section className="bg-[#F8FAFC] min-h-screen pb-20">
            <Container className="pt-6">
                {/* Main Content Box */}
                <div className="bg-white border border-gray-200 shadow-md overflow-hidden">
                    {/* Header Section (Padded) */}
                    <div className="px-6 md:px-10 pt-4 md:pt-6 pb-6 text-left">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-[#003B5C] mb-8 leading-tight">
                            {faculty.name}
                        </h1>

                        {/* Featured Image - Standard Tailwind height classes (h-64 mobile, h-80 desktop) - slightly smaller as requested */}
                        {faculty.image && (
                            <div className="w-full mb-8 h-64 md:h-80">
                                <OptimizedImage
                                    src={faculty.image}
                                    alt={faculty.name}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                        )}

                        {/* Tabs Navigation - Closer to image, no border */}
                        <div className="pt-2">
                            <SectionTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                className="mb-0 border-b-0 full-width"
                            />
                        </div>
                    </div>


                    {/* Tab Content Section */}
                    <div className="px-6 md:px-10 pb-10 min-h-[400px]">
                        {activeTab === 'history' && (
                            <div className="space-y-12">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                    <h2 className="text-3xl font-bold text-[#003B5C]">Fakultet haqida</h2>
                                </div>

                                <div className="bg-white">
                                    {faculty.content || faculty.description ? (
                                        <ContentBuilder
                                            blocks={[
                                                {
                                                    id: 'faculty-history',
                                                    type: 'rich-text',
                                                    data: { content: faculty.content || faculty.description }
                                                }
                                            ]}
                                        />
                                    ) : (
                                        <EmptyState resourceKey="info" />
                                    )}
                                </div>

                                {/* Dean Info as a Full Width Section within History */}
                                <div className="pt-8 border-t border-gray-100">
                                    <DeanInfoCard
                                        name={faculty.deanName}
                                        position={faculty.deanPosition}
                                        phone={faculty.deanPhone}
                                        email={faculty.deanEmail}
                                        image={faculty.deanImage}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'departments' && (
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                    <h2 className="text-3xl font-bold text-[#003B5C]">Fakultet kafedralari</h2>
                                </div>

                                {!loadingDepartments && departments && departments.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {departments.map((dept) => (
                                            <DepartmentGridCard
                                                key={dept.id}
                                                id={dept.id}
                                                name={dept.name}
                                                phone={dept.phone}
                                                email={dept.email}
                                                headName={dept.headName}
                                                slug={dept.slug}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState
                                        resourceKey="departments"
                                        title="Kafedralar topilmadi"
                                        message="Ushbu fakultetga tegishli kafedralar hozircha mavjud emas."
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'directions' && (
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                    <h2 className="text-3xl font-bold text-[#003B5C]">Yo&apos;nalish va mutaxassisliklari</h2>
                                </div>
                                <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100 min-h-[300px]">
                                    {faculty.directionsAndSpecializations ? (
                                        <ContentBuilder
                                            blocks={[
                                                {
                                                    id: 'faculty-directions',
                                                    type: 'rich-text',
                                                    data: { content: faculty.directionsAndSpecializations }
                                                }
                                            ]}
                                        />
                                    ) : (
                                        <EmptyState resourceKey="info" />
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'cooperation' && (
                            <div className="space-y-12">
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                        <h2 className="text-3xl font-bold text-[#003B5C]">Xalqaro hamkorlik</h2>
                                    </div>
                                    <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100 min-h-[100px]">
                                        {faculty.internationalCooperation ? (
                                            <ContentBuilder
                                                blocks={[
                                                    {
                                                        id: 'faculty-cooperation',
                                                        type: 'rich-text',
                                                        data: { content: faculty.internationalCooperation }
                                                    }
                                                ]}
                                            />
                                        ) : (
                                            <p className="text-gray-500 italic">Fakultet miqyosidagi xalqaro hamkorlik ma&apos;lumotlari mavjud emas.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Departments Cooperation */}
                                {!loadingDepartments && departments && departments.some(d => d.internationalCooperation) && (
                                    <div className="space-y-8 pt-8 border-t border-gray-100">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-1 h-8 bg-black rounded-full opacity-50"></div>
                                            <h3 className="text-2xl font-bold text-black">Kafedralar kesimida xalqaro hamkorlik</h3>
                                        </div>

                                        <Accordion
                                            allowMultiple={true}
                                            items={departments
                                                .filter(d => d.internationalCooperation)
                                                .map((dept) => ({
                                                    id: dept.id,
                                                    title: dept.name,
                                                    content: (
                                                        <ContentBuilder
                                                            blocks={[
                                                                {
                                                                    id: `dept-cooperation-${dept.id}`,
                                                                    type: 'rich-text',
                                                                    data: { content: dept.internationalCooperation! }
                                                                }
                                                            ]}
                                                        />
                                                    )
                                                }))
                                            }
                                        />
                                    </div>
                                )}

                                {/* Global Empty State if absolutely nothing exists */}
                                {!faculty.internationalCooperation && (!departments || !departments.some(d => d.internationalCooperation)) && (
                                    <EmptyState resourceKey="info" />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FacultyDetailPage;
