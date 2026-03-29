import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface FacultyCardProps {
    id: string | number;
    name: string;
    icon: string;
    isActive?: boolean;
    onClick?: () => void;
    variant?: 'list-item' | 'grid-card';
    href?: string;
    description?: string;
    slug?: string; // Optional slug for future use or if variant changes to link
}

export const FacultyCard: React.FC<FacultyCardProps> = ({
    id,
    name,
    icon,
    isActive = false,
    onClick,
    variant = 'list-item',
    href,
    description,
    slug
}) => {
    const CardContent = (
        <>
            <div className={`transition-colors duration-150 
        ${variant === 'list-item'
                    ? `mr-3 sm:mr-4 md:mr-5 ${isActive ? 'text-white' : 'text-brand-blue'} [&_svg]:w-7 [&_svg]:h-7 sm:[&_svg]:w-8 sm:[&_svg]:h-8 md:[&_svg]:w-10 md:[&_svg]:h-10`
                    : 'mb-4 text-brand-blue [&_svg]:w-12 [&_svg]:h-12'
                }
      `}>
                <div dangerouslySetInnerHTML={{ __html: icon }} />
            </div>
            <div className="flex-1">
                <h3 className={`font-bold leading-tight ${variant === 'list-item' ? 'text-sm sm:text-base md:text-lg' : 'text-xl mb-2'}`}>
                    {name}
                </h3>
                {variant === 'grid-card' && description && (
                    <p className="text-sm text-gray-500 line-clamp-3">
                        {description}
                    </p>
                )}
            </div>
        </>
    );

    const containerClasses = `
    flex ${variant === 'list-item' ? 'items-center' : 'flex-col items-start'} 
    p-3 sm:p-4 md:p-5 cursor-pointer transition-all duration-150 
    rounded-xl md:rounded-2xl group border 
    ${variant === 'list-item'
            ? (isActive
                ? 'bg-primary text-white shadow-md border-transparent scale-[1.01] md:scale-[1.02]'
                : 'bg-ghost-blue text-brand-dark shadow-sm border-blue-100/30 hover:bg-white')
            : 'bg-white text-brand-dark shadow-sm hover:shadow-md border-blue-100 hover:-translate-y-1'
        }
  `;

    if (href) {
        return (
            <Link to={href} className={containerClasses}>
                {CardContent}
            </Link>
        );
    }

    return (
        <motion.div
            whileHover={variant === 'list-item' ? { x: 5 } : undefined}
            transition={{ duration: 0.15 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            onKeyDown={(e) => {
                if (onClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onClick();
                }
            }}
            role="button"
            tabIndex={0}
            className={containerClasses}
        >
            {CardContent}
        </motion.div>
    );
};
