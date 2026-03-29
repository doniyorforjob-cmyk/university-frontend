import React, { useState, useEffect } from 'react';
import {
    Briefcase,
    Target,
    FileText,
    ExternalLink,
    BookOpen,
    Award
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Leadership } from '@/types/leadership.types';
import { OptimizedImage, EmptyState } from '@/components/shared';
import ScientificProfiles from './ScientificProfiles';
import { formatDate } from '@/utils/format';
import { DATE_LOCALE_MAP } from '@/constants/dateConstants';
import { settingsApi } from '@/api/http/settings.http';
import { getImageUrl } from '@/utils/apiUtils';


interface LeadershipProfileProps {
    member: Leadership;
    showDuties?: boolean;
}

const LeadershipProfile: React.FC<LeadershipProfileProps> = ({ member, showDuties = true }) => {
    const { t, i18n } = useTranslation('pages');
    const [activeTab, setActiveTab] = useState<'experience' | 'duties' | 'methodological' | 'thesis' | 'research' | 'certificates'>('experience');
    const [logoUrl, setLogoUrl] = useState<string>('/images/logo.png');

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const settings = await settingsApi.getSettings(i18n.language);
                if (settings.logo) setLogoUrl(getImageUrl(settings.logo));
            } catch (e) {
                // keep default logo
            }
        };
        fetchLogo();
    }, [i18n.language]);

    const birthDate = member.birth_date || member.fields?.['birth-date'] || member.collection?.['birth-date'];
    const currentLocale = DATE_LOCALE_MAP[i18n.language] || DATE_LOCALE_MAP['uz'];

    const showBirthDate = !['academic_head', 'academic_staff'].includes(member.category || '');
    const showCertificates = ['academic_head', 'academic_staff'].includes(member.category || '');
    const showAdmissionDay = member.category !== 'academic_staff' && member.category !== 'academic_head';

    const methodologicalDocs = member.methodological_publications || member.fields?.['methodological-publications'] || member.collection?.['methodological-publications'];
    const thesisDocs = member.thesis_abstract || member.fields?.['thesis-abstract'] || member.collection?.['thesis-abstract'];
    const researchDocs = member.research_works || member.fields?.['research-works'] || member.collection?.['research-works'];

    const hasMethodological = !!(methodologicalDocs && typeof methodologicalDocs === 'string' && methodologicalDocs.trim());
    const hasThesis = !!(thesisDocs && typeof thesisDocs === 'string' && thesisDocs.trim());
    const hasResearch = !!(researchDocs && typeof researchDocs === 'string' && researchDocs.trim());

    const getFormattedDate = (dateVal: string | undefined) => {
        if (!dateVal || dateVal === '-') return '-';
        // Check if it looks like an ISO string or has date-like characteristics
        if (dateVal.includes('T') || (dateVal.includes('-') && dateVal.length > 8)) {
            try {
                const d = new Date(dateVal);
                if (!isNaN(d.getTime())) {
                    return formatDate(d, currentLocale);
                }
            } catch (e) {
                return dateVal;
            }
        }
        return dateVal;
    };


    return (
        <div className="w-full pt-4 pb-6 font-sans">
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* CHAP USTUN (3/12) */}
                    <div className="lg:col-span-3 space-y-6">
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
                                            <div className="w-full h-full flex items-center justify-center bg-gray-50 p-8">
                                                <img
                                                    src={logoUrl}
                                                    alt="Logo"
                                                    className="w-full max-w-[130px] h-auto object-contain opacity-60"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/logo.png'; }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h1 className="text-xl font-bold text-black text-center mb-2 leading-tight tracking-tight">
                                    {member.name}
                                </h1>
                                <p className="text-gray-500 text-center font-bold bg-gray-50 px-4 py-1.5 rounded-md text-[12px] uppercase tracking-wider">
                                    {(member.position || '').replace(/\s*\(.*?\)/g, '').trim()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* O'NG USTUN (9/12) */}
                    <div className="lg:col-span-9 space-y-6">
                        {/* BLOK 1: Biografiya va Malumotlar */}
                        <div className="bg-white rounded-xl shadow-[0_4px_16_rgb(0,0,0,0.03)] border border-gray-100 p-4">
                            {/* Shaxsiy ma'lumotlar jadvali */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                                <div className="space-y-1.5 group">
                                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.1em] group-hover:text-blue-500 transition-colors">{t('fullName')}</p>
                                    <p className="text-[18px] font-bold text-black">{member.name}</p>
                                </div>
                                {showBirthDate && (
                                    <div className="space-y-1.5 group">
                                        <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.1em] group-hover:text-blue-500 transition-colors">{t('leadershipProfile.birthDate', 'Tavallud kuni')}</p>
                                        <p className="text-[18px] font-bold text-black">{getFormattedDate(birthDate)}</p>
                                    </div>
                                )}
                                <div className="space-y-1.5 group">
                                    <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.1em] group-hover:text-blue-500 transition-colors">{t('leadershipProfile.degree', 'Ta\'lim darajasi')}</p>
                                    <p className="text-[18px] font-bold text-black">{member.degree || '-'}</p>
                                </div>

                                {showAdmissionDay && (
                                    <div className="space-y-1.5 group">
                                        <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.1em] group-hover:text-blue-500 transition-colors">{t('leadershipProfile.receptionDays', 'Qabul kunlari')}</p>
                                        <p className="text-[18px] font-bold text-black">{member.reception_days || member.fields?.['reception-days'] || member.fields?.['admission-day'] || member.collection?.['reception-days'] || member.collection?.['admission-day'] || '-'}</p>
                                    </div>
                                )}
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

                                {member.category === 'academic_head' && (
                                    <ScientificProfiles member={member} />
                                )}
                            </div>
                        </div>

                        {/* BLOK 2: TABLAR */}
                        <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                            <div className="flex bg-gray-50/50 p-1.5 border-b border-gray-50 gap-1.5 w-full overflow-x-auto whitespace-nowrap scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                <button
                                    onClick={() => setActiveTab('experience')}
                                    className={`md:flex-none flex-shrink-0 flex items-center justify-center gap-3 px-4 py-2 rounded-md text-[16px] font-black transition-all duration-300 ${activeTab === 'experience'
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                        : 'text-black/70 hover:bg-white hover:text-blue-600'
                                        }`}
                                >
                                    <Briefcase size={20} />
                                    {t('leadershipProfile.experience')}
                                </button>
                                {showDuties && (
                                    <button
                                        onClick={() => setActiveTab('duties')}
                                        className={`md:flex-none flex-shrink-0 flex items-center justify-center gap-3 px-4 py-2 rounded-md text-[16px] font-black transition-all duration-300 ${activeTab === 'duties'
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                            : 'text-black/70 hover:bg-white hover:text-blue-600'
                                            }`}
                                    >
                                        <Target size={20} />
                                        {t('leadershipProfile.duties')}
                                    </button>
                                )}
                                {hasMethodological && (
                                    <button
                                        onClick={() => setActiveTab('methodological')}
                                        className={`md:flex-none flex-shrink-0 flex items-center justify-center gap-3 px-4 py-2 rounded-md text-[16px] font-black transition-all duration-300 ${activeTab === 'methodological'
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                            : 'text-black/70 hover:bg-white hover:text-blue-600'
                                            }`}
                                    >
                                        <BookOpen size={20} />
                                        {t('leadershipProfile.methodological_publications', 'Uslubiy nashrlar')}
                                    </button>
                                )}
                                {hasThesis && (
                                    <button
                                        onClick={() => setActiveTab('thesis')}
                                        className={`md:flex-none flex-shrink-0 flex items-center justify-center gap-3 px-4 py-2 rounded-md text-[16px] font-black transition-all duration-300 ${activeTab === 'thesis'
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                            : 'text-black/70 hover:bg-white hover:text-blue-600'
                                            }`}
                                    >
                                        <FileText size={20} />
                                        {t('leadershipProfile.thesis_abstract', 'Avtoreferat')}
                                    </button>
                                )}
                                {hasResearch && (
                                    <button
                                        onClick={() => setActiveTab('research')}
                                        className={`md:flex-none flex-shrink-0 flex items-center justify-center gap-3 px-4 py-2 rounded-md text-[16px] font-black transition-all duration-300 ${activeTab === 'research'
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                            : 'text-black/70 hover:bg-white hover:text-blue-600'
                                            }`}
                                    >
                                        <Award size={20} />
                                        {t('leadershipProfile.research_works', 'Ilmiy ishlar')}
                                    </button>
                                )}
                                {showCertificates && member.certificates && Array.isArray(member.certificates) && member.certificates.length > 0 && (
                                    <button
                                        onClick={() => setActiveTab('certificates')}
                                        className={`md:flex-none flex-shrink-0 flex items-center justify-center gap-3 px-4 py-2 rounded-md text-[16px] font-black transition-all duration-300 ${activeTab === 'certificates'
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                            : 'text-black/70 hover:bg-white hover:text-blue-600'
                                            }`}
                                    >
                                        <FileText size={20} />
                                        {t('leadershipProfile.certificates', 'Sertifikatlar')}
                                    </button>
                                )}
                            </div>

                            <div className="p-4">
                                <div className="animate-fade-in font-serif text-[18px] leading-[1.6]">
                                    {activeTab === 'experience' && (
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
                                    )}

                                    {activeTab === 'certificates' && showCertificates && member.certificates && Array.isArray(member.certificates) && member.certificates.length > 0 && (
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {member.certificates.map((cert: any, idx: number) => {
                                                    const certUrl = cert.url || (typeof cert === 'string' ? cert : '');
                                                    const certName = cert.name || `Sertifikat ${idx + 1}`;
                                                    if (!certUrl) return null;
                                                    return (
                                                        <a
                                                            key={idx}
                                                            href={certUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 group/link"
                                                        >
                                                            <div className="flex items-center gap-3 overflow-hidden">
                                                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover/link:bg-blue-600 group-hover/link:text-white transition-colors">
                                                                    <FileText size={18} />
                                                                </div>
                                                                <span className="font-bold text-gray-700 group-hover/link:text-blue-600 truncate">
                                                                    {certName}
                                                                </span>
                                                            </div>
                                                            <ExternalLink size={16} className="text-gray-400 group-hover/link:text-blue-400 flex-shrink-0" />
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'duties' && showDuties && (
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

                                    {activeTab === 'methodological' && (
                                        <div className="prose prose-base max-w-none text-black rich-text-forced">
                                            {methodologicalDocs ? (
                                                <div dangerouslySetInnerHTML={{ __html: String(methodologicalDocs) }} className="rich-text-forced" />
                                            ) : (
                                                <EmptyState message={t('leadershipProfile.noExperience')} className="min-h-[150px] py-8" />
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'thesis' && (
                                        <div className="prose prose-base max-w-none text-black rich-text-forced">
                                            {thesisDocs ? (
                                                <div dangerouslySetInnerHTML={{ __html: String(thesisDocs) }} className="rich-text-forced" />
                                            ) : (
                                                <EmptyState message={t('leadershipProfile.noExperience')} className="min-h-[150px] py-8" />
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'research' && (
                                        <div className="prose prose-base max-w-none text-black rich-text-forced">
                                            {researchDocs ? (
                                                <div dangerouslySetInnerHTML={{ __html: String(researchDocs) }} className="rich-text-forced" />
                                            ) : (
                                                <EmptyState message={t('leadershipProfile.noExperience')} className="min-h-[150px] py-8" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadershipProfile;
