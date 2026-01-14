import React from 'react';
import { motion } from 'framer-motion';
import { Faculty, Department } from '@/types/faculty.types';
import { FacultyGridCard } from './FacultyGridCard';
import { DepartmentsTab } from './DepartmentsTab';
import EmptyState from '@/components/shared/EmptyState';

interface FacultiesDepartmentsViewProps {
    faculties: Faculty[];
    departments: Department[];
    activeTab: 'faculties' | 'departments';
    onTabChange: (tab: 'faculties' | 'departments') => void;
}

export const FacultiesDepartmentsView: React.FC<FacultiesDepartmentsViewProps> = ({
    faculties,
    departments,
    activeTab,
    onTabChange
}) => {
    return (
        <div className="not-prose">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8 relative">
                <button
                    onClick={() => onTabChange('faculties')}
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
                    onClick={() => onTabChange('departments')}
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

            {/* Content */}
            <div className="min-h-[400px]">
                {activeTab === 'faculties' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {faculties.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {faculties.map((faculty) => (
                                    <FacultyGridCard
                                        key={faculty.id}
                                        id={faculty.id}
                                        name={faculty.name}
                                        image={faculty.image}
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
                            departments={departments}
                            faculties={faculties}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};
