import React from 'react';
import { useTranslation } from 'react-i18next';
import PageTemplate from '@/components/shared/PageTemplate';
import Container from '@/components/shared/Container';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchOrganizationalStructureData } from '@/services/organizationalStructureService';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const OrganizationalStructurePage: React.FC = () => {
  const { t } = useTranslation(['common', 'pages']);
  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
  const { data, loading, error } = useStandardPage(
    'organizational-structure',
    fetchOrganizationalStructureData
  );

  React.useEffect(() => {
    setBreadcrumbsData([
      { label: t('common:home'), href: '/' },
      { label: t('common:university'), href: '/university' },
      { label: t('pages:organizationalStructure') }
    ]);

    setSidebarType(undefined);

    return () => {
      setBreadcrumbsData(undefined);
      setSidebarType(undefined);
    };
  }, [setBreadcrumbsData, setSidebarType, t]);

  if (loading) {
    return (
      <Container className="py-8">
        <GenericPageSkeleton showSidebar={false} showHeroImage={false} contentBlocks={5} />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <PageTemplate
        title={data?.title || String(t('pages:organizationalStructure'))}
        isEmpty={!!error || !data?.fileUrl}
        emptyResourceKey="info"
        emptyMessage={error?.message || String(t('pages:noDataAvailable'))}
      >
        <div className="w-full bg-white flex flex-col items-center">
          {data?.fileUrl && (
            <div className="w-full">
              {data.fileUrl.toLowerCase().endsWith('.pdf') ? (
                /* Fully Responsive PDF Viewer: uses aspect ratio instead of fixed pixels */
                <div className="w-full aspect-[1/1.4] sm:aspect-[1/1.3] lg:aspect-[1.4/1] bg-white relative overflow-hidden">
                  <iframe
                    src={`${data.fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                    className="absolute inset-0 w-full h-full border-0 bg-white"
                    title={data.title}
                    style={{ backgroundColor: 'white', colorScheme: 'light' }}
                  />
                </div>
              ) : (
                /* Simple Image Viewer for JPG/PNG */
                <div className="flex justify-center p-4">
                  <img
                    src={data.fileUrl}
                    alt={data.title}
                    className="max-w-full h-auto"
                  />
                </div>
              )}

              {/* Discrete mobile fallback */}
              <div className="md:hidden mt-6 px-4 mb-8">
                <a
                  href={data.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#003B5C] text-white font-bold rounded-xl shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {t('pages:viewStructure')}
                </a>
              </div>
            </div>
          )}
        </div>
      </PageTemplate>
    </Container>
  );
};

export default OrganizationalStructurePage;