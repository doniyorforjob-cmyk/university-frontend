import React from 'react';
import { useTranslation } from 'react-i18next';
import { MediaArticle } from '@/types/media.types';
import { useSettingsStore } from '@/store/settingsStore';
import { CalendarDaysIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { formatStandardDate, stripHtml } from '@/config/constants';
import OptimizedImage from '@/components/shared/OptimizedImage';

interface MediaMentionCardProps {
    article: MediaArticle;
    isFeatured?: boolean;
}

const MediaMentionCard: React.FC<MediaMentionCardProps> = ({ article, isFeatured = false }) => {
    const { t } = useTranslation(['common']);
    const { settings } = useSettingsStore();
    const formattedDate = formatStandardDate(article.published_at);

    const typeLabels: Record<string, string> = {
        online: t('media_types.online', "O'zbekiston OAV"),
        tv: t('media_types.tv', "Telekanal"),
        print: t('media_types.print', "Gazeta/Jurnal")
    };

    const sourceStyle = "bg-primary text-white";

    return (
        <article
            className={`group relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isFeatured ? 'lg:flex lg:gap-8 lg:items-center' : ''
                }`}
        >
            {/* Image */}
            <div className={`relative overflow-hidden ${isFeatured ? 'lg:w-1/2' : 'aspect-[16/10]'}`}>
                <OptimizedImage
                    src={article.image || settings?.logo || ""}
                    alt={article.title}
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${(!article.image && !settings?.logo) ? 'object-contain p-4 bg-gray-50' : 'object-cover'}`}
                    aspectRatio={isFeatured ? undefined : 16 / 10}
                />

                {/* Source Badge */}
                <div className={`absolute top-4 left-4 font-bold px-3 py-1 rounded-lg text-sm shadow-lg ${sourceStyle} z-10`}>
                    {article.source}
                </div>

                {/* Publication Type Badge */}
                {article.type && (
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-bold text-gray-600 border border-gray-100 z-10">
                        {typeLabels[article.type]}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={`p-6 ${isFeatured ? 'lg:w-1/2 lg:p-10' : ''}`}>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>{formattedDate}</span>
                </div>

                <h3 className={`font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 leading-snug mb-3 ${isFeatured ? 'text-2xl lg:text-3xl' : 'text-xl line-clamp-2'
                    }`}>
                    {article.title}
                </h3>

                {article.excerpt && (
                    <p className={`text-gray-600 mb-6 ${isFeatured ? 'text-lg line-clamp-3' : 'text-sm line-clamp-2'}`}>
                        {stripHtml(article.excerpt)}
                    </p>
                )}

                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300"
                >
                    <span>{t('read_article', "Maqolani o'qish")}</span>
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </a>

                {/* Decorative background element for featured */}
                {isFeatured && (
                    <div className="absolute top-0 right-0 -z-10 opacity-5">
                        <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="150" cy="50" r="100" fill="currentColor" />
                        </svg>
                    </div>
                )}
            </div>
        </article>
    );
};

export default MediaMentionCard;
