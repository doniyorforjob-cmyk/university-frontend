import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCachedApi } from '@/hooks/useCachedApi';
import { getDepartmentById } from '@/services/facultiesService';
import { Department } from '@/types/faculty.types';
import Container from '@/components/shared/Container';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import EmptyState from '@/components/shared/EmptyState';
import { SectionTabs, OptimizedImage, ContentBuilder } from '@/components/shared';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import {
    BuildingLibraryIcon,
    UserGroupIcon,
    AcademicCapIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

const DepartmentDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { setBreadcrumbsData } = useGlobalLayout();
    const [activeTab, setActiveTab] = React.useState('about');

    const { data: department, loading: loadingDepartment, error } = useCachedApi<Department | null>({
        key: `department-detail-${id}`,
        fetcher: () => getDepartmentById(id!),
        enabled: !!id,
        ttlMinutes: 5
    });

    useEffect(() => {
        if (department) {
            console.log('DEBUG: Department Data (Mapped):', department);
        }
    }, [department]);

    useEffect(() => {
        console.log('Department Detail Debug:', { id, loadingDepartment, department, error });
    }, [id, loadingDepartment, department, error]);

    useEffect(() => {
        if (department) {
            setBreadcrumbsData([
                { label: 'Asosiy', href: '/' },
                { label: 'Kafedralar', href: '/departments' },
                { label: department.name }
            ]);
        }
        return () => setBreadcrumbsData([]);
    }, [department, setBreadcrumbsData]);

    if (loadingDepartment) {
        return <GenericPageSkeleton />;
    }

    if (!department) {
        console.error('Department not found. ID:', id);
        return (
            <section className="bg-[#F8FAFC] min-h-screen pb-20">
                <Container className="pt-6">
                    <EmptyState
                        resourceKey="departments"
                    />
                </Container>
            </section>
        );
    }

    const tabs = [
        { id: 'about', label: 'Kafedra haqida', icon: BuildingLibraryIcon },
        { id: 'staff', label: 'Kafedra tarkibi', icon: UserGroupIcon },
        { id: 'scientific', label: 'Ilmiy faoliyat', icon: AcademicCapIcon },
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
                            {department.name}
                        </h1>

                        {/* Featured Image - Standard Tailwind height classes (h-64 mobile, h-80 desktop) - slightly smaller as requested */}
                        {department.image && (
                            <div className="w-full mb-8 h-64 md:h-80">
                                <OptimizedImage
                                    src={department.image}
                                    alt={department.name}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        )}

                        {/* Tabs Navigation - Matches Faculty Detail Page Styling */}
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
                        {activeTab === 'about' && (
                            <div className="space-y-12">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                    <h2 className="text-3xl font-bold text-[#003B5C]">Kafedra haqida</h2>
                                </div>

                                <div className="bg-white">
                                    {department.content || department.description ? (
                                        <ContentBuilder
                                            blocks={[
                                                {
                                                    id: 'department-about',
                                                    type: 'rich-text',
                                                    data: { content: department.content || department.description }
                                                }
                                            ]}
                                        />
                                    ) : (
                                        <EmptyState resourceKey="info" />
                                    )}
                                </div>

                                {/* Department Head Info */}
                                {department.headName && (
                                    <div className="pt-8 border-t border-gray-100">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full"></div>
                                            <h2 className="text-3xl font-bold text-[#003B5C]">Kafedra mudiri</h2>
                                        </div>
                                        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                                <div className="w-32 h-40 md:w-40 md:h-48 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative shadow-inner">
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                                                        <UserGroupIcon className="w-16 h-16 opacity-50" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 space-y-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-[#003B5C] mb-1">{department.headName}</h3>
                                                        <p className="text-gray-500 font-medium text-lg">Kafedra mudiri</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                                        {department.phone && (
                                                            <div className="space-y-1">
                                                                <p className="text-xs font-bold text-black opacity-80 uppercase tracking-wider">Telefon</p>
                                                                <a href={`tel:${department.phone}`} className="text-black font-semibold hover:text-[#003B5C] block text-lg transition-colors">
                                                                    {department.phone}
                                                                </a>
                                                            </div>
                                                        )}
                                                        {department.email && (
                                                            <div className="space-y-1">
                                                                <p className="text-xs font-bold text-black opacity-80 uppercase tracking-wider">Email</p>
                                                                <a href={`mailto:${department.email}`} className="text-black font-semibold hover:text-[#003B5C] block text-lg transition-colors break-all">
                                                                    {department.email}
                                                                </a>
                                                            </div>
                                                        )}
                                                        <div className="space-y-1">
                                                            <p className="text-xs font-bold text-black opacity-80 uppercase tracking-wider">Qabul kunlari</p>
                                                            <p className="text-black font-semibold text-lg">Dushanba-Juma, 09:00 – 17:00</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'staff' && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                    <h2 className="text-3xl font-bold text-[#003B5C]">Kafedra tarkibi</h2>
                                </div>
                                {department.staff ? (
                                    <ContentBuilder
                                        blocks={[
                                            {
                                                id: 'department-staff',
                                                type: 'rich-text',
                                                data: { content: department.staff }
                                            }
                                        ]}
                                    />
                                ) : (
                                    <EmptyState resourceKey="info" />
                                )}
                            </div>
                        )}

                        {activeTab === 'scientific' && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                    <h2 className="text-3xl font-bold text-[#003B5C]">Ilmiy faoliyat</h2>
                                </div>
                                {department.scientificActivity ? (
                                    <ContentBuilder
                                        blocks={[
                                            {
                                                id: 'department-scientific',
                                                type: 'rich-text',
                                                data: { content: department.scientificActivity }
                                            }
                                        ]}
                                    />
                                ) : (
                                    <EmptyState resourceKey="info" />
                                )}
                            </div>
                        )}

                        {activeTab === 'cooperation' && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                    <h2 className="text-3xl font-bold text-[#003B5C]">Xalqaro hamkorlik</h2>
                                </div>
                                {department.internationalCooperation ? (
                                    <ContentBuilder
                                        blocks={[
                                            {
                                                id: 'department-cooperation',
                                                type: 'rich-text',
                                                data: { content: department.internationalCooperation }
                                            }
                                        ]}
                                    />
                                ) : (
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

export default DepartmentDetailPage;
