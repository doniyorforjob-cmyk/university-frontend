import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface ActivitiesStatsGridBlockProps {
  block: ContentBlock;
  index: number;
}

export const ActivitiesStatsGridBlock: React.FC<ActivitiesStatsGridBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'py-8')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center mb-4">
            <span className="w-3 h-3 rounded-full mr-4" style={{ backgroundColor: '#BEA587' }}></span>
            {block.data.title}
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
          {block.data.stats.map((stat: any, index: number) => {
            const icons = ['📊', '✅', '🔄', '🤝'];
            const colors = ['text-blue-600', 'text-green-600', 'text-yellow-600', 'text-purple-600'];
            return (
              <div key={index} className="text-center">
                <div className="text-6xl mb-4">{icons[index] || '📊'}</div>
                <div className={`text-4xl font-bold mb-2 ${colors[index] || 'text-blue-600'}`}>{stat.value}</div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};