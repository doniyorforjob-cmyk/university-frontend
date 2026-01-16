import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaTelegramPlane,
    FaInstagram,
    FaFacebookF,
    FaYoutube,
    FaShieldAlt
} from 'react-icons/fa';
import useClickOutside from '../../../hooks/useClickOutside';
import { useSettingsStore } from '../../../store/settingsStore';
import useFontSizeStore from '../../../store/fontSizeStore';
import useThemeStore from '../../../store/themeStore';
import Container from '../../shared/Container';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import PrefetchLink from '../../shared/PrefetchLink';
import { useLocale } from '../../../contexts/LocaleContext';

const languageOptions = {
    uz: { name: "O'zbek", short: "UZ", flag: "https://flagcdn.com/w20/uz.png" },
    ru: { name: "Русский", short: "RU", flag: "https://flagcdn.com/w20/ru.png" },
    en: { name: "English", short: "EN", flag: "https://flagcdn.com/w20/gb.png" },
};

const TopHeader = () => {
    const { t, i18n } = useTranslation();
    const { locale, setLocale } = useLocale();
    const navigate = useNavigate();
    const location = useLocation();
    const [isPending, startTransition] = React.useTransition();
    const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);
    const { increaseFontSize, decreaseFontSize, resetFontSize } = useFontSizeStore();
    const { isDark, toggleTheme } = useThemeStore();
    const { settings } = useSettingsStore();

    useClickOutside(langDropdownRef, () => setLangDropdownOpen(false));

    // Sync LocaleContext with react-i18next
    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [locale, i18n]);

    // URL based language switching handles context update
    // const changeLanguage = ... removed

    const handleLanguageChange = (lng: string) => {
        setLangDropdownOpen(false);

        // 1. Get raw clean path (remove any existing locale prefix)
        let currentPath = location.pathname;

        // Regex to remove starting /uz, /ru, /en (with optional trailing slash or followed by end of string)
        currentPath = currentPath.replace(/^\/(uz|ru|en)(\/|$)/, '/');

        // Ensure it starts with /
        if (!currentPath.startsWith('/')) currentPath = '/' + currentPath;

        // 2. Build new path
        let newPath = currentPath;

        if (lng === 'uz') {
            // Uz: Root is '/', Inner is '/uz/...'
            if (newPath === '/' || newPath === '') {
                newPath = '/';
            } else {
                newPath = `/uz${newPath}`;
            }
        } else {
            // Ru/En: Always prepend /lang
            if (newPath === '/') {
                newPath = `/${lng}`;
            } else {
                newPath = `/${lng}${newPath}`;
            }
        }

        // 3. Navigate using react-router-dom
        startTransition(() => {
            navigate(newPath);
        });
    };

    const currentLanguage = locale as keyof typeof languageOptions;
    const currentLangDetails = languageOptions[currentLanguage] || languageOptions.uz;

    return (
        <div className="bg-primary border-b border-secondary/50 header-top flex items-center">
            <Container className="flex flex-row items-center justify-between gap-2 px-2 sm:px-4 w-full py-3 md:py-0">
                {/* Ijtimoiy tarmoqlar (Chapdan) */}
                <div className="flex-1 flex items-center justify-start">
                    <div className="flex items-center space-x-2.5 md:space-x-4">
                        {settings?.socials?.map((link: any) => {
                            const getIcon = (name: string) => {
                                switch (name.toLowerCase()) {
                                    case 'telegram': return <FaTelegramPlane className="h-5 w-5" />;
                                    case 'instagram': return <FaInstagram className="h-5 w-5" />;
                                    case 'facebook': return <FaFacebookF className="h-5 w-5" />;
                                    case 'youtube': return <FaYoutube className="h-5 w-5" />;
                                    default: return null;
                                }
                            };
                            const icon = getIcon(link.name);

                            return (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-secondary transition-colors inline-flex items-center"
                                    title={link.name}
                                >
                                    {icon || <span className="text-[12px] font-medium">{link.name}</span>}
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Markazda Accessibility (Center) */}
                <div className="flex items-center justify-center flex-shrink-0 mx-1">
                    <div className="flex items-center space-x-1 md:space-x-1 bg-black/20 border border-secondary/50 rounded-lg p-1 md:p-1.5">
                        <button onClick={toggleTheme} className="text-white hover:bg-black/20 transition-colors font-bold text-[13px] md:text-base px-2 md:px-2.5 py-1 rounded-md inline-flex items-center">
                            <svg className="w-4 md:w-4.5 h-4 md:h-4.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                        </button>
                        <div className="w-px h-4 bg-secondary/50 mx-1"></div>
                        <button onClick={decreaseFontSize} className="text-white hover:bg-black/20 transition-colors font-bold text-[13px] md:text-base px-2 md:px-2.5 py-1 rounded-md">A-</button>
                        <button onClick={resetFontSize} className="text-white hover:bg-black/20 transition-colors font-bold text-[13px] md:text-base px-2 md:px-2.5 py-1 rounded-md">A</button>
                        <button onClick={increaseFontSize} className="text-white hover:bg-black/20 transition-colors font-bold text-[15px] md:text-lg px-2 md:px-2.5 py-1 rounded-md">A+</button>
                    </div>
                </div>

                {/* O'ng tomon (Corruption va Lang) */}
                <div className="flex-1 flex items-center justify-end">
                    <div className="flex items-center gap-2.5 md:gap-6">
                        {settings?.corruptionUrl && (
                            <PrefetchLink
                                to="/corruption"
                                prefetch={true}
                                className="flex items-center text-white hover:text-secondary transition-colors group"
                            >
                                <FaShieldAlt className="h-4 w-4 md:h-5 md:w-5 xl:h-6 xl:w-6 text-red-100 group-hover:scale-110 transition-transform" />
                                <span className="hidden sm:inline ml-1.5 md:ml-2 xl:ml-3 text-[11px] md:text-[13px] xl:text-[15px] whitespace-nowrap">
                                    {t('fightCorruption')}
                                </span>
                            </PrefetchLink>
                        )}

                        <div className="w-px h-4 bg-secondary/50 xl:h-6"></div>

                        <div className="relative flex items-center" ref={langDropdownRef}>
                            <button onClick={() => setLangDropdownOpen(!isLangDropdownOpen)} className="flex items-center focus:outline-none text-white hover:text-secondary text-[13px] xl:text-[15px] font-bold">
                                <img src={currentLangDetails.flag} width="18" alt={currentLangDetails.name} className="mr-2 xl:w-[22px] xl:mr-3" />
                                <span>{currentLangDetails.short}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 ml-1 xl:w-4 xl:h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            {isLangDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-24 rounded-md bg-white py-1 shadow-xl ring-1 ring-black ring-opacity-5 z-50">
                                    {Object.keys(languageOptions)
                                        .filter((lng) => lng !== currentLanguage)
                                        .map((lng) => (
                                            <button
                                                key={lng}
                                                onClick={() => handleLanguageChange(lng)}
                                                className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <img src={languageOptions[lng as keyof typeof languageOptions].flag} width="18" alt={languageOptions[lng as keyof typeof languageOptions].short} className="mr-2" />
                                                <span className="font-bold">{languageOptions[lng as keyof typeof languageOptions].short}</span>
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TopHeader;