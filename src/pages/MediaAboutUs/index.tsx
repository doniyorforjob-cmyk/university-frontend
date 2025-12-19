import React, { useEffect } from 'react';
import { getMediaArticles } from '../../services/mediaService';
import { MediaArticle } from '../../types/media.types';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';
import MediaMentionCard from './components/MediaMentionCard';
import Container from '@/components/shared/Container';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';

// Media About Us ma'lumotlarini olish funksiyasi
const fetchMediaData = async (): Promise<MediaArticle[]> => {
  return await getMediaArticles();
};

const MediaAboutUsPage: React.FC = () => {
  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();

  const { data: items, loading, error } = useStandardPage(
    'media-about-us',
    fetchMediaData
  );

  useEffect(() => {
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Axborot xizmati', href: '#' },
      { label: 'OAV biz haqimizda' }
    ]);

    setSidebarType('info');

    return () => {
      setBreadcrumbsData(undefined);
      setSidebarType(undefined);
    };
  }, [setBreadcrumbsData, setSidebarType]);

  if (loading) {
    return <GenericPageSkeleton showSidebar={false} showBanner={false} layoutType="grid" gridItems={6} />;
  }

  if (error) {
    return (
      <Container className="py-20 text-center">
        <div className="bg-red-50 text-red-600 p-8 rounded-2xl inline-block max-w-md border border-red-100">
          <h2 className="text-2xl font-bold mb-2">Xatolik yuz berdi</h2>
          <p>{error?.message || 'Ma\'lumotlarni yuklab bo\'lmadi'}</p>
        </div>
      </Container>
    );
  }

  // Sort articles by date (descending)
  const sortedArticles = [...(items || [])].sort((a, b) =>
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  const featuredArticle = sortedArticles[0];
  const remainingArticles = sortedArticles.slice(1);

  return (
    <div className="media-about-us-redesign py-8">
      {/* Page Header */}
      <div className="mb-12 border-b border-gray-100 pb-6">
        <h1 className="text-3xl md:text-4xl font-black text-[#0E104B] mb-2 tracking-tight">
          OAV biz haqimizda
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Namangan davlat texnika universiteti faoliyati haqida mahalliy va xalqaro ommaviy axborot vositalarida yoritilgan eng so&apos;nggi xabarlar.
        </p>
      </div>

      {/* Featured Mention */}
      {featuredArticle && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
              Eng so&apos;nggi coverage
            </h2>
          </div>
          <MediaMentionCard article={featuredArticle} isFeatured={true} />
        </section>
      )}

      {/* Grid of Remaining Mentions */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-primary"></span>
          Maqolalar arxivi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {remainingArticles.map((article) => (
            <MediaMentionCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* No Data Fallback */}
      {(!items || items.length === 0) && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">Hozircha maqolalar mavjud emas.</p>
        </div>
      )}
    </div>
  );
};

export default MediaAboutUsPage;