import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface ActivitiesCategoriesBlockProps {
  block: ContentBlock;
  index: number;
}

export const ActivitiesCategoriesBlock: React.FC<ActivitiesCategoriesBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'py-8')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
            <span className="w-3 h-3 rounded-full mr-4" style={{ backgroundColor: '#BEA587' }}></span>
            {block.data.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {block.data.categories.map((category: any, index: number) => {
            const bgColors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-red-100', 'bg-indigo-100'];
            return (
              <div key={index} className="bg-white p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className={`flex-shrink-0 w-12 h-12 ${bgColors[index % bgColors.length]} rounded-lg flex items-center justify-center`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};