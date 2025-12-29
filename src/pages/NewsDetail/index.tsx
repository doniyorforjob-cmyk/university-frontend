import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { getPostBySlug } from '../../services/postService';
import { PostDetail as NewsType } from '../../types/post.types';
import DetailTemplate, { DetailMeta } from '@/components/templates/DetailTemplate';
import { PageSkeleton } from '@/components/shared';
import NotFound from '@/pages/Errors/NotFound';
import { CACHE_CONFIG } from '../../config/constants';
import { useCachedApi } from '../../hooks/useCachedApi';
import { useLocale } from '../../contexts/LocaleContext';

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { post?: NewsType };
  const { setSidebarType } = useGlobalLayout();
  const { locale } = useLocale();
  const { t } = useTranslation(['common', 'pages']);

  // Keshlashni ishlatish
  const { data: cachedData, loading: cacheLoading, error } = useCachedApi<NewsType>({
    key: `${CACHE_CONFIG.KEYS.NEWS_DETAIL}-${slug}`,
    fetcher: () => getPostBySlug(slug!, locale),
    enabled: !!slug,
    ttlMinutes: CACHE_CONFIG.NEWS_DETAIL.ttlMinutes, // Konfiguratsiyadan olinadi
    keepPreviousData: true
  });

  // Agar keshdan ma'lumot kelsa o'shani, bo'lmasa state'dan kelgan "tezkor" ma'lumotni ko'rsatamiz
  const newsItem = cachedData || state?.post;
  // Agar bizda na keshda, na state'da ma'lumot bo'lsa va hali yuklanayotgan bo'lsa -> loading
  const loading = cacheLoading && !newsItem;

  useEffect(() => {
    setSidebarType('info');
    return () => {
      setSidebarType(undefined);
    };
  }, [setSidebarType]);

  // Redirect logic if item not found
  useEffect(() => {
    if (!loading && !newsItem && !error) {
      // Agar yangilik topilmasa, umumiy yangiliklar sahifasiga qaytarish
      const targetPath = locale === 'uz' ? '/news' : `/${locale}/news`;
      console.warn('News item not found in this locale, redirecting to list...');
      navigate(targetPath, { replace: true });
    }
  }, [loading, newsItem, error, locale, navigate]);

  if (loading) {
    return <PageSkeleton type="news" />;
  }

  // Agar xatolik bo'lsa yoki redirect kutilayotgan bo'lsa, bo'sh qaytaramiz (NotFound o'rniga)
  if (error || (!loading && !newsItem)) {
    return null; // Redirect amalga oshmoqda
  }

  // Type guard: newsItem null bo'lishi mumkinligini tekshiramiz
  if (!newsItem) return null;

  const meta: DetailMeta = {
    publishDate: newsItem.published_at,
    author: newsItem.author?.name,
    category: newsItem.category,
    views: newsItem.views
  };

  return (
    <DetailTemplate
      title={newsItem.title}
      contentType="news"
      heroImage={newsItem.image_url}
      heroImageAlt={newsItem.title}
      content={newsItem.content}
      meta={meta}
      breadcrumbs={[
        { label: t('home'), href: '/' },
        { label: t('pages:news'), href: '/news' },
        { label: newsItem.title }
      ]}
      showMeta={true}
      showSocialShare={true}
      showPrintButton={true}
      showComments={false}
      showSidebar={false}
      socialShare={{
        facebook: true,
        telegram: true,
        copy: true
      }}
    />
  );
};

export default NewsDetailPage;
