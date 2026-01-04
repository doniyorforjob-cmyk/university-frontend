import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../components/shared/Container';
import { homeApi, HomeFacultiesData } from '../../services/homeService';
import { useStandardSection } from './hooks/useStandardSection';
import SectionHeader from './components/SectionHeader';
import { OptimizedImage } from '../../components/shared';
import { Link } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

type Faculty = HomeFacultiesData['faculties'][0];

const FacultiesSection: React.FC = () => {
  const { t } = useTranslation(['common', 'pages']);
  const { data, loading } = useStandardSection<HomeFacultiesData>('faculties', homeApi.getFacultiesData);
  const [activeFacultyId, setActiveFacultyId] = useState<string | number | null>(null);

  const faculties = data?.faculties || [];

  useEffect(() => {
    if (faculties.length > 0 && activeFacultyId === null) {
      setActiveFacultyId(faculties[0].id);
    }
  }, [faculties, activeFacultyId]);

  if (loading || !data) return null;

  const activeFaculty = faculties.find((f: Faculty) => f.id === activeFacultyId) || faculties[0];
  const departments = activeFaculty?.departments || [];

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-white to-blue-50/30">
      <Container>
        <SectionHeader
          title={t('pages:faculties', 'Fakultetlar va kafedralar')}
          seeAllLink="/faculties"
          seeAllText={t('common:seeAll', 'Barcha fakultetlar')}
          noContainer={true}
          className="mb-8 md:mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* LEFT: FACULTIES LIST */}
          <div className="lg:col-span-4 flex flex-col space-y-2 md:space-y-3 max-h-[25rem] sm:max-h-[30rem] md:max-h-[35rem] lg:max-h-[40rem] xl:max-h-[45rem] 2xl:max-h-[50rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
            {faculties.map((faculty: Faculty) => (
              <motion.div
                key={faculty.id}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.15 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveFacultyId(faculty.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveFacultyId(faculty.id);
                  }
                }}
                role="button"
                tabIndex={0}
                className={`flex items-center p-4 md:p-5 cursor-pointer transition-all duration-150 rounded-xl md:rounded-2xl group border ${activeFacultyId === faculty.id
                  ? 'bg-primary text-white shadow-xl border-transparent scale-[1.01] md:scale-[1.02]'
                  : 'bg-ghost-blue text-brand-dark shadow-sm border-blue-100/30'
                  }`}
              >
                <div className={`mr-4 md:mr-5 transition-colors duration-150 ${activeFacultyId === faculty.id ? 'text-white' : 'text-brand-blue'
                  } [&_svg]:w-8 [&_svg]:h-8 md:[&_svg]:w-10 md:[&_svg]:h-10`}>
                  <div dangerouslySetInnerHTML={{ __html: faculty.icon }} />
                </div>
                <h3 className="text-base md:text-lg font-bold leading-tight flex-1">
                  {faculty.name}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: DEPARTMENTS GRID */}
          <motion.div
            layout
            className="lg:col-span-8 bg-ghost-blue rounded-3xl lg:rounded-[2.5rem] p-6 md:p-8 lg:p-10 border border-slate-200 shadow-sm min-h-[20rem] md:min-h-[30rem] lg:min-h-[38rem] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent opacity-50" />

            <h2 className="text-xl md:text-2xl font-black text-brand-dark text-center mb-6 md:mb-8 tracking-tight">
              Kafedralar
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFacultyId || 'empty'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="max-h-[30rem] sm:max-h-[35rem] md:max-h-[40rem] lg:max-h-[45rem] xl:max-h-[50rem] 2xl:max-h-[55rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent"
              >
                {departments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 pb-4">
                    {departments.map((dept: any) => (
                      <Link
                        key={dept.id}
                        to={`/department/${dept.id}`}
                        className="bg-white rounded-2xl md:rounded-[24px] overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-md transition-all duration-300 group block"
                      >
                        <div className="h-40 md:h-44 overflow-hidden bg-gray-100">
                          <OptimizedImage
                            src={dept.image}
                            alt={dept.title}
                            className="w-full h-full object-cover"
                            width={320}
                            height={220}
                          />
                        </div>
                        <div className="p-4 md:p-5">
                          <h4 className="text-brand-dark font-extrabold text-center leading-snug text-base md:text-lg">
                            {dept.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] md:h-[400px] text-blue-400">
                    <div className="text-5xl md:text-6xl mb-4 opacity-20">📂</div>
                    <p className="text-base md:text-lg font-medium">Bu fakultetda hozircha kafedralar yo&apos;q</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section >
  );
};

export default FacultiesSection;
