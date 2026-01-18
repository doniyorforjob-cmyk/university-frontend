import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Share2,
    Facebook,
    Send,
    Instagram,
    Twitter
} from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';

export interface SocialShareProps {
    title?: string;
    url?: string; // Optional, defaults to window.location.href
    options?: {
        facebook?: boolean;
        telegram?: boolean;
        instagram?: boolean;
        twitter?: boolean;
    };
    className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
    title,
    url,
    options = { facebook: true, telegram: true, instagram: true },
    className = ''
}) => {
    const { t } = useTranslation('common');
    const socials = useSettingsStore(s => s.settings?.socials);
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareTitle = title || '';

    const getSocialUrl = (platform: string) => {
        const item = socials?.find(s => s.name.toLowerCase() === platform.toLowerCase());
        return item?.url;
    };

    const handleShare = (platform: string) => {
        const profileUrl = getSocialUrl(platform);

        if (profileUrl) {
            window.open(profileUrl, '_blank');
            return;
        }

        // Fallback to sharing current page if no specific profile URL in settings
        if (!currentUrl) return;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
                break;
            case 'telegram':
                window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
                break;
            case 'instagram':
                // Instagram doesn't support direct URL sharing through a simple web link easily,
                // but we usually link to the profile if specifically requested.
                break;
        }
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <span className="text-base text-gray-700 font-medium flex items-center gap-2 mr-2">
                <Share2 size={20} className="text-blue-600" />
                {t('share', 'Ulashish')}:
            </span>

            {options.facebook && (
                <button
                    onClick={() => handleShare('facebook')}
                    className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
                    title={t('social.facebook', 'Facebook') as string}
                >
                    <Facebook size={18} />
                </button>
            )}

            {options.twitter && (
                <button
                    onClick={() => handleShare('twitter')}
                    className="w-10 h-10 flex items-center justify-center bg-sky-50 text-sky-500 rounded-full hover:bg-sky-500 hover:text-white transition-all duration-300"
                    title={t('social.twitter', 'Twitter') as string}
                >
                    <Twitter size={18} />
                </button>
            )}

            {options.telegram && (
                <button
                    onClick={() => handleShare('telegram')}
                    className="w-10 h-10 flex items-center justify-center bg-sky-50 text-sky-500 rounded-full hover:bg-sky-500 hover:text-white transition-all duration-300"
                    title={t('social.telegram', 'Telegram') as string}
                >
                    <Send size={18} />
                </button>
            )}


            {options.instagram && (
                <button
                    onClick={() => handleShare('instagram')}
                    className="w-10 h-10 flex items-center justify-center bg-pink-50 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300"
                    title={t('social.instagram', 'Instagram') as string}
                >
                    <Instagram size={18} />
                </button>
            )}
        </div>
    );
};

export default SocialShare;
