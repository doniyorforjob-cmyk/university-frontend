import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface ListBlockProps {
  block: ContentBlock;
  index: number;
}

export const ListBlock: React.FC<ListBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <ul className="list-disc list-inside space-y-2">
        {block.data.items.map((item: string, itemIndex: number) => (
          <li key={itemIndex} className="text-black">{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};