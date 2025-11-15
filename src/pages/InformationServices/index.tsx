import React, { useEffect } from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchInformationServicesData } from '@/api/informationServicesApi';
import { ContentBlock } from '@/components/shared/ContentBuilder';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

interface InformationServicesData {
  blocks: ContentBlock[];
}

const InformationServicesPage: React.FC = () => {
  const { setBreadcrumbsData } = useGlobalLayout();
  const { data, loading, error, refetch } = useStandardPage(
    'information-services',
    fetchInformationServicesData
  );

  useEffect(() => {
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Axborot Xizmatlari' }
    ]);

    return () => {
      setBreadcrumbsData(undefined);
    };
  }, [setBreadcrumbsData]);

  if (loading) {
    return <GenericPageSkeleton showSidebar={true} showHeroImage={false} contentBlocks={8} showBanner={false} />;
  }

  if (error || !data) {
    return (
      <PageTemplate
        title="Axborot Xizmatlari"
      > {/* PageTemplate no longer takes showSidebar */}
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
      title="Axborot Xizmatlari"
      // showSidebar is no longer a prop for PageTemplate
      contentBlocks={data.blocks}
    />
  );
};

export default InformationServicesPage;
