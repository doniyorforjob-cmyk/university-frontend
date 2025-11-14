import React from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import usePage from '@/hooks/usePage';
import { fetchAdmissionData } from '@/api/admissionApi';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const AdmissionPage: React.FC = () => {
  const { setBreadcrumbsData } = useGlobalLayout();
  const { data, loading, error, refetch } = usePage({
    fetchData: fetchAdmissionData
  });

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
          <p className="text-red-600 mb-4">{error || 'Ma\'lumot topilmadi'}</p>
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

  const admissionYear = new Date().getFullYear() + 1;
  return (
    <PageTemplate
      title={`Qabul ${admissionYear}`}
      contentBlocks={data}
    />
  );
};

export default AdmissionPage;