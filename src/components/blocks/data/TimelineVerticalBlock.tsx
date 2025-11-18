import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface TimelineVerticalBlockProps {
  block: ContentBlock;
  index: number;
}

export const TimelineVerticalBlock: React.FC<TimelineVerticalBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-6')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500"></div>
        <div className="space-y-8">
          {block.data.events.map((event: any, eventIndex: number) => (
            <div key={eventIndex} className="relative flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{eventIndex + 1}</span>
              </div>
              <div className="ml-6 flex-1">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-blue-600 font-bold text-lg mb-2">{event.date}</div>
                  <h4 className="text-lg font-semibold text-black mb-2">{event.title}</h4>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};