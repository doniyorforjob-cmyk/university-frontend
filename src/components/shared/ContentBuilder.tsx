import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { VirtualScrollProvider } from '@/components/providers/VirtualScrollProvider';
import { VirtualListItem } from './VirtualListItem';

// Content turlari
export interface ContentBlock {
  id: string;
  type:
    // Matn turlari
    | 'text' | 'heading' | 'paragraph' | 'rich-text' | 'quote' | 'list' | 'citation'
    // Media turlari
    | 'image' | 'gallery' | 'carousel' | 'video' | 'audio'
    // Layout bloklari
    | 'section' | 'columns' | 'grid' | 'masonry' | 'flex' | 'divider' | 'spacer'
    // Interaktiv elementlar
    | 'button' | 'link' | 'form' | 'contact-form' | 'accordion' | 'tabs' | 'modal' | 'dropdown'
    // Ma'lumotli komponentlar
    | 'card' | 'stats' | 'testimonials' | 'team-member' | 'faq' | 'timeline' | 'timeline-vertical' | 'feature' | 'pricing'
    // Integratsiya elementlari
    | 'map' | 'social-embed' | 'iframe' | 'embed'
    // Texnik bloklar
    | 'dynamic-data' | 'reusable-component' | 'seo-meta' | 'code-block'
    // Activities sahifasi uchun maxsus bloklar
    | 'activities-hero' | 'activities-stats-grid' | 'activities-categories' | 'activities-timeline' | 'activities-future-plans'
    // Performance optimizatsiyasi
    | 'virtual-list'
    // Eski turlar (backward compatibility)
    | 'highlight' | 'table' | 'cards';
  data: any;
  className?: string;
}

interface ContentBuilderProps {
  blocks: ContentBlock[];
}

// Organizational Structure Tree Component
interface OrganizationalStructureTreeProps {
  structure: {
    rector: any;
    prorektors: any[];
    dekans: any[];
    kafedras: any[];
    departments: any[];
  };
}

