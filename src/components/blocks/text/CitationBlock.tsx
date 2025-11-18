import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface CitationBlockProps {
  block: ContentBlock;
  index: number;
}

export const CitationBlock: React.FC<CitationBlockProps> = ({ block, index }) => {
  return (
    <motion.div
      key={block.id}
      {...getBaseAnimation(index)}
      className={getBlockClassName(block.className, 'border-l-4 border-gray-300 pl-6 italic')}
    >
      <p className="text-gray-700 mb-2">{block.data.content}</p>
      <cite className="text-sm text-gray-500">— {block.data.author}</cite>
    </motion.div>
  );
};