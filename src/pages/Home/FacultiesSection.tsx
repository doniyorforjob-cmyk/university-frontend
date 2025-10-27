import React, { useState } from 'react';
import {
    CpuChipIcon,
    TruckIcon,
    BriefcaseIcon,
    BanknotesIcon,
    BuildingOfficeIcon,
    Cog6ToothIcon,
    BoltIcon,
    WrenchScrewdriverIcon,
    ScissorsIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Container';

const faculties = [
    { name: 'Muhandislik-axborot texnologiyalari', icon: CpuChipIcon, color: 'from-sky-500 to-indigo-500' },
    { name: 'Transport', icon: TruckIcon, color: 'from-slate-500 to-slate-700' },
    { name: 'Biznesni boshqarish', icon: BriefcaseIcon, color: 'from-emerald-500 to-green-600' },
    { name: 'Iqtisodiyot', icon: BanknotesIcon, color: 'from-lime-500 to-green-500' },
    { name: 'Qurilish', icon: BuildingOfficeIcon, color: 'from-amber-500 to-orange-600' },
    { name: 'Texnologiya', icon: Cog6ToothIcon, color: 'from-purple-500 to-violet-600' },
    { name: 'Energetika', icon: BoltIcon, color: 'from-yellow-400 to-amber-500' },
    { name: 'Mexanika', icon: WrenchScrewdriverIcon, color: 'from-gray-500 to-slate-600' },
    { name: 'To\'qimachilik sanoati enjiniringi', icon: ScissorsIcon, color: 'from-pink-500 to-rose-500' },
];

const FacultiesSection = () => {
    const { t } = useTranslation();
    const [visibleCount, setVisibleCount] = useState(8);

    const showMoreFaculties = () => {
        setVisibleCount(faculties.length);
    };

    return (
        <section className="py-12 bg-white dark:bg-gray-900">
            <Container>
                <div className="mb-12">
                    <div className="flex items-center">
                        <div className="w-1 bg-primary h-8 mr-4"></div>
                        <h2 className="text-fluid-h2 font-extrabold text-gray-900 dark:text-white">{t('faculties')}</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {faculties.slice(0, visibleCount).map((faculty, index) => {
                        const Icon = faculty.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                            >
                                <div className={`flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br ${faculty.color} mx-auto mb-6`}>
                                    <Icon className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-fluid-p font-semibold text-center text-gray-900 dark:text-white">{faculty.name}</h3>
                            </div>
                        );
                    })}
                </div>
                {visibleCount < faculties.length && (
                    <div className="text-center mt-12">
                        <button
                            onClick={showMoreFaculties}
                            className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors duration-300"
                        >
                            {t('seeAll')}
                        </button>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default FacultiesSection;