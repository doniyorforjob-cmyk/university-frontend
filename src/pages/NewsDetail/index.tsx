import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../../services/postService';
import { PostDetail as NewsType } from '../../types/post';
import DetailTemplate, { DetailMeta } from '@/components/templates/DetailTemplate';
import { PageSkeleton } from '@/components/shared';

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
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
  }, [slug]);

  if (loading) {
    return <PageSkeleton type="news" />;
  }

  if (error || !newsItem) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error || 'Yangilik topilmadi'}</p>
              <button
                onClick={() => window.location.href = '/news'}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Yangiliklarga qaytish
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
      showSidebar={true}
      socialShare={{
        facebook: true,
        telegram: true,
        copy: true
      }}
    />
  );
};

export default NewsDetailPage;
