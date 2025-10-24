import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, EyeIcon } from '@heroicons/react/24/outline';

// Ma'lumotlar uchun interfeys
interface DataItem {
  id: number;
  title: string;
  date: string;
  image: string;
  views: number;
}

// Soxta ma'lumotlar (keyinchalik API'dan olinadi)
const newsData: DataItem[] = [
  { id: 1, title: 'Universitetda yangi o\\\'quv yili boshlandi', date: '04.09.2023', image: 'https://picsum.photos/seed/news1/300/200', views: 256 },
  { id: 2, title: 'Talabalar uchun sport musobaqalari', date: '05.09.2023', image: 'https://picsum.photos/seed/news2/300/200', views: 345 },
  { id: 3, title: 'Xalqaro konferensiya o\\\'tkazildi', date: '06.09.2023', image: 'https://picsum.photos/seed/news3/300/200', views: 189 },
  { id: 4, title: 'Yangi laboratoriya ochildi', date: '07.09.2023', image: 'https://picsum.photos/seed/news4/300/200', views: 432 },
  { id: 5, title: 'Bitiruvchilar bilan uchrashuv', date: '08.09.2023', image: 'https://picsum.photos/seed/news5/300/200', views: 512 },
  { id: 6, title: 'Ochiq eshiklar kuni', date: '09.09.2023', image: 'https://picsum.photos/seed/news6/300/200', views: 678 },
];

const announcementsData: DataItem[] = [
  { id: 1, title: 'Qishki qabul komissiyasi o\\\'z ishini boshladi', date: '15.12.2023', image: 'https://picsum.photos/seed/ann1/300/200', views: 789 },
  { id: 2, title: 'Magistratura uchun hujjatlar qabuli', date: '16.12.2023', image: 'https://picsum.photos/seed/ann2/300/200', views: 654 },
  // ... boshqa e'lonlar
];

const antiCorruptionData: DataItem[] = [
    { id: 1, title: 'Korrupsiyaga qarshi kurash oyligi', date: '01.12.2023', image: 'https://picsum.photos/seed/cor1/300/200', views: 321 },
    // ... boshqa ma'lumotlar
];

const eventsData: DataItem[] = [
    { id: 1, title: 'Navro\\\'z bayrami tadbirlari', date: '21.03.2024', image: 'https://picsum.photos/seed/evt1/300/200', views: 987 },
    { id: 2, title: 'Mustaqillik kuni konserti', date: '01.09.2024', image: 'https://picsum.photos/seed/evt2/300/200', views: 1234 },
];

const sportData: DataItem[] = [
    { id: 1, title: 'Universitetlararo futbol musobaqasi', date: '15.04.2024', image: 'https://picsum.photos/seed/spt1/300/200', views: 567 },
    { id: 2, title: 'Stol tennisi bo\\\'yicha chempionat', date: '20.04.2024', image: 'https://picsum.photos/seed/spt2/300/200', views: 432 },
];


// Tablar uchun tip
type TabId = 'news' | 'announcements' | 'corruption' | 'events' | 'sport';


const NewsSection = () => {
  const [activeTab, setActiveTab] = useState<TabId>('news');

  const tabs: { id: TabId; label: string }[] = [
    { id: 'news', label: 'Yangiliklar' },
    { id: 'announcements', label: 'E\'lonlar' },
    { id: 'corruption', label: 'Korrupsiyaga qarshi kurashish' },
    { id: 'events', label: 'Tadbirlar' },
    { id: 'sport', label: 'Sport' },
  ];

  const dataMap: Record<TabId, DataItem[]> = {
    news: newsData,
    announcements: announcementsData,
    corruption: antiCorruptionData,
    events: eventsData,
    sport: sportData,
  };

  const currentData = dataMap[activeTab];

  return (
    <div className="py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-1 bg-primary h-8 mr-4"></div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Yangiliklar
            </h2>
          </div>
          <Link to="/news" className="inline-flex items-center text-primary font-semibold hover:underline">
            Barchasini ko'rish
            <ChevronRightIcon className="w-5 h-5 ml-1" />
          </Link>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mx-8 -mb-8">
            {currentData.map(item => (
              <Link
                to={`/news/${item.id}`}
                key={item.id}
                className="flex flex-col bg-white shadow-lg overflow-hidden transition-transform duration-300 hover:translate-y-2 hover:shadow-xl border-b-4 border-secondary"
              >
                <img src={item.image} alt={item.title} className="w-full aspect-square object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>{item.date}</span>
                    <div className="flex items-center">
                      <EyeIcon className="w-5 h-5 mr-1 text-gray-400" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <div className="mt-auto flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold bg-gray-100 text-gray-600 py-1 px-3 rounded-full">
                        {tabs.find(t => t.id === activeTab)?.label}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <a href="#" className="text-gray-400 hover:text-blue-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-blue-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.027 2.07 3.868-.76-.025-1.475-.232-2.1-.586v.062c0 2.256 1.605 4.14 3.737 4.568-.39.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.307 3.2 4.34 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.096 7.14 2.096 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/></svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-blue-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.18l15.97-5.85c.73-.27 1.36.17 1.15.94l-3.22 14.23c-.19.83-.74 1.02-1.4.63l-4.32-3.18-2.05 1.97c-.24.23-.44.44-.8.44z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;