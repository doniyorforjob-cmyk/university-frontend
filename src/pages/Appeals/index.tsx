import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import Sidebar from '../../components/shared/Sidebar';
import { AppealWizard } from '../../components/features/appeals/AppealWizard';
import { AppealFormData } from '../../utils/validationSchemas';
import { AppealTracking } from './AppealTracking';
import { FAQSection } from './FAQSection';
import { ContactSection } from './ContactSection';

const AppealsPage: React.FC = () => {
  const [showTracking, setShowTracking] = useState(false);
  const [trackingId, setTrackingId] = useState<string>('');

  const bannerImageUrl = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&h=300&auto=format&fit=crop';

  const handleAppealSubmit = async (data: AppealFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate tracking ID
      const newTrackingId = `AP${Date.now().toString().slice(-8)}`;
      setTrackingId(newTrackingId);

      // Show success message
      toast.success('Murojaatingiz muvaffaqiyatli yuborildi!', {
        duration: 5000,
        icon: '🎉',
      });

      // Switch to tracking view
      setShowTracking(true);

      console.log('Appeal submitted:', { ...data, trackingId: newTrackingId });
    } catch (error) {
      toast.error('Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
      throw error;
    }
  };

  const handleNewAppeal = () => {
    setShowTracking(false);
    setTrackingId('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 5000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Hero Section */}
      <div
        className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-700"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Arizalar, takliflar va shikoyatlar
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Oz murojaatingizni yuborish uchun quyidagi oddiy jarayondan oting
          </p>
        </div>
      </div>

      {/* Asosiy kontent */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        <Breadcrumbs
          items={[
            { label: 'Bosh sahifa', href: '/' },
            { label: 'Axborot xizmati', href: '#' },
            { label: 'Arizalar, takliflar va shikoyatlar' },
          ]}
        />
        <div className="flex flex-col lg:flex-row gap-10 mt-6">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {showTracking ? (
              <div className="space-y-6">
                <AppealTracking
                  trackingId={trackingId}
                  onNewAppeal={handleNewAppeal}
                />
              </div>
            ) : (
              <div>
                <AppealWizard onSubmit={handleAppealSubmit} />
              </div>
            )}

            {/* FAQ Section */}
            <div className="mt-12">
              <FAQSection />
            </div>

            {/* Contact Information */}
            <div className="mt-12">
              <ContactSection />
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default AppealsPage;