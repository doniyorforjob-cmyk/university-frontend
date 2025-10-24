import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const services = [
  {
    title: 'Elektron Kutubxona',
    description: 'Universitetning boy elektron kutubxona resurslaridan foydalaning.',
    href: '/library',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-9-5.494h18M12 6.253c-4.418 0-8 2.015-8 4.5s3.582 4.5 8 4.5 8-2.015 8-4.5z"></path>
      </svg>
    ),
  },
  {
    title: 'Masofaviy Ta\'lim',
    description: 'Masofaviy ta\'lim platformasi orqali darslarda ishtirok eting.',
    href: '/distance-learning',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
  },
  {
    title: 'Onlayn Qabul',
    description: 'Hujjatlarni onlayn topshiring va qabul jarayonini kuzatib boring.',
    href: '/admission',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    ),
  },
  {
    title: 'Talabalar Portali',
    description: 'Shaxsiy kabinetingiz orqali o\'quv jarayoningizni boshqaring.',
    href: '/student-portal',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    ),
  },
  {
    title: 'Rektorga Murojaat',
    description: 'Savol va takliflaringizni to\'g\'ridan-to\'g\'ri rektorga yo\'llang.',
    href: '/contact-rector',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
  },
  {
    title: 'Karyera Markazi',
    description: 'Ishga joylashish va amaliyot o\'tash uchun mavjud imkoniyatlar.',
    href: '/career-center',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
  },
];

const InteractiveServicesSection = () => {
  const { t } = useTranslation();
  return (
    <div className="py-12">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-1 bg-primary h-8 mr-4"></div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {t('interactiveServices')}
            </h2>
          </div>
          <Link to="/services" className="inline-flex items-center text-primary font-semibold hover:underline">
            {t('seeAllServices')}
            <ChevronRightIcon className="w-5 h-5 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link to={service.href} key={service.title} className="group">
                <div className="h-full p-6 bg-white rounded-lg transform hover:-translate-y-2 transition-all duration-300 flex flex-row items-start shadow-lg hover:shadow-2xl border border-gray-200 hover:border-blue-500">
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-blue-600 to-blue-800 text-white transform transition-transform duration-300 group-hover:scale-110">
                            {service.icon}
                        </div>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                        <p className="mt-2 text-base text-gray-500">{service.description}</p>
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveServicesSection;