import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import i18n from '../i18n';

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
    // Get initial locale from localStorage, URL, or default to 'uz'
    const [locale, setLocaleState] = useState<Locale>(() => {
        const path = window.location.pathname;
        const firstSegment = path.split('/')[1] as Locale;

        // If URL explicitly sets a valid locale segment, use it
        if (['uz', 'ru', 'en'].includes(firstSegment)) {
            return firstSegment;
        }

        // AppRoutes explicitly ties the root path "/" to the "uz" locale.
        // If we start on the root path, we must initialize as "uz" to avoid a double render.
        if (path === '/') {
            return 'uz';
        }
        
        // Otherwise, fallback to localStorage if no explicit URL override
        const saved = localStorage.getItem('locale') as Locale;
        return (['uz', 'ru', 'en'].includes(saved) ? saved : 'uz');
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
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
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
