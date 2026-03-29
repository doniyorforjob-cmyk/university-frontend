import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface HighlightBlockProps {
  block: ContentBlock;
  index: number;
}

export const HighlightBlock: React.FC<HighlightBlockProps> = ({ block, index }) => {
  return (
    <motion.div
      key={block.id}
      {...getBaseAnimation(index)}
      className={getBlockClassName(block.className, 'bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500')}
    >
      <h3 className="text-xl font-bold text-blue-800 mb-4">{block.data.title}</h3>
      <p className="text-blue-700">{block.data.content}</p>
    </motion.div>
  );
};