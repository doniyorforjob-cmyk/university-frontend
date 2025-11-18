import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface StatsBlockProps {
  block: ContentBlock;
  index: number;
}

export const StatsBlock: React.FC<StatsBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-6')}>
      <h3 className="text-lg font-semibold text-black text-center">{block.data.title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {block.data.stats.map((stat: any, statIndex: number) => (
          <div key={statIndex} className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
            <div className="text-black">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};