import React from 'react';
import { motion } from 'framer-motion';
import { VirtualScrollProvider } from '@/components/providers/VirtualScrollProvider';
import { VirtualListItem } from '../../shared/VirtualListItem';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface VirtualListBlockProps {
  block: ContentBlock;
  index: number;
}

export const VirtualListBlock: React.FC<VirtualListBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
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
};