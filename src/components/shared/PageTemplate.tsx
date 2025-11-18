import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ContentBuilder, { ContentBlock } from '@/components/shared/ContentBuilder'; // Ensure ContentBuilder is imported
import { FaFacebook, FaYoutube, FaTelegram, FaInstagram, FaPrint } from 'react-icons/fa';

// Social sharing icons component
const SocialShare: React.FC<{ title: string; url?: string }> = ({ title, url }) => {
  const currentUrl = url || window.location.href;
  const shareText = encodeURIComponent(`${title} - ${currentUrl}`);

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebook className="w-5 h-5 text-blue-600" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'YouTube',
      icon: <FaYoutube className="w-5 h-5 text-red-600" />,
      url: `https://www.youtube.com/share?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'Telegram',
      icon: <FaTelegram className="w-5 h-5 text-blue-500" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-5 h-5 text-pink-600" />,
      url: `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`
    }
  ];

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-600 flex items-center">
        <span className="w-1 h-4 bg-secondary-500 mr-2"></span>
        Ulashish:
      </span>
      <div className="flex space-x-2">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-lg transition-colors duration-200"
            title={`${social.name} da ulashish`}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

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
