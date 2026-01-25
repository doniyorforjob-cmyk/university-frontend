import React, { useEffect, useMemo } from 'react';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { useTranslation } from 'react-i18next';
import { Leadership } from '@/types/leadership.types';
import DetailTemplate from '@/components/templates/DetailTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { getAdministrativeHeadsApi } from '@/api/http/department.http';
import Container from '@/components/shared/Container';
import { useLocale } from '@/contexts/LocaleContext';

const HeadsOfDepartmentsPage: React.FC<{ type: 'academic' | 'administrative' }> = ({ type }) => {
    const { t } = useTranslation(['common', 'pages']);
    const { locale } = useLocale();
    const { setSidebarType, setBreadcrumbsData } = useGlobalLayout();

    const { data: allHeads, loading, error, refetch } = useStandardPage<Leadership[]>(
        `heads_of_${type}_data`,
        (loc) => getAdministrativeHeadsApi(loc)
    );

    // Filter based on type
    const filteredMembers = useMemo(() => {
        if (!allHeads) return [];
        return allHeads;
    }, [allHeads]);

    const title = type === 'academic' ? t('pages:academic_departments', 'Kafedralar') : t('pages:sections', 'Bo\'limlar');

    const breadcrumbs = useMemo(() => [
        { label: t('common:nav.home', 'Bosh sahifa'), href: `/${locale}` },
        { label: t('common:nav.about', 'Universitet'), href: `/${locale}/university` },
        { label: title }
    ], [t, title, locale]);

    useEffect(() => {
        setSidebarType('info');
        setBreadcrumbsData(breadcrumbs);
        return () => {
            setSidebarType(undefined);
            setBreadcrumbsData(undefined);
        };
    }, [setSidebarType, setBreadcrumbsData, breadcrumbs]);

    if (loading) {
        return <GenericPageSkeleton showSidebar={true} showHeroImage={true} contentBlocks={3} />;
    }

    if (error) {
        return (
            <div className="p-8 text-center text-black">
                <p className="text-red-500 mb-4 font-semibold">{t('common:errorLoading', 'Ma\'lumotlarni yuklashda xatolik yuz berdi')}</p>
                <button
                    onClick={refetch}
                    className="px-6 py-2 bg-main text-white rounded-xl hover:bg-main/90 transition-all font-semibold shadow-md"
                >
                    {t('common:retry', 'Qayta urinish')}
                </button>
            </div>
        );
    }

    const contentBlocks: any[] = filteredMembers && filteredMembers.length > 0 ? [
        {
            id: 'heads-list',
            type: 'leadership-list',
            data: {
                members: filteredMembers,
                highlightFirst: false,
                variant: 'small'
            }
        }
    ] : [];

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <Container>
                <DetailTemplate
                    title={title}
                    contentType="person"
                    breadcrumbs={[]}
                    contentBlocks={contentBlocks}
                    showSidebar={false}
                    showMeta={false}
                    showSocialShare={true}
                />
            </Container>
        </div>
    );
};

export default HeadsOfDepartmentsPage;
