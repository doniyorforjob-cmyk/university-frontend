import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ContentBuilder, { ContentBlock } from '@/components/shared/ContentBuilder';
import { OptimizedImage } from '../shared';
import {
  Calendar,
  Eye,
  User,
  Printer,
  Tag,
  Clock,
  FileText,
  Megaphone,
  Wrench,
  Info,
  Folder
} from 'lucide-react';
import SocialShare from '../shared/SocialShare';

// BreadcrumbItem interfeysi
interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Content turlari
export type ContentType = 'news' | 'announcement' | 'service' | 'info' | 'person';

// Meta ma'lumotlar
export interface DetailMeta {
  publishDate?: string;
  author?: string;
  category?: string;
  tags?: string[];
  priority?: 'high' | 'medium' | 'low';
  status?: 'active' | 'archived' | 'draft';
  views?: number;
  lastUpdated?: string;
}

// O'xshash content
export interface RelatedItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  href: string;
  date?: string;
}

// Social share
// Social share configuration type
export interface SocialShareConfig {
  facebook?: boolean;
  twitter?: boolean;
  telegram?: boolean;
  linkedin?: boolean;
  copy?: boolean;
}

// Props interfeysi
interface DetailTemplateProps {
  // Asosiy ma'lumotlar
  title: string;
  contentType: ContentType;

  // Content
  content?: string; // HTML content
  contentBlocks?: ContentBlock[]; // ContentBuilder blocks

  // Meta ma'lumotlar
  meta?: DetailMeta;

  // Media
  heroImage?: string;
  heroImageAlt?: string;
  gallery?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;

  // Navigation
  breadcrumbs: BreadcrumbItem[];

  // Related content
  relatedItems?: RelatedItem[];
  showRelated?: boolean;

  // Features
  showMeta?: boolean;
  showSocialShare?: boolean;
  showPrintButton?: boolean;
  showComments?: boolean;

  // Social sharing
  // Social sharing
  socialShare?: SocialShareConfig;

  // Sidebar
  showSidebar?: boolean;
  sidebarContent?: React.ReactNode;

  // Callbacks
  onShare?: (platform: string) => void;
  onPrint?: () => void;
  onRelatedClick?: (item: RelatedItem) => void;
  className?: string;
}

