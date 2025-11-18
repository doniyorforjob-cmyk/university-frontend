import React from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchOrganizationalStructureData } from '@/api/organizationalStructureApi';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import ContentBuilder from '@/components/shared/ContentBuilder';

interface OrganizationalStructureData {
  blocks: any[];
}

const OrganizationalStructurePage: React.FC = () => {
  const { setBreadcrumbsData } = useGlobalLayout();
  const { data, loading, error, refetch } = useStandardPage(
    'organizational-structure',
    fetchOrganizationalStructureData
  );

  React.useEffect(() => {
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Universitet', href: '/university' },
      { label: 'Tuzilma' }
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
      <PageTemplate title="Tuzilma">
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
      title="Tuzilma"
      contentBlocks={data.blocks}
    />
  );
};

export default OrganizationalStructurePage;