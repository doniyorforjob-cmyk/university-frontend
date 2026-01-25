import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, ChevronDown, User } from 'lucide-react';
import { Leadership } from '@/types/leadership.types';
import OptimizedImage from './OptimizedImage';
import { useTranslation } from 'react-i18next';
import { settingsApi } from '@/api/http/settings.http';
import { getImageUrl } from '@/utils/apiUtils';

interface LeadershipCardProps {
    member: Leadership;
    isMain?: boolean; // For the rector (different layout)
    variant?: 'default' | 'small';
}

const LeadershipCard: React.FC<LeadershipCardProps> = ({ member, isMain = false, variant = 'default' }) => {
    const { t, i18n } = useTranslation('common');
    const [expandedSection, setExpandedSection] = React.useState<'career' | 'duties' | null>(null);
    const [logoUrl, setLogoUrl] = useState<string>('/images/logo.png');

    useEffect(() => {
        if (isMain) {
            const fetchLogo = async () => {
                try {
                    const settings = await settingsApi.getSettings(i18n.language);
                    if (settings.logo) {
                        setLogoUrl(getImageUrl(settings.logo));
                    }
                } catch (error) {
                    console.error("Error fetching logo for LeadershipCard:", error);
                }
            };
            fetchLogo();
        }
    }, [isMain, i18n.language]);

    const toggleSection = (section: 'career' | 'duties') => {
        setExpandedSection(prev => prev === section ? null : section);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden mb-6"
        >
            <div className={`flex flex-col lg:flex-row relative ${isMain ? 'lg:h-[18.2rem]' : 'lg:h-64'} overflow-hidden ${!isMain ? 'lg:flex-row-reverse' : ''}`}>

                {/* Left/Right: Info Section */}
                <div
                    className={`flex-1 px-4 lg:px-4 z-10 flex flex-col justify-start pt-0 h-full ${!isMain ? 'lg:pl-4' : ''}`}
                    style={{ paddingTop: isMain ? '20px' : '10px' }}
                >
                    <h1
                        className={`font-black text-[#003B5C] leading-tight tracking-tight p-0 m-0 ${variant === 'small' ? 'text-2xl md:text-[1.55rem]' : 'text-3xl md:text-[1.8rem]'}`}
                        style={{
                            marginTop: '0px',
                            paddingTop: '0px',
                            marginBottom: '8px',
                            fontWeight: '900'
                        }}
                    >
                        {member.name}
                    </h1>

                    <p
                        className="mt-0 font-medium text-gray-500 text-base lg:text-[1.05rem]"
                        style={{
                            fontStyle: 'normal',
                            marginBottom: isMain ? '26px' : '18px',
                            lineHeight: '1.4'
                        }}
                    >
                        {member.position}
                    </p>

                    <div className={`w-full border-t border-dotted border-gray-200 ${isMain ? 'mb-6' : 'mb-4'}`} />

                    {/* Contact Pills */}
                    <div className={`flex flex-wrap gap-4 ${isMain ? 'mb-4' : 'mb-2'}`}>
                        {member.phone && (
                            <a
                                href={`tel:${member.phone}`}
                                className="flex items-center gap-3 px-5 py-2.5 bg-[#F4F7FE] text-[#2563EB] rounded-md hover:bg-blue-50 transition-all border border-blue-100/30 font-bold no-underline"
                                style={{ textDecoration: 'none', boxShadow: 'none' }}
                            >
                                <Phone size={20} className="text-[#3B82F6]" />
                                <span className="text-[1.1rem]" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    +{member.phone.replace(/^\+/, '')}
                                </span>
                            </a>
                        )}
                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="flex items-center gap-3 px-5 py-2.5 bg-[#F2FBF6] text-[#059669] rounded-md hover:bg-emerald-50 transition-all border border-emerald-100/30 font-bold no-underline"
                                style={{ textDecoration: 'none', boxShadow: 'none' }}
                            >
                                <Mail size={20} className="text-[#10B981]" />
                                <span className="text-[1.1rem]" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {member.email}
                                </span>
                            </a>
                        )}
                    </div>

                    {/* Action Pills */}
                    <div className="flex flex-wrap gap-3 mt-0 pb-6">
                        {member.career && (
                            <button
                                onClick={() => toggleSection('career')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all font-bold border ${expandedSection === 'career'
                                    ? 'bg-[#003B5C] text-white border-[#003B5C]'
                                    : 'bg-[#F1F5F9] text-[#1E293B] border-transparent hover:bg-gray-200'
                                    }`}
                            >
                                <span className="text-[1.1rem]" style={{ color: expandedSection === 'career' ? 'white' : '#1E293B' }}>
                                    {t('leadership.career', 'Mehnat faoliyati')}
                                </span>
                                <ChevronDown size={20} style={{ color: expandedSection === 'career' ? 'white' : '#1E293B' }} className={`transition-transform duration-300 ${expandedSection === 'career' ? 'rotate-180' : ''}`} />
                            </button>
                        )}
                        {member.description && (
                            <button
                                onClick={() => toggleSection('duties')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all font-bold border ${expandedSection === 'duties'
                                    ? 'bg-[#003B5C] text-white border-[#003B5C]'
                                    : 'bg-[#F1F5F9] text-[#1E293B] border-transparent hover:bg-gray-200'
                                    }`}
                            >
                                <span className="text-[1.1rem]" style={{ color: expandedSection === 'duties' ? 'white' : '#1E293B' }}>
                                    {t('leadership.duties', 'Vazifalari')}
                                </span>
                                <ChevronDown size={20} style={{ color: expandedSection === 'duties' ? 'white' : '#1E293B' }} className={`transition-transform duration-300 ${expandedSection === 'duties' ? 'rotate-180' : ''}`} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Middle: Skewed Divider & Logo (Only for Main/Rector) */}
                {isMain && (
                    <div className="hidden lg:block absolute right-[32%] top-0 bottom-0 w-14 z-20 overflow-visible pointer-events-none">
                        <div className="h-full w-full bg-[#3B82F6] skew-x-[-15deg] border-l-4 border-white" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full border-4 border-[#3B82F6] shadow-lg flex items-center justify-center overflow-hidden p-2 z-30">
                            <img
                                src={logoUrl}
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
                <div className={`relative ${isMain ? 'lg:w-[35%] lg:-ml-8' : 'lg:w-[28%]'} h-72 ${isMain ? 'lg:h-auto' : 'lg:h-72'} overflow-hidden bg-gray-50 flex items-start justify-center z-0 pt-0 mt-0`}>
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
                            className={`w-full h-full object-cover object-top relative z-20 m-0 p-0 block ${!isMain ? 'rounded-l-2xl' : ''}`}
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