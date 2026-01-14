import React, { useState, useMemo } from 'react';
import { Department, Faculty } from '../../../types/faculty.types';
import { DepartmentGridCard } from './DepartmentGridCard';
import { Search, ChevronDown } from 'lucide-react';
import EmptyState from '../../../components/shared/EmptyState';

interface DepartmentsTabProps {
    departments: Department[];
    faculties?: Faculty[];
}

export const DepartmentsTab: React.FC<DepartmentsTabProps> = ({ departments, faculties = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState<string | number>('all');

    const filteredDepartments = useMemo(() => {
        return departments.filter(dept => {
            const name = dept?.name || '';
            const headName = dept?.headName || '';
            const query = searchQuery.toLowerCase();

            const matchesSearch = name.toLowerCase().includes(query) ||
                headName.toLowerCase().includes(query);

            const matchesFaculty = selectedFaculty === 'all' ||
                String(dept.facultyId) === String(selectedFaculty);

            return matchesSearch && matchesFaculty;
        });
    }, [departments, searchQuery, selectedFaculty]);

    return (
        <div>
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Qidiruv"
                        className="w-full pl-4 pr-10 py-3 rounded-lg border border-green-600 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition-all text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={18} />
                    </div>
                </div>

                <div className="relative">
                    <select
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-600 outline-none transition-all text-sm text-gray-600 bg-white appearance-none cursor-pointer"
                        value={selectedFaculty}
                        onChange={(e) => setSelectedFaculty(e.target.value)}
                    >
                        <option value="all">Barcha fakultetlar</option>
                        {faculties.map(faculty => (
                            <option key={faculty.id} value={faculty.id}>
                                {faculty.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <ChevronDown size={18} />
                    </div>
                </div>

                <div className="relative">
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-600 outline-none transition-all text-sm text-gray-600 bg-white opacity-80 appearance-none pointer-events-none" disabled>
                        <option>Ta&apos;lim barcha shakllari</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <ChevronDown size={18} />
                    </div>
                </div>
            </div>

            {/* Grid */}
            {filteredDepartments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDepartments.map((dept: Department) => (
                        <DepartmentGridCard
                            key={dept.id}
                            name={dept.name}
                            phone={dept.phone}
                            email={dept.email}
                            headName={dept.headName}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-12">
                    <EmptyState
                        resourceKey="departments"
                        title="Hech narsa topilmadi"
                        message="Qidiruv so'rovi bo'yicha kafedralar topilmadi."
                    />
                </div>
            )}
        </div>
    );
};
