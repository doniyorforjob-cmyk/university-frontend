import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/store/settingsStore';
import { CalendarDaysIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { formatStandardDate, stripHtml } from '@/config/constants';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { Link } from 'react-router-dom';

export interface ContentCardProps {
    title: string;
    slug: string;
    image?: string;
    content?: string;
    publishedAt?: string;
    linkPrefix: string;

    // Optional props for specific variants
    source?: string;
    category?: string;
    isFeatured?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({
    title,
    slug,
    image,
    content,
    publishedAt,
    linkPrefix,
    source,
    category,
    isFeatured = false
}) => {
    const { t } = useTranslation(['common']);
    const { settings } = useSettingsStore();
    const formattedDate = publishedAt ? formatStandardDate(publishedAt) : '';

    const sourceStyle = "bg-primary text-white";
    const detailHref = `${linkPrefix}/${slug}`;

    return (
        <article
            className={`group relative bg-white border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isFeatured ? 'lg:flex lg:gap-8 lg:items-center' : ''
                }`}
        >
            <Link to={detailHref} className="absolute inset-0 z-20" />

            {/* Image Container - set shorter aspect ratio and max width for featured */}
            <div className={`relative overflow-hidden ${isFeatured ? 'lg:w-[45%] aspect-[16/10] lg:aspect-auto self-stretch' : 'aspect-[16/10]'}`}>
                <OptimizedImage
                    src={image || settings?.logo || ""}
                    alt={title}
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${(!image && !settings?.logo) ? 'object-contain p-4 bg-gray-50' : 'object-cover'}`}
                    aspectRatio={isFeatured ? undefined : 16 / 9}
                />

                {/* Source Badge (Optional) */}
                {source && (
                    <div className={`absolute top-4 left-4 font-bold px-3 py-1 rounded-lg text-sm shadow-lg ${sourceStyle} z-10`}>
                        {source}
                    </div>
                )}

                {/* Category Badge (Optional) */}
                {category && (
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-bold text-gray-600 border border-gray-100 z-10">
                        {category}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={`p-4 md:p-6 ${isFeatured ? 'lg:w-[55%] lg:py-8 lg:pr-10' : ''}`}>
                {formattedDate && (
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{formattedDate}</span>
                    </div>
                )}

                <h3 className={`font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 leading-snug mb-3 ${isFeatured ? 'text-xl lg:text-2xl line-clamp-2' : 'text-lg line-clamp-2'
                    }`}>
                    {title}
                </h3>

                {content && (
                    <p className={`text-gray-600 mb-6 ${isFeatured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>
                        {stripHtml(content)}
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

export default ContentCard;
