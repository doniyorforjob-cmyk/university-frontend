import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useStatsData } from '../../hooks/useStatsData';
import Container from '../../components/shared/Container';

const IconStats: React.FC = () => {
  const { stats, loading, error } = useStatsData();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) setAnimate(true);
  }, [inView]);

  const icons = ['🎓', '👨‍🏫', '📚', '🏆', '🌟'];

  return (
    <section ref={ref} className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Container>
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-1 bg-primary h-8 mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-900">
              Biz Raqamlarda
            </h2>
          </div>
        </div>

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {stats.map((s, index) => (
              <div key={s.id} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100">
                <div className="text-4xl mb-3">{icons[index] || '📊'}</div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#0E104B] mb-2">
                  {animate ? <CountUp end={s.end} duration={2.5} /> : 0}
                  {s.plus && '+'}
                </h3>
                <p className="text-sm text-gray-700 font-semibold">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default IconStats;