import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface ImageBlockProps {
  block: ContentBlock;
  index: number;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ block, index }) => {
  const hasBorderRadiusClass = block.className && (block.className.includes('rounded-') || block.className.includes('rounded'));
  const imgClassName = hasBorderRadiusClass
    ? `w-full h-auto object-cover ${block.className}`
    : "w-full h-auto object-cover rounded-lg";
  const containerClassName = hasBorderRadiusClass
    ? 'space-y-4'
    : getBlockClassName(block.className, 'space-y-4');

  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={containerClassName}>
      {block.data.title && <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>}
      <img
        src={block.data.src}
        alt={block.data.alt || block.data.title}
        className={imgClassName}
        loading="lazy"
      />
      {block.data.caption && <p className="text-sm text-gray-600 italic">{block.data.caption}</p>}
    </motion.div>
  );
};