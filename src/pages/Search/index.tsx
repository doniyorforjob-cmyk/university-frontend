import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import Container from '@/components/shared/Container';
import { searchSite, SearchResult } from '@/services/searchService';
import EmptyState from '@/components/shared/EmptyState';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SearchResultCard from '@/components/shared/SearchResultCard';

// Color badge per type
const TYPE_COLORS: Record<string, string> = {
    news: 'bg-blue-100 text-blue-700',
    announcement: 'bg-yellow-100 text-yellow-700',
    event: 'bg-purple-100 text-purple-700',
    open_lesson: 'bg-green-100 text-green-700',
    article: 'bg-teal-100 text-teal-700',
    department: 'bg-orange-100 text-orange-700',
    faculty: 'bg-indigo-100 text-indigo-700',
    person: 'bg-pink-100 text-pink-700',
    info: 'bg-gray-100 text-gray-700',
    other: 'bg-gray-100 text-gray-600',
};

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const { t } = useTranslation(['common']);
    const { locale } = useLocale();
    const { setBreadcrumbsData, setSidebarType, setSidebarExtraContent } = useGlobalLayout();

    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setBreadcrumbsData([
            { label: t('common:nav.home'), href: locale === 'uz' ? '/' : `/${locale}` },
            { label: t('common:search', 'Qidiruv') }
        ]);
        setSidebarType(undefined);
        setSidebarExtraContent(undefined);
        return () => {
            setBreadcrumbsData(undefined);
            setSidebarType(undefined);
            setSidebarExtraContent(undefined);
        };
    }, [locale, t, setBreadcrumbsData, setSidebarType, setSidebarExtraContent]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) { setResults([]); return; }
            setLoading(true);
            try {
                const data = await searchSite(query, locale);
                setResults(data);
            } catch (err) {
                console.error('Search fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [query, locale]);

    // Group results and flatten them while keeping track of when a category changes
    const { flatItems, groupedResults } = useMemo(() => {
        const grouped = results.reduce<Record<string, SearchResult[]>>((acc, item) => {
            if (!acc[item.type]) acc[item.type] = [];
            acc[item.type].push(item);
            return acc;
        }, {});

        const sortedTypes = Object.keys(grouped);
        const flat: SectionItem[] = [];

        sortedTypes.forEach(type => {
            grouped[type].forEach(res => {
                flat.push({
                    id: res.id,
                    title: res.title,
                    description: res.description,
                    date: res.date,
                    image: res.image,
                    href: res.href,
                    category: res.type, // Map type to category for header detection
                });
            });
        });

        return { flatItems: flat, groupedResults: grouped };
    }, [results]);

    const getTypeLabel = (type: string) =>
        t(`common:content_types.${type}`, type.charAt(0).toUpperCase() + type.slice(1));

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <Container>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        {query
                            ? <>{t('common:search_results_for', 'Qidiruv natijalari')}: <span className="text-secondary">&quot;{query}&quot;</span></>
                            : t('common:search', 'Qidiruv')
                        }
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {loading
                            ? t('common:searching', 'Qidirilmoqda...')
                            : results.length > 0
                                ? t('common:results_found', { count: results.length })
                                : query ? '' : ''}
                    </p>
                </div>

                {/* Content Area */}
                {!loading && flatItems.length === 0 ? (
                    <EmptyState
                        resourceKey="info"
                        title={!query
                            ? t('common:start_searching', 'Qidirishni boshlang')
                            : t('common:no_results_title', "Natija topilmadi")}
                        message={!query
                            ? t('common:search_instruction', "Saytdan ma'lumot topish uchun qidiruv maydoniga kalit so'z yozing.")
                            : t('common:no_results_text', "Boshqa kalit so'zlar bilan qidirib ko'ring.")}
                        className="min-h-[30rem]"
                        icon={<MagnifyingGlassIcon className="w-16 h-16 opacity-40" />}
                    />
                ) : (
                    <SectionTemplate
                        parentTitle={t('common:search', 'Qidiruv')}
                        sectionTitle={t('common:search_results', 'Qidiruv natijalari')}
                        sectionType="info"
                        items={flatItems}
                        layoutType="list"
                        itemsPerPage={10}
                        showFilters={false}
                        showSearch={false}
                        showSorting={false}
                        showPagination={true}
                        loading={loading}
                        renderItem={(item, idx) => {
                            // Find category group to get more info if needed
                            const type = item.category || 'other';
                            const colorClass = TYPE_COLORS[type] || TYPE_COLORS.other;

                            // Determine if this is the first item of this category in the CURRENT FLAT ARRAY
                            // This logic is tricky with pagination, so we'll check if it's the first occurrence of this category
                            // relative to all items rendered SO FAR in the current page list or just use index?
                            // Actually, let's use a simpler approach: check if the PREVIOUS item in flatItems has a different category.
                            // Since SectionTemplate.tsx renders currentItems.map((item, index) => ...),
                            // we can't easily look back at global flatItems without knowing the offset.

                            // BUT, we can find the index of this item in the sorted global flatItems.
                            const globalIdx = flatItems.findIndex(fi => fi.id === item.id);
                            const prevItem = globalIdx > 0 ? flatItems[globalIdx - 1] : null;
                            const isFirstOfCategory = !prevItem || prevItem.category !== item.category;

                            const rawResult = results.find(r => r.id === item.id);
                            if (!rawResult) return null;

                            return (
                                <div key={item.id}>
                                    {isFirstOfCategory && (
                                        <div className="flex items-center gap-3 mb-5 mt-8 first:mt-0">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${colorClass}`}>
                                                {getTypeLabel(type)}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {t('common:results_count', { count: groupedResults[type]?.length || 0 })}
                                            </span>
                                            <div className="flex-1 h-px bg-gray-200" />
                                        </div>
                                    )}
                                    <SearchResultCard item={rawResult} gi={0} idx={idx} />
                                </div>
                            );
                        }}
                    />
                )}
            </Container>
        </div>
    );
};

export default SearchPage;
