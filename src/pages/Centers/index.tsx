import React, { useEffect, useMemo } from 'react';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { getCentersHeadsApi } from '@/api/http/centers.http';
import { useTranslation } from 'react-i18next';
import { Leadership } from '@/types/leadership.types';
import DetailTemplate from '@/components/templates/DetailTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const CentersPage: React.FC = () => {
    const { t } = useTranslation(['common', 'pages']);
    const { setSidebarType, setBreadcrumbsData } = useGlobalLayout();
    const { data: members, loading, error, refetch } = useStandardPage<Leadership[]>(
        'centers_heads_data',
        getCentersHeadsApi
    );

    const breadcrumbs = useMemo(() => [
        { label: t('common:nav.home', 'Bosh sahifa'), href: '/' },
        { label: t('common:nav.about', 'Universitet'), href: '/university' },
        { label: t('pages:centers', 'Markazlar') }
    ], [t]);

    useEffect(() => {
        setSidebarType('systems');
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

    const contentBlocks: any[] = members && members.length > 0 ? [
        {
            id: 'centers-heads-list',
            type: 'leadership-list',
            data: {
                members: members,
                highlightFirst: false,
                variant: 'small'
            }
        }
    ] : [];

    return (
        <div className="bg-gray-50 min-h-screen">
            <DetailTemplate
                title={t('pages:centers', 'Markazlar')}
                contentType="person"
                breadcrumbs={[]} // Moved to GlobalLayout
                contentBlocks={contentBlocks}
                showSidebar={false} // MainLayout handles the sidebar
                showMeta={false}
                showSocialShare={true}
            />
        </div>
    );
};

export default CentersPage;
