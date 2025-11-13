import React, { useCallback, useEffect, useState } from 'react';
import { getMediaArticles } from '../../api/mediaApi';
import { MediaArticle } from '../../types/media';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const MediaAboutUsPage: React.FC = () => {
  const { setBannerData, setBreadcrumbsData } = useGlobalLayout();
  const [items, setItems] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMediaArticles();

      const sectionItems: SectionItem[] = data.map((article: MediaArticle) => ({
        id: article.id.toString(),
        title: article.title,
        description: `${article.source} - ${new Date(article.published_at).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}`,
        date: article.published_at,
        href: article.url,
        category: 'OAV'
      }));

      setItems(sectionItems);
    } catch (err) {
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

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

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleItemClick = useCallback((item: SectionItem) => {
    window.open(item.href, '_blank', 'noopener,noreferrer');
  }, []);

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <SectionTemplate
      loading={loading}
      parentTitle="Axborot xizmati"
      sectionTitle="OAV biz haqimizda"
      sectionType="info"
      items={items}
      totalItems={items.length}
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