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
import { getPostBySlug } from '@/services/postService';
import { getOpenLessonBySlug } from '@/services/openLessonService';
import { getEventBySlug } from '@/services/eventService';

// Types
import { AnnouncementDetail } from '@/types/announcement.types';
import { PostDetail } from '@/types/post.types';
import { OpenLessonDetail } from '@/types/open-lesson.types';

export type PageType = 'announcement' | 'news' | 'service' | 'open-lesson' | 'event' | 'corruption';

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
            case 'open-lesson':
                return () => getOpenLessonBySlug(slug, locale);
            case 'event':
                return () => getEventBySlug(slug, locale);
            case 'corruption':
                return () => getPostBySlug(slug, locale, 'corruption');
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
            case 'open-lesson':
                return `open-lesson-detail-${slug}`;
            case 'event':
                return `event-detail-${slug}`;
            case 'corruption':
                return `corruption-detail-${slug}`;
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
            case 'corruption':
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
            case 'open-lesson':
                setSidebarType('info');
                breadcrumbLabel = t('pages:openLessons');
                parentHref = '/open-lessons';
                break;
            case 'event':
                setSidebarType('info');
                breadcrumbLabel = t('pages:home.tabs.events');
                parentHref = '/news'; // Tadbirlar yangiliklar bo'limida
                break;
            case 'corruption':
                setSidebarType('info');
                breadcrumbLabel = t('pages:home.tabs.corruption');
                parentHref = '/corruption';
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
                case 'open-lesson':
                    listPath = '/open-lessons';
                    break;
                case 'event':
                    listPath = '/news';
                    break;
                case 'corruption':
                    listPath = '/corruption';
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

        // Map gallery if exists (assuming it might be in the API response even if not in strict type, or cast to any)
        if ((data as any).gallery && Array.isArray((data as any).gallery)) {
            templateProps.gallery = (data as any).gallery.map((imgUrl: string) => ({
                src: imgUrl,
                alt: announcement.title
            }));
        }

        templateProps.showSocialShare = true;
        templateProps.showSidebar = false; // Global sidebar used via context
    } else if (type === 'news') {
        const news = data as PostDetail;
        templateProps.heroImage = news.image_url;
        templateProps.heroImageAlt = news.title;
        templateProps.meta = {
            publishDate: news.published_at,
            views: news.views
        } as DetailMeta;

        // Map gallery
        if (news.gallery && Array.isArray(news.gallery)) {
            templateProps.gallery = news.gallery.map(imgUrl => ({
                src: imgUrl,
                alt: news.title
            }));
        }

        templateProps.showSocialShare = true;
        templateProps.showPrintButton = true;
        templateProps.showComments = false;
        templateProps.showSidebar = false; // Global sidebar used
        templateProps.socialShare = {
            facebook: true,
            telegram: true,
            instagram: true
        };
    } else if (type === 'open-lesson') {
        const lesson = data as OpenLessonDetail;
        templateProps.heroImage = lesson.image_url;
        templateProps.heroImageAlt = lesson.title;
        templateProps.meta = {
            publishDate: lesson.lesson_date,
            views: lesson.views,
            department: lesson.department?.name
        } as DetailMeta;

        // Map gallery
        if (lesson.gallery && Array.isArray(lesson.gallery)) {
            templateProps.gallery = lesson.gallery.map(imgUrl => ({
                src: imgUrl,
                alt: lesson.title
            }));
        }

        templateProps.showSocialShare = true;
        templateProps.showPrintButton = true;
        templateProps.showSidebar = false;
    } else if (type === 'event') {
        templateProps.heroImage = data.image_url;
        templateProps.heroImageAlt = data.title;
        templateProps.meta = {
            publishDate: data.published_at,
            views: data.views,
            location: data.location
        } as DetailMeta;

        // Map gallery
        if (data.gallery && Array.isArray(data.gallery)) {
            templateProps.gallery = data.gallery.map((imgUrl: string) => ({
                src: imgUrl,
                alt: data.title
            }));
        }

        templateProps.showSocialShare = true;
        templateProps.showPrintButton = true;
        templateProps.showSidebar = false;
    } else if (type === 'corruption') {
        const corruption = data as PostDetail;
        templateProps.heroImage = corruption.image_url;
        templateProps.heroImageAlt = corruption.title;
        templateProps.meta = {
            publishDate: corruption.published_at,
            views: corruption.views
        } as DetailMeta;

        // Map gallery
        if (corruption.gallery && Array.isArray(corruption.gallery)) {
            templateProps.gallery = corruption.gallery.map(imgUrl => ({
                src: imgUrl,
                alt: corruption.title
            }));
        }

        templateProps.showSocialShare = true;
        templateProps.showPrintButton = true;
        templateProps.showSidebar = false;
    }

    return (
        <DetailTemplate
            {...templateProps}
        />
    );
};

export default GenericDetailPage;
