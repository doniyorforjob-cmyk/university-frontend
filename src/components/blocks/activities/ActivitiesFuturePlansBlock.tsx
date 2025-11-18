import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface ActivitiesFuturePlansBlockProps {
  block: ContentBlock;
  index: number;
}

export const ActivitiesFuturePlansBlock: React.FC<ActivitiesFuturePlansBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'py-8')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-black flex items-center">
            <span className="w-3 h-3 rounded-full mr-4" style={{ backgroundColor: '#BEA587' }}></span>
            {block.data.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {block.data.plans.map((plan: string, index: number) => {
            const icons = ['🤖', '🌍', '🌱', '📈', '🎓', '🔬'];
            const titles = [
              'Suniy Intellekt Markazi',
              'Xalqaro Dasturlar',
              'Yashil Universitet',
              'Innovatsion Markaz',
              'Raqamli Ta\'lim',
              'Ilmiy Tadqiqotlar'
            ];
            return (
              <div key={index} className="p-6" style={{ backgroundColor: '#BEA587' }}>
                <div className="text-2xl mb-3 text-blue-600">{icons[index] || '🎯'}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">{titles[index] || `Reja ${index + 1}`}</h3>
                <p className="text-white text-sm">
                  {plan}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};