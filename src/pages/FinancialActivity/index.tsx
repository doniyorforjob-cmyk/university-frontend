import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';
import { fetchFinancialActivities } from '@/services/financialActivityService';
import { ActivityEntry } from '@/api/http/financialActivity.http';
import DetailTemplate from '@/components/templates/DetailTemplate';
import DocumentList from '@/components/shared/DocumentList';
import PageSkeleton from '@/components/shared/PageSkeleton';
import EmptyState from '@/components/shared/EmptyState';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FinancialActivityPage: React.FC = () => {
    const { locale } = useLocale();
    const { t } = useTranslation(['common', 'pages']);
    const { setSidebarType, setBreadcrumbsData } = useGlobalLayout();

    const { data: items, loading, error } = useStandardPage<ActivityEntry[]>(
        'financial-activity',
        fetchFinancialActivities
    );

    const [activeYear, setActiveYear] = useState<string>('all');

    // Group items by year
    const groupedData = useMemo(() => {
        if (!items) return {};
        const groups: Record<string, ActivityEntry[]> = {};

        items.forEach((item: ActivityEntry) => {
            const year = String(item.year || t('pages:other', 'Boshqa'));
            if (!groups[year]) groups[year] = [];
            groups[year].push(item);
        });

        return groups;
    }, [items, t]);

    // Available years sorted descending, plus "all" tab
    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startYear = 2020;
        const yearRange = Array.from(
            { length: currentYear - startYear + 1 },
            (_, i) => (startYear + i).toString()
        );

        // Merge range with dynamic years from data (in case there's data outside 2020 range)
        const dynamicYears = Object.keys(groupedData).filter(y => y !== t('pages:other', 'Boshqa'));
        const allUniqueYears = Array.from(new Set([...yearRange, ...dynamicYears]));

        const sortedYears = allUniqueYears.sort((a, b) => b.localeCompare(a));

        // Include "Other" if it exists in data
        if (groupedData[t('pages:other', 'Boshqa')]) {
            sortedYears.push(t('pages:other', 'Boshqa'));
        }

        return ['all', ...sortedYears];
    }, [groupedData, t]);

    // Data for the active tab (Defining this before early returns to follow rules of hooks)
    const activeEntries = useMemo(() => {
        if (!items) return [];
        if (activeYear === 'all') return items;
        return groupedData[activeYear] || [];
    }, [items, activeYear, groupedData]);

    // Set initial active year when data is loaded
    useEffect(() => {
        if (years.length > 0 && activeYear === '') {
            setActiveYear('all');
        }
    }, [years, activeYear]);

    useEffect(() => {
        setSidebarType('info');
        setBreadcrumbsData([
            { label: t('home', 'Bosh sahifa'), href: `/${locale}` },
            { label: t('pages:financialActivity', 'Moliyaviy faoliyat') }
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
                title={t('pages:financialActivity', 'Moliyaviy faoliyat')}
                contentType="info"
                showSidebar={false}
            >
                <EmptyState resourceKey="info" className="mt-8" />
            </DetailTemplate>
        );
    }

    return (
        <DetailTemplate
            title={t('pages:financialActivity', 'Moliyaviy faoliyat')}
            contentType="info"
            showSidebar={false} // MainLayout already provides sidebar area
        >
            <div className="mt-8 space-y-6">
                {/* Year Tabs - Using shadcn Tabs as requested */}
                {years.length > 1 && (
                    <Tabs value={activeYear} onValueChange={setActiveYear} className="w-full">
                        <TabsList variant="line" className="mb-10">
                            {years.map(year => (
                                <TabsTrigger key={year} value={year}>
                                    {year === 'all' ? t('all', 'Barchasi') : year}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                )}

                {/* Content Area */}
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-10">
                        {activeEntries.map((entry: ActivityEntry) => (
                            <div key={entry.id} className="bg-white rounded-2xl border border-gray-100 p-1">
                                {entry.title && (activeYear === 'all' || entry.title !== activeYear) && (
                                    <h3 className="text-lg font-semibold text-gray-700 px-5 pt-5 mb-1 italic opacity-80">
                                        {entry.title}
                                    </h3>
                                )}
                                <DocumentList files={entry.files} />
                            </div>
                        ))}

                        {activeEntries.length === 0 && (
                            <EmptyState resourceKey="info" />
                        )}
                    </div>
                </div>
            </div>
        </DetailTemplate>
    );
};

export default FinancialActivityPage;
