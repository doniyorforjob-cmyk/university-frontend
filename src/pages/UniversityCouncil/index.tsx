import React, { useEffect } from 'react';
import DetailTemplate from '../../components/templates/DetailTemplate';
import { useCachedApi } from '../../hooks/useCachedApi';
import { getUniversityCouncilData } from '../../api/http/council.http';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import GenericPageSkeleton from '../../components/shared/GenericPageSkeleton';
import EmptyState from '../../components/shared/EmptyState';
import { useGlobalLayout } from '../../components/templates/GlobalLayout';

const UniversityCouncil: React.FC = () => {
    const { t } = useTranslation(['common', 'pages']);
    const { locale } = useLocale();
    const { setSidebarType, setBreadcrumbsData } = useGlobalLayout();

    const { data, loading, error } = useCachedApi({
        key: `university-council-${locale}`,
        fetcher: () => getUniversityCouncilData(locale),
        enabled: true,
        ttlMinutes: 60
    });

    useEffect(() => {
        setSidebarType('info');
        setBreadcrumbsData([
            { label: t('common:home', 'Bosh sahifa'), href: '/' },
            { label: t('pages:university', 'Universitet'), href: '/university' },
            { label: data?.title || t('pages:university_council', 'Universitet Kengashi') }
        ]);
        return () => {
            setSidebarType(undefined);
            setBreadcrumbsData(undefined);
        };
    }, [setSidebarType, setBreadcrumbsData, t, data?.title]);

    if (loading && !data) {
        return <GenericPageSkeleton showSidebar={true} showBanner={true} />;
    }

    if (error || !data) {
        return (
            <EmptyState
                title={t('common:no_data', "Ma'lumot topilmadi")}
                message={t('common:no_data_description', "Ushbu sahifa uchun ma'lumot mavjud emas")}
            />
        );
    }

    return (
        <DetailTemplate
            title={data.title || t('pages:university_council', 'Universitet Kengashi')}
            contentType="info"
            contentBlocks={data.contentBlocks}
            heroImage={data.heroImage}
            breadcrumbs={[]}
            showMeta={false}
            showSocialShare={true}
            showPrintButton={true}
        />
    );
};

export default UniversityCouncil;
