import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ContentBuilder, { ContentBlock } from '@/components/shared/ContentBuilder'; // Ensure ContentBuilder is imported

import { FaPrint } from 'react-icons/fa';
import SocialShare from './SocialShare';



// Dynamic content component for page footer
const PageFooter: React.FC<{ title: string }> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-12 pt-8 border-t border-gray-200"
    >
      <div className="flex justify-between items-center">
        <SocialShare title={title} />
        <button
          onClick={() => window.print()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          title="Sahifani chop etish"
        >
          <FaPrint className="w-5 h-5 mr-2" />
          Chop etish
        </button>
      </div>
    </motion.div>
  );
};

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
        {/* Title and Date */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">{title}</h1>
          <div className="text-sm text-black font-medium">
            Oxirgi yangilanish: {new Date().toLocaleDateString('uz-UZ')}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        <div className="prose prose-lg max-w-none text-black space-y-6">
          {contentBlocks ? <ContentBuilder blocks={contentBlocks} /> : children}
        </div>

        {/* Dynamic Page Footer with Social Sharing */}
        <PageFooter title={title} />
      </motion.div>
    </div>
  );
});

PageTemplate.displayName = 'PageTemplate';

export default PageTemplate;
