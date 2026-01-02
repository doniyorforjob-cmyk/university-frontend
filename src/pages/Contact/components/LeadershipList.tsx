import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLeadership } from '../../../services/leadershipService';
import { Leadership } from '../../../types/leadership.types';
import {
    PhoneIcon,
    EnvelopeIcon,
    UserIcon,
    BuildingOffice2Icon,
} from '@heroicons/react/24/outline';
import { useStandardPage } from '@/hooks/useStandardPage';
import { useLocale } from '@/contexts/LocaleContext';
import { useGlobalCache } from '@/components/providers/CachedApiProvider';

const LeadershipList: React.FC = () => {
    const { t } = useTranslation(['pages', 'common']);
    const { locale } = useLocale();
    const { cacheManager } = useGlobalCache();

    const {
        data: leaders,
        loading: isLoading,
        error,
    } = useStandardPage<Leadership[]>(
        'leadership',
        () => getLeadership(locale)
    );

    // Background prefetching for other locales
    useEffect(() => {
        if (!leaders || leaders.length === 0) return;

        const otherLocales = ['uz', 'ru', 'en'].filter(l => l !== locale);

        otherLocales.forEach(async (targetLocale) => {
            const cacheKey = `leadership-data-${targetLocale}`;
            if (!cacheManager.has(cacheKey)) {
                try {
                    console.log(`Prefetching leadership for ${targetLocale}...`);
                    const data = await getLeadership(targetLocale);
                    cacheManager.set(cacheKey, data, 10); // 10 minutes TTL
                } catch (e) {
                    console.warn(`Failed to prefetch leadership for ${targetLocale}`, e);
                }
            }
        });
    }, [leaders, locale, cacheManager]);

    if (isLoading && !leaders) {
        return (
            <div className="p-8 rounded-2xl w-full text-center py-12">
                <div className="loading loading-spinner text-[#0E104B] loading-lg"></div>
                <p className="mt-3 text-gray-900/80 font-medium">{t('common:loading') || 'Yuklanmoqda...'}</p>
            </div>
        );
    }

    if (error && !leaders) {
        return (
            <div className="p-8 rounded-2xl w-full text-center py-12">
                <p className="text-[#ef4444] font-medium">
                    {t('common:error_fetching_data') || "Ma'lumotlarni yuklashda xatolik yuz berdi."}
                </p>
            </div>
        );
    }

    const lineColors = [
        'bg-primary',
        'bg-secondary',
        'bg-accent',
        'bg-info',
    ];

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                {t('leadership')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(leaders || [])?.map((item: Leadership, index: number) => (
                    <div key={item.id} className="relative flex items-start group">
                        <div
                            className={`absolute left-0 top-0 bottom-0 w-1 rounded-full opacity-80 group-hover:opacity-100 transition-opacity ${lineColors[index % lineColors.length]
                                }`}
                        ></div>
                        <div
                            className={`absolute left-[-6px] top-8 w-3 h-3 rounded-full shadow-md group-hover:scale-125 transition-transform duration-300 ${lineColors[index % lineColors.length]
                                }`}
                        ></div>
                        <div className="ml-6 pl-2 w-full bg-white p-6 rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center mb-3">
                                <BuildingOffice2Icon className="w-5 h-5 text-gray-900/70 mr-2" />
                                <h3 className="text-xl font-bold text-gray-900">
                                    {item.name}
                                </h3>
                            </div>
                            <p className="text-gray-900 mb-3 flex items-center text-sm">
                                <UserIcon className="w-4 h-4 mr-2 text-gray-900/70" />
                                <span>
                                    {t('responsible')}: <strong>{item.head}</strong>
                                </span>
                            </p>
                            <div className="space-y-2 text-sm">
                                {item.phone && (
                                    <div className="flex items-center text-gray-900/80">
                                        <PhoneIcon className="w-4 h-4 mr-3 text-[#0E104B]" />
                                        <span className="font-medium">{item.phone}</span>
                                    </div>
                                )}
                                {item.email && (
                                    <div className="flex items-center text-gray-900/80">
                                        <EnvelopeIcon className="w-4 h-4 mr-3 text-secondary" />
                                        <span className="font-medium">{item.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeadershipList;
