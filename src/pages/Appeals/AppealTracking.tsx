import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { STATUS_LABELS, RESPONSE_TIME_ESTIMATES } from '../../types/appeal';

interface AppealTrackingProps {
  trackingId: string;
  onNewAppeal: () => void;
}

export const AppealTracking: React.FC<AppealTrackingProps> = ({ trackingId, onNewAppeal }) => {
  // Mock data - in real app this would come from API
  const mockAppealData = {
    id: trackingId,
    status: 'processing' as const,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    title: 'Dars jadvali o\'zgarishi haqida',
    type: 'taklif',
    priority: 'medium' as const,
    estimatedResponse: RESPONSE_TIME_ESTIMATES.medium,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'processing':
        return <ClockIcon className="w-6 h-6 text-blue-500" />;
      case 'rejected':
        return <XCircleIcon className="w-6 h-6 text-red-500" />;
      default:
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    return STATUS_LABELS[status as keyof typeof STATUS_LABELS]?.color || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Success Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
        >
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Murojaatingiz qabul qilindi!
        </h2>
        <p className="text-gray-600">
          Murojaatingizni kuzatish uchun quyidagi malumotlarni saqlab qoling
        </p>
      </div>

      {/* Tracking Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-6"
      >
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Murojaat tafsilotlari</h3>
            <div className="flex items-center space-x-2">
              {getStatusIcon(mockAppealData.status)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(mockAppealData.status)}`}>
                {STATUS_LABELS[mockAppealData.status].label}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tracking ID
              </label>
              <div className="flex items-center space-x-2">
                <code className="bg-gray-100 px-3 py-2 rounded font-mono text-sm">
                  {trackingId}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(trackingId)}
                  className="text-primary hover:text-primary/80 p-1"
                  title="Nusxalash"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yuborilgan sana
              </label>
              <p className="text-gray-900">{formatDate(mockAppealData.createdAt)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Murojaat turi
              </label>
              <p className="text-gray-900 capitalize">{mockAppealData.type}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Muhimlik darajasi
              </label>
              <p className="text-gray-900">{mockAppealData.priority}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sarlavha
            </label>
            <p className="text-gray-900">{mockAppealData.title}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Taxminiy javob vaqti
            </label>
            <p className="text-gray-900">{mockAppealData.estimatedResponse}</p>
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-50 rounded-lg p-6 mb-6"
      >
        <h4 className="text-lg font-semibold text-blue-900 mb-3">
          Murojaatni kuzatish
        </h4>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Tracking ID ni saqlab qoling</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Email orqali status ozgarishlari haqida xabar beriladi</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Murojaat holatini bu sahifada tekshirishingiz mumkin</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Qoshimcha savollar uchun quyidagi kontaktlarga murojaat qiling</span>
          </li>
        </ul>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={onNewAppeal}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Yangi murojaat yuborish
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Chop etish
        </button>
      </motion.div>
    </motion.div>
  );
};