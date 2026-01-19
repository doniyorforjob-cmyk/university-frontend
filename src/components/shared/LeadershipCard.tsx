import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, ChevronDown, User } from 'lucide-react';
import { Leadership } from '@/types/leadership.types';
import OptimizedImage from './OptimizedImage';
import { useTranslation } from 'react-i18next';

interface LeadershipCardProps {
    member: Leadership;
    isMain?: boolean; // For the rector (different layout)
}

const LeadershipCard: React.FC<LeadershipCardProps> = ({ member, isMain = false }) => {
    const { t } = useTranslation('common');
    const [expandedSection, setExpandedSection] = React.useState<'career' | 'duties' | null>(null);

    const toggleSection = (section: 'career' | 'duties') => {
        setExpandedSection(prev => prev === section ? null : section);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden mb-6"
        >
            <div className={`flex flex-col lg:flex-row relative lg:h-72 overflow-hidden ${!isMain ? 'lg:flex-row-reverse' : ''}`}>

                {/* Left/Right: Info Section */}
                <div className={`flex-1 px-4 lg:px-10 z-10 flex flex-col justify-start pt-4 lg:pt-6 h-full ${!isMain ? 'lg:pl-6' : ''}`}>
                    <h2 className="text-xl lg:text-3xl font-extrabold text-[#003B5C] leading-none mb-2 tracking-tight mt-0">
                        {member.name}
                    </h2>
                    <p className="text-sm lg:text-lg font-medium mb-4 mt-0" style={{ color: '#4b5563' }}>
                        {member.position}
                    </p>

                    <div className="w-full border-t border-dotted border-gray-200 mb-6" />

                    {/* Contact Pills */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {member.phone && (
                            <a
                                href={`tel:${member.phone}`}
                                className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-[#F4F7FE] text-[#003B5C] rounded-lg hover:bg-blue-50 transition-all border border-blue-100/50 font-semibold text-xs lg:text-xl no-underline"
                            >
                                <Phone size={20} className="text-[#3B82F6]" />
                                <span className="no-underline">+{member.phone.replace(/^\+/, '')}</span>
                            </a>
                        )}
                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-[#F2FBF6] text-[#059669] rounded-lg hover:bg-emerald-50 transition-all border border-emerald-100/50 font-semibold text-xs lg:text-xl no-underline"
                            >
                                <Mail size={20} className="text-[#10B981]" />
                                <span className="no-underline">{member.email}</span>
                            </a>
                        )}
                    </div>

                    {/* Action Pills */}
                    <div className="flex flex-wrap gap-2">
                        {member.career && (
                            <button
                                onClick={() => toggleSection('career')}
                                className={`flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 rounded-lg transition-all font-bold text-xs lg:text-xl border ${expandedSection === 'career'
                                    ? 'bg-[#003B5C] text-white border-[#003B5C]'
                                    : 'bg-[#F1F5F9] text-[#1E293B] border-transparent hover:bg-gray-200'
                                    }`}
                            >
                                {t('leadership.career', 'Mehnat faoliyati')}
                                <ChevronDown size={18} className={`transition-transform duration-300 ${expandedSection === 'career' ? 'rotate-180' : ''}`} />
                            </button>
                        )}
                        {member.description && (
                            <button
                                onClick={() => toggleSection('duties')}
                                className={`flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 rounded-lg transition-all font-bold text-xs lg:text-xl border ${expandedSection === 'duties'
                                    ? 'bg-[#003B5C] text-white border-[#003B5C]'
                                    : 'bg-[#F1F5F9] text-[#1E293B] border-transparent hover:bg-gray-200'
                                    }`}
                            >
                                {t('leadership.duties', 'Vazifalari')}
                                <ChevronDown size={18} className={`transition-transform duration-300 ${expandedSection === 'duties' ? 'rotate-180' : ''}`} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Middle: Skewed Divider & Logo (Only for Main/Rector) */}
                {isMain && (
                    <div className="hidden lg:block absolute right-[32%] top-0 bottom-0 w-14 z-20 overflow-visible pointer-events-none">
                        {/* The blue skewed line */}
                        <div className="h-full w-full bg-[#3B82F6] skew-x-[-15deg] border-l-4 border-white" />

                        {/* The Logo Circle - Centered on the line */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full border-4 border-[#3B82F6] shadow-lg flex items-center justify-center overflow-hidden p-2 z-30">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="w-full h-full object-contain scale-110"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/logo.png';
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Right/Left: Photo Section */}
                <div className={`relative ${isMain ? 'lg:w-[35%] lg:-ml-8' : 'lg:w-[30%]'} h-64 lg:h-72 overflow-hidden bg-gray-50 flex items-start justify-center z-0 pt-0 mt-0`}>
                    {/* Background Detail for Rector */}
                    {isMain && (
                        <>
                            <div className="absolute inset-x-0 top-0 bottom-0 z-10 opacity-20 pointer-events-none">
                                <div className="h-full w-full bg-gradient-to-br from-blue-100 to-white"></div>
                            </div>
                            <div className="absolute top-0 right-0 bottom-0 w-2 flex flex-col z-10 opacity-60">
                                <div className="flex-1 bg-[#0099FF]" />
                                <div className="h-1 bg-[#CB0000]" />
                                <div className="flex-1 bg-[#009966]" />
                            </div>
                        </>
                    )}

                    {member.image ? (
                        <OptimizedImage
                            src={member.image}
                            alt={member.name}
                            className={`w-full h-full object-cover object-top relative z-20 m-0 p-0 block ${!isMain ? 'rounded-l-[24px]' : ''}`}
                            width={450}
                            height={550}
                        />
                    ) : (
                        <div className="text-gray-300 relative z-20 pt-10">
                            <User size={80} strokeWidth={1} />
                        </div>
                    )}

                    {/* Gradient Overlay for Rector */}
                    {isMain && (
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-30 hidden lg:block" />
                    )}
                </div>
            </div>

            {/* Accordion Content */}
            <AnimatePresence>
                {expandedSection && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-gray-100 bg-[#F8FAFC]"
                    >
                        <div className="p-10 prose prose-lg prose-main max-w-none">
                            {expandedSection === 'career' ? (
                                <div dangerouslySetInnerHTML={{ __html: member.career || '' }} />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: member.description || '' }} />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default LeadershipCard;
