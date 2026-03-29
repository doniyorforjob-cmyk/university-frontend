import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ContentBuilder, { ContentBlock } from '@/components/shared/ContentBuilder';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useGlobalLayout } from './GlobalLayout';
import { OptimizedImage, ImageCarousel, ImageViewer, SocialShare } from '../shared';
import { formatStandardDate } from '@/config/constants';
import {
  Printer,
  Tag,
  Clock,
  Building,
  Image,
  Maximize2
} from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';

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
  updatedAt?: string;
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
  title: string;
  contentType: ContentType;
  content?: string;
  contentBlocks?: ContentBlock[];
  meta?: DetailMeta;
  heroImage?: string;
  heroImageAlt?: string;
  gallery?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  breadcrumbs?: BreadcrumbItem[];
  relatedItems?: RelatedItem[];
  showRelated?: boolean;
  showMeta?: boolean;
  showSocialShare?: boolean;
  showPrintButton?: boolean;
  showComments?: boolean;
  socialShare?: SocialShareConfig;
  showSidebar?: boolean;
  sidebarContent?: React.ReactNode;
  galleryLayout?: 'carousel' | 'grid';
  onShare?: (platform: string) => void;
  onPrint?: () => void;
  onRelatedClick?: (item: RelatedItem) => void;
  className?: string;
  children?: React.ReactNode;
}

