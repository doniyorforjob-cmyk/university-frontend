// src/pages/Home/Stats.tsx
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Container from '../../components/shared/Container';
import SectionHeader from './components/SectionHeader';
import { useStandardSection } from './hooks/useStandardSection';
import { homeApi } from '../../services/homeService';
import { AOS_CONFIG } from '../../config/constants';
import { useTranslation } from 'react-i18next';
import { getLocalized } from '../../utils/apiUtils';
import { useLocale } from '../../contexts/LocaleContext';

import { MapIcon } from '@heroicons/react/24/outline';
import { transformStatsData } from './transformers/universityStatsTransformer';

const Stats = () => {
  const { t } = useTranslation(['common', 'pages']);
  const { locale } = useLocale();

  // Yangi arxitektura: useStandardSection hook
  const { data, loading, isCached, error } = useStandardSection(
    'stats',
    homeApi.getStatsData,
    { transformData: transformStatsData }
  );

  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) setAnimate(true);
  }, [inView]);

  // Clean loading - arxitektura prinsipiga muvofiq
  if (loading || !data || !data.stats || error) {
    return null; // Section butunlay yashirin, loading ko'rsatilmaydi
  }

  return (
    <section ref={ref} className="py-16 bg-accent">
      <Container>
        <SectionHeader
          title={t('pages:weInNumbers') as string}
          seeAllLink="/statistics"
          seeAllText={t('seeAll')}
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
                  src={data.universityArea?.image || "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}
                  alt="Namangan Davlat Texnika Universiteti"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/800x400/1e40af/ffffff?text=NAMDTU";
                  }}
                />
              </div>

              {/* Pastki qism */}
              <div className="flex-1 p-6 bg-gradient-to-br from-green-50 to-white flex flex-col justify-center items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <MapIcon className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 text-center">
                  {data.universityArea?.text ? getLocalized(data.universityArea.text, locale) : t('universityArea')}
                </p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {data.universityArea?.area?.toLocaleString('en-US') || '0'} <span className="text-xl font-normal text-green-700">{data.universityArea?.unit}</span>
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
                        {getLocalized(item.text, locale)}
                      </p>
                      <div className={`flex items-center justify-center text-3xl md:text-4xl font-bold ${colors[index] || 'text-gray-600'}`}>
                        {animate ? <CountUp end={item.end} duration={2.8} separator="," /> : '0'}
                        {item.plus && <span className="text-xl md:text-2xl ml-1 mt-1 inline-block">+</span>}
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