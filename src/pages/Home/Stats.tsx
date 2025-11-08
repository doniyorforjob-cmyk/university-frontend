// src/sections/IconStats_Variant5.tsx
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useStatsData } from '../../hooks/useStatsData';
import Container from '../../components/shared/Container';

// Icons8 dan olingan rasmlar
const imageMap: Record<string, string> = {
  professor: 'https://img.icons8.com/color/96/teacher.png', // Professor-o‘qituvchilar
  fakultet: 'https://img.icons8.com/color/96/university.png', // Fakultetlar
  talaba: 'https://img.icons8.com/color/96/student-male--v1.png', // 🎓 Talaba — o‘qiyotgan
  bitiruvchi: 'https://img.icons8.com/color/96/graduation-cap.png', // 🧑‍🎓 Bitiruvchi — diplom bilan
  ilmiy: 'https://img.icons8.com/color/96/microscope.png', // Ilmiy ishlar
  loyiha: 'https://img.icons8.com/color/96/briefcase--v1.png', // Loyiha
  xalqaro: 'https://img.icons8.com/color/96/globe-asia.png', // Xalqaro aloqalar
};

const IconStats: React.FC = () => {
  const { stats, loading, error } = useStatsData();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) setAnimate(true);
  }, [inView]);

  if (loading || error) return null;

  const getImageForText = (text: string): string => {
    const lower = text.toLowerCase();
    for (const key in imageMap) {
      if (lower.includes(key)) return imageMap[key];
    }
    return 'https://img.icons8.com/color/96/star--v1.png';
  };

  const getEmojiFallback = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('professor') || lower.includes('o‘qituvchi')) return '👨‍🏫';
    if (lower.includes('fakultet')) return '🏫';
    if (lower.includes('talaba')) return '📚';
    if (lower.includes('bitiruvchi')) return '🎓';
    if (lower.includes('ilmiy')) return '🔬';
    if (lower.includes('xalqaro')) return '🌍';
    return '⭐';
  };

  return (
    <section ref={ref} className="py-12">
      <Container>
        <div className="mb-8 flex items-center">
          <div className="w-1 bg-primary h-8 mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Biz Raqamlarda</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {stats.map((s: any, i: number) => {
            const imgSrc = getImageForText(s.text);
            const emoji = getEmojiFallback(s.text);

            return (
              <React.Fragment key={s.id}>
                <div
                  className="group bg-white rounded-2xl p-6 shadow-xl transform-gpu transition-all duration-500 hover:-translate-y-4 hover:rotate-2"
                  style={{ transform: `rotate(${i % 2 === 0 ? '-2deg' : '2deg'})` }}
                >
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-indigo-100 to-purple-100 p-2 flex items-center justify-center relative">
                    <img
                      src={imgSrc}
                      alt={s.text}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const emojiEl = e.currentTarget.nextElementSibling as HTMLElement;
                        if (emojiEl) emojiEl.style.display = 'block';
                      }}
                      loading="lazy"
                    />
                    <span className="hidden text-4xl">{emoji}</span>
                  </div>

                  <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {animate ? <CountUp end={s.end} duration={2.5} separator="," /> : 0}
                    {s.plus && <span className="text-xl text-purple-600">+</span>}
                  </h3>

                  <p className="mt-2 text-base font-semibold text-center text-gray-700">{s.text}</p>
                </div>

                {i < stats.length - 1 && (
                  <div className="hidden lg:block">
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full opacity-40"></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default IconStats;