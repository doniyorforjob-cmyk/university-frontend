import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface QuoteBlockProps {
  block: ContentBlock;
  index: number;
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ block, index }) => {
  return (
    <motion.div
      key={block.id}
      {...getBaseAnimation(index)}
      className={getBlockClassName(block.className, 'bg-gray-100 p-6 rounded-lg border-l-4 border-gray-400')}
    >
      <blockquote className="text-lg italic text-black mb-4">&ldquo;{block.data.quote}&rdquo;</blockquote>
      <cite className="text-black font-semibold">— {block.data.author}</cite>
    </motion.div>
  );
};