import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface ButtonBlockProps {
  block: ContentBlock;
  index: number;
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ block, index }) => {
  const getButtonClass = (variant: string) => {
    switch (variant) {
      case 'primary': return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'secondary': return 'bg-gray-600 text-white hover:bg-gray-700';
      default: return 'bg-gray-200 text-black hover:bg-gray-300';
    }
  };

  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className)}>
      <button
        onClick={() => block.data.onClick && block.data.onClick()}
        className={`px-6 py-3 font-semibold transition-colors duration-200 ${getButtonClass(block.data.variant)}`}
      >
        {block.data.text}
      </button>
    </motion.div>
  );
};