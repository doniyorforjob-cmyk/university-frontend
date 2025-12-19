import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const ServerError: React.FC = () => {
    const { setSidebarType, setBannerData, setBreadcrumbsData } = useGlobalLayout();

    useEffect(() => {
        setSidebarType(undefined);
        setBannerData(undefined);
        setBreadcrumbsData(undefined);
    }, [setSidebarType, setBannerData, setBreadcrumbsData]);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50">
            <div className="w-full max-w-md space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="bg-red-100 p-6 rounded-full">
                        <AlertTriangle className="w-16 h-16 text-red-600" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Tizimda xatolik yuz berdi
                    </h1>
                    <p className="text-gray-600">
                        Kechirasiz, serverda kutilmagan xatolik yuz berdi.
                        Biz bu haqda xabardormiz va tez orada tuzatamiz.
                    </p>
                    <p className="text-sm text-gray-500">
                        Iltimos, sahifani yangilab ko&apos;ring yoki birozdan so&apos;ng qayting.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto justify-center"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        <span>Sahifani yangilash</span>
                    </button>

                    <a
                        href="/"
                        className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm w-full sm:w-auto justify-center"
                    >
                        <Home className="w-5 h-5" />
                        <span>Bosh sahifa</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ServerError;
