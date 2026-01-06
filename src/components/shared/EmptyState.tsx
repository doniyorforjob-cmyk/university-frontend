import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface EmptyStateProps {
    title?: React.ReactNode;
    message?: React.ReactNode;
    resourceKey?: 'photos' | 'videos' | 'news' | 'announcements' | 'services' | 'departments' | 'info' | 'systems' | 'faculties';
    icon?: React.ReactNode;
    className?: string; // Users should provide height classes here if needed (e.g., h-64, h-full, etc.)
}

/**
 * Professional EmptyState component for displaying "No data" messages.
 * Uses Tailwind classes for height and responsiveness.
 */
const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    message,
    resourceKey,
    icon,
    className = "min-h-[20rem]" // Default responsive minimum height using rem instead of px
}) => {
    const { t } = useTranslation(['common', 'pages']);

    const displayTitle = title || t('pages:noDataAvailable');
    const displayMessage = resourceKey
        ? t('common:noDataWithResource', { resource: t(`pages:emptyResources.${resourceKey}`) })
        : (message || t('pages:noDataAvailable'));

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col items-center justify-center text-center p-8 bg-white/40 rounded-3xl border border-dashed border-slate-200/60 backdrop-blur-sm ${className}`}
        >
            <div className="mb-4 text-slate-300">
                {icon || (
                    <svg
                        className="w-16 h-16 opacity-40 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                    </svg>
                )}
            </div>

            <h3 className="text-lg font-bold text-slate-600 mb-1">
                {displayTitle}
            </h3>

            <p className="text-slate-400 max-w-xs mx-auto leading-relaxed">
                {displayMessage}
            </p>
        </motion.div>
    );
};

export default EmptyState;
