import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchActivities } from '@/services/activityService';
import { ActivityEntry } from '@/api/http/activity.http';
import PageTemplate from '@/components/shared/PageTemplate';
import DocumentList from '@/components/shared/DocumentList';
import PageSkeleton from '@/components/shared/PageSkeleton';

const ActivitiesPage: React.FC = () => {
  const { locale } = useLocale();
  const { t } = useTranslation(['common', 'pages']);
  const { setSidebarType, setBreadcrumbsData } = useGlobalLayout();

  const { data: items, loading, error } = useStandardPage<ActivityEntry[]>(
    'activities-list',
    fetchActivities
  );

  useEffect(() => {
    setSidebarType('systems');
    setBreadcrumbsData([
      { label: t('home', 'Bosh sahifa'), href: `/${locale}` },
      { label: t('pages:activities', 'Faoliyat') }
    ]);

    return () => {
      setSidebarType(undefined);
      setBreadcrumbsData(undefined);
    };
  }, [locale, t, setSidebarType, setBreadcrumbsData]);

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <PageTemplate
      title={t('pages:activities', 'Faoliyat')}
      isEmpty={!items || items.length === 0 || !!error}
      emptyResourceKey="info"
    >
      <div className="space-y-12">
        {items?.map((entry: ActivityEntry, index: number) => (
          <div key={entry.id} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {entry.title && (
              <div className="not-prose flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.2)]"></div>
                <h2 className="text-2xl font-bold text-gray-800 m-0 p-0 leading-tight">
                  {entry.title}
                </h2>
              </div>
            )}

            {entry.content && (
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-serif"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />
            )}

            {entry.files && entry.files.length > 0 && (
              <DocumentList files={entry.files} />
            )}

            {/* Divider between activities - only if not last */}
            {index < (items?.length || 0) - 1 && (
              <div className="border-b border-dashed border-gray-200 pt-6"></div>
            )}
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default ActivitiesPage;