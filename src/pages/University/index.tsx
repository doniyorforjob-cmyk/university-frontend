import React from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchUniversityContentBlocks } from '@/api/universityContentApi';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const UniversityPage: React.FC = () => {
  const { setBreadcrumbsData } = useGlobalLayout();
  const { data, loading, error, refetch } = useStandardPage(
    'university',
    fetchUniversityContentBlocks
  );

  React.useEffect(() => {
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Universitet' }
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
      <PageTemplate title="Universitet">
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
      title="Universitet"
      contentBlocks={data}
    />
  );
};

export default UniversityPage;
