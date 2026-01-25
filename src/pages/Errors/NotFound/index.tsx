import React, { useEffect } from 'react';
import { Home, MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const { setSidebarType, setBannerData, setBreadcrumbsData } = useGlobalLayout();
    const [isImageLoaded, setIsImageLoaded] = React.useState(false);

    useEffect(() => {
        setSidebarType(undefined);
        setBannerData(undefined);
        setBreadcrumbsData(undefined);
    }, [setSidebarType, setBannerData, setBreadcrumbsData]);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-white">
            <div className="w-full max-w-xl flex flex-col items-center animate-in fade-in zoom-in duration-500">

                {/* Illustration */}
                <div className={`relative w-80 h-80 mb-6 transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <img
                        src="/images/404.png"
                        alt=""
                        onLoad={() => setIsImageLoaded(true)}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Content */}
                <div className="space-y-4 mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Sahifa topilmadi
                    </h1>
                    <p className="text-gray-600 text-lg max-w-sm mx-auto">
                        Siz qidirayotgan sahifa mavjud emas, ko&apos;chirilgan yoki o&apos;chirilgan bo&apos;lishi mumkin.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-8 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto justify-center font-medium"
                    >
                        <MoveLeft className="w-5 h-5" />
                        <span>Ortga qaytish</span>
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-8 py-3 text-white bg-[#6366f1] rounded-lg hover:bg-[#4f46e5] transition-all shadow-md w-full sm:w-auto justify-center font-medium"
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
