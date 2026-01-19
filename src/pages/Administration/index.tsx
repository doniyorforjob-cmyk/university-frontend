import React from 'react';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import { useStandardPage } from '@/hooks/useStandardPage';
import { getLeadershipApi } from '@/api/http/leadership.http';
import { useTranslation } from 'react-i18next';
import { Leadership } from '@/types/leadership.types';

import DetailTemplate from '@/components/templates/DetailTemplate';

import Container from '@/components/shared/Container';

const AdministrationPage: React.FC = () => {
    const { t } = useTranslation('common');
    const { data: members, loading, error, refetch } = useStandardPage<Leadership[]>(
        'administration_data',
        getLeadershipApi
    );

    if (loading) {
        return <GenericPageSkeleton showSidebar={false} showHeroImage={false} contentBlocks={3} />;
    }

    if (error) {
        return (
            <div className="p-8 text-center text-black">
                <p className="text-red-500 mb-4 font-semibold">{t('error_loading', 'Ma\'lumotlarni yuklashda xatolik yuz berdi')}</p>
                <button
                    onClick={refetch}
                    className="px-6 py-2 bg-main text-white rounded-xl hover:bg-main/90 transition-all font-semibold shadow-md"
                >
                    {t('retry', 'Qayta urinish')}
                </button>
            </div>
        );
    }

    const breadcrumbs = [
        { label: t('nav.home', 'Bosh sahifa'), href: '/' },
        { label: t('nav.about', 'Universitet'), href: '/university' },
        { label: t('nav.administration', 'Rahbariyat') }
    ];

    const contentBlocks: any[] = members && members.length > 0 ? [
        {
            id: 'leadership-list-main',
            type: 'leadership-list',
            data: {
                members: members,
                highlightFirst: true
            }
        }
    ] : [];

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <Container>
                <DetailTemplate
                    title={t('nav.administration', 'Rahbariyat')}
                    contentType="person"
                    breadcrumbs={breadcrumbs}
                    contentBlocks={contentBlocks}
                    showSidebar={false}
                    showMeta={false}
                    showSocialShare={true}
                />
            </Container>
        </div>
    );
};

export default AdministrationPage;
