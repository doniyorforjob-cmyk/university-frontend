import React from 'react';
import { useLocale, Locale } from '../../contexts/LocaleContext';

const LanguageSwitcher: React.FC = () => {
    const { locale, setLocale } = useLocale();

    const languages: { code: Locale; label: string }[] = [
        { code: 'uz', label: 'UZ' },
        { code: 'ru', label: 'РУ' },
        { code: 'en', label: 'EN' },
    ];

    return (
        <div className="flex items-center gap-1">
            {languages.map((lang, index) => (
                <React.Fragment key={lang.code}>
                    <button
                        onClick={() => setLocale(lang.code)}
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
