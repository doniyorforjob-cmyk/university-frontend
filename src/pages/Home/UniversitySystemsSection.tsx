import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { BookOpenIcon, UsersIcon, TrophyIcon, GlobeAltIcon, LinkIcon } from '@heroicons/react/24/outline';
import { TransformedUniversitySystemsData, transformUniversitySystemsData } from './transformers/universitySystemsTransformer';
import Container from '../../components/shared/Container';
import { useStandardSection } from './hooks/useStandardSection';
import { homeApi } from '../../api/homeApi';
import SectionHeader from './components/SectionHeader';
import { useTranslation } from 'react-i18next';

const UniversitySystemsSection: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading } = useStandardSection<TransformedUniversitySystemsData>(
    'university-systems',
    homeApi.getUniversitySystemsData,

  );

  if (loading || !data) {
    return null; // Or a skeleton loader
  }

  const getIconComponent = (iconName: string) => {
    // Icon mapping using Heroicons
    switch (iconName) {
      case 'BookOpen':
        return BookOpenIcon;
      case 'Users':
        return UsersIcon;
      case 'Award':
        return TrophyIcon;
      case 'Globe':
        return GlobeAltIcon;
      default:
        return LinkIcon;
    }
  };

  return (
    <section className="py-16 border bg-accent">
      <Container>
        <div className="lg:col-span-2">
                <SectionHeader
                  title={t('Universitet tizimlari')}
                  seeAllLink="/university-systems"
                  seeAllText={t('seeAllUniversitySystems')}
                  noContainer={true}
                />
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {data.systems.map((system: typeof data.systems[0], index: number) => (
            <motion.a
              key={system.id}
              href={system.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`${system.color} text-white p-3 group-hover:scale-110 transition-transform duration-300`}>
                   {React.createElement(getIconComponent(system.icon), { className: "w-6 h-6" })}
                 </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                    {system.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{system.description}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                    <span>Kirish</span>
                    <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 shadow-sm border border-gray-200"
        >
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">Tezkor havolalar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {data.quickLinks.map((link: typeof data.quickLinks[0]) => (
              <a
                key={link.id}
                href={link.href}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-medium hover:underline"
              >
                → {link.title}
              </a>
            ))}
          </div>
        </motion.div>
       </Container>
   </section>
  );
};

export default UniversitySystemsSection;