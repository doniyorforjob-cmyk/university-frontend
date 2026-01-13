import React, { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPosts } from '../../services/postService';
import { Post } from '../../types/post.types';
import SectionTemplate, { SectionItem } from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { useStandardPage } from '@/hooks/useStandardPage';
import ServerError from '@/pages/Errors/ServerError';
import { useLocale } from '@/contexts/LocaleContext';

// Corruption ma'lumotlarini olish funksiyasi
const fetchCorruptionData = async (locale?: string): Promise<SectionItem[]> => {
    // Category 'corruption' ishlatiladi
    const data = await getPosts('corruption', locale);

    // Post[] ni SectionItem[] ga o'zgartirish
    const sectionItems: SectionItem[] = data.map((post: Post) => ({
        id: post.id.toString(),
        title: post.title,
        description: post.description || '',
        date: post.published_at,
        image: post.image_url,
        href: `/corruption/${post.slug}`,
        category: 'Korrupsiya'
    }));

    return sectionItems;
};

const CorruptionPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation(['common', 'pages']);
    const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();
    const { locale } = useLocale();

    const { data: items, loading, error } = useStandardPage(
        'corruption',
        () => fetchCorruptionData(locale)
    );

    useEffect(() => {
        setBreadcrumbsData([
            { label: t('home'), href: '/' },
            { label: t('pages:home.tabs.corruption') }
        ]);

        setSidebarType('info');

        return () => {
            setBreadcrumbsData(undefined);
            setSidebarType(undefined);
        };
    }, [setBreadcrumbsData, setSidebarType, locale, t]);

    const handleItemClick = useCallback((item: SectionItem) => {
        const pathParts = location.pathname.split('/');
        const firstSegment = pathParts[1];
        const urlLocale = ['uz', 'ru', 'en'].includes(firstSegment) ? firstSegment : 'uz';

        const cleanHref = item.href.startsWith('/') ? item.href : `/${item.href}`;

        let targetPath;
        if (urlLocale === 'uz') {
            targetPath = cleanHref;
        } else {
            targetPath = `/${urlLocale}${cleanHref}`;
        }

        navigate(targetPath);
    }, [navigate, location.pathname]);

    if (error) {
        return <ServerError />;
    }

    return (
        <SectionTemplate
            loading={loading}
            parentTitle={t('home')}
            sectionTitle={t('pages:home.tabs.corruption')}
            sectionType="news"
            items={items || []}
            totalItems={(items || []).length}
            layoutType="grid"
            itemsPerPage={12}
            showSearch={false}
            showPagination={true}
            showSorting={true}
            onItemClick={handleItemClick}
        />
    );
};

export default CorruptionPage;
