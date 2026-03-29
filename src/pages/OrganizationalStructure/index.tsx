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

  const isImage = data?.fileUrl?.toLowerCase().match(/\.(jpg|jpeg|png|webp|avif|svg)$/);
  const isDocument = data?.fileUrl?.toLowerCase().match(/\.(pdf|doc|docx)$/);

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
              {isImage ? (
                /* minimalist Image Viewer */
                <div className="flex justify-center w-full bg-white">
                  <img
                    src={data.fileUrl}
                    alt={data.title}
                    className="max-w-full h-auto select-none"
                    draggable={false}
                  />
                </div>
              ) : isDocument ? (
                /* Document/PDF Warning */
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                  <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t('pages:unsupported_format', 'Format qo\'llab-quvvatlanmaydi')}
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {t('pages:image_format_warning')}
                  </p>
                  <a
                    href={data.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-all border border-gray-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {t('common:download', 'Yuklab olish')}
                  </a>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </PageTemplate>
    </Container>
  );
};

export default OrganizationalStructurePage;