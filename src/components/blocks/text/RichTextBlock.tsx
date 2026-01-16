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
      className={getBlockClassName(block.className, 'prose prose-lg max-w-none font-serif text-[20px] leading-[30px] text-black prose-p:text-black prose-li:text-black prose-headings:font-sans prose-headings:text-[#003B5C] prose-a:text-blue-600 prose-img:rounded-xl prose-li:marker:text-black prose-table:border prose-table:border-collapse prose-th:border prose-td:border prose-th:p-2 prose-td:p-2')}
    >
      <div dangerouslySetInnerHTML={{ __html: block.data.content }} />
    </motion.div>
  );
};