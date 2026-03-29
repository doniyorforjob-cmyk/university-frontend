import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface GridBlockProps {
  block: ContentBlock;
  index: number;
}

export const GridBlock: React.FC<GridBlockProps> = ({ block, index }) => {
  const getGridClass = (columns: number) => {
    switch (columns) {
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-3';
      default: return 'grid-cols-1';
    }
  };

  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-6')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <div className={`grid gap-6 ${getGridClass(block.data.columns)}`}>
        {block.data.items.map((item: any, itemIndex: number) => (
          <div
            key={itemIndex}
            className={`bg-white border border-gray-200 ${block.className === 'no-rounded' ? 'rounded-none' : 'rounded-lg'} p-6 hover:shadow-lg transition-shadow duration-200`}
          >
            <h4 className="text-lg font-bold text-black mb-3">{item.title}</h4>
            <p className="text-black mb-4">{item.description}</p>
            {item.details && (
              <div className="space-y-2 text-sm">
                {Object.entries(item.details).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-semibold text-black">{key}:</span>
                    <span className="text-black">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};