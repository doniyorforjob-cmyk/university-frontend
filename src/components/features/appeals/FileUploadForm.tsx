import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { validateFiles } from '../../../utils/validationSchemas';
import { FILE_CONSTRAINTS } from '../../../types/appeal.types';

export const FileUploadForm: React.FC = () => {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const attachments = watch('attachments') || [];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const currentFiles = attachments || [];
    const allFiles = [...currentFiles, ...acceptedFiles];

    // Validate files
    const validationErrors = validateFiles(allFiles);
    if (validationErrors.length > 0) {
      // Show error (you can integrate with toast)
      console.error('File validation errors:', validationErrors);
      return;
    }

    setValue('attachments', allFiles);
  }, [attachments, setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: FILE_CONSTRAINTS.allowedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize: FILE_CONSTRAINTS.maxSize,
    maxFiles: FILE_CONSTRAINTS.maxFiles - (attachments?.length || 0),
  });

  const removeFile = (index: number) => {
    const newFiles = attachments.filter((_: File, i: number) => i !== index);
    setValue('attachments', newFiles);
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
          Fayl biriktirish
        </h3>
        <p className="text-gray-600">
          Murojaatingizni tasdiqlovchi hujjatlarni yuklang
        </p>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isDragActive ? 'Fayllarni bu yerga tashlang' : 'Fayllarni yuklash uchun bosing yoki sudrab keling'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PDF, DOC, DOCX, JPG, PNG (maksimal {FILE_CONSTRAINTS.maxFiles} ta fayl, har biri {formatFileSize(FILE_CONSTRAINTS.maxSize)})
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {attachments && attachments.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">
            Yuklangan fayllar ({attachments.length}/{FILE_CONSTRAINTS.maxFiles})
          </h4>
          <div className="space-y-2">
            {attachments.map((file: File, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              Fayl yuklash boyicha maslahatlar
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Fayllar xavfsiz serverda saqlanadi</li>
              <li>• Faqat murojaatingizni tasdiqlovchi hujjatlar yuklang</li>
              <li>• Katta fayllar avval siqilgan bolishi kerak</li>
              <li>• Barcha fayllar virus tekshiruvidan otadi</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};