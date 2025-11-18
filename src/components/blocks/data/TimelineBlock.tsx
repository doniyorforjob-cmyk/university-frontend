import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface TimelineBlockProps {
  block: ContentBlock;
  index: number;
}

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-6')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <div className="space-y-6">
        {block.data.events.map((event: any, eventIndex: number) => (
          <div key={eventIndex} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
            <div className="flex-1">
              <div className="font-semibold text-black">{event.year}</div>
              <div className="text-black">{event.description}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};