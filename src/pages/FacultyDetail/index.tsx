import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { useCachedApi } from '@/hooks/useCachedApi';
import { getFacultyById, getDepartmentsByFacultyId } from '@/services/facultiesService';
import { Faculty, Department } from '@/types/faculty.types';
import Container from '@/components/shared/Container';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import EmptyState from '@/components/shared/EmptyState';
import { DepartmentGridCard } from '../Faculties/components/DepartmentGridCard';
import { SectionTabs, ContentBuilder, Accordion, LeadershipCard } from '@/components/shared';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import {
    BuildingLibraryIcon,
    UserGroupIcon,
    ListBulletIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

const FacultyDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation('pages');
    const { locale } = useLocale();
    const { setBreadcrumbsData } = useGlobalLayout();
    const [activeTab, setActiveTab] = useState('history');

    const { data: faculty, loading: loadingFaculty } = useCachedApi<Faculty | null>({
        key: `faculty-detail-${id}`,
        fetcher: (loc) => getFacultyById(id!, loc),
        enabled: !!id,
        ttlMinutes: 5
    });

    // Redirect to list page when locale changes (to show content in new language)
    const [initialLocale] = React.useState(locale);
    useEffect(() => {
        if (locale !== initialLocale) {
            const prefix = locale === 'uz' ? '' : `/${locale}`;
            navigate(`${prefix}/faculties`, { replace: true });
        }
    }, [locale, initialLocale, navigate]);

    useEffect(() => {
        if (faculty) {
            // Updated breadcrumbs or other side effects
        }
    }, [faculty]);

    const { data: departments, loading: loadingDepartments } = useCachedApi<Department[]>({
        key: `faculty-departments-${faculty?.id}`,
        fetcher: (loc) => getDepartmentsByFacultyId(faculty?.id!, loc),
        enabled: !!faculty?.id,
        ttlMinutes: 5
    });

    useEffect(() => {
        if (!loadingFaculty && !faculty) {
            navigate(`/${locale}/faculties`);
        }
    }, [loadingFaculty, faculty, navigate, locale]);

    useEffect(() => {
        if (faculty) {
            setBreadcrumbsData([
                { label: t('breadcrumbs.home'), href: `/${locale}` },
                { label: t('breadcrumbs.faculties'), href: `/${locale}/faculties` },
                { label: faculty.name }
            ]);

            // Slug Stabilizer: If loaded by ID/UUID, or slug mismatch, redirect to canonical slug URL
            if (faculty.slug && id !== faculty.slug) {
                const prefix = locale === 'uz' ? '' : `/${locale}`;
                navigate(`${prefix}/faculties/${faculty.slug}`, { replace: true });
            }
        }
        return () => setBreadcrumbsData([]);
    }, [faculty, setBreadcrumbsData, locale, t, id, navigate]);

    if (loadingFaculty) {
        return <GenericPageSkeleton />;
    }

    if (!faculty) {
        return null;
    }

    const tabs = [
        { id: 'history', label: t('facultyTabs.about'), icon: BuildingLibraryIcon },
        { id: 'departments', label: t('facultyTabs.departments'), icon: UserGroupIcon },
        { id: 'directions', label: t('facultyTabs.directions'), icon: ListBulletIcon },
        { id: 'cooperation', label: t('facultyTabs.cooperation'), icon: GlobeAltIcon },
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
                        {/* {faculty.image && (
    <div className="w-full mb-8 h-64 md:h-80">
        <OptimizedImage
            src={faculty.image}
            alt={faculty.name}
            className="w-full h-full object-cover object-top"
        />
    </div>
)} */}

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
                                {faculty.deanInfo && (
                                    <div className="mb-8">
                                        <LeadershipCard
                                            member={faculty.deanInfo}
                                            isMain={false}
                                        />
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                    <h2 className="text-3xl font-bold text-[#003B5C]">{t('facultyTabs.about')}</h2>
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
                            </div>
                        )}

                        {activeTab === 'departments' && (
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                    <h2 className="text-3xl font-bold text-[#003B5C]">{t('headers.facultyDepartments')}</h2>
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
                                        title={t('messages.departmentsNotFound')}
                                        message={t('messages.noDepartmentsInFaculty')}
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'directions' && (
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                    <h2 className="text-3xl font-bold text-[#003B5C]">{t('facultyTabs.directions')}</h2>
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
                                        <h2 className="text-3xl font-bold text-[#003B5C]">{t('facultyTabs.cooperation')}</h2>
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
                                            <h3 className="text-2xl font-bold text-black">{t('headers.departmentsCooperation')}</h3>
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
        </section >
    );
};

export default FacultyDetailPage;
