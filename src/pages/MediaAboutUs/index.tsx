import React, { useCallback, useEffect } from 'react';
import { getMediaArticles } from '../../api/mediaApi';
import { MediaArticle } from '../../types/media';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';

// Media ma'lumotlarini olish funksiyasi
const fetchMediaData = async (): Promise<SectionItem[]> => {
  const data = await getMediaArticles();

  const sectionItems: SectionItem[] = data.map((article: MediaArticle) => ({
    id: article.id.toString(),
    title: article.title,
    description: `${article.source} - ${new Date(article.published_at).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    date: article.published_at,
    href: article.url,
    category: 'OAV'
  }));

  return sectionItems;
};

const MediaAboutUsPage: React.FC = () => {
  const { setBannerData, setBreadcrumbsData } = useGlobalLayout();
  const { data: items, loading, error, refetch } = useStandardPage(
    'media-about-us',
    fetchMediaData
  );

  useEffect(() => {
    setBannerData({
      title: "OAV biz haqimizda",
      subtitle: "Universitetimiz faoliyati haqida ommaviy axborot vositalarida chop etilgan maqolalar, reportajlar va intervyular to'plami",
      backgroundImage: "https://images.unsplash.com/photo-1457369804613-52c1a468e7d?q=80&w=2070&auto=format&fit=crop"
    });
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Axborot xizmati', href: '#' },
      { label: 'OAV biz haqimizda' }
    ]);

    return () => {
      setBannerData(undefined);
      setBreadcrumbsData(undefined);
    };
  }, [setBannerData, setBreadcrumbsData]);

  const handleItemClick = useCallback((item: SectionItem) => {
    window.open(item.href, '_blank', 'noopener,noreferrer');
  }, []);

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error?.message || 'Ma\'lumot topilmadi'}</p>
      </div>
    );
  }

  return (
    <SectionTemplate
      loading={loading}
      parentTitle="Axborot xizmati"
      sectionTitle="OAV biz haqimizda"
      sectionType="info"
      items={items || []}
      totalItems={(items || []).length}
      layoutType="list"
      itemsPerPage={12}
      showSearch={false}
      showPagination={true}
      showSorting={false}
      onItemClick={handleItemClick}
    />
  );
};

export default MediaAboutUsPage;