const DetailTemplate: React.FC<DetailTemplateProps> = ({
  title,
  contentType,
  content,
  contentBlocks,
  meta,
  heroImage,
  heroImageAlt,
  gallery,
  breadcrumbs,
  relatedItems = [],
  showRelated = true,
  showMeta = true,
  showSocialShare = true,
  showPrintButton = true,
  showComments = false,
  socialShare = { facebook: true, telegram: true, copy: true },
  showSidebar = true,
  sidebarContent,
  onShare,
  onPrint,
  onRelatedClick,
  className = ''
}) => {



  // Print handler
  const handlePrint = () => {
    window.print();
    onPrint?.();
  };

  // Content type bo'yicha icon va label olish
  const getTypeInfo = () => {
    switch (contentType) {
      case 'news':
        return { icon: <FileText size={18} />, label: 'Yangilik' };
      case 'announcement':
        return { icon: <Megaphone size={18} />, label: 'E\'lon' };
      case 'service':
        return { icon: <Wrench size={18} />, label: 'Xizmat' };
      case 'person':
        return { icon: <User size={18} />, label: 'Shaxs' };
      default:
        return { icon: <Info size={18} />, label: 'Ma\'lumot' };
    }
  };

  const typeInfo = getTypeInfo();

  // Priority bo'yicha rang olish
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'low':
        return 'bg-green-50 text-green-700 border-green-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

      {/* Asosiy kontent */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] overflow-hidden p-6 md:p-8 border border-gray-100"
      >
        {/* Header Section */}
        <div className="mb-6">

          {/* Title */}
          <h1 className="text-[22px] md:text-[26px] font-medium leading-[1.4] text-[#010b1b] mb-4">
            {title}
          </h1>

          {/* Meta Badges (Avloniy Style) */}
          {showMeta && meta && (
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {meta.publishDate && (
                <div className="flex items-center gap-2 bg-[#F2F4F9] border border-[#DFE4ED] text-[#010b1b] rounded-xl px-3 py-1.5 text-sm transition-colors hover:bg-gray-200 cursor-default">
                  <Calendar size={16} className="text-[#555]" />
                  <span>{new Date(meta.publishDate).toLocaleDateString('uz-UZ')}</span>
                </div>
              )}

              {meta.views && (
                <div className="flex items-center gap-2 bg-[#F2F4F9] border border-[#DFE4ED] text-[#010b1b] rounded-xl px-3 py-1.5 text-sm transition-colors hover:bg-gray-200 cursor-default">
                  <Eye size={16} className="text-[#555]" />
                  <span>{meta.views.toLocaleString()}</span>
                </div>
              )}

              {meta.author && (
                <div className="flex items-center gap-2 bg-[#F2F4F9] border border-[#DFE4ED] text-[#010b1b] rounded-xl px-3 py-1.5 text-sm transition-colors hover:bg-gray-200 cursor-default">
                  <User size={16} className="text-[#555]" />
                  <span>{meta.author}</span>
                </div>
              )}

              {meta.category && (
                <div className="flex items-center gap-2 bg-[#F2F4F9] border border-[#DFE4ED] text-[#010b1b] rounded-xl px-3 py-1.5 text-sm transition-colors hover:bg-gray-200 cursor-default">
                  <Folder size={16} className="text-[#555]" />
                  <span>{meta.category}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hero Image */}
        {heroImage && (
          <div className="rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-100">
            <div className="aspect-video relative">
              <OptimizedImage
                src={heroImage}
                alt={heroImageAlt || title}
                className="w-full h-full object-cover"
                lazy={false} // Priority load
                width={900}
              />
            </div>
          </div>
        )}


        {/* Main content */}
        <div className="prose prose-lg max-w-none text-[#242d3a] prose-headings:text-[#010b1b] prose-a:text-blue-600 prose-img:rounded-xl prose-strong:text-[#010b1b] leading-relaxed">
          {contentBlocks ? (
            <ContentBuilder blocks={contentBlocks} />
          ) : content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p className="text-gray-500 italic">Ma&apos;lumot mavjud emas</p>
          )}
        </div>

        {/* Gallery */}
        {gallery && gallery.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-medium text-[#010b1b] mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
              Fotogalereya
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gallery.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <OptimizedImage
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      lazy={true}
                      width={400}
                    />
                  </div>
                  {image.caption && (
                    <div className="p-3 bg-gray-50 text-sm text-gray-600 border-t border-gray-100">
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {meta?.tags && meta.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-500 text-sm flex items-center gap-1 mr-2">
                <Tag size={16} /> Teglar:
              </span>
              {meta.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Divider for Share Section */}
        <div className="my-8 border-t border-dashed border-gray-200"></div>

        {/* Action buttons (Share & Print) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {showSocialShare && (
            <SocialShare
              title={title}
              options={socialShare}
            />
          )}

          {showPrintButton && (
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
            >
              <Printer size={18} />
              <span className="text-sm font-medium">Chop etish</span>
            </button>
          )}
        </div>

      </motion.div>

      {/* Related items */}
      {showRelated && relatedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
            <h3 className="text-2xl font-medium text-[#010b1b]">O&apos;xshash materiallar</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => onRelatedClick?.(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onRelatedClick?.(item);
                  }
                }}
                role="button"
                tabIndex={0}
                className="group bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer flex gap-4"
              >
                {item.image && (
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden relative">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      width={96}
                      height={96}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Clock size={12} />
                    {item.date && new Date(item.date).toLocaleDateString('uz-UZ')}
                  </div>
                  <h4 className="font-medium text-[#010b1b] line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DetailTemplate;
