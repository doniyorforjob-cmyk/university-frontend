import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface IframeBlockProps {
  block: ContentBlock;
  index: number;
}

export const IframeBlock: React.FC<IframeBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
      {block.data.title && <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>}
      <div className={`${block.data.aspectRatio || 'aspect-video'}`}>
        <iframe
          src={block.data.src}
          className="w-full h-full border-0"
          title={block.data.title}
          {...(block.data.attributes || {})}
        />
      </div>
    </motion.div>
  );
};