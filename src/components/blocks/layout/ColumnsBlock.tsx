import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface ColumnsBlockProps {
  block: ContentBlock;
  index: number;
}

export const ColumnsBlock: React.FC<ColumnsBlockProps> = ({ block, index }) => {
  const getGridClass = (columns: number) => {
    switch (columns) {
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1';
    }
  };

  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className)}>
      {block.data.title && <h3 className="text-lg font-semibold text-black mb-6">{block.data.title}</h3>}
      <div className={`grid gap-6 ${getGridClass(block.data.columns)}`}>
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
};