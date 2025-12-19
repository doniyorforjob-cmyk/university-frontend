import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SectionTemplate from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';
import { AppealWizard } from '../../components/features/appeals/AppealWizard';
import { AppealFormData } from '../../utils/validationSchemas';
import { AppealTracking } from './AppealTracking';
import { FAQSection } from './FAQSection';
import { ContactSection } from './ContactSection';

const AppealsPage: React.FC = () => {
  const { setBannerData, setBreadcrumbsData, setSidebarType } = useGlobalLayout();
  const [showTracking, setShowTracking] = useState(false);
  const [trackingId, setTrackingId] = useState<string>('');

  // Ma'lumotlarni yuklash (agar kerak bo'lsa, masalan FAQ yoki boshqa info)
  const { loading } = useStandardPage('appeals', async () => {
    // Appeals sahifasi uchun yuklanadigan maxsus ma'lumotlar yo'q, shunchaki lifecycle uchun
    return [];
  });

  useEffect(() => {
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Arizalar, takliflar va shikoyatlar' }
    ]);

    setSidebarType('info');

    return () => {
      setBannerData(undefined);
      setBreadcrumbsData(undefined);
      setSidebarType(undefined);
    };
  }, [setBannerData, setBreadcrumbsData, setSidebarType]);

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
    <>
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

      <SectionTemplate
        loading={loading}
        parentTitle="Murojaatlar"
        sectionTitle="Arizalar va takliflar"
        sectionType="info"
        items={[]}
        showSidebar={false}
        showSearch={false}
        showFilters={false}
        showPagination={false}
        showSorting={false}
      >
        <div className="space-y-12">
          {showTracking ? (
            <AppealTracking
              trackingId={trackingId}
              onNewAppeal={handleNewAppeal}
            />
          ) : (
            <AppealWizard onSubmit={handleAppealSubmit} />
          )}

          {/* FAQ Section */}
          <FAQSection />

          {/* Contact Information */}
          <ContactSection />
        </div>
      </SectionTemplate>
    </>
  );
};

export default AppealsPage;