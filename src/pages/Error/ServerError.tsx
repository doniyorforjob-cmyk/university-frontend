import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServerError: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Illustration or Icon */}
                <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-25"></div>
                    <div className="relative bg-white p-6 rounded-full shadow-lg border-2 border-red-100 flex items-center justify-center">
                        <svg
                            className="w-16 h-16 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Serverda vaqtinchalik xatolik
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Hozirda server bilan bog&apos;lanish imkoni bo&apos;lmayapti. Iltimos, birozdan so&apos;ng qayta urinib ko&apos;ring.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        <svg
                            className="w-5 h-5 mr-2 -ml-1 animate-spin-slow"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Qayta yuklash
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Bosh sahifa
                    </button>
                </div>

                <div className="pt-8 border-t border-gray-200">
                    <p className="text-xs text-gray-400">
                        Error Code: 500 / 503 | Connection Refused
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServerError;
