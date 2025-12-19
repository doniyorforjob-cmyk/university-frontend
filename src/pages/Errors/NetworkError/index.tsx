import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

const NetworkError: React.FC = () => {

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 text-center bg-white/95 backdrop-blur-sm">
            <div className="w-full max-w-md space-y-6 animate-in fade-in zoom-in duration-300">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="bg-gray-100 p-6 rounded-full">
                        <WifiOff className="w-16 h-16 text-gray-500" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Internet aloqasi yo&apos;q
                    </h1>
                    <p className="text-gray-600">
                        Iltimos, internetga ulanishni tekshiring va qayta urinib ko&apos;ring.
                    </p>
                </div>

                {/* Action */}
                <button
                    onClick={handleRetry}
                    className="flex items-center gap-2 px-8 py-3 mx-auto text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
                >
                    <RefreshCw className="w-5 h-5" />
                    <span>Qayta urinish</span>
                </button>
            </div>
        </div>
    );
};

export default NetworkError;
