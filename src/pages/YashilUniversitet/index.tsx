import React from 'react';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import useStandardPage from '@/hooks/useStandardPage';
import { fetchYashilUniversitetData } from '@/services/yashilUniversitetService';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import PageTemplate from '@/components/shared/PageTemplate';
import ContentBuilder from '@/components/shared/ContentBuilder';

const YashilUniversitetPage: React.FC = () => {
  const { setBreadcrumbsData } = useGlobalLayout();
  const { data, loading, error, refetch } = useStandardPage(
    'yashil-universitet',
    fetchYashilUniversitetData
  );

  React.useEffect(() => {
    setBreadcrumbsData([
      { label: 'Bosh sahifa', href: '/' },
      { label: 'Yashil Universitet' }
    ]);

    return () => {
      setBreadcrumbsData(undefined);
    };
  }, [setBreadcrumbsData]);


  if (loading) {
    return <GenericPageSkeleton showSidebar={false} showHeroImage={false} contentBlocks={8} />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
                <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.5-5.5-3.5m.5 3.5l-2 2m0 0l-2-2m2 2V9a2 2 0 012-2h.5" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Yashil Universitet Sahifasi</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {error ? 'Ma\'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib koring.' : 'Ma\'lumotlar topilmadi'}
            </p>
            <button
              onClick={refetch}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <svg className="-ml-1 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Qayta yuklash
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageTemplate
      title="Yashil Universitet"
      contentBlocks={data}
      className="bg-gradient-to-br from-green-50 via-white to-emerald-50"
    />
  );
};

export default YashilUniversitetPage;