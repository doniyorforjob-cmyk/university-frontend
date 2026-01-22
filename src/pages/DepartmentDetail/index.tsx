import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { useCachedApi } from '@/hooks/useCachedApi';
import { getDepartmentById } from '@/services/facultiesService';
import { Department } from '@/types/faculty.types';
import Container from '@/components/shared/Container';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import EmptyState from '@/components/shared/EmptyState';
import { SectionTabs, OptimizedImage, ContentBuilder, LeadershipCard } from '@/components/shared';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import {
    BuildingLibraryIcon,
    UserGroupIcon,
    AcademicCapIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

const DepartmentDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation('pages');
    const { locale } = useLocale();
    const { setBreadcrumbsData } = useGlobalLayout();
    const [activeTab, setActiveTab] = React.useState('about');

    const { data: department, loading: loadingDepartment } = useCachedApi<Department | null>({
        key: `department-detail-${id}`,
        fetcher: (loc) => getDepartmentById(id!, loc),
        enabled: !!id,
        ttlMinutes: 5
    });

    // Redirect to list page when locale changes (to show content in new language)
    const [initialLocale] = React.useState(locale);
    useEffect(() => {
        if (locale !== initialLocale) {
            const prefix = locale === 'uz' ? '' : `/${locale}`;
            navigate(`${prefix}/departments`, { replace: true });
        }
    }, [locale, initialLocale, navigate]);


    useEffect(() => {
        if (department) {
            setBreadcrumbsData([
                { label: t('breadcrumbs.home'), href: `/${locale}` },
                { label: t('breadcrumbs.departments'), href: `/${locale}/departments` },
                { label: department.name }
            ]);

            // Slug Stabilizer: If loaded by ID/UUID, or slug mismatch, redirect to canonical slug URL
            if (department.slug && id !== department.slug) {
                const prefix = locale === 'uz' ? '' : `/${locale}`;
                // Use replace to avoid history stack pollution
                navigate(`${prefix}/departments/${department.slug}`, { replace: true });
            }
        }
        return () => setBreadcrumbsData([]);
    }, [department, setBreadcrumbsData, locale, t, id, navigate]);

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
        { id: 'about', label: t('departmentTabs.about'), icon: BuildingLibraryIcon },
        { id: 'staff', label: t('departmentTabs.staff'), icon: UserGroupIcon },
        { id: 'scientific', label: t('departmentTabs.scientific'), icon: AcademicCapIcon },
        { id: 'cooperation', label: t('departmentTabs.cooperation'), icon: GlobeAltIcon },
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
                                    <h2 className="text-3xl font-bold text-[#003B5C]">{t('departmentTabs.about')}</h2>
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
                            </div>
                        )}

                        {activeTab === 'staff' && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-[#6D6EAB] rounded-full shadow-[0_0_15px_rgba(109,110,171,0.4)]"></div>
                                    <h2 className="text-3xl font-bold text-[#003B5C]">{t('departmentTabs.staff')}</h2>
                                </div>

                                {department.headInfo && (
                                    <div className="mb-12">
                                        <LeadershipCard
                                            member={department.headInfo}
                                            isMain={false}
                                        />
                                    </div>
                                )}

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
                                    <h2 className="text-3xl font-bold text-[#003B5C]">{t('departmentTabs.scientific')}</h2>
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
                                    <h2 className="text-3xl font-bold text-[#003B5C]">{t('departmentTabs.cooperation')}</h2>
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
        </section >
    );
};

export default DepartmentDetailPage;
