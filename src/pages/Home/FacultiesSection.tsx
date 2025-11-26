import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../components/shared/Container';
import { facultiesData, Faculty } from '../../api/facultiesApi';
import { Button } from '@/components/ui/button'; // Button import
import { OptimizedImage } from '../../components/shared';

const FacultiesSection: React.FC = () => {
  const { t } = useTranslation();
  const [visibleCount, setVisibleCount] = useState(8);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const showMoreFaculties = () => {
    setVisibleCount(facultiesData.length);
  };

  useEffect(() => {
    setProgress(0);
  }, [currentImageIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentImageIndex((i) => (i + 1) % visibleCount);
          return 0;
        }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [currentImageIndex, visibleCount]);

  const handleCardInteraction = (index: number) => {
    if (index >= visibleCount) return;
    setCurrentImageIndex(index);
  };

  return (
    <>
      {/* SARLAVHA */}
      <div className="py-6">
        <Container>
          <div className="flex items-center">
            <div className="w-1 h-8 bg-primary mr-4 rounded"></div>
            <h2 className="text-3xl font-bold text-gray-900">{t('faculties')}</h2>
          </div>
        </Container>
      </div>

      {/* KONTENT */}
      <section className="pt-0 pb-16">
        <Container>
          <div className="grid py-8 lg:gap-10 xl:gap-0 lg:py-12 lg:grid-cols-12">
            {/* KARTOCHKALAR */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 min-h-[500px]">
              {facultiesData.slice(0, visibleCount).map((faculty: Faculty, index: number) => {
                const isActive = index === currentImageIndex;
                return (
                  <div
                    key={index}
                    onClick={() => handleCardInteraction(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardInteraction(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className={`
                      group relative bg-white border border-gray-200
                      cursor-pointer transition-all duration-300 transform
                      hover:scale-105 focus:outline-none
                      ${isActive ? 'z-20 scale-105 border-blue-500' : 'z-10 hover:border-blue-300'}
                      rounded-none flex flex-col
                    `}
                    style={{
                      pointerEvents: 'auto',
                      zIndex: isActive ? 20 : 10,
                    }}
                  >
                    <div className="flex-1 flex flex-col justify-between p-5 min-h-0">
                      <div className="flex justify-between items-start">
                        <div
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${faculty.color} flex items-center justify-center shadow-md`}
                        >
                          <img
                            src={faculty.iconImage}
                            alt={faculty.name}
                            className="w-7 h-7 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = 'w-7 h-7 flex items-center justify-center text-white text-lg font-bold';
                              fallback.innerHTML = 'F';
                              target.parentNode?.insertBefore(fallback, target);
                            }}
                          />
                        </div>
                        {isActive && (
                          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg" />
                        )}
                      </div>

                      <div className="mt-4">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-950 transition-colors duration-300 leading-tight">
                          {faculty.name}
                        </h3>
                      </div>

                      <div className="mt-3">
                        <div
                          className={`bg-gray-200 rounded-full overflow-hidden transition-all duration-300 ${
                            isActive ? 'h-2 shadow-md' : 'h-1'
                          }`}
                        >
                          <div
                            className={`h-full bg-gradient-to-r ${faculty.color} transition-all duration-[4000ms] ease-linear`}
                            style={{
                              width: isActive ? `${progress}%` : '0%',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CAROUSEL */}
            <div className="lg:col-span-7 lg:flex relative ml-0 lg:ml-10 mt-8 lg:mt-0">
              <div className="relative w-full h-full min-h-[500px] overflow-hidden rounded-3xl shadow-2xl bg-white/15 backdrop-blur-lg border border-cyan-200/30">
                {facultiesData.slice(0, visibleCount).map((faculty: Faculty, index: number) => (
                  <OptimizedImage
                    key={index}
                    src={faculty.image || 'https://picsum.photos/600/400'}
                    alt={faculty.name}
                    className={`
                      absolute inset-0 w-full h-full object-cover rounded-3xl
                      transition-opacity duration-1000 ease-in-out
                      ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
                    `}
                    width={600}
                    height={400}
                    lazy={true}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* BARCHASINI KO'RISH — KATTAROQ TUGMA */}
          {visibleCount < facultiesData.length && (
            <div className="text-center mt-16">
              <Button
                onClick={showMoreFaculties}
                variant="default"
                size="xxl"
                className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {t('seeAll')}
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default FacultiesSection;