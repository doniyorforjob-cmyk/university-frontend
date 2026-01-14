import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../../components/shared/Container';
import { useCachedApi } from '../../hooks/useCachedApi';
import { getFaculties, getDepartments } from '../../services/facultiesService';
import { Faculty, Department } from '../../types/faculty.types';
import GenericPageSkeleton from '../../components/shared/GenericPageSkeleton';
import EmptyState from '../../components/shared/EmptyState';
// Components
import { FacultyGridCard } from './components/FacultyGridCard';
import { DepartmentsTab } from './components/DepartmentsTab';

const FacultiesPage: React.FC = () => {
    const { t } = useTranslation(['common', 'pages']);
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
        if (tab === 'departments') {
            navigate('/departments');
        } else {
            navigate('/faculties');
        }
    };

    return (
        <section className="py-10 bg-white min-h-screen">
            <Container>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#003B5C] mb-8 text-left max-w-3xl leading-[1.2]">
                        Fakultetlar va kafedralar
                    </h1>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-8 relative">
                        <button
                            onClick={() => handleTabChange('faculties')}
                            className={`pb-3 pr-8 font-medium text-lg transition-all relative ${activeTab === 'faculties'
                                ? 'text-black font-bold'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            Fakultetlar
                            {activeTab === 'faculties' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-8 h-0.5 bg-black"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                        <button
                            onClick={() => handleTabChange('departments')}
                            className={`pb-3 px-8 font-medium text-lg transition-all relative ${activeTab === 'departments'
                                ? 'text-black font-bold'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            Kafedralar
                            {activeTab === 'departments' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-8 right-0 h-0.5 bg-black"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="min-h-[400px]">
                    {activeTab === 'faculties' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {facultiesList.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {facultiesList.map((faculty) => (
                                        <FacultyGridCard
                                            key={faculty.id}
                                            id={faculty.id}
                                            name={faculty.name}
                                            image={faculty.image}
                                            href={`/faculties/${faculty.id}`}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState resourceKey="faculties" />
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'departments' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <DepartmentsTab
                                departments={departments || []}
                                faculties={faculties || []}
                            />
                        </motion.div>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default FacultiesPage;
