import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../../components/shared/Container';
import { FacultyCard } from '../../components/shared/cards/FacultyCard';
import { useCachedApi } from '../../hooks/useCachedApi';
import { getFaculties } from '../../services/facultiesService';
import { Faculty } from '../../types/faculty.types';
import EmptyState from '../../components/shared/EmptyState';
import GenericPageSkeleton from '../../components/shared/GenericPageSkeleton';

const FacultiesPage: React.FC = () => {
    const { t } = useTranslation(['common', 'pages']);

    const { data: faculties, loading, error } = useCachedApi<Faculty[]>({
        key: 'faculties-all',
        fetcher: getFaculties,
        ttlMinutes: 30
    });

    if (loading && !faculties) {
        return <GenericPageSkeleton />;
    }

    const items = faculties || [];

    return (
        <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-b from-white to-blue-50/30 min-h-screen">
            <Container>
                <div className="mb-8 md:mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-4"
                    >
                        {t('pages:faculties', 'Fakultetlar')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 max-w-2xl mx-auto text-lg"
                    >
                        {t('pages:facultiesDesc', 'Universitetimizdagi mavjud barcha fakultetlar va ularning faoliyati bilan tanishing')}
                    </motion.p>
                </div>

                {items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {items.map((faculty, index) => (
                            <FacultyCard
                                key={faculty.id}
                                id={faculty.id}
                                name={faculty.name}
                                icon={faculty.iconImage || faculty.icon}
                                description={faculty.shortDescription}
                                href={`/faculties/${faculty.id}`}
                                variant="grid-card"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-12">
                        <EmptyState
                            resourceKey="faculties"
                            className="min-h-[20rem]"
                        />
                    </div>
                )}
            </Container>
        </section>
    );
};

export default FacultiesPage;
