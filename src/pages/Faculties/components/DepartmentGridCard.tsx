import React from 'react';
import { Phone, User, Mail } from 'lucide-react';

interface DepartmentGridCardProps {
    name: string;
    phone?: string;
    email?: string;
    headName?: string;
}

export const DepartmentGridCard: React.FC<DepartmentGridCardProps> = ({ name, phone, email, headName }) => {
    // Helper to format phone
    const formatPhone = (p: string) => {
        const cleaned = p.toString().split('.')[0].replace(/\D/g, '');
        return `+${cleaned}`;
    };

    return (
        <div className="bg-slate-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-5 leading-snug min-h-[3rem]">
                {name}
            </h3>

            <div className="space-y-4">
                {/* Head Name - Always visible icon, even if empty name */}
                <div className="flex items-start text-gray-600 text-sm min-h-[1.5rem]">
                    <User size={18} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{headName}</span>
                </div>

                {phone && (
                    <div className="flex items-start text-gray-600 text-sm">
                        <Phone size={18} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <a href={`tel:${formatPhone(phone)}`} className="hover:text-green-600 transition-colors font-medium">
                            {formatPhone(phone)}
                        </a>
                    </div>
                )}

                {email && (
                    <div className="flex items-start text-gray-600 text-sm">
                        <Mail size={18} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <a href={`mailto:${email}`} className="hover:text-green-600 transition-colors truncate w-full block">
                            {email}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
