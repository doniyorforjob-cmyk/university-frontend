import React from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchAdmissionData } from '@/services/admissionService';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const AdmissionPage: React.FC = () => {
  const { setBreadcrumbsData } = useGlobalLayout();
  const { data, loading, error, refetch } = useStandardPage(
    'admission',
    fetchAdmissionData
  );

  React.useEffect(() => {
    const admissionYear = new Date().getFullYear() + 1;
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: `Qabul ${admissionYear}` }
    ]);

    return () => {
      setBreadcrumbsData(undefined);
    };
  }, [setBreadcrumbsData]);

  if (loading) {
    return <GenericPageSkeleton showSidebar={false} showHeroImage={false} contentBlocks={5} />;
  }

  if (error || !data) {
    return (
      <PageTemplate title="Qabul">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error?.message || 'Ma\'lumot topilmadi'}</p>
          <button
            onClick={refetch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Qayta yuklash
          </button>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      title="Qabul"
      contentBlocks={data}
    />
  );
};

export default AdmissionPage;