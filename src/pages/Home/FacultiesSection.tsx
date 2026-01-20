import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../components/shared/Container';
import { homeApi, HomeFacultiesData } from '../../services/homeService';
import { useStandardSection } from './hooks/useStandardSection';
import SectionHeader from './components/SectionHeader';
import { OptimizedImage } from '../../components/shared';
import EmptyState from '../../components/shared/EmptyState';
import { Link } from 'react-router-dom';
import { transformFacultiesData } from './transformers/facultiesTransformer';
import { FacultyCard } from '../../components/shared/cards/FacultyCard';

import { motion, AnimatePresence } from 'framer-motion';

type Faculty = HomeFacultiesData['faculties'][0];

const FacultiesSection: React.FC = () => {
  const { t } = useTranslation(['common', 'pages']);
  const { data, loading } = useStandardSection<HomeFacultiesData>(
    'faculties',
    homeApi.getFacultiesData as any,
    { transformData: transformFacultiesData }
  );
  const [activeFacultyId, setActiveFacultyId] = useState<string | number | null>(null);

  const faculties = useMemo(() => data?.faculties || [], [data?.faculties]);

  useEffect(() => {
    if (faculties.length > 0) {
      // If no active ID, or if the current active ID is not in the list (e.g. after language switch),
      // default to the first faculty.
      const currentExists = activeFacultyId && faculties.some((f: Faculty) => String(f.id) === String(activeFacultyId));

      if (!activeFacultyId || !currentExists) {
        setActiveFacultyId(faculties[0].id);
      }
    }
  }, [faculties, activeFacultyId]);

  if (loading || !data) return null;

  const activeFaculty = faculties.find((f: Faculty) => String(f.id) === String(activeFacultyId)) || faculties[0];
  const departments = activeFaculty?.departments || [];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-b from-white to-blue-50/30">
      <Container>
        <SectionHeader
          title={t('pages:faculties')}
          seeAllLink="/faculties"
          seeAllText={t('common:seeAllFaculties')}
          noContainer={true}
          className="mb-8 md:mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* LEFT: FACULTIES LIST */}
          <div className={`md:col-span-4 flex flex-col space-y-2 md:space-y-3 pr-2 ${faculties.length > 10 ? 'max-h-[34rem] overflow-y-auto scrollbar-auto-hide' : ''}`}>
            {faculties.length > 0 ? (
              faculties.map((faculty: Faculty) => (
                <FacultyCard
                  key={faculty.id}
                  id={faculty.id}
                  name={faculty.name}
                  icon={faculty.icon}
                  isActive={activeFacultyId === faculty.id}
                  onClick={() => setActiveFacultyId(faculty.id)}
                  variant="list-item"
                  slug={faculty.slug}
                />
              ))
            ) : (
              <EmptyState
                resourceKey="faculties"
                className="min-h-[20rem]"
              />
            )}
          </div>

          {/* RIGHT: DEPARTMENTS GRID */}
          <div className="md:col-span-8 flex flex-col">
            <h2 className="text-xl md:text-2xl 2xl:text-3xl font-black text-brand-dark text-center mb-4 md:mb-6 tracking-tight">
              {t('pages:departments', 'Kafedralar')}
            </h2>

            <motion.div
              layout
              className="bg-ghost-blue rounded-3xl lg:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-10 border border-slate-200 shadow-sm h-[20rem] md:h-[28rem] lg:h-[34rem] relative flex-grow flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent opacity-50" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFacultyId || 'empty'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex-grow overflow-y-auto pr-2 scrollbar-auto-hide"
                >
                  {departments.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 2xl:gap-8 pb-4">
                      {departments.map((dept: any) => {
                        // Ensure we have a valid slug or fallback to ID, matching our global strategy
                        const linkSlug = dept.slug || dept.id;
                        return (
                          <Link
                            key={dept.id}
                            to={`/departments/${linkSlug}`}
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
                        );
                      })}
                    </div>
                  ) : (
                    <EmptyState
                      resourceKey="departments"
                      className="min-h-[22rem]"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </Container>
    </section >
  );
};

export default FacultiesSection;
