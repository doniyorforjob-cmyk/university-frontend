import React from 'react';
import { Calendar } from 'lucide-react';
import { OptimizedImage } from './index';
import { useNavigate } from 'react-router-dom';
import { formatStandardDate } from '@/config/constants';
import { useLocale } from '@/contexts/LocaleContext';

export interface LatestContentItem {
    id: string;
    title: string;
    image?: string;
    date?: string;
    slug: string;
    href?: string;
}

interface LatestContentSidebarProps {
    title: string;
    items: LatestContentItem[];
    loading?: boolean;
}

const LatestContentSidebar: React.FC<LatestContentSidebarProps> = ({
    title,
    items,
    loading = false,
}) => {
    const navigate = useNavigate();
    const { locale } = useLocale();

    if (loading) {
        return (
            <div className="bg-white p-6 border border-gray-100 shadow-sm animate-pulse">
                <div className="h-7 bg-gray-200 w-2/3 rounded mb-4"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex gap-3">
                            <div className="w-20 h-20 bg-gray-200 shrink-0"></div>
                            <div className="flex-1 py-1">
                                <div className="h-4 bg-gray-200 w-full rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!items || items.length === 0) return null;

    return (
        <div className="bg-white p-6 border border-gray-100 shadow-sm">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-main mb-2">
                    {title}
                </h3>
                <div className="w-12 h-1 bg-orange-500"></div>
            </div>

            <div className="space-y-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            if (item.href) {
                                // Check if it's a shell route or MFE route
                                const shellRoutes = ['/', '/search', '/contact', '/organizational-structure', '/administration', '/leadership'];
                                
                                // Remove locale prefix for checking (e.g., /uz/news -> /news)
                                let cleanPath = item.href.replace(/^\/[a-z]{2}\//, '/');
                                if (cleanPath === 'uz' || cleanPath === 'ru' || cleanPath === 'en') cleanPath = '/';
                                if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

                                const isShell = shellRoutes.some(route => 
                                    cleanPath === route || cleanPath.startsWith(`${route}/`) || cleanPath.startsWith(`${route}?`)
                                );

                                if (isShell) {
                                    navigate(item.href);
                                } else {
                                    window.location.href = item.href;
                                }
                            }
                        }}
                        onKeyDown={(e) => {
                            if ((e.key === 'Enter' || e.key === ' ') && item.href) {
                                e.preventDefault();
                                // Check if it's a shell route or MFE route
                                const shellRoutes = ['/', '/search', '/contact', '/organizational-structure', '/administration', '/leadership'];
                                
                                // Remove locale prefix for checking
                                let cleanPath = item.href.replace(/^\/[a-z]{2}\//, '/');
                                if (cleanPath === 'uz' || cleanPath === 'ru' || cleanPath === 'en') cleanPath = '/';
                                if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

                                const isShell = shellRoutes.some(route => 
                                    cleanPath === route || cleanPath.startsWith(`${route}/`) || cleanPath.startsWith(`${route}?`)
                                );

                                if (isShell) {
                                    navigate(item.href);
                                } else {
                                    window.location.href = item.href;
                                }
                            }
                        }}
                        className="flex gap-4 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 -m-1"
                    >
                        <div className="w-24 h-20 overflow-hidden shrink-0 border border-gray-100 shadow-sm relative">
                            {item.image ? (
                                <OptimizedImage
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    width={96}
                                    height={80}
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                    <OptimizedImage
                                        src="/images/logo.png"
                                        alt="Logo"
                                        className="w-8 h-8 opacity-20"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 py-0.5 min-w-0">
                            <h4 className="text-[17px] font-bold text-[#0E104B] leading-[1.3] line-clamp-2 mb-2 group-hover:text-blue-700 transition-colors break-words">
                                {item.title}
                            </h4>
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                                <Calendar size={15} className="shrink-0" />
                                <span>{formatStandardDate(item.date, locale)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestContentSidebar;
