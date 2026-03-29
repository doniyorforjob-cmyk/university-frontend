import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ContentBuilder, { ContentBlock } from '@/components/shared/ContentBuilder'; // Ensure ContentBuilder is imported
import EmptyState from '@/components/shared/EmptyState';

import { FaPrint } from 'react-icons/fa';
import SocialShare from './SocialShare';

// Dynamic content component for page footer
const PageFooter: React.FC<{ title: string }> = ({ title }) => {
  const { t } = useTranslation(['common']);
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
          title={String(t('common:print'))}
        >
          <FaPrint className="w-5 h-5 mr-2" />
          {String(t('common:print'))}
        </button>
      </div>
    </motion.div>
  );
};

interface PageTemplateProps {
  title: string;
  children?: React.ReactNode;
  contentBlocks?: ContentBlock[];

  heroImage?: string;
  heroGradient?: string;
  headerIcon?: React.ReactNode; // Keep headerIcon for internal rendering if no banner

  className?: string;

  // Empty state props
  isEmpty?: boolean;
  emptyMessage?: string;
  emptyResourceKey?: 'photos' | 'videos' | 'news' | 'announcements' | 'services' | 'departments' | 'info' | 'systems' | 'faculties';
}

const PageTemplate: React.FC<PageTemplateProps> = memo(({
  title,
  children,
  contentBlocks,
  className = '',
  isEmpty = false,
  emptyMessage,
  emptyResourceKey
}) => {
  const { t, i18n } = useTranslation(['common']);

  return (
    <div className={`${className} bg-white p-8`} >
      <motion.div
        key={title} // Re-animate on page change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title and Date */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[1.35rem] md:text-[1.55rem] font-[900] leading-[1.2] font-sans text-black tracking-tighter uppercase">{title}</h1>
            <div className="text-xs text-[#334155] font-semibold bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5 shadow-sm shadow-black/5 whitespace-nowrap">
              {String(t('common:lastUpdate'))}: {new Date().toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-GB')}
            </div>
          </div>
          <div className="h-px w-full border-b border-dashed border-gray-300"></div>
        </div>

        <div className="prose prose-sm md:prose-base max-w-none text-gray-700
          prose-p:leading-relaxed prose-p:text-gray-700
          prose-headings:text-[#003B5C] prose-headings:font-bold prose-headings:tracking-tight
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-bold
          prose-img:rounded-2xl prose-img:shadow-lg
          prose-ul:list-disc prose-ol:list-decimal
          space-y-6">
          {isEmpty ? (
            <div className="py-12">
              <EmptyState
                message={emptyMessage}
                resourceKey={emptyResourceKey}
              />
            </div>
          ) : (
            contentBlocks ? <ContentBuilder blocks={contentBlocks} /> : children
          )}
        </div>

        {/* Dynamic Page Footer with Social Sharing */}
        <PageFooter title={title} />
      </motion.div>
    </div >
  );
});

PageTemplate.displayName = 'PageTemplate';

export default PageTemplate;
