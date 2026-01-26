import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchCulturalEvents } from '@/services/culturalEventsService';
import { CulturalEventEntry } from '@/api/http/culturalEvents.http';
import DetailTemplate from '@/components/templates/DetailTemplate';
import DocumentList from '@/components/shared/DocumentList';
import PageSkeleton from '@/components/shared/PageSkeleton';
import EmptyState from '@/components/shared/EmptyState';

const CulturalEventsPage: React.FC = () => {
    const { locale } = useLocale();
    const { t } = useTranslation(['common', 'pages']);
    const { setSidebarType, setBreadcrumbsData } = useGlobalLayout();

    const { data: items, loading, error } = useStandardPage<CulturalEventEntry[]>(
        'cultural-events-list',
        fetchCulturalEvents
    );

    useEffect(() => {
        setSidebarType('info');
        setBreadcrumbsData([
            { label: t('home', 'Bosh sahifa'), href: `/${locale}` },
            { label: t('pages:culturalEvents', 'Madaniy va ko‘ngilochar tadbirlar') }
        ]);

        return () => {
            setSidebarType(undefined);
            setBreadcrumbsData(undefined);
        };
    }, [locale, t, setSidebarType, setBreadcrumbsData]);

    if (loading) {
        return <PageSkeleton />;
    }

    if (error || !items || items.length === 0) {
        return (
            <DetailTemplate
                title={t('pages:culturalEvents', 'Madaniy va ko‘ngilochar tadbirlar')}
                contentType="info"
                showSidebar={false}
            >
                <EmptyState resourceKey="info" className="mt-8" />
            </DetailTemplate>
        );
    }

    return (
        <DetailTemplate
            title={t('pages:culturalEvents', 'Madaniy va ko‘ngilochar tadbirlar')}
            contentType="info"
            showSidebar={false}
        >
            <div className="mt-8 space-y-12">
                {items.map((entry: CulturalEventEntry, index: number) => (
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
                            <div className="bg-white rounded-2xl border border-gray-100 p-1 shadow-sm">
                                <DocumentList files={entry.files} />
                            </div>
                        )}

                        {index < items.length - 1 && (
                            <div className="border-b border-dashed border-gray-200 pt-6"></div>
                        )}
                    </div>
                ))}
            </div>
        </DetailTemplate>
    );
};

export default CulturalEventsPage;
