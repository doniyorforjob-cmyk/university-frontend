import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface ActivitiesTimelineBlockProps {
  block: ContentBlock;
  index: number;
}

export const ActivitiesTimelineBlock: React.FC<ActivitiesTimelineBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'py-8')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
            <span className="w-3 h-3 rounded-full mr-4" style={{ backgroundColor: '#BEA587' }}></span>
            {block.data.title}
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
          <div className="space-y-12">
            {block.data.events.map((event: any, index: number) => {
              const isLeft = index % 2 === 0;
              const colors = ['blue', 'purple', 'green'];
              const color = colors[index % colors.length];
              return (
                <div key={index} className="relative flex items-center">
                  {isLeft ? (
                    <>
                      <div className="flex-1 text-right pr-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                          <div className={`text-${color}-600 font-bold text-lg mb-2`}>{event.year}</div>
                          <p className="text-gray-700">
                            {event.description}
                          </p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 bg-${color}-500 rounded-full border-4 border-white shadow-lg`}></div>
                      <div className="flex-1 pl-8"></div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 pr-8"></div>
                      <div className={`w-4 h-4 bg-${color}-500 rounded-full border-4 border-white shadow-lg`}></div>
                      <div className="flex-1 text-left pl-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                          <div className={`text-${color}-600 font-bold text-lg mb-2`}>{event.year}</div>
                          <p className="text-gray-700">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};