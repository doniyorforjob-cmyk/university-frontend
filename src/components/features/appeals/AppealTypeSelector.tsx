import React from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  LightBulbIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface AppealTypeSelectorProps {
  onSelect: (type: string) => void;
}

const appealTypes = [
  {
    id: 'ariza',
    title: 'Ariza',
    description: 'Talabalikka qabul, hujjatlar, stipendiya va boshqa rasmiy arizalar',
    icon: DocumentTextIcon,
    color: 'bg-blue-50 border-blue-200 hover:border-blue-300',
    iconColor: 'text-blue-600',
    examples: ['Qabul arizasi', 'Hujjat nusxasi', 'Stipendiya arizasi']
  },
  {
    id: 'taklif',
    title: 'Taklif',
    description: 'Talim sifatini yaxshilash, infratuzilma va xizmatlar boyicha takliflar',
    icon: LightBulbIcon,
    color: 'bg-green-50 border-green-200 hover:border-green-300',
    iconColor: 'text-green-600',
    examples: ['Yangi kurslar', 'Sport zali', 'Online platforma']
  },
  {
    id: 'shikoyat',
    title: 'Shikoyat',
    description: 'Oqitish sifati, mamuriyat va xizmatlar bilan bogliq muammolar',
    icon: ExclamationTriangleIcon,
    color: 'bg-orange-50 border-orange-200 hover:border-orange-300',
    iconColor: 'text-orange-600',
    examples: ['Dars sifati', 'Jihozlar', 'Xizmat ko\'rsatish']
  }
];

export const AppealTypeSelector: React.FC<AppealTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="space-y-6 w-full">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Murojaat turini tanlang
        </h3>
        <p className="text-gray-600">
          Sizning murojaatingiz qaysi turga tegishli ekanligini aniqlang
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
      {appealTypes.map((type, index) => {
        const Icon = type.icon;

        return (
          <motion.button
            key={type.id}
            type="button"
            onClick={() => {
              console.log('Selected type:', type.id);
              onSelect(type.id);
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-left group cursor-pointer ${type.color}`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg bg-white shadow-sm ${type.iconColor}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {type.title}
                </h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {type.description}
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-600">Misollar:</p>
                  <div className="flex flex-wrap gap-1">
                    {type.examples.map((example) => (
                      <span
                        key={example}
                        className="inline-block px-2 py-1 text-xs bg-white/50 rounded-md text-gray-600"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hover indicator */}
            <div className="mt-4 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity text-gray-700">
              <span>Tanlash</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.button>
        );
      })}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              To&apos;g&apos;ri tur tanlang
            </h4>
            <p className="text-sm text-blue-700">
              Murojaatingiz to&apos;g&apos;ri bo&apos;limga yo&apos;naltirilishi uchun murojaat turini to&apos;g&apos;ri tanlang.
              Kerak bo&apos;lsa, keyinroq o&apos;zgartirishingiz mumkin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};