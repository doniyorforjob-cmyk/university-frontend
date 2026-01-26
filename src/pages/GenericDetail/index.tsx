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
import { getStepForwardBySlug } from '@/services/stepForwardService';
import { getEventBySlug } from '@/services/eventService';
import { getMediaArticleBySlug } from '@/services/mediaService';
import { getLeadershipBySlug } from '@/api/http/leadership.http';
import { getSpiritualActivityBySlug } from '@/services/spiritualEducationalService';
import { getCulturalEventBySlug } from '@/services/culturalEventsService';
import { getSportsClubEntryBySlug } from '@/services/sportsClubLifeService';
import { getCulturalEducationalEntryBySlug } from '@/services/culturalEducationalActivitiesService';
import LeadershipProfile from '@/components/features/leadership/LeadershipProfile';

// Types
import { AnnouncementDetail } from '@/types/announcement.types';
import { PostDetail } from '@/types/post.types';
import { OpenLessonDetail } from '@/types/open-lesson.types';
import { StepForwardDetail } from '@/types/step-forward.types';

export type PageType = 'announcement' | 'news' | 'service' | 'open-lesson' | 'step-forward' | 'event' | 'corruption' | 'media' | 'person' | 'leadership' | 'spiritual-educational' | 'cultural-event' | 'sports-club-life' | 'cultural-educational-activity';

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
            case 'step-forward':
                return () => getStepForwardBySlug(slug, locale);
            case 'event':
                return () => getEventBySlug(slug, locale);
            case 'corruption':
                return () => getPostBySlug(slug, locale, 'corruption');
            case 'media':
                return () => getMediaArticleBySlug(slug, locale);
            case 'person':
            case 'leadership':
                return () => getLeadershipBySlug(slug, locale);
            case 'spiritual-educational':
                return () => getSpiritualActivityBySlug(slug, locale);
            case 'cultural-event':
                return () => getCulturalEventBySlug(slug, locale);
            case 'sports-club-life':
                return () => getSportsClubEntryBySlug(slug, locale);
            case 'cultural-educational-activity':
                return () => getCulturalEducationalEntryBySlug(slug, locale);
            default:
                return null;
        }
    };

    // Cache key based on type
    const getCacheKey = () => {
        const keyPrefix = `${locale}-`;
        switch (type) {
            case 'announcement':
                return `${keyPrefix}${CACHE_CONFIG.KEYS.ANNOUNCEMENT_DETAIL}-${slug}`;
            case 'news':
                return `${keyPrefix}${CACHE_CONFIG.KEYS.NEWS_DETAIL}-${slug}`;
            case 'open-lesson':
                return `${keyPrefix}open-lesson-detail-${slug}`;
            case 'step-forward':
                return `${keyPrefix}step-forward-detail-${slug}`;
            case 'event':
                return `${keyPrefix}event-detail-${slug}`;
            case 'corruption':
                return `${keyPrefix}corruption-detail-${slug}`;
            case 'media':
                return `${keyPrefix}media-detail-${slug}`;
            case 'person':
            case 'leadership':
                return `${keyPrefix}leadership-detail-${slug}`;
            case 'spiritual-educational':
                return `${keyPrefix}spiritual-educational-detail-${slug}`;
            case 'cultural-event':
                return `${keyPrefix}cultural-event-detail-${slug}`;
            case 'sports-club-life':
                return `${keyPrefix}sports-club-life-detail-${slug}`;
            case 'cultural-educational-activity':
                return `${keyPrefix}cultural-educational-activity-detail-${slug}`;
            default:
                return `${keyPrefix}generic-detail-${slug}`;
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
            case 'step-forward':
                setSidebarType('info');
                breadcrumbLabel = t('pages:stepForward');
                parentHref = '/step-forward';
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
            case 'media':
                setSidebarType('info');
                breadcrumbLabel = t('pages:mediaResources');
                parentHref = '/media-about-us';
                break;
            case 'person':
            case 'leadership':
                setSidebarType('info');
                // Check path for breadcrumb context
                const prefix = locale === 'uz' ? '' : `/${locale}`;
                if (window.location.pathname.includes('/centers/')) {
                    breadcrumbLabel = t('pages:centers');
                    parentHref = `${prefix}/centers`;
                } else if (window.location.pathname.includes('/sections/')) {
                    breadcrumbLabel = t('pages:sections', "Bo'limlar");
                    parentHref = `${prefix}/sections`;
                } else {
                    breadcrumbLabel = t('nav.administration', 'Rahbariyat');
                    parentHref = `${prefix}/leadership`;
                }
                break;
            case 'spiritual-educational':
                setSidebarType('info');
                breadcrumbLabel = t('pages:spiritualEducational', "Ma'naviy-ma'rifiy rukn");
                parentHref = '/spiritual-educational-section';
                break;
            case 'cultural-event':
                setSidebarType('info');
                breadcrumbLabel = t('pages:culturalEvents', 'Madaniy va ko‘ngilochar tadbirlar');
                parentHref = '/cultural-events';
                break;
            case 'sports-club-life':
                setSidebarType('info');
                breadcrumbLabel = t('pages:sportsClubLife', 'Sport klubi hayoti');
                parentHref = '/sports-club-life';
                break;
            case 'cultural-educational-activity':
                setSidebarType('info');
                breadcrumbLabel = t('pages:culturalEducationalActivities', 'Madaniy-ma’rifiy faoliyat');
                parentHref = '/cultural-educational-activities';
                break;
        }

        setBreadcrumbsData([
            { label: t('common:nav.home'), href: locale === 'uz' ? '/' : `/${locale}` },
            { label: breadcrumbLabel, href: parentHref }
        ]);

        return () => {
            setSidebarType(undefined);
            setBreadcrumbsData(undefined);
        };
    }, [type, setSidebarType, setBreadcrumbsData, t, locale]);

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
                case 'media':
                    listPath = '/media-about-us';
                    break;
                case 'person':
                case 'leadership':
                    const isCentersRedirect = window.location.pathname.includes('/centers/');
                    const isSectionsRedirect = window.location.pathname.includes('/sections/');
                    if (isCentersRedirect) listPath = '/centers';
                    else if (isSectionsRedirect) listPath = '/sections'; // Or '/' if no sections list page
                    else listPath = '/leadership';
                    break;
                case 'spiritual-educational':
                    listPath = '/spiritual-educational-section';
                    break;
                case 'cultural-event':
                    listPath = '/cultural-events';
                    break;
                case 'sports-club-life':
                    listPath = '/sports-club-life';
                    break;
                case 'cultural-educational-activity':
                    listPath = '/cultural-educational-activities';
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
    } else if (type === 'step-forward') {
        const stepForward = data as StepForwardDetail;
        templateProps.heroImage = stepForward.image_url;
        templateProps.heroImageAlt = stepForward.title;
        templateProps.meta = {
            publishDate: stepForward.date,
            views: stepForward.views
        } as DetailMeta;

        // Map gallery - add main image first, then gallery images
        const galleryImages = [];
        if (stepForward.image_url) {
            galleryImages.push({
                src: stepForward.image_url,
                alt: stepForward.title
            });
        }
        if (stepForward.gallery && Array.isArray(stepForward.gallery)) {
            stepForward.gallery.forEach(imgUrl => {
                galleryImages.push({
                    src: imgUrl,
                    alt: stepForward.title
                });
            });
        }
        if (galleryImages.length > 0) {
            templateProps.gallery = galleryImages;
        }

        templateProps.showSocialShare = true;
        templateProps.showPrintButton = true;
        templateProps.showSidebar = false; // Global sidebar via context
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
    } else if (type === 'media') {
        templateProps.heroImage = data.image;
        templateProps.heroImageAlt = data.title;
        templateProps.meta = {
            publishDate: data.published_at,
            views: data.views,
            category: Array.isArray(data.categories) ? data.categories[0] : data.categories
        } as DetailMeta;

        if (data.gallery && Array.isArray(data.gallery)) {
            templateProps.gallery = data.gallery.map((img: any) => ({
                src: typeof img === 'string' ? img : img.url,
                alt: data.title
            }));
        }

        templateProps.showSocialShare = true;
        templateProps.showPrintButton = true;
        templateProps.showSidebar = false;
    }

    if (type === 'person' || type === 'leadership') {
        return <LeadershipProfile member={data} />;
    }

    if (type === 'spiritual-educational' && data.files && data.files.length > 0) {
        templateProps.files = data.files;
    }

    if (type === 'cultural-event' && data.files && data.files.length > 0) {
        templateProps.files = data.files;
    }

    if (type === 'sports-club-life' && data.files && data.files.length > 0) {
        templateProps.files = data.files;
    }

    if (type === 'cultural-educational-activity' && data.files && data.files.length > 0) {
        templateProps.files = data.files;
    }

    return (
        <DetailTemplate
            {...templateProps}
        />
    );
};

export default GenericDetailPage;
