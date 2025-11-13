import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../../services/postService';
import { Post } from '../../types/post';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { setBannerData, setBreadcrumbsData } = useGlobalLayout();
  const [items, setItems] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBannerData({
      title: "Yangiliklar",
      subtitle: "Universitet hayotidagi eng so'nggi voqealar va yangiliklar",
      backgroundImage: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop"
    });
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Axborot xizmati', href: '#' },
      { label: 'Yangiliklar' }
    ]);

    return () => {
      setBannerData(undefined);
      setBreadcrumbsData(undefined);
    };
  }, [setBannerData, setBreadcrumbsData]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
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

        setItems(sectionItems);
      } catch (err) {
        setError('Yangiliklarni yuklashda xatolik yuz berdi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleItemClick = useCallback((item: SectionItem) => {
    navigate(item.href);
  }, [navigate]);

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
      sectionTitle="Yangiliklar"
      sectionType="news"
      items={items}
      totalItems={items.length}
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
