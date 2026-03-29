import React from 'react';

interface TabItem {
    id: string;
    label: string;
    icon?: React.ElementType;
}

interface SectionTabsProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}

const SectionTabs: React.FC<SectionTabsProps> = ({
    tabs,
    activeTab,
    onTabChange,
    className = ''
}) => {
    return (
        <div className={`w-full overflow-x-auto no-scrollbar ${className}`}>
            <div className={`flex min-w-max ${className.includes('justify-center') ? 'justify-center' : ''}`}>
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex items-center justify-center gap-2 px-8 py-4 font-bold transition-all duration-300 relative group
                                ${className.includes('full-width') ? 'flex-1' : ''}
                                ${isActive
                                    ? 'bg-[#6D6EAB] text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {Icon && (
                                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`} />
                            )}
                            <span className="whitespace-nowrap">{tab.label}</span>

                            {/* Decorative line for non-active items - Fully visible ('on') as requested */}
                            {!isActive && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6D6EAB]"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SectionTabs;
