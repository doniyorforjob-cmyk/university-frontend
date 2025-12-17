import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../../services/postService';
import { Post } from '../../types/post.types';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';

// News ma'lumotlarini olish funksiyasi
const fetchNewsData = async (): Promise<SectionItem[]> => {
  const data = await getPosts('news');

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
  const { setBannerData, setBreadcrumbsData } = useGlobalLayout();
  const { data: items, loading, error, refetch } = useStandardPage(
    'news',
    fetchNewsData
  );

  useEffect(() => {
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Axborot xizmati', href: '#' },
      { label: 'Yangiliklar' }
    ]);

    return () => {
      setBreadcrumbsData(undefined);
    };
  }, [setBreadcrumbsData]);


  const handleItemClick = useCallback((item: SectionItem) => {
    navigate(item.href);
  }, [navigate]);

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
      sectionTitle="Yangiliklar"
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
