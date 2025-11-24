import React from 'react';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useClickOutside from '../../../hooks/useClickOutside';
import { socialLinks, quickLinks } from '../../../api/navbarApi';
import useFontSizeStore from '../../../store/fontSizeStore';
import useThemeStore from '../../../store/themeStore';
import Container from '../../shared/Container';

const languageOptions = {
    uz: { name: "O'z", flag: "https://flagcdn.com/w20/uz.png" },
    ru: { name: "Рус", flag: "https://flagcdn.com/w20/ru.png" },
    en: { name: "Eng", flag: "https://flagcdn.com/w20/gb.png" },
};

const TopHeader = () => {
    const { i18n } = useTranslation();
    const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);
    const { increaseFontSize, decreaseFontSize, resetFontSize } = useFontSizeStore();
    const { isDark, toggleTheme } = useThemeStore();

    useClickOutside(langDropdownRef, () => setLangDropdownOpen(false));

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLangDropdownOpen(false);
    };

    const currentLanguage = i18n.language as keyof typeof languageOptions;
    const currentLangDetails = languageOptions[currentLanguage] || languageOptions.uz;

    return (
        <div className="bg-primary border-b border-secondary/50 h-16">
            <Container className="h-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
                {/* Ijtimoiy tarmoqlar havolalari chap tomonga o'tkazildi */}
                <div className="flex-1 flex justify-center md:justify-start items-center pb-1">
                    <div className="flex items-center space-x-4">
                        {socialLinks.map((link: any) => (
                            <a key={link.name} href={link.href} className="text-white hover:text-secondary transition-colors">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={link.iconD} />
                                </svg>
                            </a>
                        ))}
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
                <div className="flex-1 flex justify-center md:justify-end items-center">
                    <div className="flex flex-wrap justify-center items-center space-x-3 text-lg">
                        {quickLinks.map((link: any) => (
                            <a key={link.title} href={link.href} className="text-white hover:text-secondary transition-colors">{link.title}</a>
                        ))}
                        <div className="relative" ref={langDropdownRef}>
                            <button onClick={() => setLangDropdownOpen(!isLangDropdownOpen)} className="flex items-center focus:outline-none text-white hover:text-secondary">
                                <img src={currentLangDetails.flag} width="20" alt={currentLangDetails.name} className="mr-2" />
                                <span>{currentLangDetails.name}</span>
                                <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-28 rounded-md bg-white py-1 shadow-xl ring-1 ring-black ring-opacity-5 z-10">
                                    {Object.keys(languageOptions).map((lng) => (
                                        <button
                                            key={lng}
                                            onClick={() => changeLanguage(lng)}
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