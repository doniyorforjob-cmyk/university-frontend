import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import DocumentList from '@/components/shared/DocumentList';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchAdmissionData, AdmissionEntry } from '@/services/admissionService';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const AdmissionPage: React.FC = () => {
  const { locale } = useLocale();
  const { t } = useTranslation(['common', 'pages']);
  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();

  const { data, loading, error, refetch } = useStandardPage<AdmissionEntry | null>(
    `admission-page-data-${locale}`, // Updated cache key
    () => fetchAdmissionData(locale) // Updated fetch function
  );

  React.useEffect(() => {
    setSidebarType('systems');
    setBreadcrumbsData([
      { label: t('common:home', 'Bosh sahifa'), href: `/${locale}` },
      { label: t('pages:admission', 'Qabul') }
    ]);

    return () => {
      setSidebarType(undefined);
      setBreadcrumbsData(undefined);
    };
  }, [locale, t, setBreadcrumbsData, setSidebarType]);

  if (loading) {
    return <GenericPageSkeleton showSidebar={true} showHeroImage={false} contentBlocks={5} />;
  }

  if (error || !data) {
    return (
      <PageTemplate title={t('pages:admission', 'Qabul')}>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error?.message || t('common:noDataAvailable', 'Ma\'lumot topilmadi')}</p>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            {t('common:retry', 'Qayta yuklash')}
          </button>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate
      title={data.title}
    >
      <div className="space-y-8">
        {/* Main Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>

        {/* Documents Section */}
        {data.files && data.files.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('common:documents', 'Hujjatlar')}
            </h3>
            <DocumentList files={data.files} />
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default AdmissionPage;