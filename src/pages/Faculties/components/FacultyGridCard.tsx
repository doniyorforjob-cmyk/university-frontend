import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { OptimizedImage } from '../../../components/shared';

interface FacultyGridCardProps {
    id: string | number;
    name: string;
    image?: string;
    href?: string;
    slug?: string;
}

export const FacultyGridCard: React.FC<FacultyGridCardProps> = ({ id, name, image, href, slug }) => {
    const { t } = useTranslation('pages');
    const { locale } = useLocale();

    // Use ID-based href if not explicitly provided (just ID for relative path)
    // Updated: ensure it's an absolute path to avoid nesting issues or relative confusion
    const linkSlug = slug || id;
    const detailHref = href || `/${locale}/faculties/${linkSlug}`;

    return (
        <Link to={detailHref} className="group relative block w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gray-100">
                <OptimizedImage
                    src={image || '/images/logo.png'}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={300}
                />
                {/* Dark Overlay - Static, providing contrast for top text and bottom button */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/80" />
            </div>

            <div className="relative h-full flex flex-col justify-between p-6 z-10">
                {/* Title at inner-top */}
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight drop-shadow-md">
                    {name}
                </h3>

                <div className="flex items-center text-white font-medium text-sm md:text-base group-hover:translate-x-2 transition-transform duration-300">
                    <span>{t('goToSection')}</span>
                    <div className="ml-2 bg-white/20 rounded-full p-1.5 backdrop-blur-sm">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
};
