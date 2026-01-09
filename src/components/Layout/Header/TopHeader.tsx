import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaTelegramPlane,
    FaInstagram,
    FaFacebookF,
    FaYoutube
} from 'react-icons/fa';
import useClickOutside from '../../../hooks/useClickOutside';
import { useSettingsStore } from '../../../store/settingsStore';
import useFontSizeStore from '../../../store/fontSizeStore';
import useThemeStore from '../../../store/themeStore';
import Container from '../../shared/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocale } from '../../../contexts/LocaleContext';

const languageOptions = {
    uz: { name: "O'z", flag: "https://flagcdn.com/w20/uz.png" },
    ru: { name: "Рус", flag: "https://flagcdn.com/w20/ru.png" },
    en: { name: "Eng", flag: "https://flagcdn.com/w20/gb.png" },
};

const TopHeader = () => {
    const { i18n } = useTranslation();
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
        <div className="bg-primary border-b border-secondary/50 h-16 header-top">
            <Container className="h-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
                {/* Ijtimoiy tarmoqlar havolalari - Settings API dan */}
                <div className="flex-1 flex justify-center md:justify-start items-center pb-1">
                    <div className="flex items-center space-x-4">
                        {settings?.socials?.map((link: any) => {
                            const getIcon = (name: string) => {
                                switch (name.toLowerCase()) {
                                    case 'telegram': return <FaTelegramPlane className="h-4 w-4" />;
                                    case 'instagram': return <FaInstagram className="h-4 w-4" />;
                                    case 'facebook': return <FaFacebookF className="h-4 w-4" />;
                                    case 'youtube': return <FaYoutube className="h-4 w-4" />;
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
                                    className="text-white hover:text-secondary transition-colors p-1"
                                    title={link.name}
                                >
                                    {icon || <span className="text-sm font-medium">{link.name}</span>}
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Markazga joylashtirilgan shrift o'lchami va tema tugmalari */}
                <div className="flex justify-center items-center w-full md:w-auto">
                    <div className="flex items-center space-x-1 bg-black/20 border border-secondary/50 rounded-lg p-1">
                        <button onClick={toggleTheme} className="text-white hover:bg-black/20 transition-colors font-bold text-base px-2 py-0.5 rounded-md">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                        </button>
                        <div className="w-px h-4 bg-secondary/50 mx-1"></div>
                        <button onClick={decreaseFontSize} className="text-white hover:bg-black/20 transition-colors font-bold text-base px-2 py-0.5 rounded-md">A-</button>
                        <button onClick={resetFontSize} className="text-white hover:bg-black/20 transition-colors font-bold text-base px-2 py-0.5 rounded-md">A</button>
                        <button onClick={increaseFontSize} className="text-white hover:bg-black/20 transition-colors font-bold text-lg px-2 py-0.5 rounded-md">A+</button>
                    </div>
                </div>

                {/* O'ng tomondagi kontent (tezkor havolalar va til o'zgartirish) */}
                <div className="flex-1 flex justify-center md:justify-end items-center mt-1 md:mt-0">
                    <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6">
                        {/* Quick links - Desktop va Mobile uchun moslangan */}

                        {/* Language selector - har doim ko'rinadi */}
                        <div className="relative" ref={langDropdownRef}>
                            <button onClick={() => setLangDropdownOpen(!isLangDropdownOpen)} className="flex items-center focus:outline-none text-white hover:text-secondary">
                                <img src={currentLangDetails.flag} width="20" alt={currentLangDetails.name} className="mr-2" />
                                <span>{currentLangDetails.name}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 ml-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-28 rounded-md bg-white py-1 shadow-xl ring-1 ring-black ring-opacity-5 z-50">
                                    {Object.keys(languageOptions)
                                        .filter((lng) => lng !== currentLanguage)
                                        .map((lng) => (
                                            <button
                                                key={lng}
                                                onClick={() => handleLanguageChange(lng)}
                                                className="flex items-center w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                                            >
                                                <img src={languageOptions[lng as keyof typeof languageOptions].flag} width="20" alt={languageOptions[lng as keyof typeof languageOptions].name} className="mr-2" />
                                                <span>{languageOptions[lng as keyof typeof languageOptions].name}</span>
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