import React from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchEcoActiveStudentsData } from '@/api/ecoActiveStudentsApi';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import ContentBuilder from '@/components/shared/ContentBuilder';
import Container from '@/components/shared/Container';

const EcoActiveStudentsPage: React.FC = () => {
  const { setBreadcrumbsData } = useGlobalLayout();
  const { data, loading, error, refetch } = useStandardPage(
    'eco-active-students',
    fetchEcoActiveStudentsData
  );

  React.useEffect(() => {
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Ekofaol talabalar' }
    ]);

    return () => {
      setBreadcrumbsData(undefined);
    };
  }, [setBreadcrumbsData]);


  if (loading) {
    return <GenericPageSkeleton showSidebar={false} showHeroImage={false} contentBlocks={8} />;
  }

  if (error || !data) {
    return (
      <PageTemplate title="Ekofaol Talabalar">
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

  // Hero blokni ajratib olish
  const heroBlock = data.slice(0, 1);
  // Qolgan kontent bloklari
  const contentBlocks = data.slice(1);

  return (
    <PageTemplate
      title="Ekofaol Talabalar"
      contentBlocks={data}
    />
  );
};

export default EcoActiveStudentsPage;