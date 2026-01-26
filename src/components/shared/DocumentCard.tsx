import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, FileText } from 'lucide-react';
import { PrefetchLink } from '@/components/shared';
import { formatStandardDate } from '@/config/constants';
import { useLocale } from '@/contexts/LocaleContext';

interface DocumentCardProps {
    title: string;
    slug: string;
    filesCount: number;
    publishDate?: string;
    className?: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
    title,
    slug,
    filesCount,
    publishDate,
    className = ''
}) => {
    const { t } = useTranslation('common');
    const { locale } = useLocale();

    return (
        <PrefetchLink
            to={`/documents/${slug}`}
            className={`bg-white rounded-[20px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col h-full overflow-hidden ${className}`}
        >
            {/* Card Content */}
            <div className="p-6 pb-4 flex-1">
                {/* Header: Icon + File Count */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                        <div className="w-10 h-10 bg-[#003B5C] rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/10">
                            <FileText className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-500">
                        {filesCount} {t('files_count', 'ta fayl')}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-[800] text-gray-900 group-hover:text-blue-600 transition-colors leading-[1.4] mb-4">
                    {title}
                </h3>
            </div>

            {/* Footer: Date */}
            <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between text-[#6B7280]">
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#003B5C]" />
                    <span className="text-sm font-medium">
                        {formatStandardDate(publishDate, locale) || formatStandardDate(new Date().toISOString(), locale)}
                    </span>
                </div>
            </div>
        </PrefetchLink>
    );
};

export default DocumentCard;
