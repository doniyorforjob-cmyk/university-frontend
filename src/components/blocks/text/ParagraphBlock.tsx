import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface ParagraphBlockProps {
  block: ContentBlock;
  index: number;
}

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className)}>
      <p className="text-black leading-relaxed">{block.data.content}</p>
    </motion.div>
  );
};