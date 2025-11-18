import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface CardsBlockProps {
  block: ContentBlock;
  index: number;
}

export const CardsBlock: React.FC<CardsBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-6')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {block.data.cards.map((card: any, cardIndex: number) => (
          <div
            key={cardIndex}
            className="bg-gradient-to-br from-gray-600 to-gray-800 text-white p-6 hover:from-gray-700 hover:to-gray-900 transition-all duration-300"
          >
            {card.icon && <div className="mb-4">{card.icon}</div>}
            <h4 className="text-lg font-bold mb-2">{card.title}</h4>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};