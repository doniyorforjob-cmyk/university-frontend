import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface TextBlockProps {
  block: ContentBlock;
  index: number;
}

export const TextBlock: React.FC<TextBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <p className="text-black">{block.data.content}</p>
    </motion.div>
  );
};