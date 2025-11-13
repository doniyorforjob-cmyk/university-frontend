import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Content turlari
export interface ContentBlock {
  id: string;
  type: 
    // Matn turlari
    | 'text' | 'heading' | 'paragraph' | 'rich-text' | 'quote' | 'list' | 'citation'
    // Media turlari  
    | 'image' | 'gallery' | 'carousel' | 'video' | 'audio'
    // Layout bloklari
    | 'section' | 'columns' | 'grid' | 'divider' | 'spacer'
    // Interaktiv elementlar
    | 'button' | 'link' | 'form' | 'contact-form' | 'accordion' | 'tabs' | 'modal'
    // Ma'lumotli komponentlar
    | 'card' | 'stats' | 'testimonials' | 'team-member' | 'faq' | 'timeline' | 'feature'
    // Integratsiya elementlari
    | 'map' | 'social-embed' | 'iframe'
    // Texnik bloklar
    | 'dynamic-data' | 'reusable-component' | 'seo-meta'
    // Eski turlar (backward compatibility)
    | 'highlight' | 'table' | 'cards';
  data: any;
  className?: string;
}

interface ContentBuilderProps {
  blocks: ContentBlock[];
}

// Tabs komponenti
const TabsBlock: React.FC<{ block: ContentBlock; index: number }> = ({ block, index }) => {
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
};

// Accordion komponenti
const AccordionBlock: React.FC<{ block: ContentBlock; index: number }> = ({ block, index }) => {
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
};

const ContentBuilder: React.FC<ContentBuilderProps> = ({ blocks }) => {
  const renderBlock = (block: ContentBlock, index: number) => {
    const baseAnimation = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.1 }
    };

    switch (block.type) {
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
        return (
          <motion.div key={block.id} {...baseAnimation} className={`space-y-4 ${block.className || ''}`}>
            {block.data.title && <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>}
            <img
              src={block.data.src}
              alt={block.data.alt || block.data.title}
              className="w-full h-auto object-cover rounded-lg"
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
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default ContentBuilder;
