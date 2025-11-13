import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ContentBuilder, { ContentBlock } from '@/components/shared/ContentBuilder'; // Ensure ContentBuilder is imported

/**
 * Breadcrumb navigatsiya elementi
 */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * PageTemplate Props interfeysi
 * 
 * @interface PageTemplateProps
 * @property {string} title - Sahifa sarlavhasi
 * @property {BreadcrumbItem[]} breadcrumbs - Breadcrumb yo'li
 * @property {React.ReactNode} [children] - Sahifa kontenti (children yoki contentBlocks)
 * @property {ContentBlock[]} [contentBlocks] - ContentBuilder bloklari (children o'rniga)
 * @property {string} [heroImage] - Hero rasm URL
 * @property {string} [heroGradient] - Hero gradient (rasm bo'lmasa)
 * @property {string} [className] - Qo'shimcha CSS klasslar
 */
interface PageTemplateProps {
  title: string;
  children?: React.ReactNode;
  contentBlocks?: ContentBlock[];

  heroImage?: string;
  heroGradient?: string;
  headerIcon?: React.ReactNode; // Keep headerIcon for internal rendering if no banner

  className?: string;
}

/**
 * PageTemplate - Barcha sahifalar uchun umumiy shablon
 * 
 * 
 * @component
 * @param {PageTemplateProps} props - Shablon props
 * @returns {React.ReactElement} Formatted sahifa
 */
const PageTemplate: React.FC<PageTemplateProps> = memo(({
  title,
  children,
  contentBlocks,
  heroImage,
  heroGradient,
  headerIcon,
  className = ''
}) => {

  return (
    <div className={`${className} bg-white p-8`}>
      <motion.div
        key={title} // Re-animate on page change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-black mb-6">{title}</h1>

        {/* Hero Section */}
        {heroImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={heroImage}
              alt={title}
              className="w-full object-cover h-[480px]"
              loading="eager"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-black space-y-6">
          {contentBlocks ? <ContentBuilder blocks={contentBlocks} /> : children}
        </div>
      </motion.div>
    </div>
  );
});

PageTemplate.displayName = 'PageTemplate';

export default PageTemplate;
