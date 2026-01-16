import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, User, Mail } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';

interface DepartmentGridCardProps {
    id: string | number;
    name: string;
    phone?: string;
    email?: string;
    headName?: string;
    slug?: string;
}

export const DepartmentGridCard: React.FC<DepartmentGridCardProps> = ({ id, name, phone, email, headName, slug }) => {
    const navigate = useNavigate();
    const { locale } = useLocale();

    // Helper to format phone
    const formatPhone = (p: string) => {
        const cleaned = p.toString().split('.')[0].replace(/\D/g, '');
        return `+${cleaned}`;
    };

    const handleCardClick = () => {
        // Use slug if available, otherwise fallback to ID
        // If slug is missing, generate one from name (optional, but safer to stick to what API provides)
        const navigationParam = slug || id;
        navigate(`/${locale}/departments/${navigationParam}`);
    };

    const handleLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
            className="bg-slate-50 rounded-xl p-6 h-full hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-200 flex flex-col cursor-pointer"
        >
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
                        <a
                            href={`tel:${formatPhone(phone)}`}
                            onClick={handleLinkClick}
                            className="hover:text-green-600 transition-colors font-medium border-b border-transparent hover:border-green-600"
                        >
                            {formatPhone(phone)}
                        </a>
                    </div>
                )}

                {email && (
                    <div className="flex items-start text-gray-600 text-sm">
                        <Mail size={18} className="text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <a
                            href={`mailto:${email}`}
                            onClick={handleLinkClick}
                            className="hover:text-green-600 transition-colors truncate w-full block border-b border-transparent hover:border-green-600"
                        >
                            {email}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
