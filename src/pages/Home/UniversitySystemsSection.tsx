import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { TransformedUniversitySystemsData } from './transformers/universitySystemsTransformer';
import Container from '../../components/shared/Container';

interface UniversitySystemsSectionProps {
  data: TransformedUniversitySystemsData;
}

const UniversitySystemsSection: React.FC<UniversitySystemsSectionProps> = ({ data }) => {
  const getIconComponent = (iconName: string) => {
    // Simple icon mapping - you can expand this
    switch (iconName) {
      case 'BookOpen':
        return '📚';
      case 'Users':
        return '👥';
      case 'Award':
        return '🏆';
      case 'Globe':
        return '🌍';
      default:
        return '🔗';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {data.systems.map((system, index) => (
            <motion.a
              key={system.id}
              href={system.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`${system.color} text-white p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-xl">{getIconComponent(system.icon)}</span>
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 shadow-sm border border-gray-200"
        >
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">Tezkor havolalar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {data.quickLinks.map((link) => (
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