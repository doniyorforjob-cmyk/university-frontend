import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface TabsBlockProps {
  block: ContentBlock;
  index: number;
}

export const TabsBlock: React.FC<TabsBlockProps> = ({ block, index }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.div {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
      <h3 className="text-xl font-semibold text-black">{block.data.title}</h3>

      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {block.data.tabs.map((tab: any, tabIndex: number) => (
          <button
            key={tabIndex}
            onClick={() => setActiveTab(tabIndex)}
            className={`px-6 py-3 font-medium transition-colors duration-200 border-b-2 ${
              activeTab === tabIndex
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {block.data.tabs[activeTab] && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="prose prose-lg max-w-none text-black">
              {block.data.tabs[activeTab].content}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};