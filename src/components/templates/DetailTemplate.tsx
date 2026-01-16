import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ContentBuilder, { ContentBlock } from '@/components/shared/ContentBuilder';
import { useTranslation } from 'react-i18next';
import { OptimizedImage, ImageCarousel, ImageViewer } from '../shared';
import { DATE_FORMATS } from '@/config/constants';
import {
  Calendar,
  Eye,
  Printer,
  FileText,
  User,
  Tag,
  Clock,
  Megaphone,
  Wrench,
  Info,
  Building,
  ShieldAlert,
  Image,
  Maximize2
} from 'lucide-react';
import SocialShare from '../shared/SocialShare';

// BreadcrumbItem interfeysi
interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Content turlari
export type ContentType = 'news' | 'announcement' | 'service' | 'info' | 'person' | 'corruption';

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
  department?: string;
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
  instagram?: boolean;
  linkedin?: boolean;
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
  galleryLayout?: 'carousel' | 'grid'; // New prop
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
  galleryLayout = 'carousel', // Default to carousel
  breadcrumbs,
  relatedItems = [],
  showRelated = true,
  showMeta = true,
  showSocialShare = true,
  showPrintButton = true,
  showComments = false,
  socialShare = { facebook: true, telegram: true, instagram: true },
  showSidebar = true,
  sidebarContent,
  onShare,
  onPrint,
  onRelatedClick,
  className = ''
}) => {
  const { t } = useTranslation('common');

  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  // Combine hero image and gallery into a single array (Memoized)
  const carouselImages = React.useMemo(() => {
    const images: Array<{ src: string; alt: string; }> = [];
    if (heroImage) {
      images.push({
        src: heroImage,
        alt: heroImageAlt || title,
      });
    }
    if (gallery && gallery.length > 0) {
      gallery.forEach(img => {
        if (img.src !== heroImage) {
          images.push(img);
        }
      });
    }
    return images;
  }, [heroImage, heroImageAlt, title, gallery]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    if (carouselImages.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    if (carouselImages.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // ... (existing helper functions)

  const handlePrint = () => {
    window.print();
    onPrint?.();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return DATE_FORMATS.short
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', year.toString());
  };

  // Content type bo'yicha icon va label olish
  const getTypeInfo = () => {
    switch (contentType) {
      case 'news':
        return { icon: <FileText size={18} />, label: t('content_types.news', 'Yangilik') };
      case 'announcement':
        return { icon: <Megaphone size={18} />, label: t('content_types.announcement', "E'lon") };
      case 'service':
        return { icon: <Wrench size={18} />, label: t('content_types.service', 'Xizmat') };
      case 'person':
        return { icon: <User size={18} />, label: t('content_types.person', 'Shaxs') };
      case 'corruption':
        return { icon: <ShieldAlert size={18} className="text-red-500" />, label: t('content_types.corruption', 'Korrupsiya') };
      default:
        return { icon: <Info size={18} />, label: t('content_types.info', "Ma'lumot") };
    }
  };

  const typeInfo = getTypeInfo();

  // ...

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
          <h1 className="text-[27px] md:text-[27px] font-[800] leading-[37px] font-sans text-main mb-4 tracking-tight">
            {title}
          </h1>
          <div className="border-b border-dashed border-gray-300 mb-6"></div>

          {/* Meta Badges */}
          {showMeta && meta && (
            <div className="flex w-full items-center justify-between mb-6">
              {meta.publishDate && (
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-black rounded-xl px-3 py-1.5 text-sm transition-colors hover:bg-gray-100 cursor-default">
                  <Calendar size={16} className="text-black" strokeWidth={2.5} />
                  <span className="font-medium">{formatDate(meta.publishDate)}</span>
                </div>
              )}

              {(() => {
                // Calculate total image count: hero image + gallery images
                const totalImages = (heroImage ? 1 : 0) + (gallery?.length || 0);
                return totalImages > 0 ? (
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-black rounded-xl px-3 py-1.5 text-sm transition-colors hover:bg-gray-100 cursor-default">
                    <Image size={16} className="text-black" strokeWidth={2.5} />
                    <span className="font-medium">{totalImages}</span>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>

        {/* Media Section: Carousel or Grid */}
        {/* Media Section: Carousel or Grid */}
        {carouselImages.length > 0 && (
          galleryLayout === 'grid' ? (
            <>
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {carouselImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => openLightbox(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View full screen image ${idx + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        openLightbox(idx);
                      }
                    }}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-gray-100 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <OptimizedImage
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Maximize2 className="text-white w-6 h-6" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ImageViewer
                isOpen={isLightboxOpen}
                onClose={closeLightbox}
                images={carouselImages}
                currentIndex={lightboxIndex}
                onNext={nextImage}
                onPrev={prevImage}
              />
            </>
          ) : (
            <div className="mb-8 max-h-[400px] overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
              <ImageCarousel images={carouselImages} />
            </div>
          )
        )}


        {/* Main content */}
        <div className="prose prose-lg max-w-none font-serif text-[20px] leading-[30px] text-black prose-p:text-black prose-li:text-black prose-li:marker:text-black prose-headings:font-sans prose-headings:text-[#003B5C] prose-a:text-blue-600 prose-img:rounded-xl prose-strong:text-black prose-table:border prose-table:border-collapse prose-th:border prose-td:border prose-th:p-2 prose-td:p-2 leading-relaxed">
          {contentBlocks ? (
            <ContentBuilder blocks={contentBlocks} />
          ) : content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (gallery && gallery.length > 0) || heroImage ? null : (
            <p className="text-black italic">{t('no_info', "Ma'lumot mavjud emas")}</p>
          )}
        </div>

        {meta?.department && (
          <div className="mt-6 flex justify-end items-center gap-2 text-main-dark font-semibold">
            <Building size={20} className="text-[#334155]" />
            <span className="text-lg italic">
              «{meta.department}» {t('department_suffix', 'kafedrasi')}
            </span>
          </div>
        )}



        {/* Tags */}
        {
          meta?.tags && meta.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-black font-semibold text-sm flex items-center gap-1 mr-2">
                  <Tag size={16} /> {t('tags', 'Teglar')}:
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
          )
        }

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
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-black rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Printer size={18} />
              <span className="text-sm font-medium">{t('print', 'Chop etish')}</span>
            </button>
          )}
        </div>

      </motion.div >

      {/* Related items */}
      {
        showRelated && relatedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
              <h3 className="text-2xl font-medium text-main">{t('related_materials', "O'xshash materiallar")}</h3>
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
                    <div className="flex items-center gap-2 text-xs text-black font-medium mb-2">
                      <Clock size={12} />
                      {item.date && new Date(item.date).toLocaleDateString('uz-UZ')}
                    </div>
                    <h4 className="font-medium text-main line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )
      }
    </div >
  );
};

export default DetailTemplate;
