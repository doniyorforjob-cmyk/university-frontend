import React, { useEffect } from 'react';
import { Home, MoveLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const { setSidebarType, setBannerData, setBreadcrumbsData } = useGlobalLayout();

    useEffect(() => {
        setSidebarType(undefined);
        setBannerData(undefined);
        setBreadcrumbsData(undefined);
    }, [setSidebarType, setBannerData, setBreadcrumbsData]);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center bg-gray-50">
            <div className="w-full max-w-md space-y-8">
                {/* Icon & 404 Text */}
                <div className="relative">
                    <div className="text-9xl font-extrabold text-blue-100 select-none">
                        404
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-blue-600 p-4 rounded-full shadow-xl">
                            <Search className="w-12 h-12 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Sahifa topilmadi
                    </h1>
                    <p className="text-gray-600 max-w-sm mx-auto">
                        Siz qidirayotgan sahifa mavjud emas, ko&apos;chirilgan yoki o&apos;chirilgan bo&apos;lishi mumkin.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm w-full sm:w-auto justify-center"
                    >
                        <MoveLeft className="w-5 h-5" />
                        <span>Ortga qaytish</span>
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto justify-center"
                    >
                        <Home className="w-5 h-5" />
                        <span>Bosh sahifa</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
