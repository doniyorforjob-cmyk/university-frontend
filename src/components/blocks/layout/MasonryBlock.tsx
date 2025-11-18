import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface MasonryBlockProps {
  block: ContentBlock;
  index: number;
}

export const MasonryBlock: React.FC<MasonryBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-6')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {block.data.items.map((item: any, itemIndex: number) => (
          <div
            key={itemIndex}
            className="break-inside-avoid bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h4 className="text-lg font-bold text-black mb-3">{item.title}</h4>
            <p className="text-black mb-4">{item.description}</p>
            {item.image && <img src={item.image} alt={item.title} className="w-full h-auto rounded" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
};