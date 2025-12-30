import React from 'react';
import {
    Share2,
    Facebook,
    Send,
    Linkedin,
    Copy,
    Twitter
} from 'lucide-react';

export interface SocialShareProps {
    title?: string;
    url?: string; // Optional, defaults to window.location.href
    options?: {
        facebook?: boolean;
        telegram?: boolean;
        linkedin?: boolean;
        twitter?: boolean;
        copy?: boolean;
    };
    className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
    title,
    url,
    options = { facebook: true, telegram: true, linkedin: true, copy: true },
    className = ''
}) => {
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareTitle = title || '';

    const handleShare = (platform: string) => {
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
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(currentUrl);
                // Toast notification could be added here
                break;
        }
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <span className="text-base text-[#242d3a] font-medium flex items-center gap-2 mr-2">
                <Share2 size={20} className="text-blue-600" />
                Ulashish:
            </span>

            {options.facebook && (
                <button
                    onClick={() => handleShare('facebook')}
                    className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
                    title="Facebook"
                >
                    <Facebook size={18} />
                </button>
            )}

            {options.twitter && (
                <button
                    onClick={() => handleShare('twitter')}
                    className="w-10 h-10 flex items-center justify-center bg-sky-50 text-sky-500 rounded-full hover:bg-sky-500 hover:text-white transition-all duration-300"
                    title="Twitter"
                >
                    <Twitter size={18} />
                </button>
            )}

            {options.telegram && (
                <button
                    onClick={() => handleShare('telegram')}
                    className="w-10 h-10 flex items-center justify-center bg-sky-50 text-sky-500 rounded-full hover:bg-sky-500 hover:text-white transition-all duration-300"
                    title="Telegram"
                >
                    <Send size={18} />
                </button>
            )}

            {options.linkedin && (
                <button
                    onClick={() => handleShare('linkedin')}
                    className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300"
                    title="LinkedIn"
                >
                    <Linkedin size={18} />
                </button>
            )}

            {options.copy && (
                <button
                    onClick={() => handleShare('copy')}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-300"
                    title="Nusxalash"
                >
                    <Copy size={18} />
                </button>
            )}
        </div>
    );
};

export default SocialShare;
