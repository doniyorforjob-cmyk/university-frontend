import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLocale, Locale } from '../../contexts/LocaleContext';

const LanguageSwitcher: React.FC = () => {
    const { locale } = useLocale();
    const navigate = useNavigate();
    const location = useLocation();

    const languages: { code: Locale; label: string }[] = [
        { code: 'uz', label: 'UZ' },
        { code: 'ru', label: 'РУ' },
        { code: 'en', label: 'EN' },
    ];

    const handleLanguageChange = (lng: Locale) => {
        // 1. Get raw clean path (remove any existing locale prefix)
        let currentPath = location.pathname;
        currentPath = currentPath.replace(/^\/(uz|ru|en)(\/|$)/, '/');
        if (!currentPath.startsWith('/')) currentPath = '/' + currentPath;

        // 2. Build new path
        let newPath = currentPath;
        if (lng === 'uz') {
            if (newPath !== '/') {
                newPath = `/uz${newPath}`;
            }
        } else {
            if (newPath === '/') {
                newPath = `/${lng}`;
            } else {
                newPath = `/${lng}${newPath}`;
            }
        }

        navigate(newPath);
    };

    return (
        <div className="flex items-center gap-1">
            {languages.map((lang, index) => (
                <React.Fragment key={lang.code}>
                    <button
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`px-2 py-1 text-sm font-medium transition-colors ${locale === lang.code
                            ? 'text-white'
                            : 'text-white/70 hover:text-white'
                            }`}
                    >
                        {lang.label}
                    </button>
                    {index < languages.length - 1 && (
                        <span className="text-white/50">|</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
