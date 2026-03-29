import React, { useEffect } from 'react';
import { useLocale, Locale } from '@/contexts/LocaleContext';
import GlobalLayout from '@/components/templates/GlobalLayout';

interface LocaleWrapperProps {
    lang: Locale;
}

const LocaleWrapper: React.FC<LocaleWrapperProps> = ({ lang }) => {
    const { setLocale } = useLocale();

    useEffect(() => {
        setLocale(lang);
        localStorage.setItem('locale', lang); // Ensure sync
    }, [lang, setLocale]);

    return <GlobalLayout />;
};

export default LocaleWrapper;
