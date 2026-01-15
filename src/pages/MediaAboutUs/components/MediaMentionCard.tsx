import React from 'react';
import { useTranslation } from 'react-i18next';
import { MediaArticle } from '@/types/media.types';
import { useSettingsStore } from '@/store/settingsStore';
import { CalendarDaysIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { formatStandardDate, stripHtml } from '@/config/constants';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { useLocale } from '@/contexts/LocaleContext';
import { Link } from 'react-router-dom';

interface MediaMentionCardProps {
    article: MediaArticle;
    isFeatured?: boolean;
}

const MediaMentionCard: React.FC<MediaMentionCardProps> = ({ article, isFeatured = false }) => {
    const { t } = useTranslation(['common']);
    const { settings } = useSettingsStore();
    const { locale } = useLocale();
    const formattedDate = formatStandardDate(article.published_at);

    const typeLabels: Record<string, string> = {
        online: t('media_types.online', "OAV"),
        oav: t('media_types.online', "OAV"),
        tv: t('media_types.tv', "TV"),
        gazeta: t('media_types.print', "Gazeta"),
        print: t('media_types.print', "Gazeta")
    };

    const getCategoryLabel = () => {
        if (!article.categories || article.categories.length === 0) return typeLabels[article.type || 'online'];
        const firstCat = article.categories[0].toLowerCase();
        return typeLabels[firstCat] || firstCat.toUpperCase();
    };

    const sourceStyle = "bg-primary text-white";
    const detailHref = locale === 'uz' ? `/media-about-us/${article.slug}` : `/${locale}/media-about-us/${article.slug}`;

    return (
        <article
            className={`group relative bg-white border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isFeatured ? 'lg:flex lg:gap-8 lg:items-center' : ''
                }`}
        >
            <Link to={detailHref} className="absolute inset-0 z-20" />

            {/* Image Container - set shorter aspect ratio and max width for featured */}
            <div className={`relative overflow-hidden ${isFeatured ? 'lg:w-[40%] aspect-[16/10] lg:aspect-auto self-stretch' : 'aspect-[16/10]'}`}>
                <OptimizedImage
                    src={article.image || settings?.logo || ""}
                    alt={article.title}
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${(!article.image && !settings?.logo) ? 'object-contain p-4 bg-gray-50' : 'object-cover'}`}
                    aspectRatio={isFeatured ? undefined : 16 / 9}
                />

                {/* Source Badge */}
                <div className={`absolute top-4 left-4 font-bold px-3 py-1 rounded-lg text-sm shadow-lg ${sourceStyle} z-10`}>
                    {article.source}
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-bold text-gray-600 border border-gray-100 z-10">
                    {getCategoryLabel()}
                </div>
            </div>

            {/* Content */}
            <div className={`p-4 md:p-6 ${isFeatured ? 'lg:w-[60%] lg:py-8 lg:pr-10' : ''}`}>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>{formattedDate}</span>
                </div>

                <h3 className={`font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 leading-snug mb-3 ${isFeatured ? 'text-xl lg:text-2xl line-clamp-2' : 'text-lg line-clamp-2'
                    }`}>
                    {article.title}
                </h3>

                {article.content && (
                    <p className={`text-gray-600 mb-6 ${isFeatured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>
                        {stripHtml(article.content)}
                    </p>
                )}

                <div className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300">
                    <span>{t('read_more', "Batafsil")}</span>
                    <ArrowRightIcon className="w-5 h-5" />
                </div>
            </div>

            {/* Decorative background element for featured */}
            {isFeatured && (
                <div className="absolute top-0 right-0 -z-10 opacity-5">
                    <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="150" cy="50" r="100" fill="currentColor" />
                    </svg>
                </div>
            )}
        </article>
    );
};

export default MediaMentionCard;
