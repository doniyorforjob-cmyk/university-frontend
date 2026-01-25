import React from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorDisplayProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    fullPage?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
    title,
    message,
    onRetry,
    fullPage = true,
}) => {
    const { t } = useTranslation('common');

    return (
        <div className={`${fullPage ? 'min-h-[500px]' : 'py-12'} w-full flex flex-col items-center justify-center p-8 text-center`}>
            <div className="max-w-lg w-full flex flex-col items-center">
                {/* Illustration */}
                <div className="relative w-64 h-64 md:w-72 md:h-72 mb-4">
                    <img
                        src="/images/error-illustration.png"
                        alt="Error"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">
                    {title || t('error_title', 'Nimadir xato ketdi')}
                </h2>

                {/* Error Details */}
                {(message || t('error_loading')) && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100 max-w-md w-full">
                        <p className="text-sm font-mono text-gray-500 break-words line-clamp-2">
                            {message || t('error_loading', "Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")}
                        </p>
                    </div>
                )}

                {/* Action Button */}
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-10 py-2.5 bg-[#6366f1] text-white font-medium rounded-md hover:bg-[#4f46e5] transition-colors shadow-sm"
                    >
                        {t('retry', 'Bosh sahifa')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorDisplay;
