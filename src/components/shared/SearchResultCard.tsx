import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocale } from '@/contexts/LocaleContext';
import { formatStandardDate } from '@/config/constants';
import { SearchResult } from '@/services/searchService';

interface SearchResultCardProps {
    item: SearchResult;
    gi?: number; // Group index for animation
    idx?: number; // Item index for animation
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ item, gi = 0, idx = 0 }) => {
    const { locale } = useLocale();

    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: gi * 0.05 + idx * 0.03 }}
        >
            <Link
                to={item.href}
                className="flex gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-transparent hover:border-primary/20 transition-all duration-200 group"
            >
                {item.image && (
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {item.title}
                    </h3>
                    {item.description && item.description.length > 5 && (
                        <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                    )}
                    {item.date && (
                        <p className="text-gray-400 text-xs mt-2">
                            {formatStandardDate(item.date, locale)}
                        </p>
                    )}
                </div>
                <div className="flex-shrink-0 self-center text-gray-300 group-hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </Link>
        </motion.div>
    );
};

export default SearchResultCard;
