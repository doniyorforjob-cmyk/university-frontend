import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : isCurrent
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </motion.div>

                {/* Step Info */}
                <div className="mt-3 text-center max-w-[120px]">
                  <div className={`text-sm font-medium transition-colors ${
                    isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="flex-1 h-0.5 mx-4 bg-gray-200"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: (index + 1) * 0.1, duration: 0.5 }}
                  style={{ originX: 0 }}
                >
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: step.id < currentStep ? 1 : 0 }}
                    transition={{ delay: (index + 1) * 0.1, duration: 0.5 }}
                    style={{ originX: 0 }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};