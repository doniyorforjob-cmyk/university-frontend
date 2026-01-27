import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import DocumentList from '@/components/shared/DocumentList';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchInformationServicesData, InformationServiceData } from '@/services/informationServicesService';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { getLocalized, getImageUrl } from '@/utils/apiUtils';

const InformationServicesPage: React.FC = () => {
  const { t, i18n } = useTranslation(['common', 'pages']);
  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
  const { data, loading, error } = useStandardPage<InformationServiceData>(
    'information-services',
    fetchInformationServicesData
  );

  useEffect(() => {
    setBreadcrumbsData([
      { label: t('common:home'), href: '/' },
      { label: t('pages:informationServices') }
    ]);

    setSidebarType('systems');

    return () => {
      setBreadcrumbsData(undefined);
      setSidebarType(undefined);
    };
  }, [setBreadcrumbsData, setSidebarType, t, i18n.language]);

  if (loading) {
    return <GenericPageSkeleton showSidebar={false} showHeroImage={false} contentBlocks={5} showBanner={true} />;
  }

  const title = getLocalized(data?.title, i18n.language) || t('pages:informationServices');
  const description = getLocalized(data?.description, i18n.language);

  // Consider it empty if there's no title from data and no documents/description
  const hasContent = !!description || (data?.documents && data.documents.length > 0);

  return (
    <PageTemplate
      key={i18n.language}
      title={title}
      isEmpty={!!error || (!loading && !hasContent)}
      emptyMessage={error?.message || String(t('pages:noDataAvailable'))}
      emptyResourceKey="info"
    >
      <div className="space-y-8">
        {/* Banner Section */}
        {data?.banner && (
          <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src={getImageUrl(data.banner)}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        {/* Documents Section */}
        {data?.documents && data.documents.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('common:documents', 'Hujjatlar')}
            </h3>
            <DocumentList
              files={data.documents.map((doc: { name: any; file: string }) => {
                const fileName = getLocalized(doc.name, i18n.language);
                const fileUrl = getImageUrl(doc.file);
                const ext = fileUrl.split('.').pop()?.toLowerCase() || 'file';
                return {
                  name: fileName,
                  url: fileUrl,
                  ext: ext,
                  size: undefined
                };
              })}
            />
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default InformationServicesPage;
