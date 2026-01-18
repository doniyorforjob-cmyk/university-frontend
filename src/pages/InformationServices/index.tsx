import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download } from 'lucide-react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchInformationServicesData, InformationServiceData } from '@/services/informationServicesService';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { getLocalized, getImageUrl } from '@/utils/apiUtils';

const InformationServicesPage: React.FC = () => {
  const { t, i18n } = useTranslation(['common', 'pages']);
  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
  const { data, loading, error, refetch } = useStandardPage<InformationServiceData>(
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
          <div className="mt-12 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="text-blue-600" />
              {t('common:documents', 'Hujjatlar')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.documents.map((doc: { name: any; file: string }, idx: number) => (
                <a
                  key={idx}
                  href={getImageUrl(doc.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FileText size={20} />
                    </div>
                    <span className="font-medium text-gray-700">{getLocalized(doc.name, i18n.language)}</span>
                  </div>
                  <Download size={20} className="text-gray-400 group-hover:text-blue-600" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default InformationServicesPage;
