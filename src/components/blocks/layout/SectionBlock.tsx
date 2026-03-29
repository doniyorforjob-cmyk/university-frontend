import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface SectionBlockProps {
  block: ContentBlock;
  index: number;
}

export const SectionBlock: React.FC<SectionBlockProps> = ({ block, index }) => {
  return (
    <motion.section
      key={block.id}
      {...getBaseAnimation(index)}
      className={getBlockClassName(block.className, `py-8 ${block.data.background || ''}`)}
    >
      {block.data.title && <h2 className="text-xl font-bold text-black mb-6">{block.data.title}</h2>}
      <div className="space-y-6">
        {block.data.content && <p className="text-black">{block.data.content}</p>}
        {block.data.children && (
          <div className="space-y-4">
            {block.data.children.map((child: any, childIndex: number) => (
              <div key={childIndex}>{child}</div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};