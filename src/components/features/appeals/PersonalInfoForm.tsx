import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { UserIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

export const PersonalInfoForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch
  } = useFormContext();

  const appealType = watch('appealType');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Shaxsiy malumotlarni kiriting
        </h3>
        <p className="text-gray-600">
          Murojaatingizni korib chiqish uchun shaxsiy malumotlaringiz kerak
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            F.I.Sh. *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('fullName')}
              type="text"
              id="fullName"
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                errors.fullName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder="Familiya Ism Sharif"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message as string}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Telefon raqam *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder="+998 XX XXX XX XX"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message as string}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder="sizning@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-4 w-4" />
              <span>Manzil (ixtiyoriy)</span>
            </div>
          </label>
          <textarea
            {...register('address')}
            id="address"
            rows={3}
            className={`block w-full px-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
              errors.address ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="Viloyat, tuman, ko'cha, uy"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message as string}</p>
          )}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              Malumotlar maxfiyligi
            </h4>
            <p className="text-sm text-blue-700">
              Sizning shaxsiy malumotlaringiz faqat murojaatingizni korib chiqish uchun ishlatiladi va
              uchinchi shaxslarga berilmaydi. Barcha malumotlar himoyalangan.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};