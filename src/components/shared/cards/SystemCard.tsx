import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Users, Award, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SystemCardProps {
  id: string | number;
  title: string;
  description: string;
  icon: string;
  color: string;
  href: string;
  index?: number;
  variant?: 'sidebar' | 'section';
}

export const SystemCard = ({
  title,
  description,
  icon,
  color,
  href,
  index = 0,
  variant = 'section'
}: SystemCardProps) => {
  const { t } = useTranslation('common');
  // Check if it's an SVG string (starts with <svg)
  const isSvgString = typeof icon === 'string' ? icon.trim().startsWith('<svg') : false;
  // Check if color is a hex code
  const isHexColor = typeof color === 'string' && color.startsWith('#');

  // If it's not hex and doesn't start with bg-, we might want to ensure it has bg- prefix if it's intended as a class
  // But for safety with JIT, we rely on full classes or hex. 
  // If user provides a hex, we use inline style.
  const containerStyle = isHexColor ? { backgroundColor: color } : {};
  const containerClass = `${!isHexColor ? color : ''} text-white ${variant === 'section' ? 'p-3' : 'p-2'} group-hover:scale-110 transition-transform duration-200`;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return BookOpen;
      case 'Users':
        return Users;
      case 'Award':
        return Award;
      case 'Globe':
        return Globe;
      default:
        // Default fall back
        return BookOpen;
    }
  };

  const IconComponent = !isSvgString && typeof icon === 'string' ? getIconComponent(icon) : null;

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4, delay: index * 0.1 }
  };

  const className = variant === 'sidebar'
    ? "block p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
    : "group bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...motionProps}
      className={className}
    >
      <div className="flex items-start space-x-3">
        <div
          className={containerClass}
          style={containerStyle}
        >
          {isSvgString ? (
            <div
              className={variant === 'section' ? "w-8 h-8" : "w-6 h-6"}
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          ) : (
            IconComponent && <IconComponent className={variant === 'section' ? "w-8 h-8" : "w-6 h-6"} />
          )}
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2 ${variant === 'section' ? 'text-lg' : 'text-base'}`}>
            {title}
          </h3>
          <p className={`line-clamp-2 ${variant === 'section' ? "text-base text-gray-600 mb-3" : "text-sm text-gray-600 mb-3"}`}>{description}</p>
          <div className={`flex items-center text-blue-600 ${variant === 'section' ? 'text-base' : 'text-sm'} font-medium group-hover:text-blue-700`}>
            <span>{t('enter')}</span>
            <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </motion.a >
  );
};

interface SystemsContainerProps {
  title?: string;
  systems: any[];
  quickLinks: any[];
  variant?: 'sidebar' | 'section';
  showQuickLinks?: boolean;
}

export const SystemsContainer = ({
  title,
  systems = [],
  quickLinks = [],
  variant = 'section',
  showQuickLinks = true
}: SystemsContainerProps) => {
  const { t } = useTranslation('common');

  if (variant === 'sidebar') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white p-6 shadow-sm"
      >
        {title && (
          <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        )}

        <div className="space-y-4">
          {systems.map((system: any, index: number) => (
            <SystemCard
              key={system.id}
              id={system.id}
              title={system.title}
              description={system.description}
              icon={system.icon}
              color={system.color}
              href={system.href}
              index={index}
              variant={variant}
            />
          ))}
        </div>

        {showQuickLinks && quickLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">{t('quickLinks')}</h3>
            <div className="flex flex-wrap gap-3">
              {quickLinks.map((link: any) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-medium hover:underline"
                >
                  → {link.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="bg-accent">
      {title && (
        <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {systems.map((system: any, index: number) => (
          <SystemCard
            key={system.id}
            id={system.id}
            title={system.title}
            description={system.description}
            icon={system.icon}
            color={system.color}
            href={system.href}
            index={index}
            variant={variant}
          />
        ))}
      </div>

      {showQuickLinks && quickLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 shadow-sm border border-gray-200"
        >
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">{t('quickLinks')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickLinks.map((link: any) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-medium hover:underline"
              >
                → {link.title}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};