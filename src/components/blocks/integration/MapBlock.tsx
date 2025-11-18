import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface MapBlockProps {
  block: ContentBlock;
  index: number;
}

export const MapBlock: React.FC<MapBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
      {block.data.title && <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>}
      <div className="aspect-video">
        <iframe
          src={block.data.embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          title={block.data.title || 'Map'}
        />
      </div>
      {block.data.address && <p className="text-gray-600">{block.data.address}</p>}
    </motion.div>
  );
};