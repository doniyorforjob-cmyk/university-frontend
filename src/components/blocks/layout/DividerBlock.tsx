import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface DividerBlockProps {
  block: ContentBlock;
  index: number;
}

export const DividerBlock: React.FC<DividerBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className)}>
      <hr className={`border-t ${block.data.style === 'dashed' ? 'border-dashed' : 'border-solid'} ${block.data.color || 'border-gray-300'}`} />
    </motion.div>
  );
};