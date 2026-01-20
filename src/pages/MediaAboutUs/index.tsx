import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getMediaArticles } from '../../services/mediaService';
import { MediaArticle } from '../../types/media.types';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';
import MediaMentionCard from './components/MediaMentionCard';
import Container from '@/components/shared/Container';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// Media About Us ma'lumotlarini olish funksiyasi
const fetchMediaData = async (): Promise<MediaArticle[]> => {
  return await getMediaArticles();
};

const MediaAboutUsPage: React.FC = () => {
  const { t } = useTranslation(['common', 'pages']);
  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  const { data: items, loading, error } = useStandardPage(
    'media-about-us',
    fetchMediaData
  );

  useEffect(() => {
    setBreadcrumbsData([
      { label: t('home'), href: '/' },
      { label: t('pages:infoService'), href: '#' },
      { label: t('pages:mediaResources') }
    ]);

    setSidebarType('info');

    return () => {
      setBreadcrumbsData(undefined);
      setSidebarType(undefined);
    };
  }, [setBreadcrumbsData, setSidebarType, t]);

  // Filter articles by category
  const filteredArticles = React.useMemo(() => {
    let result = (items || []);
    if (activeCategory !== 'all') {
      result = result.filter((item: MediaArticle) =>
        (item.categories || []).map((c: string) => c.toLowerCase()).includes(activeCategory.toLowerCase()) ||
        (item.type && item.type.toLowerCase() === activeCategory.toLowerCase())
      );
    }
    // Sort articles by date (descending)
    return [...result].sort((a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
  }, [items, activeCategory]);

  const sortedArticles = filteredArticles;

  if (loading) {
    return <GenericPageSkeleton showSidebar={false} showBanner={false} layoutType="grid" gridItems={6} />;
  }

  if (error) {
    return (
      <Container className="py-20 text-center">
        <div className="bg-red-50 text-red-600 p-8 rounded-2xl inline-block max-w-md border border-red-100">
          <h2 className="text-2xl font-bold mb-2">{t('error_title', 'Xatolik yuz berdi')}</h2>
          <p>{error?.message || t('no_info')}</p>
        </div>
      </Container>
    );
  }

  // Pagination logic: Page 1 has 5 items, subsequent pages have 6 items
  const totalItems = sortedArticles.length;
  // Calculate total pages: Page 1 covers 5 items, remaining items covered by 6 per page
  const totalPages = totalItems <= 5 ? 1 : 1 + Math.ceil((totalItems - 5) / 6);

  let startIndex = 0;
  let endIndex = 5;

  if (currentPage > 1) {
    startIndex = 5 + (currentPage - 2) * 6;
    endIndex = startIndex + 6;
  }

  const currentItems = sortedArticles.slice(startIndex, endIndex);

  // Featured is only for the first page
  const featuredArticle = currentPage === 1 ? currentItems[0] : null;
  const remainingArticles = currentPage === 1 ? currentItems.slice(1) : currentItems;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="media-about-us-redesign pb-8">

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10">
        {[
          { id: 'all', label: t('all', 'Barchasi') },
          { id: 'oav', label: t('media_types.online', 'OAV') },
          { id: 'gazeta', label: t('media_types.print', 'Gazeta') },
          { id: 'tv', label: t('media_types.tv', 'TV') }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setCurrentPage(1);
            }}
            className={`px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 border-2 ${activeCategory === cat.id
              ? 'bg-primary border-primary text-white shadow-lg'
              : 'bg-white border-gray-100 text-gray-500 hover:border-primary/30 hover:text-primary'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Featured Mention */}
      {featuredArticle && (
        <section className="mb-16">
          <MediaMentionCard article={featuredArticle} isFeatured={true} />
        </section>
      )}

      {/* Grid of Remaining Mentions */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-primary"></span>
          {t('pages:articlesArchive')}
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
          {remainingArticles.map((article) => (
            <MediaMentionCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Pagination component */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                  />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* No Data Fallback */}
      {(!items || items.length === 0) && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">{t('no_info')}</p>
        </div>
      )}
    </div>
  );
};

export default MediaAboutUsPage;