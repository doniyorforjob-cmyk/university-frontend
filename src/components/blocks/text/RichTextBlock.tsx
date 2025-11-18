import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface RichTextBlockProps {
  block: ContentBlock;
  index: number;
}

export const RichTextBlock: React.FC<RichTextBlockProps> = ({ block, index }) => {
  return (
    <motion.div
      key={block.id}
      {...getBaseAnimation(index)}
      className={getBlockClassName(block.className, 'prose prose-lg max-w-none text-black')}
    >
      <div dangerouslySetInnerHTML={{ __html: block.data.content }} />
    </motion.div>
  );
};