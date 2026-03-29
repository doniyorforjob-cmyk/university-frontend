import React from 'react';
import Container from '../../components/shared/Container';
import SectionHeader from './components/SectionHeader';
import { AnimatedNewsTabs } from './components/AnimatedNewsTabs';
import { useStandardSection } from './hooks/useStandardSection';
import { homeApi, HomeNewsData } from '../../services/homeService';
import { AspectRatio } from '../../components/ui/aspect-ratio';
import { OptimizedImage } from '../../components/shared';
import { useTranslation } from 'react-i18next';
import { NEWS_TABS } from '../../config/constants';
import { MONTHS, DEFAULT_LOCALE } from '../../constants/dateConstants';
import EmptyState from '../../components/shared/EmptyState';
import { ChevronRightIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { stripHtml } from '../../utils/format';
import { transformNewsData } from './transformers/newsTransformer';
import { SectionSkeleton } from './components/SectionSkeleton';

const AnnouncementsPreview = ({ announcements }: { announcements?: HomeNewsData['announcements'] }) => {
  const { t, i18n } = useTranslation(['common', 'pages']);
  const otherAnnouncements = announcements?.slice(0, 9) || [];

  return (
    <div className="flex flex-col">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-2">{t('common:otherAnnouncements')}</h3>
        <ul className="space-y-3 mt-4 overflow-y-auto max-h-[50rem] pr-2">
          {otherAnnouncements.length > 0 ? (
            otherAnnouncements.map((item: HomeNewsData['announcements'][0]) => {
              const date = new Date(item.date);
              const monthIndex = date.getMonth();
              const currentLang = ['uz', 'en', 'ru'].includes(i18n.language) ? i18n.language : DEFAULT_LOCALE;
              const month = MONTHS[currentLang][monthIndex];
              const day = date.getDate();
              const cleanText = stripHtml(item.text);

              return (
                <li key={item.id}>
                  <a
                    href={`/announcements/${item.slug}`}
                    className="group flex items-center p-3 bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-200"
                  >
                    <div className="flex flex-col items-center justify-center w-16 text-center flex-shrink-0">
                      <span className="text-xs font-bold text-[#0E104B] uppercase tracking-wider">{month}</span>
                      <span className="text-2xl font-extrabold text-gray-800">{day}</span>
                    </div>
                    <div className="w-0.5 h-12 bg-primary/20 mx-4 rounded-full"></div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-bold text-[#0E104B] transition-colors duration-300 leading-tight line-clamp-2">{cleanText}</p>
                    </div>
                  </a>
                </li>
              );
            })
          ) : (
            <EmptyState
              resourceKey="announcements"
              className="min-h-[200px]"
            />
          )}
        </ul>
      </div>
      <div className="mt-auto pt-8 text-center lg:text-right">
        <a
          href="/announcements"
          className="inline-flex items-center text-[#0E104B] font-semibold hover:underline"
        >
          {t('common:seeAllAnnouncements')}
          <ChevronRightIcon className="w-5 h-5 ml-1" />
        </a>
      </div>
    </div>
  );
}

// Sana formatini o'zgartiruvchi funksiya
const formatDate = (dateString?: string, locale: string = 'uz', t: any = (s: any) => s) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const months = t('components:calendar.months', { returnObjects: true }) as string[];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${year} | ${hours}:${minutes}`;
};

const NewsSection = () => {
  const { t, i18n } = useTranslation(['common', 'pages', 'components']);
  const locale = i18n.language;

  // 1. Stabilize Fetcher - Direct reference ensures useStandardSection handles locale consistently
  // Yeni arxitektura: useStandardSection hook
  const { data, loading } = useStandardSection(
    'news',
    homeApi.getCombinedNewsData,
    { transformData: transformNewsData, keepPreviousData: true }
  );

  // 2. Prefetching Logic - Disabled temporarily due to cache pollution issues
  // React.useEffect(() => {
  //   if (!data || loading) return;
  //   const prefetchOtherLocales = async () => { ... };
  //   prefetchOtherLocales();
  // }, [data, loading, locale, cacheManager]);

  // Clean loading - arxitektura prinsipiga muvofiq
  if (loading && !data) {
    return <SectionSkeleton sectionType="news" />;
  }

  if (!data) return null;

  // Render grid for each category
  const renderGrid = (items: any[]) => {
    if (items.length === 0) {
      return (
        <EmptyState
          resourceKey="news"
          icon={<NewspaperIcon className="w-12 h-12 text-slate-300" />}
        />
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {items.slice(0, 6).map((item: any, index: number) => {
          const detailHref = item.category === 'events' ? `/events/${item.slug}`
            : item.category === 'corruption' ? `/corruption/${item.slug}`
              : `/news/${item.slug}`;

          return (
            <a
              key={item.id}
              href={detailHref}
              className="group flex flex-col bg-white overflow-hidden transition-all duration-300 relative shadow-sm h-full"
            >
              {/* Bottom bar animation */}
              <div className="absolute bottom-0 left-0 h-1 bg-secondary w-[10%] group-hover:w-full transition-all duration-700 ease-out z-10"></div>

              <div className="overflow-hidden relative block">
                <AspectRatio ratio={4 / 3} className="bg-gray-50">
                  <OptimizedImage
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={item.image_url}
                    alt={item.title}
                    width={400}
                    height={300}
                    lazy={true}
                  />
                </AspectRatio>
                {/* White triangle overlay */}
                <div className="absolute -bottom-3 left-4 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[30px] border-b-white z-10"></div>
              </div>

              {/* Content */}
              <div className="p-4 pt-6 flex flex-col flex-grow">
                {/* Meta row */}
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-black font-semibold">
                      {formatDate(item.published_at, locale, t)}
                    </span>
                  </span>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 font-medium">{(item.gallery?.length || 0) + (item.image_url ? 1 : 0)}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </a>
          );
        })}
      </div>
    );
  };

  // Tabs array
  const tabs = NEWS_TABS.map(tab => ({
    ...tab,
    label: t(`pages:home.tabs.${tab.id}`) || tab.label, // Dynamic translation
    content: renderGrid((data as any)[tab.id] || [])
  }));

  return (
    <div className="py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: News with Tabs */}
          <div className="lg:col-span-2">
            <SectionHeader
              title={t('pages:news')}
              seeAllLink="/news"
              seeAllText={t('common:seeAllNews')}
              noContainer={true}
            />
            <AnimatedNewsTabs tabs={tabs} defaultTab="news" />
          </div>

          {/* Right Column: Announcements Preview */}
          <div className="lg:col-span-1">
            <AnnouncementsPreview announcements={data?.announcements} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewsSection;
