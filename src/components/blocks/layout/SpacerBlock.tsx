import React from 'react';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBlockClassName } from '../utils';

interface SpacerBlockProps {
  block: ContentBlock;
  index: number;
}

export const SpacerBlock: React.FC<SpacerBlockProps> = ({ block }) => {
  const getHeightClass = (size: string) => {
    switch (size) {
      case 'small': return 'h-4';
      case 'large': return 'h-16';
      default: return 'h-8';
    }
  };

  return (
    <div key={block.id} className={getBlockClassName(block.className, getHeightClass(block.data.size))} />
  );
};