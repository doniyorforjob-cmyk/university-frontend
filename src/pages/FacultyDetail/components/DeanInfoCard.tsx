import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { OptimizedImage } from '@/components/shared';

interface DeanInfoCardProps {
    name?: string;
    position?: string;
    phone?: string;
    email?: string;
    image?: string;
}

export const DeanInfoCard: React.FC<DeanInfoCardProps> = ({
    name,
    position,
    phone,
    email,
    image
}) => {
    if (!name && !image) return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="flex flex-col md:flex-row gap-6 p-6">
                {/* Dean Image - 1:1 aspect ratio */}
                <div className="flex-shrink-0">
                    <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto md:mx-0">
                        <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100">
                            <OptimizedImage
                                src={image || '/images/logo.png'}
                                alt={name || 'Dekan'}
                                className="w-full h-full object-cover"
                                width={224}
                                height={224}
                            />
                        </div>
                        {/* Flag overlay in top-right corner */}
                        <div className="absolute top-3 right-3 w-12 h-12 rounded-lg overflow-hidden shadow-md bg-white/90 backdrop-blur-sm flex items-center justify-center">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Dean Information */}
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#003B5C] mb-2">
                        {name || 'Ma\'lumot yo\'q'}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        {position || 'Dekan'}
                    </p>

                    {/* Contact Information */}
                    <div className="space-y-3">
                        {phone && (
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                                    <Phone size={18} className="text-blue-600" />
                                </div>
                                <a
                                    href={`tel:${phone}`}
                                    className="text-base hover:text-blue-600 transition-colors"
                                >
                                    {phone}
                                </a>
                            </div>
                        )}
                        {email && (
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50">
                                    <Mail size={18} className="text-green-600" />
                                </div>
                                <a
                                    href={`mailto:${email}`}
                                    className="text-base hover:text-green-600 transition-colors"
                                >
                                    {email}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
