import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../components/shared/Container';
import { facultiesData, Faculty } from '../../api/facultiesApi';
import { FaLaptop, FaCogs, FaBook } from 'react-icons/fa';

const FacultiesSection: React.FC = () => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(8);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const showMoreFaculties = () => {
    setVisibleCount(facultiesData.length);
  };

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === facultiesData.length - 1 ? 0 : prevIndex + 1
          );
          return 0;
        }
        return prev + 1; // Har 40ms da 1% oshadi (4000ms / 100 = 40ms)
      });
    }, 40);

    return () => clearInterval(progressInterval);
  }, [facultiesData.length]);

  const handleCardClick = (index: number) => {
    setCurrentImageIndex(index);
    setProgress(0); // Kartochka bosilganda progressni reset qilish
  };

  return (
    <section className="py-12 transition-colors duration-500">
      <Container>
        {/* Sarlavha (chap tomonda) */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-primary mr-4 rounded"></div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('faculties')}
            </h2>
          </div>
        </div>

        {/* Fakultet kartalari - eski kod */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {facultiesData.slice(0, visibleCount).map((faculty: Faculty, index: number) => {
            const Icon = faculty.icon;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Icon qismi */}
                <div
                  className={`flex items-center justify-center h-16 w-16 rounded-lg bg-gradient-to-br ${faculty.color} mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Nom qismi */}
                <h3 className="text-lg font-semibold text-center text-gray-900 group-hover:text-[#0E104B] transition-colors duration-300">
                  {faculty.name}
                </h3>

                {/* Hoverda chiqadigan pastki chiziq */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-1 bg-primary rounded-full transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* HeroSection dan nusxa olingan content */}
        <div className="grid max-w-screen-xl py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-12 lg:grid-cols-12">
          {/* Chap tomonda 40% kenglik - fakultet kartalari ikki qator */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-[500px]">
            {facultiesData.slice(0, visibleCount).map((faculty: Faculty, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`w-full h-full ${index === currentImageIndex ? 'bg-gradient-to-br from-blue-100 to-indigo-200' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} hover:from-blue-100 hover:to-indigo-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-200 flex flex-col p-6 relative overflow-hidden cursor-pointer`}
                >
                  <div className="flex flex-row items-center h-full text-left">
                    <img
                      src={faculty.iconImage}
                      alt={faculty.name}
                      className="w-12 h-12 rounded-lg object-cover mr-4 flex-shrink-0"
                      onError={(e) => {
                        // Agar rasm yuklanmasa, fallback icon ko'rsatish
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'w-12 h-12 rounded-lg bg-gray-300 flex items-center justify-center mr-4 flex-shrink-0';
                        fallback.innerHTML = '📚';
                        target.parentNode?.insertBefore(fallback, target);
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 break-words">{faculty.name}</h3>
                      {/* <p className="text-sm text-gray-600 leading-relaxed break-words mt-2">{faculty.description}</p> */}
                    </div>
                  </div>
                  {/* Progress bar - faqat active holatda ko'rinadi */}
                  {index === currentImageIndex && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* O'ng tomonda to'liq kenglik - rasm carousel */}
          <div className="lg:col-span-7 lg:flex relative ml-8">
            <div className="relative w-full h-[500px] overflow-hidden rounded-3xl shadow-lg">
              {facultiesData.slice(0, visibleCount).map((faculty: Faculty, index: number) => (
                <img
                  key={index}
                  src={faculty.image || 'https://picsum.photos/600/400'}
                  alt={faculty.name}
                  className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* "Ko‘proq ko‘rish" tugmasi */}
        {visibleCount < facultiesData.length && (
          <div className="text-center mt-12">
            <button
              onClick={showMoreFaculties}
              className="bg-primary text-white font-semibold py-3 px-10 rounded-full shadow-md hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1"
            >
              {t('seeAll')}
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default FacultiesSection;