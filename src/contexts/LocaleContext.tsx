import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export type Locale = 'uz' | 'ru' | 'en';

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocale = () => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within LocaleProvider');
    }
    return context;
};

interface LocaleProviderProps {
    children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
    // Get initial locale from localStorage or default to 'uz'
    const [locale, setLocaleState] = useState<Locale>(() => {
        const saved = localStorage.getItem('locale');
        return (saved as Locale) || 'uz';
    });

    const location = useLocation();

    // URL o'zgarganda tilni sinxronlash
    useEffect(() => {
        const path = location.pathname;
        const pathParts = path.split('/');
        // pathParts[0] bo'sh bo'ladi (chunki path / bilan boshlanadi), shuning uchun [1] ni tekshiramiz
        const firstSegment = pathParts[1] as Locale;

        if (['uz', 'ru', 'en'].includes(firstSegment)) {
            if (locale !== firstSegment) {
                setLocaleState(firstSegment);
            }
        } else {
            // Agar prefiks yo'q bo'lsa (masalan /news), demak bu 'uz' (default)
            // Lekin ehtiyot bo'lish kerak, agar biz 'uz' ni prefikssiz ishlatsak.
            if (locale !== 'uz') {
                setLocaleState('uz');
            }
        }
    }, [location.pathname, locale]);

    // Save locale to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('locale', locale);
    }, [locale]);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
};
