import React, { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getOpenLessons } from '@/services/openLessonService';
import { OpenLesson } from '@/types/open-lesson.types';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';

// Ochiq darslar ma'lumotlarini olish funksiyasi
const fetchOpenLessonsData = async (locale?: string): Promise<SectionItem[]> => {
    const data = await getOpenLessons(locale);

    const sectionItems: SectionItem[] = data.map((lesson: OpenLesson) => ({
        id: lesson.id.toString(),
        title: lesson.title,
        description: lesson.description || '',
        date: lesson.lesson_date,
        image: lesson.image_url,
        href: `/open-lessons/${lesson.slug}`,
        category: 'Ochiq dars',
        views: lesson.views,
        author: lesson.teacher_name
    }));

    return sectionItems;
};

const OpenLessonsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation(['common', 'pages']);

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const urlLocale = ['uz', 'en', 'ru'].includes(pathSegments[0]) ? pathSegments[0] : 'uz';

    const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
    const { data: items, loading, error } = useStandardPage(
        'open-lessons',
        fetchOpenLessonsData
    );

    useEffect(() => {
        setBreadcrumbsData([
            { label: t('home'), href: '/' },
            { label: t('pages:infoService'), href: '#' },
            { label: t('pages:openLessons') }
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
            sectionTitle={t('pages:openLessons')}
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

export default OpenLessonsPage;
