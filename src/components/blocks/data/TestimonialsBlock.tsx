import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface TestimonialsBlockProps {
  block: ContentBlock;
  index: number;
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-6')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {block.data.testimonials.map((testimonial: any, testIndex: number) => (
          <div key={testIndex} className="bg-white p-6 border border-gray-200 shadow-sm">
            <p className="text-black mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
            <div className="flex items-center space-x-3">
              {testimonial.avatar && (
                <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 object-cover" />
              )}
              <div>
                <p className="font-semibold text-black">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};