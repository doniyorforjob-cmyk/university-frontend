import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getAggregatedPopupContent } from '../../services/popupService';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../store/settingsStore';
import { formatDate } from '../../utils/format';
import { PopupItem } from '../../types/popup.types';
import { 
    X, 
    ArrowRight, 
    Calendar, 
    Instagram, 
    Youtube, 
    Facebook,
    Send // Used for Telegram
} from 'lucide-react';

const SLIDE_DURATION = 5000;

const PromoPopup: React.FC = () => {
    const { t, i18n } = useTranslation('pages');
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<PopupItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const { settings } = useSettingsStore();

    const getSocialUrl = (name: string) => {
        return settings?.socials?.find(s => s.name.toLowerCase() === name.toLowerCase())?.url;
    };

    const socialLinks = [
        { id: 'instagram', icon: Instagram, color: '#E1306C', url: getSocialUrl('instagram') },
        { id: 'youtube', icon: Youtube, color: '#FF0000', url: getSocialUrl('youtube') },
        { id: 'telegram', icon: Send, color: '#24A1DE', url: getSocialUrl('telegram') },
        { id: 'facebook', icon: Facebook, color: '#4267B2', url: getSocialUrl('facebook') },
    ].filter(link => link.url);

    const preloadImages = useCallback((data: PopupItem[]) => {
        data.forEach((item) => {
            if (item.image_url) {
                const img = new Image();
                img.src = item.image_url;
            }
        });
    }, []);

    useEffect(() => {
        const isShown = sessionStorage.getItem('promo_popup_shown');
        if (isShown) return;

        const fetchData = async () => {
            try {
                const data = await getAggregatedPopupContent(i18n.language);
                if (data && data.length > 0) {
                    setItems(data);
                    preloadImages(data);
                    setIsOpen(true);
                    sessionStorage.setItem('promo_popup_shown', 'true');
                }
            } catch (err) {
                console.error('Popup fetch error:', err);
            }
        };

        fetchData();
    }, [i18n.language, preloadImages]);

    useEffect(() => {
        if (!isOpen || items.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev === items.length - 1) {
                    setIsOpen(false);
                    return prev;
                }
                return prev + 1;
            });
        }, SLIDE_DURATION);

        return () => clearInterval(timer);
    }, [isOpen, items.length]);

    const handleClose = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsOpen(false);
    };

    const getNavigationPath = (item: PopupItem) => {
        const lang = i18n.language.split('-')[0];
        const localePrefix = lang === 'uz' ? '/uz' : `/${lang}`;

        let path = '';
        switch (item.type) {
            case 'news': path = `/news/${item.slug}`; break;
            case 'announcements': path = `/announcements/${item.slug}`; break;
            case 'events': path = `/events/${item.slug}`; break;
            case 'open-lessons': path = `/open-lessons/${item.slug}`; break;
            case 'step-forward': path = `/step-forward/${item.slug}`; break;
            case 'green-university': path = `/yashil-universitet/${item.slug}`; break;
            case 'cultural-events': path = `/cultural-events/${item.slug}`; break;
            case 'sports-club-life': path = `/sports-club-life/${item.slug}`; break;
            default: path = '#';
        }

        return path === '#' ? '#' : `${localePrefix}${path}`;
    };

    const handleItemClick = () => {
        const item = items[currentIndex];
        if (item) {
            const path = getNavigationPath(item);
            
            // Check if it's a shell route or MFE route
            const shellRoutes = ['/', '/search', '/contact', '/organizational-structure', '/administration', '/leadership'];
            
            // Remove locale prefix for checking (e.g., /uz/news -> /news)
            let cleanPath = path.replace(/^\/[a-z]{2}\//, '/');
            if (cleanPath === 'uz' || cleanPath === 'ru' || cleanPath === 'en') cleanPath = '/';
            if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

            const isShell = shellRoutes.some(route => 
                cleanPath === route || cleanPath.startsWith(`${route}/`) || cleanPath.startsWith(`${route}?`)
            );

            if (isShell) {
                navigate(path);
            } else {
                window.location.href = path;
            }
            
            setIsOpen(false);
        }
    };

    if (!isOpen || items.length === 0) return null;

    const currentItem = items[currentIndex];

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="relative w-full max-w-2xl bg-[#1D2244] shadow-2xl flex flex-row overflow-hidden border border-white/10"
                style={{ borderRadius: 0 }}
            >
                {/* Left Social Bar - Vertical Column */}
                <div className="flex flex-col bg-black/20 p-3 pt-12 gap-3 border-r border-white/5">
                    {socialLinks.map((social) => (
                        <a
                            key={social.id}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg group"
                            style={{ backgroundColor: social.color, borderRadius: 0 }}
                            title={social.id}
                        >
                            <social.icon className="w-5 h-5 text-white transition-opacity group-hover:opacity-80" />
                        </a>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="relative flex-1 flex flex-col p-6 pt-12 text-white">
                    {/* Close Button - SQUARE */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 transition-colors z-20"
                        aria-label={t('popup.close') as string}
                        style={{ borderRadius: 0 }}
                    >
                        <X className="w-5 h-5 text-white/70" />
                    </button>

                    <div className="flex flex-col">
                        {/* Title Section - 2 lines max */}
                        <div className="mb-6 px-2">
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={`title-${currentIndex}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="text-xl md:text-2xl font-bold leading-snug line-clamp-2"
                                >
                                    {currentItem.title}
                                </motion.h2>
                            </AnimatePresence>
                        </div>

                        {/* Image Section - 16:9 ratio */}
                        <div 
                            className="relative w-full mb-8 border border-white/5"
                            style={{ 
                                paddingBottom: '56.25%', /* 16:9 ratio */
                                height: 0,
                                backgroundImage: `url(${currentItem.image_url || '/images/logo.png'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: '#0f1130',
                                borderRadius: 0
                            }}
                        >
                            {/* Type Badge - SQUARE */}
                            <div className="absolute top-3 left-3 bg-primary px-3 py-1 text-[10px] uppercase font-bold tracking-tighter" style={{ borderRadius: 0 }}>
                                {t(currentItem.type)}
                            </div>
                        </div>

                        {/* Progress & Info */}
                        <div className="space-y-4">
                            <div className="flex gap-1.5 w-full">
                                {items.map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-1 flex-1 bg-white/10 overflow-hidden"
                                        style={{ borderRadius: 0 }}
                                    >
                                        {index === currentIndex && (
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                                                className="h-full bg-white shadow-sm"
                                            />
                                        )}
                                        {index < currentIndex && <div className="h-full w-full bg-white/50" />}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-white/40">
                                    <span className="flex items-center gap-1 text-xs text-white/40">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {formatDate(currentItem.published_at, i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US')}
                                    </span>
                                </span>
                                <button
                                    onClick={handleItemClick}
                                    className="flex items-center gap-2 text-white font-semibold text-sm hover:text-white/70 transition-colors"
                                    style={{ borderRadius: 0, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                >
                                    {t('popup.readMore')}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PromoPopup;
