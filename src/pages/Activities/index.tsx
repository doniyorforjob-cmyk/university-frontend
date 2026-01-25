import React from 'react';
import PageTemplate from '@/components/shared/PageTemplate';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchActivitiesData } from '@/services/activitiesService';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ActivityPageData } from '@/types/activities.types';
import ErrorDisplay from '@/components/shared/ErrorDisplay';

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
    return <GenericPageSkeleton showSidebar={false} showHeroImage={false} contentBlocks={12} />;
  }

  if (error || !data) {
    return (
      <ErrorDisplay
        message={error?.message}
        onRetry={refetch}
      />
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