import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AppealFormData } from '../../../utils/validationSchemas';
import { PRIORITY_LEVELS, STATUS_LABELS } from '../../../types/appeal';

interface PreviewFormProps {
  onEdit: (step: number) => void;
}

export const PreviewForm: React.FC<PreviewFormProps> = ({ onEdit }) => {
  const { watch } = useFormContext<AppealFormData>();
  const formData = watch();

  const getPriorityLabel = (priority: string) => {
    return PRIORITY_LEVELS.find(p => p.value === priority)?.label || priority;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Murojaatni tekshirish
        </h3>
        <p className="text-gray-600">
          Malumotlarni tekshirib, yuborish tugmasini bosing
        </p>
      </div>

      {/* Appeal Type */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Murojaat turi</h4>
            <p className="text-sm text-gray-600 capitalize">{formData.appealType}</p>
          </div>
          <button
            type="button"
            onClick={() => onEdit(1)}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            Ozgartirish
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-900">Shaxsiy malumotlar</h4>
          <button
            type="button"
            onClick={() => onEdit(2)}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            Ozgartirish
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">F.I.Sh:</span>
            <p className="text-gray-900">{formData.fullName}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Telefon:</span>
            <p className="text-gray-900">{formData.phone}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Email:</span>
            <p className="text-gray-900">{formData.email}</p>
          </div>
          {formData.address && (
            <div>
              <span className="font-medium text-gray-700">Manzil:</span>
              <p className="text-gray-900">{formData.address}</p>
            </div>
          )}
        </div>
      </div>

      {/* Appeal Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-900">Murojaat tafsilotlari</h4>
          <button
            type="button"
            onClick={() => onEdit(3)}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            Ozgartirish
          </button>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium text-gray-700">Sarlavha:</span>
            <p className="text-gray-900">{formData.title}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Kategoriya:</span>
            <p className="text-gray-900">{formData.category}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Muhimlik:</span>
            <p className="text-gray-900">{getPriorityLabel(formData.priority)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Tavsif:</span>
            <p className="text-gray-900 whitespace-pre-wrap">{formData.description}</p>
          </div>
          {(formData.department || formData.faculty) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.department && (
                <div>
                  <span className="font-medium text-gray-700">Bolim:</span>
                  <p className="text-gray-900">{formData.department}</p>
                </div>
              )}
              {formData.faculty && (
                <div>
                  <span className="font-medium text-gray-700">Fakultet:</span>
                  <p className="text-gray-900">{formData.faculty}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Attachments */}
      {formData.attachments && formData.attachments.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-900">
              Biriktirilgan fayllar ({formData.attachments.length})
            </h4>
            <button
              type="button"
              onClick={() => onEdit(4)}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              Ozgartirish
            </button>
          </div>
          <div className="space-y-2">
            {formData.attachments.map((file: File, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-gray-900 truncate max-w-xs">{file.name}</span>
                </div>
                <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-yellow-900 mb-1">
              Shartlar va qoidalar
            </h4>
            <p className="text-sm text-yellow-700">
              Murojaatni yuborish orqali siz foydalanish shartlariga va malumotlarni qayta ishlashga rozilik bildirasiz.
              Barcha murojaatlar belgilangan tartibda korib chiqiladi.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};