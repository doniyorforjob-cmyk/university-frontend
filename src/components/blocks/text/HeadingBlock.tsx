import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface HeadingBlockProps {
  block: ContentBlock;
  index: number;
}

export const HeadingBlock: React.FC<HeadingBlockProps> = ({ block, index }) => {
  const HeadingTag = `h${block.data.level || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  const getHeadingClass = (level: number) => {
    switch (level) {
      case 1: return 'text-4xl';
      case 2: return 'text-3xl';
      case 3: return 'text-2xl';
      case 4: return 'text-xl';
      case 5: return 'text-lg';
      default: return 'text-base';
    }
  };

  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className)}>
      <HeadingTag className={`font-bold text-black ${getHeadingClass(block.data.level || 2)}`}>
        {block.data.content}
      </HeadingTag>
    </motion.div>
  );
};