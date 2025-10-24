import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useClickOutside from '../../../hooks/useClickOutside';
import { newsItems, socialLinks, quickLinks } from './data';
import useFontSizeStore from '../../../store/fontSizeStore';

const languageOptions = {
    uz: { name: "O'z", flag: "https://flagcdn.com/w20/uz.png" },
    ru: { name: "Рус", flag: "https://flagcdn.com/w20/ru.png" },
    en: { name: "Eng", flag: "https://flagcdn.com/w20/gb.png" },
};

const TopHeader = () => {
    const { t, i18n } = useTranslation();
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);
    const { increaseFontSize, decreaseFontSize, resetFontSize } = useFontSizeStore();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
        }, 4000);
        return () => clearInterval(intervalId);
    }, []);

    useClickOutside(langDropdownRef, () => setLangDropdownOpen(false));

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLangDropdownOpen(false);
    };

    const currentLanguage = i18n.language as keyof typeof languageOptions;
    const currentLangDetails = languageOptions[currentLanguage] || languageOptions.uz;

    return (
        <div className="bg-primary border-b border-secondary/50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
                <div className="flex items-center space-x-4 w-full md:w-1/3 overflow-hidden">
                    <div className="flex-shrink-0">
                        <div className="bg-accent text-white px-3 py-1 rounded-full flex items-center space-x-2 cursor-pointer hover:brightness-90 transition">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.516l.153-.325a1.76 1.76 0 013.417.592l-2.147 6.15m-6.836 9.318a4.001 4.001 0 01-1.564-3.683l1.832-7.244M12.5 19.242A4.001 4.001 0 0017 15h-1.832c-4.1 0-7.625 2.236-9.168 5.516l-.153.325a1.76 1.76 0 00-3.417-.592l2.147-6.15" />
                            </svg>
                            <span className="text-sm font-bold hidden sm:inline">{t('header.announcement')}</span>
                        </div>
                    </div>
                    <div className="relative h-6 flex-grow">
                        <div key={currentNewsIndex} className="absolute w-full h-full flex items-center animate-slide-fade">
                            <a href="#" className="text-white hover:text-secondary text-sm truncate">
                                {newsItems[currentNewsIndex].text}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center w-full md:w-auto">
                    <div className="flex items-center space-x-1 bg-black/20 border border-secondary/50 rounded-lg p-1">
                        <button onClick={decreaseFontSize} className="text-white hover:bg-black/20 transition-colors font-bold text-base px-2 py-0.5 rounded-md">A-</button>
                        <button onClick={resetFontSize} className="text-white hover:bg-black/20 transition-colors font-bold text-base px-2 py-0.5 rounded-md">A</button>
                        <button onClick={increaseFontSize} className="text-white hover:bg-black/20 transition-colors font-bold text-lg px-2 py-0.5 rounded-md">A+</button>
                    </div>
                </div>

                <div className="flex justify-center md:justify-end items-center w-full md:w-1/3">
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <div className="flex items-center space-x-4">
                            {socialLinks.map(link => (
                                <a key={link.name} href={link.href} className="text-white hover:text-secondary transition-colors">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={link.iconD} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                        <div className="flex flex-wrap justify-center items-center space-x-3 text-sm">
                            {quickLinks.map(link => (
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
                                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                </div>
            </div>
        </div>
    );
};

export default TopHeader;