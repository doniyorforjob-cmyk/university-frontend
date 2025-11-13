import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Users, Award, Globe } from 'lucide-react';

const UniversitySystems = React.memo(() => {
  const systems = [
    {
      title: 'Talabalar portali',
      description: 'Onlayn darslar, baholar va jadvallar',
      icon: <BookOpen className="w-6 h-6" />,
      link: '#',
      color: 'bg-blue-500'
    },
    {
      title: 'Kutubxona tizimi',
      description: 'Elektron kitoblar va maqolalar',
      icon: <BookOpen className="w-6 h-6" />,
      link: '#',
      color: 'bg-green-500'
    },
    {
      title: 'Kadrlar bo&apos;limi',
      description: 'Xodimlar va ish o&apos;rinlari',
      icon: <Users className="w-6 h-6" />,
      link: '#',
      color: 'bg-purple-500'
    },
    {
      title: 'Ilmiy tadqiqotlar',
      description: 'Loyihalar va nashrlar',
      icon: <Award className="w-6 h-6" />,
      link: '#',
      color: 'bg-orange-500'
    },
    {
      title: 'Xalqaro aloqalar',
      description: 'Hamkorlik va almashinuv',
      icon: <Globe className="w-6 h-6" />,
      link: '#',
      color: 'bg-red-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">Universitet tizimlari</h2>
      <div className="space-y-4">
        {systems.map((system, index) => (
          <motion.a
            key={index}
            href={system.link}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="block p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start space-x-3">
              <div className={`${system.color} text-white p-2 group-hover:scale-110 transition-transform duration-200`}>
                {system.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {system.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{system.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            </div>
          </motion.a>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Tezkor havolalar</h3>
        <div className="space-y-2">
          <button className="block text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 text-left">
            → Qabul komissiyasi
          </button>
          <button className="block text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 text-left">
            → Onlayn ariza berish
          </button>
          <button className="block text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 text-left">
            → Stipendiya dasturlari
          </button>
          <button className="block text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 text-left">
            → Aloqa ma&apos;lumotlari
          </button>
        </div>
      </div>
    </motion.div>
  );
});

UniversitySystems.displayName = 'UniversitySystems';

export default UniversitySystems;