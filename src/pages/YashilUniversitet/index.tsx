import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import DocumentList from '@/components/shared/DocumentList';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchYashilUniversitetData, YashilUniversitetEntry } from '@/services/yashilUniversitetService';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const YashilUniversitetPage: React.FC = () => {
  const { locale } = useLocale();
  const { t } = useTranslation(['common', 'pages']);
  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();

  const { data, loading, error, refetch } = useStandardPage<YashilUniversitetEntry | null>(
    `yashil-universitet-data-${locale}`,
    () => fetchYashilUniversitetData(locale)
  );

  React.useEffect(() => {
    setSidebarType('systems');
    setBreadcrumbsData([
      { label: t('common:home', 'Bosh sahifa'), href: `/${locale}` },
      { label: t('pages:yashilUniversitet', 'Yashil Universitet') }
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
      <PageTemplate title={t('pages:yashilUniversitet', 'Yashil Universitet')}>
        <div className="text-center py-20 bg-emerald-50 rounded-3xl border border-emerald-100">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-sm mb-6">
            <span className="text-4xl">🍃</span>
          </div>
          <p className="text-emerald-800 font-medium mb-6">
            {error ? 'Ma\'lumotlarni yuklashda xatolik yuz berdi.' : 'Ma\'lumotlar topilmadi'}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-emerald-600 text-white px-8 py-3 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            {t('common:retry', 'Qayta yuklash')}
          </button>
        </div>
      </PageTemplate>
    );
  }

  return (
    <div className="relative">
      {/* Background elements for greenery feel */}
      <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60" />

      <PageTemplate
        title={data.title}
      >
        <div className="space-y-12">
          {/* Main Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed yashil-universitet-content">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>

          {/* Documents Section */}
          {data.files && data.files.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600 text-base">📁</span>
                {t('common:documents', 'Hujjatlar')}
              </h3>
              <DocumentList files={data.files} />
            </div>
          )}
        </div>
      </PageTemplate>
    </div>
  );
};

export default YashilUniversitetPage;