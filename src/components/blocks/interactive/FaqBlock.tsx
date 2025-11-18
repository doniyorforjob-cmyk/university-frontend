import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';
import { AccordionBlock } from './AccordionBlock';

interface FaqBlockProps {
  block: ContentBlock;
  index: number;
}

export const FaqBlock: React.FC<FaqBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <AccordionBlock block={{ ...block, type: 'accordion' }} index={index} />
    </motion.div>
  );
};