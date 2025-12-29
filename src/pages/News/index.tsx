import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPosts } from '../../services/postService';
import { Post } from '../../types/post.types';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';
import ServerError from '@/pages/Errors/ServerError';
import { useLocale } from '@/contexts/LocaleContext';
import { useGlobalCache } from '@/components/providers/CachedApiProvider';

// News ma'lumotlarini olish funksiyasi
const fetchNewsData = async (locale?: string): Promise<SectionItem[]> => {
  const data = await getPosts('news', locale);

  // Post[] ni SectionItem[] ga o'zgartirish
  const sectionItems: SectionItem[] = data.map((post: Post) => ({
    id: post.id.toString(),
    title: post.title,
    description: post.description || '',
    date: post.published_at,
    image: post.image_url,
    href: `/news/${post.slug}`,
    category: 'Yangilik'
  }));

  return sectionItems;
};

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'pages']);
  const { setBannerData, setBreadcrumbsData, setSidebarType } = useGlobalLayout();
  const { locale } = useLocale();
  const { cacheManager } = useGlobalCache();
  const { data: items, loading, error, refetch } = useStandardPage(
    'news',
    () => fetchNewsData(locale)
  );

  // Background prefetching for other locales
  useEffect(() => {
    if (!items || items.length === 0) return;

    const otherLocales = ['uz', 'ru', 'en'].filter(l => l !== locale);

    otherLocales.forEach(async (targetLocale) => {
      const cacheKey = `news-data-${targetLocale}`;
      if (!cacheManager.has(cacheKey)) {
        try {
          console.log(`Prefetching news for ${targetLocale}...`);
          const data = await fetchNewsData(targetLocale);
          cacheManager.set(cacheKey, data, 5); // 5 minutes TTL
        } catch (e) {
          console.warn(`Failed to prefetch news for ${targetLocale}`, e);
        }
      }
    });
  }, [items, locale, cacheManager]);

  useEffect(() => {
    setBreadcrumbsData([
      { label: t('home'), href: '/' },
      { label: t('pages:infoService'), href: '#' },
      { label: t('pages:news') }
    ]);

    setSidebarType('info');

    return () => {
      setBreadcrumbsData(undefined);
      setSidebarType(undefined);
    };
  }, [setBreadcrumbsData, setSidebarType, locale]);


  const handleItemClick = useCallback((item: SectionItem) => {
    navigate(item.href);
  }, [navigate]);

  if (error) {
    return <ServerError />;
  }

  return (
    <SectionTemplate
      loading={loading}
      parentTitle={t('pages:infoService')}
      sectionTitle={t('pages:news')}
      sectionType="news"
      items={items || []}
      totalItems={(items || []).length}
      layoutType="grid"
      itemsPerPage={12}
      showSearch={false}
      showPagination={true}
      showSorting={true}
      onItemClick={handleItemClick}
    />
  );
};

export default NewsPage;
