import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCachedApi } from '@/hooks/useCachedApi';
import { getFaculties, getDepartments } from '@/services/facultiesService';
import { Faculty, Department } from '@/types/faculty.types';
import GenericPageSkeleton from '@/components/shared/GenericPageSkeleton';
import Container from '@/components/shared/Container';
import { useLocale } from '@/contexts/LocaleContext';

// Components
import { FacultiesDepartmentsView } from './components/FacultiesDepartmentsView';

const FacultiesPage: React.FC = () => {
    const { t } = useTranslation('pages');
    const { locale } = useLocale();
    const location = useLocation();
    const navigate = useNavigate();

    // Determine active tab based on URL
    const activeTab = location.pathname.includes('departments') ? 'departments' : 'faculties';

    const { data: faculties, loading: loadingFaculties } = useCachedApi<Faculty[]>({
        key: 'faculties-all-v5',
        fetcher: getFaculties,
        ttlMinutes: 0.5
    });

    const { data: departments, loading: loadingDepartments } = useCachedApi<Department[]>({
        key: 'departments-all-v5',
        fetcher: getDepartments,
        ttlMinutes: 0.5
    });

    const isLoading = loadingFaculties || loadingDepartments;

    if (isLoading && !faculties && !departments) {
        return <GenericPageSkeleton />;
    }

    const facultiesList = faculties || [];
    const departmentsList = departments || [];

    const handleTabChange = (tab: 'faculties' | 'departments') => {
        const prefix = locale === 'uz' ? '' : `/${locale}`;
        if (tab === 'departments') {
            navigate(`${prefix}/departments`);
        } else {
            navigate(`${prefix}/faculties`);
        }
    };

    return (
        <section className="py-10 bg-white min-h-screen">
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#003B5C] mb-8 text-left max-w-3xl leading-[1.2]">
                        {t('facultiesAndDepartments')}
                    </h1>
                </div>
                <FacultiesDepartmentsView
                    faculties={facultiesList}
                    departments={departmentsList}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            </Container>
        </section>
    );
};

export default FacultiesPage;
