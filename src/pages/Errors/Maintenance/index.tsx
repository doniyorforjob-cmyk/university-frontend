import React, { useEffect } from 'react';
import { Hammer } from 'lucide-react';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';

const Maintenance: React.FC = () => {
    const { setSidebarType, setBannerData, setBreadcrumbsData } = useGlobalLayout();

    useEffect(() => {
        setSidebarType(undefined);
        setBannerData(undefined);
        setBreadcrumbsData(undefined);
    }, [setSidebarType, setBannerData, setBreadcrumbsData]);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50">
            <div className="w-full max-w-md space-y-8">

                {/* Animated Icon */}
                <div className="flex justify-center">
                    <div className="bg-yellow-100 p-6 rounded-full ring-8 ring-yellow-50">
                        <Hammer className="w-16 h-16 text-yellow-600 animate-pulse" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Saytda texnik ishlar
                    </h1>
                    <p className="text-gray-600">
                        Hozirda saytni yaxshilash ustida ishlamoqdamiz.
                        Noqulayliklar uchun uzr so&apos;raymiz.
                    </p>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm inline-block w-full">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Tahminiy tugash vaqti:</span>
                            <span className="font-semibold text-blue-600">Tez orada</span>
                        </div>
                    </div>
                </div>

                {/* Educational Quote (Optional filler) */}
                <div className="pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-400 italic">
                        &quot;Ilm - bu nurni kashf etishdir.&quot;
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
