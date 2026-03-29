import React, { useEffect } from 'react';
import { RefreshCcw, Home } from 'lucide-react';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const ServerError: React.FC = () => {
    const { setSidebarType, setBannerData, setBreadcrumbsData } = useGlobalLayout();
    const [isImageLoaded, setIsImageLoaded] = React.useState(false);

    useEffect(() => {
        setSidebarType(undefined);
        setBannerData(undefined);
        setBreadcrumbsData(undefined);
    }, [setSidebarType, setBannerData, setBreadcrumbsData]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-white">
            <div className="w-full max-w-xl flex flex-col items-center animate-in fade-in zoom-in duration-500">

                {/* Illustration */}
                <div className={`relative w-80 h-80 mb-6 transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <img
                        src="/images/500.png"
                        alt=""
                        onLoad={() => setIsImageLoaded(true)}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Content */}
                <div className="space-y-4 mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Tizimda xatolik yuz berdi
                    </h1>
                    <div className="space-y-2">
                        <p className="text-gray-600 text-lg">
                            Kechirasiz, serverda kutilmagan xatolik yuz berdi.
                        </p>
                        <p className="text-sm text-gray-400">
                            Biz bu haqda xabardormiz va tez orada tuzatamiz. Iltimos, birozdan so&apos;ng qayting.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-8 py-3.5 text-white bg-[#6366f1] rounded-lg hover:bg-[#4f46e5] transition-all shadow-md w-full sm:w-auto justify-center font-medium"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        <span>Sahifani yangilash</span>
                    </button>

                    <a
                        href="/"
                        className="flex items-center gap-2 px-8 py-3.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto justify-center font-medium"
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
