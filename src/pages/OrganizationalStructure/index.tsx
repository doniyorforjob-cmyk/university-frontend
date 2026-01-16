import React from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import Container from '@/components/shared/Container';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchOrganizationalStructureData } from '@/services/organizationalStructureService';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const OrganizationalStructurePage: React.FC = () => {
  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
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

    setSidebarType(undefined);

    return () => {
      setBreadcrumbsData(undefined);
      setSidebarType(undefined);
    };
  }, [setBreadcrumbsData, setSidebarType]);

  if (loading) {
    return (
      <Container className="py-8">
        <GenericPageSkeleton showSidebar={false} showHeroImage={false} contentBlocks={5} />
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container className="py-8">
        <PageTemplate title="Tuzilma">
          <div className="text-center py-12">
            <p className="text-gray-500 italic mb-6">{error?.message || 'Ma\'lumot topilmadi yoki hali yuklanmagan'}</p>
            <button
              onClick={refetch}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-[#003B5C] hover:bg-[#002B4C] transition-colors"
            >
              Qayta yuklash
            </button>
          </div>
        </PageTemplate>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <PageTemplate title={data.title}>
        <div className="w-full bg-white overflow-hidden">
          {data.fileUrl ? (
            <div className="relative w-full min-h-[500px] h-[calc(100vh-250px)] lg:h-[calc(100vh-200px)] bg-white overflow-hidden">
              <iframe
                src={`${data.fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&statusbar=0&messages=0`}
                className="absolute inset-0 w-full h-full border-0"
                title={data.title}
                style={{
                  backgroundColor: 'white',
                  overflow: 'hidden'
                }}
                scrolling="no"
              />
            </div>
          ) : (
            <div className="p-12 text-center bg-gray-50/50">
              <p className="text-gray-500 italic">Tuzilma hujjati (PDF) mavjud emas.</p>
            </div>
          )}
        </div>
      </PageTemplate>
    </Container>
  );
};

export default OrganizationalStructurePage;