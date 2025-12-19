import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { getPostBySlug } from '../../services/postService';
import { PostDetail as NewsType } from '../../types/post.types';
import DetailTemplate, { DetailMeta } from '@/components/templates/DetailTemplate';
import { PageSkeleton } from '@/components/shared';
import NotFound from '@/pages/Errors/NotFound';

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setSidebarType } = useGlobalLayout();
  const [newsItem, setNewsItem] = useState<NewsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      if (!slug) {
        setError('Yangilik topilmadi.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getPostBySlug(slug);
        if (data) {
          setNewsItem(data);
        } else {
          setError('Yangilik topilmadi.');
        }
      } catch (err) {
        setError('Yangilikni yuklashda xatolik yuz berdi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();

    setSidebarType('info');
    return () => {
      setSidebarType(undefined);
    };
  }, [slug, setSidebarType]);

  if (loading) {
    return <PageSkeleton type="news" />;
  }

  if (error || !newsItem) {
    return <NotFound />;
  }

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
        { label: 'Bosh sahifa', href: '/' },
        { label: 'Yangiliklar', href: '/news' },
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