const DetailTemplate: React.FC<DetailTemplateProps> = ({
  title,
  content,
  contentBlocks,
  meta,
  heroImage,
  heroImageAlt,
  gallery,
  galleryLayout = 'carousel',
  breadcrumbs,
  relatedItems = [],
  showRelated = true,
  showMeta = true,
  showSocialShare = true,
  showPrintButton = true,
  showSidebar = false,
  sidebarContent,
  socialShare = { facebook: true, telegram: true, instagram: true },
  onPrint,
  onRelatedClick,
  className = '',
  children
}) => {
  const { t } = useTranslation('common');
  const { locale } = useLocale();

  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = React.useState(0);
  const thumbsScrollRef = React.useRef<HTMLDivElement>(null);

  const scrollThumbs = (dir: 'left' | 'right') => {
    thumbsScrollRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

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

  const handlePrint = () => {
    window.print();
    onPrint?.();
  };

  const formatDate = (dateString: string, currentLocale?: string) => {
    return formatStandardDate(dateString, currentLocale || locale);
  };

  const {
    sidebarContent: globalSidebarContent,
    sidebarExtraContent
  } = useGlobalLayout();

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="no-print">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className={showSidebar ? "w-full lg:w-[78%]" : "w-full"}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="printable-content bg-white rounded-2xl shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] overflow-hidden px-6 py-4 md:px-8 md:py-4 border border-gray-100 h-full"
          >
            <div className="mb-2">
              <h1 className="text-[1.35rem] md:text-[1.55rem] font-[900] leading-[1.2] font-sans text-black tracking-tighter max-w-3xl mb-3">
                {title}
              </h1>

              <div className="border-b border-dashed border-gray-300 mt-1 mb-3"></div>

              {showMeta && meta && (meta.updatedAt || meta.publishDate || ((heroImage ? 1 : 0) + (gallery?.length || 0)) > 0) && (
                <div className="flex items-center justify-between mb-3">
                  {(meta.updatedAt || meta.publishDate) && (
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 text-[#334155] rounded-xl px-3 py-1.5 text-sm transition-colors hover:bg-gray-100 cursor-default shadow-sm shadow-black/5">
                        <Clock size={16} className="text-[#334155]" strokeWidth={2.5} />
                        <span className="font-semibold tracking-tight">
                          {formatDate(meta.updatedAt || meta.publishDate || '', locale)}
                        </span>
                      </div>
                    </div>
                  )}

                  {(() => {
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

            {carouselImages.length > 0 && (
              galleryLayout === 'grid' ? (
                <>
                  <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {carouselImages.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => openLightbox(idx)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            openLightbox(idx);
                          }
                        }}
                        role="button"
                        tabIndex={0}
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
                <div className="mb-3 w-full overflow-hidden">
                  <ImageCarousel images={carouselImages} activeIndex={selectedGalleryIdx} />
                </div>
              )
            )}

            <div className={`prose prose-lg max-w-none prose-headings:font-sans prose-headings:text-[#003B5C] prose-a:text-blue-600 prose-img:rounded-xl mt-0`}>
              {contentBlocks ? (
                <ContentBuilder blocks={contentBlocks} />
              ) : content ? (
                <div className="rich-text-forced" dangerouslySetInnerHTML={{ __html: content }} />
              ) : (gallery && gallery.length > 0) || heroImage || children ? null : (
                <p className="text-black italic">{t('no_info', "Ma'lumot mavjud emas")}</p>
              )}
            </div>

            {/* ── Gallery thumbnail strip below content ── */}
            {carouselImages.length > 1 && galleryLayout !== 'grid' && (
              <div className="mt-4 flex items-center gap-2 no-print">
                {/* Prev */}
                <button
                  onClick={() => scrollThumbs('left')}
                  aria-label="Scroll thumbnails left"
                  className="flex-shrink-0 p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all duration-200 text-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Thumbnails */}
                <div
                  ref={thumbsScrollRef}
                  className="flex gap-2 overflow-x-auto flex-1 py-[3px]"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {carouselImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedGalleryIdx(idx);
                        openLightbox(idx);
                      }}
                      aria-label={`View image ${idx + 1}`}
                      className="flex-shrink-0 w-[140px] h-[110px] border-[3px] border-transparent hover:border-gray-300 transition-all duration-200 focus:outline-none group/thumb"
                    >
                      <div className="w-full h-full overflow-hidden relative">
                        <OptimizedImage
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                          width={140}
                          height={110}
                          lazy={idx !== 0}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                          <Maximize2 className="text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 w-5 h-5 drop-shadow" strokeWidth={2.5} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Next */}
                <button
                  onClick={() => scrollThumbs('right')}
                  aria-label="Scroll thumbnails right"
                  className="flex-shrink-0 p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all duration-200 text-gray-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* ImageViewer lightbox for carousel layout */}
            {galleryLayout !== 'grid' && (
              <ImageViewer
                isOpen={isLightboxOpen}
                onClose={closeLightbox}
                images={carouselImages}
                currentIndex={lightboxIndex}
                onNext={nextImage}
                onPrev={prevImage}
              />
            )}

            {children}

            {meta?.department && (() => {
              const suffix = t('common:department_suffix', 'kafedrasi');
              const deptName = meta.department;
              // Don't append suffix if it's already in the name
              const alreadyHasSuffix = deptName.toLowerCase().endsWith(suffix.toLowerCase()) ||
                deptName.toLowerCase().includes('kafedrasi') ||
                deptName.toLowerCase().includes('кафедра') ||
                deptName.toLowerCase().includes('department');
              return (
                <div className="mt-6 flex justify-end items-center gap-2 text-main-dark font-semibold">
                  <Building size={20} className="text-[#334155]" />
                  <span className="text-lg italic">
                    «{deptName}»{!alreadyHasSuffix ? ` ${suffix}` : ''}
                  </span>
                </div>
              );
            })()}

            {meta?.tags && meta.tags.length > 0 && (
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
            )}

            <div className="my-8 border-t border-dashed border-gray-200"></div>

            <div className="flex flex-wrap items-center justify-between gap-4 no-print">
              {showSocialShare && (
                <SocialShare
                  title={title}
                  options={socialShare}
                />
              )}

              {showPrintButton && (
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <Printer size={18} strokeWidth={2.5} />
                  <span className="text-sm font-bold">{t('print', 'Chop etish')}</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {showSidebar && (
          <aside className="w-full lg:w-[22%] space-y-6 no-print">
            {sidebarContent || (
              <>
                {globalSidebarContent}
                {sidebarExtraContent}
              </>
            )}
          </aside>
        )}
      </div>

      {showRelated && relatedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 no-print"
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
                    {item.date && new Date(item.date).toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US')}
                  </div>
                  <h4 className="font-medium text-main line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div >
  );
};

export default DetailTemplate;
