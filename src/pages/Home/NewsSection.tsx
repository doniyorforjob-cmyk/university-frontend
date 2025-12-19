import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import Container from '../../components/shared/Container';
import SectionHeader from './components/SectionHeader';
import { AnimatedNewsTabs } from './components/AnimatedNewsTabs';
import { useStandardSection } from './hooks/useStandardSection';
import { homeApi, HomeNewsData } from '../../services/homeService';
import { PostCategory } from '../../types/post.types';
import { AspectRatio } from '../../components/ui';
import { OptimizedImage } from '../../components/shared';
import { useTranslation } from 'react-i18next';
import { AOS_CONFIG, NEWS_TABS } from '../../config/constants';

const AnnouncementsPreview = ({ announcements }: { announcements?: HomeNewsData['announcements'] }) => {
  const { t, i18n } = useTranslation();
  const otherAnnouncements = announcements?.slice(0, 10) || [];

  return (
    <div className="flex flex-col">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-2">{t('otherAnnouncements')}</h3>
        <ul className="space-y-3 mt-4 overflow-y-auto max-h-[36rem] pr-2" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
          {otherAnnouncements.map((item: HomeNewsData['announcements'][0]) => {
            const date = new Date(item.date);
            const month = date.toLocaleDateString(i18n.language, { month: 'short' });
            const day = date.getDate();
            const truncatedDescription = item.description.length > 60 ? item.description.substring(0, 60) + '...' : item.description;

            return (
              <li key={item.id}>
                <Link to={`/announcements/${item.id}`} className="group flex items-center p-3 bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-200">
                  <div className="flex flex-col items-center justify-center w-16 text-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#0E104B] uppercase tracking-wider">{month}</span>
                    <span className="text-2xl font-extrabold text-gray-800">{day}</span>
                  </div>
                  <div className="w-0.5 h-12 bg-primary/20 mx-4 rounded-full"></div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-[#0E104B] transition-colors duration-300 leading-tight truncate">{item.text}</p>
                    <p className="text-sm text-gray-600 mt-1 truncate">{truncatedDescription}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-auto pt-8 text-center lg:text-right">
        <Link to="/announcements" className="inline-flex items-center text-[#0E104B] font-semibold hover:underline">
          {t('seeAllAnnouncements')}
          <ChevronRightIcon className="w-5 h-5 ml-1" />
        </Link>
      </div>
    </div>
  );
}

// Sana formatini o'zgartiruvchi funksiya
const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${year} | ${hours}:${minutes}`;
};

const NewsSection = () => {
  const { t } = useTranslation();

  // Yangi arxitektura: useStandardSection hook
  const { data, loading, isCached } = useStandardSection(
    'news',
    homeApi.getNewsData
  );

  // Clean loading - arxitektura prinsipiga muvofiq
  if (loading || !data) {
    return null; // Section butunlay yashirin, loading ko'rsatilmaydi
  }

  // Render grid for each category
  const renderGrid = (items: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.slice(0, 6).map((item: any, index: number) => (
        <div
          key={item.id}
          className="group relative overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
          {...(AOS_CONFIG.enabled && {
            'data-aos': AOS_CONFIG.defaultAnimation,
            'data-aos-delay': `${index * AOS_CONFIG.staggerDelay}`,
            'data-aos-duration': AOS_CONFIG.defaultDuration,
          })}
        >
          <Link to={`/news/${item.slug}`} className="block h-full">
            <AspectRatio ratio={1 / 1}>
              <OptimizedImage
                className="w-full h-full object-cover"
                src={item.image_url}
                alt={item.title}
                width={400}
                height={400}
                lazy={true}
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <div className="flex items-center text-sm text-gray-300 mb-2">
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                <time dateTime={item.published_at}>{formatDate(item.published_at)}</time>
              </div>
              <h3 className="text-lg font-bold text-card-title group-hover:text-white transition-colors duration-300 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-200 mt-2 opacity-0 max-h-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out line-clamp-3">
                {item.description}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );

  // Tabs array
  const tabs = NEWS_TABS.map(tab => ({
    ...tab,
    content: renderGrid((data as any)[tab.id] || [])
  }));

  return (
    <div className="py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: News with Tabs */}
          <div className="lg:col-span-2">
            <SectionHeader
              title={t('news')}
              seeAllLink="/news"
              seeAllText={t('seeAllNews')}
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
