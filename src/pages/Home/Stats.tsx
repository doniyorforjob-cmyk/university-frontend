// src/pages/Home/Stats.tsx
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Container from '../../components/shared/Container';
import SectionHeader from './components/SectionHeader';
import { useStandardSection } from './hooks/useStandardSection';
import { homeApi } from '../../api/homeApi';
import { AOS_CONFIG } from '../../config/constants';
import { useTranslation } from 'react-i18next';

const Stats = () => {
  const { t } = useTranslation();

  // Yangi arxitektura: useStandardSection hook
  const { data, loading, isCached } = useStandardSection(
    'stats',
    homeApi.getStatsData,
    {
      ttlMinutes: 60 // 1 soat cache
    }
  );

  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) setAnimate(true);
  }, [inView]);

  // Clean loading - arxitektura prinsipiga muvofiq
  if (loading || !data) {
    return null; // Section butunlay yashirin, loading ko'rsatilmaydi
  }

  return (
    <section ref={ref} className="py-16 bg-accent">
      <Container>
        <SectionHeader
          title="Biz Raqamlarda"
          noContainer={true}
        />

        {/* Asosiy grid — balandliklarni bir xil qilish uchun flex + h-full */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* CHAP TARAF — balandligi o‘ng bilan bir xil */}
          <div className="lg:w-[30%]">
            <div className="bg-white overflow-hidden h-full flex flex-col hover:shadow-lg">
              {/* Rasm — aniq ko‘rinadigan, tez yuklanadigan */}
              <div className="w-full h-48">
                <img
                  src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Namangan Davlat Universiteti"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/800x400/1e40af/ffffff?text=NAMDU";
                  }}
                />
              </div>

              {/* Pastki qism */}
              <div className="flex-1 p-6 bg-gradient-to-br from-green-50 to-white flex flex-col justify-center items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <i className="ri-road-map-line text-xl text-green-600"></i>
                </div>
                <p className="text-sm font-medium text-gray-700 text-center">
                  Universitetning umumiy maydoni
                </p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {data.universityArea?.area || 1500} <span className="text-xl font-normal text-green-700">{data.universityArea?.unit || 'm²'}</span>
                </p>
              </div>
            </div>
          </div>

          {/* O‘NG TARAF — chap bilan bir xil balandlikda */}
          <div className="lg:w-[70%]">
            <div className="bg-white p-5 h-full flex flex-col hover:shadow-lg">
              <div className="flex-1 grid grid-cols-2 gap-0 overflow-hidden">
                {data.stats.map((item: any, index: number) => {
                  const colors = ['text-rose-600', 'text-cyan-600', 'text-violet-600', 'text-amber-600', 'text-pink-600', 'text-emerald-600'];
                  return (
                    <div
                      key={item.id}
                      className={`
                        flex flex-col items-center justify-center py-6 px-3 text-center
                        ${index < 4 ? 'border-b border-gray-200' : ''}
                        ${index % 2 === 0 ? 'border-r border-gray-200' : ''}
                        hover:bg-gray-50 transition-colors
                      `}
                    >
                      <p className="text-lg md:text-xl font-medium text-primary leading-tight mb-2">
                        {item.text}
                      </p>
                      <div className={`text-3xl md:text-4xl font-bold ${colors[index] || 'text-gray-600'}`}>
                        {animate ? <CountUp end={item.end} duration={2.8} separator="," /> : '0'}
                        {item.plus && <span className="text-xl text-gray-600">+</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Stats;