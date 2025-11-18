import React, { useCallback } from 'react';
import { blockRenderers } from '../blocks';

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
    | 'activities-stats-grid' | 'activities-categories' | 'activities-timeline' | 'activities-future-plans'
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

const ContentBuilderComponent: React.FC<ContentBuilderProps> & { displayName?: string } = ({ blocks }) => {
  const renderBlock = useCallback((block: ContentBlock, index: number) => {
    const BlockComponent = blockRenderers[block.type as keyof typeof blockRenderers];
    if (BlockComponent) {
      return <BlockComponent key={block.id} block={block} index={index} />;
    }
    return null;
  }, []);

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

ContentBuilderComponent.displayName = 'ContentBuilderComponent';

export default ContentBuilderComponent;
