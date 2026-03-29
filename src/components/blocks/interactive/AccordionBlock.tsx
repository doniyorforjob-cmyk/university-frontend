import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface AccordionBlockProps {
  block: ContentBlock;
  index: number;
}

export const AccordionBlock: React.FC<AccordionBlockProps> = ({ block, index }) => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (itemIndex: number) => {
    setOpenItem(openItem === itemIndex ? null : itemIndex);
  };

  return (
    <motion.div {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
      <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>
      <div className="space-y-3">
        {block.data.items.map((item: any, itemIndex: number) => (
          <div key={itemIndex} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(itemIndex)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
            >
              <span className="font-semibold text-black">{item.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItem === itemIndex ? 'rotate-180' : ''
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openItem === itemIndex && (
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <div
                  className="prose prose-sm max-w-none text-black"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};