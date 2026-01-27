import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchStudents } from '@/services/studentService';
import { StudentEntry } from '@/api/http/students.http';
import PageTemplate from '@/components/shared/PageTemplate';
import PageSkeleton from '@/components/shared/PageSkeleton';
import EmptyState from '@/components/shared/EmptyState';
import ContentCard from '@/components/shared/ContentCard';

const StudentsPage: React.FC = () => {
    const { locale } = useLocale();
    const { t } = useTranslation(['common', 'pages']);
    const { setSidebarType, setBreadcrumbsData } = useGlobalLayout();

    const { data: students, loading, error } = useStandardPage<StudentEntry[]>(
        'students-list',
        fetchStudents
    );

    useEffect(() => {
        setSidebarType('systems');
        setBreadcrumbsData([
            { label: t('home', 'Bosh sahifa'), href: `/${locale}` },
            { label: t('pages:students', 'Talabalar') }
        ]);

        return () => {
            setSidebarType(undefined);
            setBreadcrumbsData(undefined);
        };
    }, [locale, t, setSidebarType, setBreadcrumbsData]);

    const activeStudents = useMemo(() => {
        if (!students) return [];
        return students; // Add filtering if needed later
    }, [students]);

    if (loading) {
        return <PageSkeleton />;
    }

    if (error || !students) {
        return (
            <PageTemplate
                title={t('pages:students', 'Talabalar')}
            >
                <EmptyState resourceKey="info" className="mt-8" />
            </PageTemplate>
        );
    }

    // Transform to card format compatible with PageTemplate/SectionGrid
    // Since PageTemplate might not directly support card grids inside children without structure
    // we will use the structure from Media page or similar.
    // Actually PageTemplate is a wrapper. We render the grid inside.

    return (
        <PageTemplate
            title={t('pages:students', 'Talabalar')}
        >
            {activeStudents.length > 0 ? (
                <>
                    {/* Featured Student (First Item) */}
                    {activeStudents[0] && (
                        <div className="mb-6 mt-6">
                            <ContentCard
                                title={activeStudents[0].title}
                                slug={activeStudents[0].slug}
                                image={activeStudents[0].image_url}
                                content={activeStudents[0].content}
                                publishedAt={activeStudents[0].published_at}
                                linkPrefix={locale === 'uz' ? '/students' : `/${locale}/students`}
                                isFeatured={true}
                            />
                        </div>
                    )}

                    {/* Remaining Students Grid */}
                    {activeStudents.length > 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {activeStudents.slice(1).map((item: StudentEntry) => (
                                <ContentCard
                                    key={item.id}
                                    title={item.title}
                                    slug={item.slug}
                                    image={item.image_url}
                                    content={item.content}
                                    publishedAt={item.published_at}
                                    linkPrefix={locale === 'uz' ? '/students' : `/${locale}/students`}
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <EmptyState resourceKey="info" />
            )}
        </PageTemplate>
    );
};

export default StudentsPage;
