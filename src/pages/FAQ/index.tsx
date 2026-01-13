import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTemplate from '@/components/templates/SectionTemplate';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import { FAQSection } from '../Appeals/FAQSection';

const FAQPage: React.FC = () => {
    const { t } = useTranslation(['common', 'pages']);
    const { setBreadcrumbsData, setSidebarType } = useGlobalLayout();

    useEffect(() => {
        setBreadcrumbsData([
            { label: t('common:home'), href: '/' },
            { label: t('pages:home.tabs.faq') || 'Savol-javoblar' }
        ]);

        setSidebarType('info');

        return () => {
            setBreadcrumbsData(undefined);
            setSidebarType(undefined);
        };
    }, [setBreadcrumbsData, setSidebarType, t]);

    return (
        <SectionTemplate
            loading={false}
            parentTitle={t('pages:home.tabs.faq') || 'Savol-javoblar'}
            sectionTitle={t('pages:home.tabs.faq') || 'Savol-javoblar'}
            sectionType="info"
            items={[]}
            showSidebar={false}
            showSearch={false}
            showFilters={false}
            showPagination={false}
            showSorting={false}
        >
            <FAQSection />
        </SectionTemplate>
    );
};

export default FAQPage;
