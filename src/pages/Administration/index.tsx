import React, { useEffect, useMemo } from 'react';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { getLeadershipApi } from '@/api/http/leadership.http';
import { useTranslation } from 'react-i18next';
import { Leadership } from '@/types/leadership.types';
import DetailTemplate from '@/components/templates/DetailTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useLocale } from '@/contexts/LocaleContext';
import { useCachedApi } from '@/hooks/useCachedApi';
import { getPosts } from '@/services/postService';
import { LatestContentSidebar } from '@/components/shared';

const AdministrationPage: React.FC = () => {
    const { t } = useTranslation(['common', 'pages']);
    const { locale } = useLocale();
    const { setSidebarType, setSidebarExtraContent, setBreadcrumbsData, setSidebarMobileHidden } = useGlobalLayout();

    const { data: members, loading, error, refetch } = useStandardPage<Leadership[]>(
        'administration_data',
        getLeadershipApi
    );

    // Fetch latest news for sidebar
    const { data: latestNews, loading: newsLoading } = useCachedApi<any[]>({
        key: `${locale}-latest-news-administration`,
        fetcher: () => getPosts('news', locale),
        ttlMinutes: 30
    });

    const sidebarExtraContent = useMemo(() => {
        if (!latestNews || latestNews.length === 0) return null;

        const prefix = locale === 'uz' ? '' : `/${locale}`;
        const sidebarItems = latestNews
            .slice(0, 5)
            .map(item => ({
                id: item.slug || item.id,
                title: item.title,
                image: item.image_url,
                date: item.published_at,
                slug: item.slug || item.id,
                href: `${prefix}/news/${item.slug || item.id}`
            }));

        return (
            <LatestContentSidebar
                title={t('common:latest_news', 'So\'nggi xabarlar')}
                items={sidebarItems}
                loading={newsLoading}
            />
        );
    }, [latestNews, newsLoading, t, locale]);

    useEffect(() => {
        setSidebarType('info');
        setSidebarExtraContent(sidebarExtraContent || undefined);
        setSidebarMobileHidden(true); // Hide on mobile for Rahbariyat

        setBreadcrumbsData([
            { label: t('common:nav.home', 'Bosh sahifa'), href: locale === 'uz' ? '/' : `/${locale}` },
            { label: t('common:university', 'Universitet'), href: locale === 'uz' ? '/university' : `/${locale}/university` },
            { label: t('common:nav.administration', 'Rahbariyat') }
        ]);

        return () => {
            setSidebarType(undefined);
            setSidebarExtraContent(undefined);
            setBreadcrumbsData(undefined);
            setSidebarMobileHidden(false);
        };
    }, [setSidebarType, setSidebarExtraContent, setBreadcrumbsData, setSidebarMobileHidden, sidebarExtraContent, t, locale]);

    if (loading) {
        return <GenericPageSkeleton showSidebar={true} showHeroImage={false} contentBlocks={3} />;
    }

    if (error) {
        return (
            <div className="p-8 text-center text-black">
                <p className="text-red-500 mb-4 font-semibold">{t('common:error_loading', 'Ma\'lumotlarni yuklashda xatolik yuz berdi')}</p>
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
            id: 'leadership-list-main',
            type: 'leadership-list',
            data: {
                members: members,
                highlightFirst: true
            }
        }
    ] : [];

    return (
        <DetailTemplate
            title={t('common:nav.administration', 'Rahbariyat')}
            contentType="person"
            contentBlocks={contentBlocks}
            showSidebar={false}
            showMeta={false}
            showSocialShare={true}
        />
    );
};

export default AdministrationPage;
