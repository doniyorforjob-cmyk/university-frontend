import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ContentBuilder, { ContentBlock } from '@/components/shared/ContentBuilder';
import { OptimizedImage } from '../shared';

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
export interface SocialShare {
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
  socialShare?: SocialShare;

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

  // Social share handlers
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link nusxalandi!');
        break;
    }

    onShare?.(platform);
  };

  // Print handler
  const handlePrint = () => {
    window.print();
    onPrint?.();
  };

  // Content type bo'yicha icon olish
  const getContentIcon = () => {
    switch (contentType) {
      case 'news':
        return '📰';
      case 'announcement':
        return '📢';
      case 'service':
        return '🔧';
      case 'person':
        return '👤';
      default:
        return '📄';
    }
  };

  // Priority bo'yicha rang olish
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`${className}`}>
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        {/* Asosiy kontent */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg overflow-hidden"
          >
            {/* Hero Image */}
            {heroImage && (
              <div className="aspect-video overflow-hidden">
                <OptimizedImage
                  src={heroImage}
                  alt={heroImageAlt || title}
                  className="w-full h-full object-cover"
                  lazy={false}
                  width={800}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-6">
                {/* Content type badge */}
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">{getContentIcon()}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {contentType === 'news' ? 'Yangilik' :
                      contentType === 'announcement' ? 'E&apos;lon' :
                        contentType === 'service' ? 'Xizmat' :
                          contentType === 'person' ? 'Shaxs' : 'Ma&apos;lumot'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
                  {title}
                </h1>

                {/* Meta ma'lumotlar */}
                {showMeta && meta && (
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                    {meta.publishDate && (
                      <div className="flex items-center">
                        <span className="mr-1">📅</span>
                        <span>{new Date(meta.publishDate).toLocaleDateString('uz-UZ')}</span>
                      </div>
                    )}

                    {meta.author && (
                      <div className="flex items-center">
                        <span className="mr-1">✍️</span>
                        <span>{meta.author}</span>
                      </div>
                    )}

                    {meta.category && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {meta.category}
                      </span>
                    )}

                    {meta.priority && (
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(meta.priority)}`}>
                        {meta.priority === 'high' ? 'Muhim' :
                          meta.priority === 'medium' ? 'O&apos;rta' : 'Oddiy'}
                      </span>
                    )}

                    {meta.views && (
                      <div className="flex items-center">
                        <span className="mr-1">👁️</span>
                        <span>{meta.views.toLocaleString()} korishlar</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  {/* Social share */}
                  {showSocialShare && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 mr-2">Ulashish:</span>

                      {socialShare.facebook && (
                        <button
                          onClick={() => handleShare('facebook')}
                          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          title="Facebook'da ulashish"
                        >
                          📘
                        </button>
                      )}

                      {socialShare.telegram && (
                        <button
                          onClick={() => handleShare('telegram')}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          title="Telegram'da ulashish"
                        >
                          ✈️
                        </button>
                      )}

                      {socialShare.linkedin && (
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="p-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
                          title="LinkedIn'da ulashish"
                        >
                          💼
                        </button>
                      )}

                      {socialShare.copy && (
                        <button
                          onClick={() => handleShare('copy')}
                          className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                          title="Link nusxalash"
                        >
                          📋
                        </button>
                      )}
                    </div>
                  )}

                  {/* Print button */}
                  {showPrintButton && (
                    <button
                      onClick={handlePrint}
                      className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      <span className="mr-2">🖨️</span>
                      Chop etish
                    </button>
                  )}
                </div>
              </div>

              {/* Main content */}
              <div className="prose prose-lg max-w-none text-black">
                {contentBlocks ? (
                  <ContentBuilder blocks={contentBlocks} />
                ) : content ? (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  <p className="text-gray-500">Content mavjud emas</p>
                )}
              </div>

              {/* Gallery */}
              {gallery && gallery.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-black mb-4">Galereya</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gallery.map((image, index) => (
                      <div key={index} className="overflow-hidden rounded-lg aspect-square">
                        <OptimizedImage
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          lazy={true}
                          width={400}
                          height={400}
                        />
                        {image.caption && (
                          <p className="text-sm text-gray-600 mt-2">{image.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {meta?.tags && meta.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-black mb-3">Teglar</h4>
                  <div className="flex flex-wrap gap-2">
                    {meta.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Last updated */}
              {meta?.lastUpdated && (
                <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
                  Oxirgi yangilanish: {new Date(meta.lastUpdated).toLocaleDateString('uz-UZ')}
                </div>
              )}
            </div>
          </motion.div>

          {/* Related items */}
          {showRelated && relatedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-8 mt-8"
            >
              <h3 className="text-2xl font-bold text-black mb-6">O&apos;xshash materiallar</h3>
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
                    className="flex space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {item.image && (
                      <div className="flex-shrink-0">
                        <OptimizedImage
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                          lazy={true}
                          width={64}
                          height={64}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-black mb-1 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                      {item.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(item.date).toLocaleDateString('uz-UZ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        {showSidebar &&
          (<aside className="w-full lg:w-1/4">
            {sidebarContent || (<div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-black mb-4">
                Qo&apos;shimcha ma&apos;lumotlar
              </h3>
              <div className="space-y-4">
                {meta?.category && <div>
                  <h4 className="font-medium text-black mb-2">Kategoriya</h4>
                  <p className="text-gray-600">{meta.category}</p>
                </div>}
                {meta?.status && <div>
                  <h4 className="font-medium text-black mb-2">Holat</h4>
                  <span className={`inline-block px-2 py-1 rounded text-sm ${meta.status === 'active' ? 'bg-green-100 text-green-800' : meta.status === 'archived' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {meta.status === 'active' ? 'Faol' : meta.status === 'archived' ? 'Arxivlangan' : 'Loyiha'}
                  </span>
                </div>}
              </div>
            </div>)}
          </aside>)}
      </div>
    </div>
  );
};

export default DetailTemplate;
