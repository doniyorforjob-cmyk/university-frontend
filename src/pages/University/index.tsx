import React from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useCachedApi } from '@/hooks/useCachedApi';
import { getUniversityContent, UniversityContent } from '@/api/http/university.http';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { useLocale } from '@/contexts/LocaleContext';

const UniversityPage: React.FC = () => {
  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
  const { locale } = useLocale();

  const { data, loading, error, refetch } = useCachedApi<UniversityContent | null>({
    key: `university-content-v2-${locale}`, // Changed key to force refresh
    fetcher: () => getUniversityContent(locale),
    enabled: true,
    ttlMinutes: 30
  });

  React.useEffect(() => {
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Universitet', href: '/university' }
    ]);

    setSidebarType('systems');

    return () => {
      setBreadcrumbsData(undefined);
      setSidebarType(undefined);
    };
  }, [setBreadcrumbsData, setSidebarType]);

  if (loading) {
    return <GenericPageSkeleton showSidebar={false} showHeroImage={false} contentBlocks={3} />;
  }

  // If we still have no data after fallback logic (shouldn't happen with fallback), show error
  if (error || !data) {
    return (
      <PageTemplate title="Universitet">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error?.message || 'Ma\'lumot topilmadi'}</p>

          {/* DEBUG INFO RESTORED */}
          <div className="mt-4 p-4 bg-gray-100 rounded text-left overflow-auto max-h-64 text-xs font-mono border border-red-200">
            <p className="font-bold text-red-500">DEBUG INFO:</p>
            <p><strong>Loading:</strong> {String(loading)}</p>
            <p><strong>Error:</strong> {error ? JSON.stringify(error, Object.getOwnPropertyNames(error), 2) : 'null'}</p>
            <p><strong>Locale:</strong> {locale}</p>
            <p><strong>Data:</strong> {JSON.stringify(data, null, 2)}</p>
          </div>

          <button
            onClick={refetch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
          >
            Qayta yuklash
          </button>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate title={data.title}>
      <div className="space-y-6">
        {data.image && (
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm relative mb-6">
            <OptimizedImage
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none prose-blue prose-headings:text-[#003B5C] prose-a:text-blue-600 hover:prose-a:text-blue-800"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </PageTemplate>
  );
};

export default UniversityPage;
