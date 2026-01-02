import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (trackingId: string) => void;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [trackingId, setTrackingId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!trackingId.trim()) {
            setError('Tracking ID kiritilishi shart');
            return;
        }

        // Basic format validation can be added here if needed
        // e.g., if (trackingId.length < 8) ...

        onSubmit(trackingId.trim());
        setTrackingId('');
        setError('');
    };

    const handleClose = () => {
        setTrackingId('');
        setError('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 z-[1000] backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-[1000] p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-md pointer-events-auto overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Murojaatni kuzatish
                                </h3>
                                <button
                                    onClick={handleClose}
                                    className="text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="trackingId"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Tracking ID
                                        </label>
                                        <input
                                            type="text"
                                            id="trackingId"
                                            value={trackingId}
                                            onChange={(e) => {
                                                setTrackingId(e.target.value.toUpperCase());
                                                setError('');
                                            }}
                                            placeholder="Masalan: AP12345678"
                                            className={`block w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/20 transition-all outline-none ${error
                                                ? 'border-red-300 focus:border-red-500'
                                                : 'border-gray-200 focus:border-primary'
                                                }`}
                                        />
                                        {error && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {error}
                                            </p>
                                        )}
                                        <p className="mt-2 text-xs text-gray-500">
                                            Murojaat yuborilganda sizga berilgan maxsus ID raqamni kiriting
                                        </p>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="flex-1 px-4 py-3 rounded-xl font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            Bekor qilish
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-3 rounded-xl font-medium text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                                        >
                                            Kuzatish
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
