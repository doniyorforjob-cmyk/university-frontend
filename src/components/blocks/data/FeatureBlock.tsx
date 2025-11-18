import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface FeatureBlockProps {
  block: ContentBlock;
  index: number;
}

export const FeatureBlock: React.FC<FeatureBlockProps> = ({ block, index }) => {
  return (
    <motion.div
      key={block.id}
      {...getBaseAnimation(index)}
      className={getBlockClassName(block.className, 'flex items-start space-x-4 p-4 border-b border-gray-200 last:border-b-0')}
    >
      {block.data.icon && (
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <img src={`/assets/icons/${block.data.icon}`} alt="" className="w-6 h-6" />
        </div>
      )}
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-black mb-1">{block.data.title}</h4>
        <p className="text-gray-700">{block.data.description}</p>
        {block.data.items && (
          <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
            {block.data.items.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        )}
      </div>
    </motion.div>
  );
};