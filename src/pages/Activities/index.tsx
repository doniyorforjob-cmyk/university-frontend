import React from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchActivitiesData } from '@/services/activitiesService';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ActivityPageData } from '@/types/activities.types';

const ActivitiesPage: React.FC = () => {
  const { t } = useTranslation('common');
  const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
  const { data, loading, error, refetch } = useStandardPage<ActivityPageData | null>(
    'activities',
    fetchActivitiesData
  );

  React.useEffect(() => {
    setBreadcrumbsData([
      { label: t('nav.home', 'Bosh sahifa'), href: '/' },
      { label: t('nav.activities', 'Faoliyat') }
    ]);

    setSidebarType('systems');

    return () => {
      setBreadcrumbsData(undefined);
      setSidebarType(undefined);
    };
  }, [setBreadcrumbsData, setSidebarType, t]);

  if (loading) {
    return <GenericPageSkeleton showSidebar={true} showHeroImage={false} contentBlocks={12} />;
  }

  if (error || !data) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('error_title', 'Xatolik yuz berdi')}</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {error?.message || t('error_loading', 'Ma\'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.')}
        </p>
        <button
          onClick={refetch}
          className="px-6 py-3 bg-main text-white rounded-xl hover:bg-main/90 transition-all font-semibold shadow-md"
        >
          {t('retry', 'Qayta yuklash')}
        </button>
      </div>
    );
  }

  return (
    <PageTemplate title={data.title}>
      {/* Introduction Content */}
      {data.content && (
        <div className="mb-12 text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.content }} />
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {data.categories.map((catKey: string, index: number) => {
          const catInfo = data.icons_json[catKey];
          if (!catInfo) return null;

          return (
            <motion.div
              key={catKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_0_rgba(0,0,0,0.08)] transition-all group flex gap-5 items-start"
            >
              {/* Icon Container */}
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center p-4 transition-colors group-hover:bg-main/5">
                <div
                  className="w-full h-full text-main"
                  dangerouslySetInnerHTML={{ __html: catInfo.svg }}
                />
              </div>

              {/* Text Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-main mb-2 group-hover:text-blue-600 transition-colors">
                  {catInfo.label || catKey}
                </h3>
                {catInfo.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {catInfo.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </PageTemplate>
  );
};

export default ActivitiesPage;