import React from 'react';
import { Link } from 'react-router-dom';
import { newsItems } from '../../components/Layout/Header/data';
import { CalendarDaysIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Container from '../../components/Container';

const AnnouncementsSection = () => {
  const mainAnnouncements = newsItems.slice(0, 4); // First 4 for cards
  const otherAnnouncements = newsItems.slice(4); // The rest for the list

  return (
    <div className="bg-gray-50 py-16">
      <Container>
        <div className="flex items-center mb-12">
          <div className="w-1 bg-primary h-8 mr-4"></div>
          <h2 className="text-fluid-h2 font-bold tracking-tight text-gray-900">
            E&apos;lonlar
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Main Announcements Cards (Left) */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {mainAnnouncements.map((announcement) => (
              <div key={announcement.id} className="group relative rounded-lg overflow-hidden shadow-lg h-64 transform hover:-translate-y-2 transition-transform duration-300">
                <Link to={`/announcements/${announcement.id}`} className="block h-full">
                  <img 
                    className="w-full h-full object-cover" 
                    src={announcement.image} 
                    alt={announcement.text} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <div className="flex items-center text-sm text-gray-300 mb-2">
                      <CalendarDaysIcon className="w-5 h-5 mr-2" />
                      <time dateTime={announcement.date}>{new Date(announcement.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {announcement.text}
                    </h3>
                    <p className="text-sm text-gray-200 mt-2 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
                      {announcement.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Announcements List (Right) */}
          <div className="flex flex-col lg:col-span-2">
            <div>
              <h3 className="text-fluid-h3 font-bold text-gray-900 mb-4 border-b-2 border-primary pb-2">Boshqa e&apos;lonlar</h3>
              <ul className="space-y-3 mt-4 overflow-y-auto max-h-[450px] pr-2">
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
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">{month}</span>
                          <span className="text-2xl font-extrabold text-gray-800">{day}</span>
                        </div>
                        
                        <div className="w-0.5 h-12 bg-primary/20 mx-4 rounded-full"></div>

                        <div className="flex-1 overflow-hidden">
                          <p className="font-bold text-primary transition-colors duration-300 leading-tight truncate">{item.text}</p>
                          <p className="text-sm text-gray-600 mt-1 truncate">{truncatedDescription}</p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-auto pt-8 text-center lg:text-right">
              <Link to="/announcements" className="inline-flex items-center text-primary font-semibold hover:underline">
                Barcha e&apos;lonlarni ko&apos;rish
                <ChevronRightIcon className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AnnouncementsSection;