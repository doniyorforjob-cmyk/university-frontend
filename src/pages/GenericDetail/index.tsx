import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import DetailTemplate, { DetailMeta, ContentType } from '@/components/templates/DetailTemplate';
import { PageSkeleton } from '@/components/shared';
import { useLocale } from '@/contexts/LocaleContext';
import { useCachedApi } from '@/hooks/useCachedApi';
import { CACHE_CONFIG } from '@/config/constants';

// Services
import { getAnnouncementBySlug } from '@/services/announcementService';
import { getPostBySlug } from '@/services/postService'; // Future use

// Types
import { AnnouncementDetail } from '@/types/announcement.types';
import { PostDetail } from '@/types/post.types';

export type PageType = 'announcement' | 'news' | 'service';

interface GenericDetailPageProps {
    type: PageType;
}

const GenericDetailPage: React.FC<GenericDetailPageProps> = ({ type }) => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { locale } = useLocale();
    const { t } = useTranslation(['common', 'pages']);
    const { setSidebarType, setBreadcrumbsData } = useGlobalLayout();

    // API fetcher function based on type
    const getFetcher = () => {
        if (!slug) return null;

        switch (type) {
            case 'announcement':
                return () => getAnnouncementBySlug(slug, locale);
            case 'news':
                // Post service locale ni qabul qiladi
                return () => getPostBySlug(slug, locale);
            default:
                return null;
        }
    };

    // Cache key based on type
    const getCacheKey = () => {
        switch (type) {
            case 'announcement':
                return `${CACHE_CONFIG.KEYS.ANNOUNCEMENT_DETAIL}-${slug}`;
            case 'news':
                return `${CACHE_CONFIG.KEYS.NEWS_DETAIL}-${slug}`;
            default:
                return `generic-detail-${slug}`;
        }
    };

    // Get TTL based on type
    const getTTL = () => {
        switch (type) {
            case 'announcement':
                return CACHE_CONFIG.ANNOUNCEMENT_DETAIL.ttlMinutes;
            case 'news':
                return CACHE_CONFIG.NEWS_DETAIL.ttlMinutes;
            default:
                return CACHE_CONFIG.DEFAULT_TTL;
        }
    };

    const fetcher = getFetcher();
    const { data, loading, error } = useCachedApi<any>({
        key: getCacheKey(),
        fetcher: fetcher || (() => Promise.resolve(null)),
        enabled: !!slug && !!fetcher,
        ttlMinutes: getTTL(),
        keepPreviousData: true
    });

    // UI Config (Sidebar & Breadcrumbs)
    useEffect(() => {
        let breadcrumbLabel = '';
        let parentHref = '';

        switch (type) {
            case 'announcement':
                setSidebarType('info');
                breadcrumbLabel = t('pages:announcements');
                parentHref = '/announcements';
                break;
            case 'news':
                setSidebarType('info');
                breadcrumbLabel = t('pages:news');
                parentHref = '/news';
                break;
        }

        setBreadcrumbsData([
            { label: t('home'), href: '/' },
            { label: breadcrumbLabel, href: parentHref }
        ]);

        return () => {
            setSidebarType(undefined);
            setBreadcrumbsData(undefined);
        };
    }, [type, setSidebarType, setBreadcrumbsData, t]);

    // Redirect logic if item not found in current locale
    useEffect(() => {
        if (!loading && !data && !error) {
            // Agar kontent topilmasa, ro'yxat sahifasiga qaytarish
            let listPath = '';
            switch (type) {
                case 'announcement':
                    listPath = '/announcements';
                    break;
                case 'news':
                    listPath = '/news';
                    break;
                default:
                    listPath = '/';
            }

            const targetPath = locale === 'uz' ? listPath : `/${locale}${listPath}`;
            console.warn(`Content not found in locale ${locale}, redirecting to list...`);
            navigate(targetPath, { replace: true });
        }
    }, [loading, data, error, type, locale, navigate]);


    if (loading) {
        // Show skeleton based on type
        return <PageSkeleton type={type === 'announcement' ? 'news' : 'default'} />;
    }

    if (!data) {
        // Handle Not Found - Could redirect to list or show NotFound component
        // For now returning null to avoid flash, similar to NewsDetail
        return null;
    }

    // --- Data Normalization (Transformer) ---
    // Convert specific API response to DetailTemplate props

    let templateProps: any = {
        title: data.title,
        content: data.content,
        contentType: type as ContentType,
        breadcrumbs: [] // Handled globally
    };

    if (type === 'announcement') {
        const announcement = data as AnnouncementDetail;
        templateProps.heroImage = announcement.image_url;
        templateProps.meta = {
            publishDate: announcement.published_at,
            views: announcement.views,
            // Add other meta mapping if available
        } as DetailMeta;
        templateProps.showSocialShare = true;
        templateProps.showSidebar = false; // Global sidebar used via context
    } else if (type === 'news') {
        const news = data as PostDetail;
        templateProps.heroImage = news.image_url;
        templateProps.heroImageAlt = news.title;
        templateProps.meta = {
            publishDate: news.published_at,
            author: news.author?.name,
            category: news.category,
            views: news.views
        } as DetailMeta;
        templateProps.showSocialShare = true;
        templateProps.showPrintButton = true;
        templateProps.showComments = false;
        templateProps.showSidebar = false; // Global sidebar used
        templateProps.socialShare = {
            facebook: true,
            telegram: true,
            copy: true
        };
    }

    return (
        <DetailTemplate
            {...templateProps}
        />
    );
};

export default GenericDetailPage;
