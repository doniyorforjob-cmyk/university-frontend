import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { APPEAL_CATEGORIES, PRIORITY_LEVELS } from '../../../types/appeal.types';

interface AppealDetailsFormProps {
  appealType: string;
}

export const AppealDetailsForm: React.FC<AppealDetailsFormProps> = ({ appealType }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext();

  const selectedCategory = watch('category');
  const categories = APPEAL_CATEGORIES[appealType as keyof typeof APPEAL_CATEGORIES] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >


      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Sarlavha *
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          className={`block w-full px-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${errors.title ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
            }`}
          placeholder="Murojaat sarlavhasi"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message as string}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Tavsif *
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={8}
          className={`block w-full px-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${errors.description ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
            }`}
          placeholder="Murojaatingizni batafsil tavsiflang..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message as string}</p>
        )}
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Muhimlik darajasi *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PRIORITY_LEVELS.map((priority) => (
            <button
              key={priority.value}
              type="button"
              onClick={() => setValue('priority', priority.value)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${watch('priority') === priority.value
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <div className="text-sm font-medium text-gray-900">
                {priority.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {priority.description}
              </div>
            </button>
          ))}
        </div>
        {errors.priority && (
          <p className="mt-2 text-sm text-red-600">{errors.priority.message as string}</p>
        )}
      </div>

      {/* Additional Fields for specific types */}
      {(appealType === 'ariza' || appealType === 'shikoyat') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              Bo&apos;lim (ixtiyoriy)
            </label>
            <select
              {...register('department')}
              id="department"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Bo&apos;limni tanlang</option>
              <option value="rahbariyat">Rahbariyat</option>
              <option value="oquv">O&apos;quv bo&apos;limi</option>
              <option value="ilmiy">Ilmiy bo&apos;lim</option>
              <option value="moliya">Moliya bo&apos;limi</option>
            </select>
          </div>

          <div>
            <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-2">
              Fakultet (ixtiyoriy)
            </label>
            <select
              {...register('faculty')}
              id="faculty"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Fakultetni tanlang</option>
              <option value="informatika">Informatika fakulteti</option>
              <option value="multimedia">Multimedia texnologiyalari</option>
              <option value="elektrotexnika">Elektrotexnika fakulteti</option>
            </select>
          </div>
        </div>
      )}
    </motion.div>
  );
};