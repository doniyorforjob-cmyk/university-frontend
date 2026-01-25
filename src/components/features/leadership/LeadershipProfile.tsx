import React, { useState } from 'react';
import {
    Briefcase,
    Target,
    Award
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Leadership } from '@/types/leadership.types';
import { OptimizedImage, Container, EmptyState } from '@/components/shared';

interface LeadershipProfileProps {
    member: Leadership;
}

const LeadershipProfile: React.FC<LeadershipProfileProps> = ({ member }) => {
    const { t } = useTranslation('pages');
    const [activeTab, setActiveTab] = useState<'experience' | 'duties'>('experience');

    return (
        <Container className="py-6 font-sans">
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* CHAP USTUN (4/12) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                            <div className="p-6 flex flex-col items-center">
                                <div className="relative w-full h-0 pb-[100%] rounded-xl overflow-hidden mb-6 group ring-1 ring-gray-100 shadow-lg bg-gray-50 flex items-center justify-center">
                                    <div className="absolute inset-0">
                                        {member.image ? (
                                            <OptimizedImage
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Award size={60} className="text-gray-200" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h1 className="text-xl font-bold text-black text-center mb-2 leading-tight tracking-tight">
                                    {member.name}
                                </h1>
                                <p className="text-gray-500 text-center font-bold bg-gray-50 px-4 py-1.5 rounded-md text-[12px] uppercase tracking-wider">
                                    {member.position}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* O'NG USTUN (8/12) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* BLOK 1: Biografiya va Malumotlar */}
                        <div className="bg-white rounded-xl shadow-[0_4px_16_rgb(0,0,0,0.03)] border border-gray-100 p-10">
                            <div className="mb-10">
                                <h2 className="text-xl font-bold text-black mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                    {t('leadershipProfile.biography')}
                                </h2>
                                <div className="prose prose-base max-w-none font-serif text-[20px] leading-[1.6] text-black rich-text-forced">
                                    {member.biography ? (
                                        <div dangerouslySetInnerHTML={{ __html: member.biography }} className="rich-text-forced" />
                                    ) : (
                                        <EmptyState
                                            message={t('leadershipProfile.noBiography')}
                                            className="min-h-[150px] py-8"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Shaxsiy ma'lumotlar jadvali */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 border-t border-gray-50 pt-10">
                                <div className="space-y-1.5 group">
                                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.1em] group-hover:text-blue-500 transition-colors">{t('fullName')}</p>
                                    <p className="text-[18px] font-bold text-black">{member.name}</p>
                                </div>
                                <div className="space-y-1.5 group">
                                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.1em] group-hover:text-blue-500 transition-colors">{t('leadershipProfile.degree')}</p>
                                    <p className="text-[18px] font-bold text-black">{member.degree || '-'}</p>
                                </div>
                                <div className="space-y-1.5 group">
                                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.1em] group-hover:text-blue-500 transition-colors">{t('leadershipProfile.phone')}</p>
                                    <a href={`tel:${member.phone?.startsWith('+') ? member.phone : `+${member.phone}`}`} className="text-[18px] font-bold text-black hover:text-blue-600 transition-colors leading-tight">
                                        {member.phone ? (member.phone.startsWith('+') ? member.phone : `+${member.phone}`) : '-'}
                                    </a>
                                </div>
                                <div className="space-y-1.5 group">
                                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.1em] group-hover:text-blue-500 transition-colors">{t('leadershipProfile.email')}</p>
                                    <a href={`mailto:${member.email}`} className="text-[18px] font-bold text-blue-600 hover:text-blue-700 hover:underline leading-tight">{member.email || '-'}</a>
                                </div>
                                <div className="space-y-1.5 group">
                                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.1em] group-hover:text-blue-500 transition-colors">{t('leadershipProfile.birthDate')}</p>
                                    <p className="text-[18px] font-bold text-black">{member.birth_date || '-'}</p>
                                </div>
                            </div>
                        </div>

                        {/* BLOK 2: TABLAR */}
                        <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                            <div className="flex bg-gray-50/50 p-1.5 border-b border-gray-50 gap-1.5 w-full">
                                <button
                                    onClick={() => setActiveTab('experience')}
                                    className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-4 rounded-md text-[16px] font-black transition-all duration-300 ${activeTab === 'experience'
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                        : 'text-black/70 hover:bg-white hover:text-blue-600'
                                        }`}
                                >
                                    <Briefcase size={20} />
                                    {t('leadershipProfile.experience')}
                                </button>
                                <button
                                    onClick={() => setActiveTab('duties')}
                                    className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-4 rounded-md text-[16px] font-black transition-all duration-300 ${activeTab === 'duties'
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                        : 'text-black/70 hover:bg-white hover:text-blue-600'
                                        }`}
                                >
                                    <Target size={20} />
                                    {t('leadershipProfile.duties')}
                                </button>
                            </div>

                            <div className="p-10">
                                <div className="animate-fade-in font-serif text-[20px] leading-[1.6]">
                                    {activeTab === 'experience' ? (
                                        <div className="prose prose-base max-w-none text-black rich-text-forced">
                                            {member.career ? (
                                                <div dangerouslySetInnerHTML={{ __html: member.career }} className="rich-text-forced" />
                                            ) : (
                                                <EmptyState
                                                    message={t('leadershipProfile.noExperience')}
                                                    className="min-h-[150px] py-8"
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <div className="prose prose-base max-w-none text-black rich-text-forced">
                                            {member.description ? (
                                                <div dangerouslySetInnerHTML={{ __html: member.description }} className="rich-text-forced" />
                                            ) : (
                                                <EmptyState
                                                    message={t('leadershipProfile.noDuties')}
                                                    className="min-h-[150px] py-8"
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default LeadershipProfile;
