import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  UserIcon,
  PhoneIcon,
  PencilIcon,
  ArrowLeftIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { submitContactMessage } from '../../../services/contactService';
import toast from 'react-hot-toast';

// Validation schema
const ContactForm: React.FC = () => {
  const { t } = useTranslation(['pages', 'common']);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema moved inside to use localized messages
  const contactSchema = z.object({
    fullName: z.string().min(3, t('validation.nameMin') as string),
    phone: z.string().min(9, t('validation.phoneMin') as string),
    message: z.string().min(10, t('validation.messageMin') as string),
    userCode: z.string().length(6, t('validation.codeLength') as string),
  });

  type ContactFormInputs = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      message: '',
      userCode: ''
    }
  });

  const userCode = watch('userCode');

  useEffect(() => {
    generateNewCode();
  }, []);

  const generateNewCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
  };

  const onSubmit = async (data: ContactFormInputs) => {
    if (data.userCode !== generatedCode) {
      toast.error(t('codeInvalid') as string);
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting contact message:', data);

    try {
      const response = await submitContactMessage({
        fullName: data.fullName,
        phone: data.phone,
        message: data.message,
      });

      console.log('Submission success:', response);
      toast.success(t('common:success_submit') || "Xabaringiz muvaffaqiyatli yuborildi!", {
        duration: 5000,
        position: 'top-center',
      });

      reset();
      generateNewCode();
    } catch (error) {
      console.error('Contact submit error:', error);
      toast.error(t('common:error_submit') || "Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        {t('contactTitle')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Ism */}
        <div className="space-y-1">
          <div className="relative group">
            <UserIcon className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-gray-900/50 group-focus-within:text-[#0E104B] transition-colors z-10" />
            <input
              {...register('fullName')}
              type="text"
              placeholder={t('fullName') as string}
              className={`px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#0E104B] transition-colors w-full pl-12 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {errors.fullName && <p className="text-xs text-red-500 pl-1">{errors.fullName.message}</p>}
        </div>

        {/* Telefon raqami */}
        <div className="space-y-1">
          <div className="relative group">
            <PhoneIcon className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-gray-900/50 group-focus-within:text-[#0E104B] transition-colors z-10" />
            <input
              {...register('phone')}
              type="tel"
              placeholder={t('phoneLabel') as string}
              className={`px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#0E104B] transition-colors w-full pl-12 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 pl-1">{errors.phone.message}</p>}
        </div>

        {/* Xabar */}
        <div className="space-y-1">
          <div className="relative group">
            <PencilIcon className="absolute top-5 left-4 w-5 h-5 text-gray-900/50 group-focus-within:text-[#0E104B] transition-colors z-10" />
            <textarea
              {...register('message')}
              placeholder={t('message') as string}
              rows={5}
              className={`px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#0E104B] transition-colors w-full pl-12 resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {errors.message && <p className="text-xs text-red-500 pl-1">{errors.message.message}</p>}
        </div>

        {/* CAPTCHA */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          {/* Generated Code */}
          <button
            type="button"
            className="flex-1 flex items-center justify-center h-full px-4 py-3 relative rounded-lg border-2 border-gray-300 bg-gray-100 shadow-inner group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0E104B]/20"
            onClick={generateNewCode}
            title={t('common:refresh') || "Yangilash uchun bosing"}
          >
            <KeyIcon className="w-5 h-5 text-gray-900/80 mr-2" />
            <code className="font-mono text-xl font-bold text-gray-900 tracking-wider select-none">
              {generatedCode || '......'}
            </code>
          </button>

          {/* Kod kiritish */}
          <div className="flex-1 space-y-1">
            <div className="relative group">
              <KeyIcon className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-gray-900/50 group-focus-within:text-[#22c55e] transition-colors z-10" />
              <input
                {...register('userCode')}
                type="text"
                maxLength={6}
                placeholder={t('enterCode') as string}
                className={`px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors w-full pl-12 font-mono text-lg ${userCode?.length === 6 && userCode === generatedCode
                  ? 'border-[#22c55e] focus:border-[#22c55e]'
                  : errors.userCode ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#0E104B]'
                  }`}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setValue('userCode', val);
                }}
              />
            </div>
          </div>
        </div>

        {/* Kod holati */}
        {userCode?.length === 6 && (
          <p
            className={`text-sm text-center font-medium transition-colors ${userCode === generatedCode ? 'text-[#22c55e]' : 'text-[#ef4444]'
              }`}
          >
            {userCode === generatedCode
              ? t('codeValid')
              : t('codeInvalid')}
          </p>
        )}

        {/* Tugmalar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg bg-transparent text-gray-700 hover:bg-gray-100 transition-all duration-300 gap-2 order-2 sm:order-1 group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{t('back')}</span>
          </Link>

          <button
            type="submit"
            disabled={isSubmitting || userCode !== generatedCode}
            className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg text-white transition-all duration-300 w-full sm:w-auto order-1 sm:order-2 ${isSubmitting || userCode !== generatedCode
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#0E104B] hover:bg-[#0c0d3a]'
              }`}
          >
            {isSubmitting ? t('sending') : t('send')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;