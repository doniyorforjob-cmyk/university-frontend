import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaUserGraduate, FaChalkboardTeacher, FaBuilding, FaUserCheck, FaAward } from 'react-icons/fa';
import { type IconType } from 'react-icons';

interface StatItem {
    id: number;
    icon: IconType;
    end: number;
    text: string;
    plus: boolean;
}

interface IconWrapperProps {
    Icon: IconType; // React.ComponentType o‘rniga IconType ishlatamiz
    size?: number;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ Icon, size = 32 }) => {
    // IconType ni React.ComponentType ga aylantiramiz
    const TypedIcon = Icon as React.ComponentType<{ size?: number }>;
    return <TypedIcon size={size} />;
};

const stats: StatItem[] = [
    { id: 1, icon: FaUserGraduate, end: 10000, text: 'Talabalar', plus: true },
    { id: 2, icon: FaChalkboardTeacher, end: 800, text: "Professor-o‘qituvchilar", plus: true },
    { id: 3, icon: FaBuilding, end: 10, text: 'Fakultetlar', plus: true },
    { id: 4, icon: FaUserCheck, end: 50000, text: 'Bitiruvchilar', plus: true },
    { id: 5, icon: FaAward, end: 150, text: 'Ilmiy darajalar', plus: true },
];

const Stats: React.FC = () => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    React.useEffect(() => {
        if (inView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [inView, hasAnimated]);

    return (
        <div ref={ref} className="py-12 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <div className="flex items-center">
                        <div className="w-1 bg-primary h-8 mr-4"></div>
                        <h2 className="text-3xl font-bold text-gray-800">Biz Raqamlarda</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.id} className="text-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-gray-300">
                            <div className="text-blue-600 mb-3 inline-block">
                                <IconWrapper Icon={stat.icon} />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {hasAnimated && <CountUp end={stat.end} duration={2.5} />}
                                {stat.plus && '+'}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{stat.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;