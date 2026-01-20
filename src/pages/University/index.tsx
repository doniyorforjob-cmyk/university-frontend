import React from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useCachedApi } from '@/hooks/useCachedApi';
import { getUniversityContent } from '@/api/http/university.http';
import { useLocale } from '@/contexts/LocaleContext';
import { ContentBlock } from '@/components/shared/ContentBuilder';

const UniversityPage: React.FC = () => {
  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
  const { locale } = useLocale();

  const { data, loading, error, refetch } = useCachedApi<ContentBlock[]>({
    key: `university-content-v3-${locale}`,
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

  if (error || !data) {
    return (
      <PageTemplate title="Universitet">
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
      title="Namangan davlat texnika universiteti"
      contentBlocks={data}
    />
  );
};

export default UniversityPage;
