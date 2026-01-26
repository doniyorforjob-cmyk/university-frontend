import React, { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getStepForwards } from '@/services/stepForwardService';
import { StepForward } from '@/types/step-forward.types';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';

// Kelajakka qadam ma'lumotlarini olish funksiyasi
const fetchStepForwardsData = async (locale?: string): Promise<SectionItem[]> => {
    const data = await getStepForwards(locale);

    const sectionItems: SectionItem[] = data.map((item: StepForward) => ({
        id: item.id.toString(),
        title: item.title,
        description: item.description || '',
        date: item.date,
        image: item.image_url,
        href: `/step-forward/${item.slug}`,
        category: 'Kelajakka qadam',
        views: item.views
    }));

    return sectionItems;
};

const StepForwardPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation(['common', 'pages']);

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const urlLocale = ['uz', 'en', 'ru'].includes(pathSegments[0]) ? pathSegments[0] : 'uz';

    const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
    const { data: items, loading, error } = useStandardPage(
        'step-forward',
        fetchStepForwardsData
    );

    useEffect(() => {
        setBreadcrumbsData([
            { label: t('home'), href: '/' },
            { label: t('pages:infoService'), href: '#' },
            { label: t('pages:stepForward') }
        ]);

        setSidebarType('info');

        return () => {
            setBreadcrumbsData(undefined);
            setSidebarType(undefined);
        };
    }, [setBreadcrumbsData, setSidebarType, t]);

    const handleItemClick = useCallback((item: SectionItem) => {
        const targetPath = urlLocale === 'uz' ? item.href : `/${urlLocale}${item.href}`;
        navigate(targetPath);
    }, [navigate, urlLocale]);

    if (error) {
        return (
            <div className="text-center py-20 text-red-500">
                <p>{error?.message || 'Ma\'lumot topilmadi'}</p>
            </div>
        );
    }

    return (
        <SectionTemplate
            loading={loading}
            parentTitle={t('pages:infoService')}
            sectionTitle={t('pages:stepForward')}
            sectionType="info"
            items={items || []}
            totalItems={(items || []).length}
            layoutType="grid"
            itemsPerPage={12}
            showSearch={true}
            showPagination={true}
            showSorting={true}
            onItemClick={handleItemClick}
        />
    );
};

export default StepForwardPage;
