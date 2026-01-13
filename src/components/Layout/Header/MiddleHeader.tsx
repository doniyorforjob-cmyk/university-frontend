import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../shared/Container';
import { useSettingsStore } from '../../../store/settingsStore';
import { PrefetchLink } from '../../shared';
import { formatPhone } from '../../../utils/format';

const MiddleHeader: React.FC = () => {
    const { settings } = useSettingsStore();
    const { t, i18n } = useTranslation('common');

    const phone = settings?.contacts?.primaryPhone || "";
    const phoneRaw = phone.replace(/[^0-9+]/g, '');
    const address = settings?.contacts?.address || "";
    const logo = settings?.logo || "";

    const universityTitle: string = settings?.siteName || (t('universityName') as string) || '';

    // Professional balanced splitter that ensures 3 lines
    const getBrandingLines = (text: string): string[] => {
        if (!text) return [];
        // If it already has explicit line breaks (from localization), use them
        if (text.includes('\n')) return text.split('\n');

        const words = text.split(' ');
        if (words.length <= 1) return [text];
        if (words.length === 2) return [words[0], words[1]];
        if (words.length === 3) return [words[0], words[1], words[2]];

        // Handle 4 words (2-1-1 split for Professional Branding)
        if (words.length === 4) {
            return [`${words[0]} ${words[1]}`, words[2], words[3]];
        }

        // Generic split into 3 parts for > 4 words
        const total = words.length;
        const part1 = Math.ceil(total / 3);
        const part2 = Math.ceil((total - part1) / 2);

        return [
            words.slice(0, part1).join(' '),
            words.slice(part1, part1 + part2).join(' '),
            words.slice(part1 + part2).join(' ')
        ];
    };

    const brandingLines = getBrandingLines(universityTitle);

    return (
        <div className="bg-white py-3 lg:py-5 border-b border-gray-100 header-middle transition-colors">
            <Container>
                {/* Katta ekranlar uchun layout */}
                <div className="hidden md:flex items-center justify-between">
                    {/* Chap tomon: Logotip va Universitet nomi */}
                    <PrefetchLink to="/" className="flex items-center gap-1.5 lg:gap-2 group">
                        <div className="flex-shrink-0">
                            {logo ? (
                                <img src={logo} alt="Logo" className="h-20 w-20 lg:h-24 lg:w-24 object-contain" />
                            ) : (
                                <img src="/images/logo.png" alt="Logo" className="h-20 w-20 lg:h-24 lg:w-24 object-contain" />
                            )}
                        </div>
                        <div className="flex flex-col justify-center h-20 lg:h-24">
                            <h1 className="text-lg lg:text-[1.35rem] 2xl:text-[1.5rem] font-bold text-[#0E104B] leading-[1.1] tracking-tight">
                                {brandingLines.map((line, idx) => (
                                    <span key={idx} className="block whitespace-nowrap">{line}</span>
                                ))}
                            </h1>
                            <p className="text-[10px] lg:text-[12px] text-slate-400 font-bold mt-1 tracking-wide">
                                {t('officialWebsite')}
                            </p>
                        </div>
                    </PrefetchLink>

                    {/* O'ng tomon: Kontakt ma'lumotlari */}
                    <div className="flex items-center space-x-8">
                        {/* Telefon raqami */}
                        {phone && (
                            <div className="flex items-center">
                                <div className="bg-primary/5 p-3 rounded-full mr-3 border border-primary/10">
                                    <svg
                                        className="h-5 w-5 text-[#0E104B]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0">{t('contact')}</p>
                                    <a
                                        href={`tel:${phoneRaw}`}
                                        className="text-[#0E104B] font-bold hover:text-[#0047BA] transition-colors text-sm lg:text-base"
                                    >
                                        {formatPhone(phone)}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Manzil */}
                        {address && (
                            <div className="hidden lg:flex items-center">
                                <div className="bg-primary/5 p-3 rounded-full mr-3 border border-primary/10">
                                    <svg
                                        className="h-5 w-5 text-[#0E104B]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0">{t('address')}</p>
                                    <p className="text-[#0E104B] font-bold text-sm lg:text-base max-w-[250px] leading-snug">{address}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Kichik ekranlar uchun layout */}
                <div className="md:hidden flex items-center justify-between py-5 gap-4">
                    {/* Chap tomon: Logotip va Universitet nomi */}
                    <PrefetchLink to="/" className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="flex-shrink-0 flex items-center">
                            {logo ? (
                                <img src={logo} alt="Logo" className="h-20 w-20 object-contain" />
                            ) : (
                                <img src="/images/logo.png" alt="Logo" className="h-20 w-20 object-contain" />
                            )}
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                            <h1 className="text-[18px] font-bold text-[#0E104B] leading-[1.05] uppercase">
                                {brandingLines.map((line, idx) => (
                                    <span key={idx} className="block whitespace-nowrap">{line}</span>
                                ))}
                            </h1>
                            <p className="text-[12px] text-slate-400 font-bold tracking-tight mt-1.5">
                                {t('officialWebsite')}
                            </p>
                        </div>
                    </PrefetchLink>

                    {/* O'ng tomon: Kontakt ma'lumotlari (ustma-ust) */}
                    <div className="flex flex-col justify-center items-end gap-3 flex-shrink-0 max-w-[180px]">
                        {/* Telefon raqami */}
                        {phone && (
                            <a href={`tel:${phoneRaw}`} className="flex items-center gap-1.5 text-[#0E104B] font-bold text-sm hover:text-secondary group">
                                <span className="whitespace-nowrap">{formatPhone(phone)}</span>
                                <div className="bg-primary/5 p-2 rounded-full group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                                    <svg
                                        className="h-5 w-5 text-[#0E104B]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </div>
                            </a>
                        )}

                        {/* Manzil */}
                        {address && (
                            <div className="flex items-center gap-1.5 text-[#0E104B] font-bold text-sm text-right">
                                <span className="leading-tight">{address}</span>
                                <div className="bg-primary/5 p-2 rounded-full flex items-center justify-center">
                                    <svg
                                        className="h-5 w-5 text-[#0E104B]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default MiddleHeader;