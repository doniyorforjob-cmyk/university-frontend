import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import Container from '../../components/shared/Container';
import { useNewsData } from '../../hooks/useNewsData';
import { PostCategory } from '../../types/post';
import { newsItems } from '../../api/navbarApi';
import { AspectRatio } from '../../components/ui';
import { OptimizedImage } from '../../components/shared';

const tabs: { id: PostCategory; label: string }[] = [
  { id: 'news', label: 'Yangiliklar' },
  { id: 'announcements', label: 'E`lonlar' },
  { id: 'corruption', label: 'Korrupsiyaga qarshi kurashish' },
  { id: 'events', label: 'Tadbirlar' },
  { id: 'sport', label: 'Sport' },
];

const AnnouncementsPreview = () => {
    const otherAnnouncements = newsItems.slice(0, 10);

    return (
        <div className="flex flex-col">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary pb-2">Boshqa e&apos;lonlar</h3>
                <ul className="space-y-3 mt-4 overflow-y-auto max-h-[36rem] pr-2">
                    {otherAnnouncements.map((item) => {
                        const date = new Date(item.date);
                        const uzbekMonths = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
                        const month = uzbekMonths[date.getMonth()];
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
                    Barcha e&apos;lonlarni ko&apos;rish
                    <ChevronRightIcon className="w-5 h-5 ml-1" />
                </Link>
            </div>
        </div>
    );
}


const NewsSection = () => {
  const [activeTab, setActiveTab] = useState<PostCategory>('news');
  const { data: currentData, loading, error } = useNewsData(activeTab);

  return (
    <div className="py-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: News with Tabs */}
            <div className="lg:col-span-2">
                <div className="mb-8 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-1 bg-primary h-8 mr-4"></div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Yangiliklar
                    </h2>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 overflow-hidden">
                  {/* Tablar */}
                  <div className="flex justify-start mb-12">
                    <div className="flex flex-wrap items-center gap-4">
                      {tabs.map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-3 px-6 text-base font-medium rounded-lg transition-colors duration-300 ${
                            activeTab === tab.id
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kartochkalar Grid */}
                  {loading && <div className="text-center">Yuklanmoqda...</div>}
                  {error && <div className="text-center text-red-500">{error}</div>}
                  {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {currentData.slice(0, 6).map(item => (
                        <div key={item.id} className="group relative rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                          <Link to={`/news/${item.slug}`} className="block h-full">
                            <AspectRatio ratio={1 / 1}>
                              <OptimizedImage
                                className="w-full h-full object-cover rounded-lg"
                                src={item.image_url}
                                alt={item.title}
                                width={400}
                                height={400}
                                lazy={true}
                              />
                            </AspectRatio>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-lg"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                              <div className="flex items-center text-sm text-gray-300 mb-2">
                                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                                <time dateTime={item.published_at}>{new Date(item.published_at).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
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
                  )}
                </div>
                <div className="mt-12 text-center">
                    <Link
                        to="/news"
                        className="inline-block bg-primary text-white font-semibold py-3 px-10 rounded-full shadow-md hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Barchasini ko&apos;rish
                    </Link>
                </div>
            </div>

            {/* Right Column: Announcements Preview */}
            <div className="lg:col-span-1">
                <AnnouncementsPreview />
            </div>
        </div>
      </Container>
    </div>
  );
};

export default NewsSection;
