import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface PricingBlockProps {
  block: ContentBlock;
  index: number;
}

export const PricingBlock: React.FC<PricingBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-6')}>
      <h3 className="text-lg font-semibold text-black text-center">{block.data.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {block.data.plans.map((plan: any, planIndex: number) => (
          <div
            key={planIndex}
            className={`bg-white border border-gray-200 rounded-lg p-6 ${plan.featured ? 'ring-2 ring-blue-500' : ''}`}
          >
            {plan.featured && (
              <div className="text-center mb-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Mashhur</span>
              </div>
            )}
            <h4 className="text-xl font-bold text-black text-center mb-2">{plan.name}</h4>
            <div className="text-3xl font-bold text-blue-600 text-center mb-4">{plan.price}</div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature: string, featureIndex: number) => (
                <li key={featureIndex} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-black">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 px-4 rounded ${
                plan.featured ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};