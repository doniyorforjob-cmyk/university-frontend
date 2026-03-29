import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface AudioBlockProps {
  block: ContentBlock;
  index: number;
}

export const AudioBlock: React.FC<AudioBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
      {block.data.title && <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>}
      <audio controls className="w-full">
        <source src={block.data.src} type="audio/mpeg" />
        <track kind="captions" srcLang="uz" label="O'zbek" />
        Audio yuklanmadi
      </audio>
      {block.data.description && <p className="text-gray-600">{block.data.description}</p>}
    </motion.div>
  );
};