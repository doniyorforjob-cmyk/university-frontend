import React from 'react';
import { RefreshCw } from 'lucide-react';

const NetworkError: React.FC = () => {
    const [isImageLoaded, setIsImageLoaded] = React.useState(false);

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-8 text-center bg-white overflow-hidden">
            <div className="w-full max-w-xl flex flex-col items-center animate-in fade-in zoom-in duration-500">

                {/* Illustration */}
                <div className={`relative w-80 h-80 mb-6 transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <img
                        src="/images/no-internet.png"
                        alt=""
                        onLoad={() => setIsImageLoaded(true)}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Content */}
                <div className="space-y-4 mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Internet aloqasi yo&apos;q
                    </h1>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                        Iltimos, internetga ulanishni tekshiring va qayta urinib ko&apos;ring.
                    </p>
                </div>

                {/* Action */}
                <button
                    onClick={handleRetry}
                    className="flex items-center gap-3 px-12 py-3.5 text-white bg-[#6366f1] rounded-lg hover:bg-[#4f46e5] transition-all shadow-lg shadow-indigo-200 font-medium text-lg"
                >
                    <RefreshCw className="w-5 h-5" />
                    <span>Qayta urinish</span>
                </button>
            </div>
        </div>
    );
};

export default NetworkError;