const OrganizationalStructureTree: React.FC<OrganizationalStructureTreeProps> = ({ structure }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 via-yellow-500 to-purple-500"></div>

        {/* Timeline Items */}
        <div className="space-y-16">
          {/* Rektorat - Level 1 */}
          <div className="relative flex items-center space-x-8">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <a href="#" className="block bg-gradient-to-r from-white to-blue-50 rounded-none p-6 border-2 border-blue-200 flex-1 hover:bg-blue-100 transition-all duration-300 max-w-md" aria-label="Rektor haqida batafsil"> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={structure.rector.imageUrl}
                    alt={structure.rector.name}
                    className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{structure.rector.position}</h3>
                  <p className="text-gray-700 font-medium text-base mb-2">{structure.rector.name}</p>
                </div>
              </div>
            </a>
          </div>

          {/* Prorektorlar - Level 2 */}
          <div className="relative flex items-center space-x-8">
            <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Prorektorlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {structure.prorektors.map((prorector, index) => (
                  <a key={index} href="#" className="block bg-gradient-to-br from-white to-green-50 rounded-none p-5 border-2 border-green-200 hover:bg-green-100 hover:scale-105 transition-all duration-300" aria-label="Prorektor haqida batafsil"> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <img
                          src={prorector.imageUrl}
                          alt={prorector.name}
                          className="w-20 h-20 rounded-full border-4 border-green-500 object-cover shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="font-semibold text-green-800 text-base mb-1">{prorector.position}</div>
                      <div className="text-gray-700 font-medium text-sm mb-2">{prorector.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Dekanlar - Level 3 */}
          <div className="relative flex items-center space-x-8">
            <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Fakultetlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {structure.dekans.map((dekan, index) => (
                  <a key={index} href="#" className="block bg-gradient-to-br from-white to-yellow-50 rounded-none p-5 border-2 border-yellow-200 hover:bg-yellow-100 hover:scale-105 transition-all duration-300" aria-label="Dekan haqida batafsil"> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                    <div className="text-center">
                      <div className="relative inline-block mb-3">
                        <img
                          src={dekan.imageUrl}
                          alt={dekan.name}
                          className="w-14 h-14 rounded-full border-3 border-yellow-500 object-cover shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="font-bold text-yellow-800 text-sm mb-2 leading-tight">{dekan.faculty}</div>
                      <div className="text-gray-600 font-medium text-sm mb-3">{dekan.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Kafedralar - Level 4 */}
          <div className="relative flex items-center space-x-8">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Kafedralar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {structure.kafedras.map((kafedra, index) => (
                  <a key={index} href="#" className="block bg-gradient-to-br from-white to-gray-50 rounded-none p-4 border-2 border-gray-300 hover:bg-gray-100 hover:scale-105 transition-all duration-300" aria-label="Kafedra haqida batafsil"> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                    <div className="text-center">
                      <div className="font-bold text-gray-800 text-sm mb-2">{kafedra.faculty}</div>
                      <div className="text-xs text-gray-500 font-semibold">{kafedra.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Yordamchi bo'limlar - Level 5 */}
          <div className="relative flex items-center space-x-8">
            <div className="flex-shrink-0 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Yordamchi bo'limlar va markazlar</h3> {/* eslint-disable-line react/no-unescaped-entities */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {structure.departments.map((department, index) => (
                  <a key={index} href="#" className="block bg-gradient-to-br from-white to-purple-50 rounded-none p-4 border-2 border-purple-300 hover:bg-purple-100 hover:scale-105 transition-all duration-300" aria-label="Bo'lim haqida batafsil"> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                    <div className="text-center">
                      <div className="font-bold text-gray-800 text-sm mb-2">{department.faculty}</div>
                      <div className="text-xs text-gray-500 font-semibold">{department.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tabs komponenti
const TabsBlock: React.FC<{ block: ContentBlock; index: number }> = React.memo(({ block, index }) => {
  const [activeTab, setActiveTab] = useState(0);

  const baseAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: index * 0.1 }
  };

  return (
    <motion.div {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
      <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
      
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {block.data.tabs.map((tab: any, tabIndex: number) => (
          <button
            key={tabIndex}
            onClick={() => setActiveTab(tabIndex)}
            className={`px-6 py-3 font-medium transition-colors duration-200 border-b-2 ${
              activeTab === tabIndex
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {block.data.tabs[activeTab] && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="prose prose-lg max-w-none text-black">
              {block.data.tabs[activeTab].content}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

// Accordion komponenti
const AccordionBlock: React.FC<{ block: ContentBlock; index: number }> = React.memo(({ block, index }) => {
  AccordionBlock.displayName = 'AccordionBlock';
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (itemIndex: number) => {
    setOpenItem(openItem === itemIndex ? null : itemIndex);
  };

  const baseAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: index * 0.1 }
  };

  return (
    <motion.div {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
      <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
      <div className="space-y-3">
        {block.data.items.map((item: any, itemIndex: number) => (
          <div key={itemIndex} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(itemIndex)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
            >
              <span className="font-semibold text-black">{item.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openItem === itemIndex ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openItem === itemIndex && (
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-black">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
});

AccordionBlock.displayName = 'AccordionBlock';

TabsBlock.displayName = 'TabsBlock';

const ContentBuilderComponent: React.FC<ContentBuilderProps> & { displayName?: string } = ({ blocks }) => {
  const renderBlock = useCallback((block: ContentBlock, index: number) => {
    const baseAnimation = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.1 }
    };

    switch (block.type) { // eslint-disable-line
      case 'text':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <p className="text-black">{block.data.content}</p>
          </motion.div>
        );

      case 'highlight':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 ${block.className || ''}`}>
            <h3 className="text-2xl font-bold text-blue-800 mb-4">{block.data.title}</h3>
            <p className="text-blue-700">{block.data.content}</p>
          </motion.div>
        );

      case 'grid':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-6 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <div className={`grid gap-6 ${block.data.columns === 2 ? 'grid-cols-1 md:grid-cols-2' : block.data.columns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
              {block.data.items.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className={`bg-white border border-gray-200 ${block.className === 'no-rounded' ? 'rounded-none' : 'rounded-lg'} p-6 hover:shadow-lg transition-shadow duration-200`}>
                  <h4 className="text-lg font-bold text-black mb-3">{item.title}</h4>
                  <p className="text-black mb-4">{item.description}</p>
                  {item.details && (
                    <div className="space-y-2 text-sm">
                      {Object.entries(item.details).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex justify-between">
                          <span className="font-semibold text-black">{key}:</span>
                          <span className="text-black">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'list':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <ul className="list-disc list-inside space-y-2">
              {block.data.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="text-black">{item}</li>
              ))}
            </ul>
          </motion.div>
        );

      case 'image':
        // Check if block.className contains border-radius classes to apply to img
        const hasBorderRadiusClass = block.className && (block.className.includes('rounded-') || block.className.includes('rounded'));
        const imgClassName = hasBorderRadiusClass
          ? `w-full h-auto object-cover ${block.className}`
          : "w-full h-auto object-cover rounded-lg";
        const containerClassName = hasBorderRadiusClass
          ? 'space-y-4'
          : `space-y-4 ${block.className || ''}`;

        return (
          <motion.div key={block.id} {...baseAnimation} className={containerClassName}>
            {block.data.title && <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>}
            <img
              src={block.data.src}
              alt={block.data.alt || block.data.title}
              className={imgClassName}
              loading="lazy"
            />
            {block.data.caption && <p className="text-sm text-gray-600 italic">{block.data.caption}</p>}
          </motion.div>
        );

      case 'stats':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-6 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black text-center">{block.data.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {block.data.stats.map((stat: any, statIndex: number) => (
                <div key={statIndex} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-black">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'timeline':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-6 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <div className="space-y-6">
              {block.data.events.map((event: any, eventIndex: number) => (
                <div key={eventIndex} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="font-semibold text-black">{event.year}</div>
                    <div className="text-black">{event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'cards':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-6 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {block.data.cards.map((card: any, cardIndex: number) => (
                <div key={cardIndex} className="bg-gradient-to-br from-gray-600 to-gray-800 text-white p-6 hover:from-gray-700 hover:to-gray-900 transition-all duration-300">
                  {card.icon && <div className="mb-4">{card.icon}</div>}
                  <h4 className="text-lg font-bold mb-2">{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'quote':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`bg-gray-100 p-6 rounded-lg border-l-4 border-gray-400 ${block.className || ''}`}>
            <blockquote className="text-lg italic text-black mb-4">&ldquo;{block.data.quote}&rdquo;</blockquote>
            <cite className="text-black font-semibold">— {block.data.author}</cite>
          </motion.div>
        );

      case 'table':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {block.data.headers.map((header: string, headerIndex: number) => (
                      <th key={headerIndex} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {block.data.rows.map((row: any[], rowIndex: number) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      case 'accordion':
        return (
          <AccordionBlock key={block.id} block={block} index={index} />
        );

      // 📝 MATN TURLARI
      case 'heading':
        const HeadingTag = `h${block.data.level || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        return (
          <motion.div key={block.id} {...baseAnimation} className={`${block.className || ''}`}>
            <HeadingTag className={`font-bold text-black ${
              block.data.level === 1 ? 'text-4xl' :
              block.data.level === 2 ? 'text-3xl' :
              block.data.level === 3 ? 'text-2xl' :
              block.data.level === 4 ? 'text-xl' :
              block.data.level === 5 ? 'text-lg' : 'text-base'
            }`}>
              {block.data.content}
            </HeadingTag>
          </motion.div>
        );

      case 'paragraph':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`${block.className || ''}`}>
            <p className="text-black leading-relaxed">{block.data.content}</p>
          </motion.div>
        );

      case 'rich-text':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`prose prose-lg max-w-none text-black ${block.className || ''}`}>
            <div dangerouslySetInnerHTML={{ __html: block.data.content }} />
          </motion.div>
        );

      case 'citation':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`border-l-4 border-gray-300 pl-6 italic ${block.className || ''}`}>
            <p className="text-gray-700 mb-2">{block.data.content}</p>
            <cite className="text-sm text-gray-500">— {block.data.author}</cite>
          </motion.div>
        );

      // 🖼️ MEDIA TURLARI
      case 'gallery':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {block.data.images.map((img: any, imgIndex: number) => (
                <div key={imgIndex} className="overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt || `Gallery image ${imgIndex + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {img.caption && <p className="text-sm text-gray-600 mt-2">{img.caption}</p>}
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'video':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
            {block.data.title && <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>}
            <div className="aspect-video">
              {block.data.type === 'youtube' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${block.data.videoId}`}
                  className="w-full h-full"
                  allowFullScreen
                  title={block.data.title}
                />
              ) : (
                <video
                  src={block.data.src}
                  controls
                  className="w-full h-full"
                  poster={block.data.poster}
                >
                  <track kind="captions" srcLang="uz" label="O'zbek" />
                  Video yuklanmadi
                </video>
              )}
            </div>
            {block.data.description && <p className="text-gray-600">{block.data.description}</p>}
          </motion.div>
        );

      case 'audio':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
            {block.data.title && <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>}
            <audio controls className="w-full">
              <source src={block.data.src} type="audio/mpeg" />
              <track kind="captions" srcLang="uz" label="O'zbek" />
              Audio yuklanmadi
            </audio>
            {block.data.description && <p className="text-gray-600">{block.data.description}</p>}
          </motion.div>
        );

      // 🧩 LAYOUT BLOKLARI
      case 'section':
        return (
          <motion.section key={block.id} {...baseAnimation} className={`py-8 ${block.data.background || ''} ${block.className || ''}`}>
            {block.data.title && <h2 className="text-2xl font-bold text-black mb-6">{block.data.title}</h2>}
            <div className="space-y-6">
              {block.data.content && <p className="text-black">{block.data.content}</p>}
              {block.data.children && (
                <div className="space-y-4">
                  {block.data.children.map((child: any, childIndex: number) => (
                    <div key={childIndex}>{child}</div>
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        );

      case 'columns':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`${block.className || ''}`}>
            {block.data.title && <h3 className="text-xl font-semibold text-black mb-6">{block.data.title}</h3>}
            <div className={`grid gap-6 ${
              block.data.columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
              block.data.columns === 3 ? 'grid-cols-1 md:grid-cols-3' :
              block.data.columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
              'grid-cols-1'
            }`}>
              {block.data.items.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="space-y-4">
                  {item.title && <h4 className="text-lg font-semibold text-black">{item.title}</h4>}
                  {item.content && <p className="text-black">{item.content}</p>}
                  {item.image && <img src={item.image} alt={item.title} className="w-full h-auto" />}
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'divider':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`${block.className || ''}`}>
            <hr className={`border-t ${block.data.style === 'dashed' ? 'border-dashed' : 'border-solid'} ${block.data.color || 'border-gray-300'}`} />
          </motion.div>
        );

      case 'spacer':
        return (
          <div key={block.id} className={`${block.data.size === 'small' ? 'h-4' : block.data.size === 'large' ? 'h-16' : 'h-8'} ${block.className || ''}`} />
        );

      case 'masonry':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-6 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {block.data.items.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="break-inside-avoid bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                  <h4 className="text-lg font-bold text-black mb-3">{item.title}</h4>
                  <p className="text-black mb-4">{item.description}</p>
                  {item.image && <img src={item.image} alt={item.title} className="w-full h-auto rounded" />}
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'timeline-vertical':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-6 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500"></div>
              <div className="space-y-8">
                {block.data.events.map((event: any, eventIndex: number) => (
                  <div key={eventIndex} className="relative flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{eventIndex + 1}</span>
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="text-blue-600 font-bold text-lg mb-2">{event.date}</div>
                        <h4 className="text-lg font-semibold text-black mb-2">{event.title}</h4>
                        <p className="text-gray-700">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'pricing':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-6 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black text-center">{block.data.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {block.data.plans.map((plan: any, planIndex: number) => (
                <div key={planIndex} className={`bg-white border border-gray-200 rounded-lg p-6 ${plan.featured ? 'ring-2 ring-blue-500' : ''}`}>
                  {plan.featured && <div className="text-center mb-4"><span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Mashhur</span></div>}
                  <h4 className="text-xl font-bold text-black text-center mb-2">{plan.name}</h4>
                  <div className="text-3xl font-bold text-blue-600 text-center mb-4">{plan.price}</div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-black">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2 px-4 rounded ${plan.featured ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-black hover:bg-gray-300'}`}>
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        );

      // 🔗 INTERAKTIV ELEMENTLAR
      case 'button':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`${block.className || ''}`}>
            <button
              onClick={() => block.data.onClick && block.data.onClick()}
              className={`px-6 py-3 font-semibold transition-colors duration-200 ${
                block.data.variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                block.data.variant === 'secondary' ? 'bg-gray-600 text-white hover:bg-gray-700' :
                'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              {block.data.text}
            </button>
          </motion.div>
        );

      case 'tabs':
        return <TabsBlock key={block.id} block={block} index={index} />;

      // 👥 MA'LUMOTLI KOMPONENTLAR
      case 'testimonials':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-6 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {block.data.testimonials.map((testimonial: any, testIndex: number) => (
                <div key={testIndex} className="bg-white p-6 border border-gray-200 shadow-sm">
                  <p className="text-black mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center space-x-3">
                    {testimonial.avatar && (
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 object-cover" />
                    )}
                    <div>
                      <p className="font-semibold text-black">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'team-member':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-6 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {block.data.members.map((member: any, memberIndex: number) => (
                <div key={memberIndex} className="text-center bg-white p-6 border border-gray-200">
                  {member.photo && (
                    <img src={member.photo} alt={member.name} className="w-24 h-24 object-cover mx-auto mb-4" />
                  )}
                  <h4 className="text-lg font-bold text-black mb-2">{member.name}</h4>
                  <p className="text-blue-600 mb-3">{member.position}</p>
                  <p className="text-black text-sm">{member.bio}</p>
                  {member.contact && (
                    <div className="mt-4 space-y-1 text-sm text-gray-600">
                      {member.contact.email && <p>📧 {member.contact.email}</p>}
                      {member.contact.phone && <p>📞 {member.contact.phone}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'faq':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <AccordionBlock block={{...block, type: 'accordion'}} index={index} />
          </motion.div>
        );

      // 🌍 INTEGRATSIYA ELEMENTLARI
      case 'map':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
            {block.data.title && <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>}
            <div className="aspect-video">
              <iframe
                src={block.data.embedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title={block.data.title || 'Map'}
              />
            </div>
            {block.data.address && <p className="text-gray-600">{block.data.address}</p>}
          </motion.div>
        );

      case 'iframe':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
            {block.data.title && <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>}
            <div className={`${block.data.aspectRatio || 'aspect-video'}`}>
              <iframe
                src={block.data.src}
                className="w-full h-full border-0"
                title={block.data.title}
                {...(block.data.attributes || {})}
              />
            </div>
          </motion.div>
        );

      case 'feature':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`flex items-start space-x-4 p-4 border-b border-gray-200 last:border-b-0 ${block.className || ''}`}>
            {block.data.icon && (
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <img src={`/assets/icons/${block.data.icon}`} alt="" className="w-6 h-6" />
              </div>
            )}
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-black mb-1">{block.data.title}</h4>
              <p className="text-gray-700">{block.data.description}</p>
              {block.data.items && (
                <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                  {block.data.items.map((item: string, i: number) => <li key={i}>{item}</li>)}
                </ul>
              )}
            </div>
          </motion.div>
        );

      case 'dynamic-data':
        // Dynamic component rendering
        const ComponentName = block.data.component;
        if (ComponentName === 'OrganizationalStructureTree') {
          return (
            <motion.div key={block.id} {...baseAnimation} className={block.className || ''}>
              <OrganizationalStructureTree {...block.data.props} />
            </motion.div>
          );
        }
        return null;

      // Activities sahifasi uchun maxsus bloklar
      case 'activities-hero':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`relative overflow-hidden ${block.className || ''}`} style={{ backgroundColor: '#BEA587' }}>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  {block.data.title}
                </h1>
                <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
                  {block.data.subtitle}
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 1440 120" className="w-full h-12 fill-current text-white" aria-hidden="true">
                <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
              </svg>
            </div>
          </motion.div>
        );

      case 'activities-stats-grid':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`py-8 ${block.className || ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-left mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center mb-4">
                  <span className="w-3 h-3 rounded-full mr-4" style={{ backgroundColor: '#BEA587' }}></span>
                  {block.data.title}
                </h2>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
                {block.data.stats.map((stat: any, index: number) => {
                  const icons = ['📊', '✅', '🔄', '🤝'];
                  const colors = ['text-blue-600', 'text-green-600', 'text-yellow-600', 'text-purple-600'];
                  return (
                    <div key={index} className="text-center">
                      <div className="text-6xl mb-4">{icons[index] || '📊'}</div>
                      <div className={`text-4xl font-bold mb-2 ${colors[index] || 'text-blue-600'}`}>{stat.value}</div>
                      <div className="text-lg text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );

      case 'activities-categories':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`py-8 ${block.className || ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center">
                  <span className="w-3 h-3 rounded-full mr-4" style={{ backgroundColor: '#BEA587' }}></span>
                  {block.data.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {block.data.categories.map((category: any, index: number) => {
                  const bgColors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-red-100', 'bg-indigo-100'];
                  return (
                    <div key={index} className="bg-white p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="flex items-center mb-6">
                        <div className={`flex-shrink-0 w-12 h-12 ${bgColors[index % bgColors.length]} rounded-lg flex items-center justify-center`}>
                          <span className="text-2xl">{category.icon}</span>
                        </div>
                        <h3 className="ml-4 text-xl font-semibold text-gray-900">{category.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );

      case 'activities-timeline':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`py-8 ${block.className || ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center">
                  <span className="w-3 h-3 rounded-full mr-4" style={{ backgroundColor: '#BEA587' }}></span>
                  {block.data.title}
                </h2>
              </div>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                <div className="space-y-12">
                  {block.data.events.map((event: any, index: number) => {
                    const isLeft = index % 2 === 0;
                    const colors = ['blue', 'purple', 'green'];
                    const color = colors[index % colors.length];
                    return (
                      <div key={index} className="relative flex items-center">
                        {isLeft ? (
                          <>
                            <div className="flex-1 text-right pr-8">
                              <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className={`text-${color}-600 font-bold text-lg mb-2`}>{event.year}</div>
                                <p className="text-gray-700">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                            <div className={`w-4 h-4 bg-${color}-500 rounded-full border-4 border-white shadow-lg`}></div>
                            <div className="flex-1 pl-8"></div>
                          </>
                        ) : (
                          <>
                            <div className="flex-1 pr-8"></div>
                            <div className={`w-4 h-4 bg-${color}-500 rounded-full border-4 border-white shadow-lg`}></div>
                            <div className="flex-1 text-left pl-8">
                              <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className={`text-${color}-600 font-bold text-lg mb-2`}>{event.year}</div>
                                <p className="text-gray-700">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'activities-future-plans':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`py-8 ${block.className || ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-black flex items-center">
                  <span className="w-3 h-3 rounded-full mr-4" style={{ backgroundColor: '#BEA587' }}></span>
                  {block.data.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {block.data.plans.map((plan: string, index: number) => {
                  const icons = ['🤖', '🌍', '🌱', '📈', '🎓', '🔬'];
                  const titles = [
                    'Suniy Intellekt Markazi',
                    'Xalqaro Dasturlar',
                    'Yashil Universitet',
                    'Innovatsion Markaz',
                    'Raqamli Ta\'lim',
                    'Ilmiy Tadqiqotlar'
                  ];
                  return (
                    <div key={index} className="p-6" style={{ backgroundColor: '#BEA587' }}>
                      <div className="text-2xl mb-3 text-blue-600">{icons[index] || '🎯'}</div>
                      <h3 className="text-lg font-semibold mb-2 text-white">{titles[index] || `Reja ${index + 1}`}</h3>
                      <p className="text-white text-sm">
                        {plan}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );

      case 'virtual-list':
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
            <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
            <VirtualScrollProvider
              items={block.data.items}
              itemHeight={block.data.itemHeight || 60}
              containerHeight={block.data.containerHeight || 400}
              renderItem={(item, index) => (
                <VirtualListItem
                  key={item.id || index}
                  onClick={() => block.data.onItemClick?.(item)}
                  className={block.data.itemClassName}
                >
                  {/* Default item template */}
                  <div className="flex items-center space-x-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </VirtualListItem>
              )}
            />
          </motion.div>
        );

      default:
        return null;
    }
  }, []);

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

ContentBuilderComponent.displayName = 'ContentBuilderComponent';

export default ContentBuilderComponent;
