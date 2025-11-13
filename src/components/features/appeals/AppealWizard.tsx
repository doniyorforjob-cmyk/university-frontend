import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appealFormSchema, AppealFormData } from '../../../utils/validationSchemas';
import { AppealTypeSelector } from './AppealTypeSelector';
import { PersonalInfoForm } from './PersonalInfoForm';
import { AppealDetailsForm } from './AppealDetailsForm';
import { FileUploadForm } from './FileUploadForm';
import { PreviewForm } from './PreviewForm';
import { ProgressBar } from './ProgressBar';
import { APPEAL_CATEGORIES } from '../../../types/appeal';

const steps = [
  { id: 1, title: 'Murojaat turi', description: 'Ariza, taklif yoki shikoyat' },
  { id: 2, title: 'Shaxsiy ma\'lumotlar', description: 'Ism, telefon, email' },
  { id: 3, title: 'Murojaat tafsilotlari', description: 'Sarlavha va tavsif' },
  { id: 4, title: 'Fayl biriktirish', description: 'Hujjatlar va rasmlar' },
  { id: 5, title: 'Ko\'rib chiqish', description: 'Tasdiqlash va yuborish' },
];

interface AppealWizardProps {
  onSubmit: (data: AppealFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const AppealWizard: React.FC<AppealWizardProps> = ({
  onSubmit,
  isSubmitting = false
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>('');

  const methods = useForm({
    resolver: zodResolver(appealFormSchema),
    mode: 'onChange',
    defaultValues: {
      appealType: 'ariza',
      fullName: '',
      phone: '',
      email: '',
      address: '',
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      department: '',
      faculty: '',
      attachments: [],
      agreeToTerms: false,
      agreeToProcessing: false,
    },
  });

  const { handleSubmit, watch, trigger, formState: { errors, isValid } } = methods;

  const watchedType = watch('appealType');

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleTypeSelect = (type: string) => {
    console.log('Type selected:', type);
    setSelectedType(type);
    methods.setValue('appealType', type);
    // Force validation update
    methods.trigger('appealType');
    // Move to next step
    setTimeout(() => {
      setCurrentStep(2);
    }, 100);
  };

  const handleFinalSubmit = async (data: any) => {
    try {
      await onSubmit(data as AppealFormData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AppealTypeSelector onSelect={handleTypeSelect} />;
      case 2:
        return <PersonalInfoForm />;
      case 3:
        return <AppealDetailsForm appealType={watchedType} />;
      case 4:
        return <FileUploadForm />;
      case 5:
        return <PreviewForm onEdit={setCurrentStep} />;
      default:
        return null;
    }
  };

  const canProceed = currentStep < steps.length && isValid;
  const canGoBack = currentStep > 1;

  return (
    <div>
      {/* Progress Bar */}
      <ProgressBar steps={steps} currentStep={currentStep} />

      {/* Form */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFinalSubmit)} className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-lg p-8"
            >
              {/* Step Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="text-gray-600">
                  {steps[currentStep - 1].description}
                </p>
              </div>

              {/* Step Content */}
              <div className="min-h-[400px] flex items-center">
                {renderStep()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={!canGoBack}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    canGoBack
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Ortga
                </button>

                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      canProceed
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Keyingi
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={`px-8 py-3 rounded-lg font-medium transition-all ${
                      isValid && !isSubmitting
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </form>
      </FormProvider>
    </div>
  );
};