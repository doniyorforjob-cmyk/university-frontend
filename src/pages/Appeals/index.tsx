import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SectionTemplate from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';
import { AppealWizard } from '../../components/features/appeals/AppealWizard';
import { AppealFormData } from '../../utils/validationSchemas';
import { AppealTracking } from './AppealTracking';
import { TrackingModal } from '../../components/features/appeals/TrackingModal';
import { submitAppealApi } from '@/api/http/appeals.http';

const AppealsPage: React.FC = () => {
  const { setBannerData, setBreadcrumbsData, setSidebarType } = useGlobalLayout();
  const [showTracking, setShowTracking] = useState(false);
  const [trackingId, setTrackingId] = useState<string>('');
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

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
      // Generate tracking ID
      const newTrackingId = `AP${Date.now().toString().slice(-8)}`;

      // Real API call
      await submitAppealApi(data, newTrackingId);

      setTrackingId(newTrackingId);

      // Show success message
      toast.success('Murojaatingiz muvaffaqiyatli yuborildi!', {
        duration: 5000,
        icon: '🎉',
      });

      // Switch to tracking view
      setShowTracking(true);

      console.log('Appeal submitted successfully to Elmapi:', { ...data, trackingId: newTrackingId });
    } catch (error: any) {
      console.error('Submission error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      const serverMessage = error.response?.data?.message || error.response?.data?.error;
      const errorMessage = serverMessage
        ? `Xatolik: ${serverMessage}`
        : `Tarmoq xatoligi (Status: ${error.response?.status || 'unknown'}). Qaytadan urinib ko'ring.`;

      toast.error(errorMessage, { duration: 6000 });
      throw error;
    }
  };

  const handleNewAppeal = () => {
    setShowTracking(false);
    setTrackingId('');
  };

  const handleTrackingSubmit = (id: string) => {
    setTrackingId(id);
    setShowTracking(true);
    setIsTrackingModalOpen(false);
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
        <div className="space-y-2">
          {/* Toggle between Wizard and Tracking Search */}
          {!showTracking && (
            <div className="flex justify-center mb-2">
              <div className="inline-flex p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setShowTracking(false)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${!showTracking ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Yangi murojaat
                </button>
                <div className="relative group">
                  <button
                    onClick={() => setIsTrackingModalOpen(true)}
                    className="px-6 py-2 rounded-lg font-medium text-gray-500 hover:text-gray-700 transition-all"
                  >
                    Murojaatni kuzatish
                  </button>
                </div>
              </div>
            </div>
          )}

          {showTracking ? (
            <AppealTracking
              trackingId={trackingId}
              onNewAppeal={handleNewAppeal}
            />
          ) : (
            <AppealWizard onSubmit={handleAppealSubmit} />
          )}
        </div>
      </SectionTemplate>

      {/* Tracking Modal */}
      <TrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        onSubmit={handleTrackingSubmit}
      />
    </>
  );
};

export default AppealsPage;