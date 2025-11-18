import React from 'react';
import { motion } from 'framer-motion';
import { OrganizationalStructureTree } from './OrganizationalStructureTree';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface DynamicDataBlockProps {
  block: ContentBlock;
  index: number;
}

export const DynamicDataBlock: React.FC<DynamicDataBlockProps> = ({ block, index }) => {
  // Dynamic component rendering
  const ComponentName = block.data.component;
  if (ComponentName === 'OrganizationalStructureTree') {
    return (
      <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className)}>
        <OrganizationalStructureTree {...block.data.props} />
      </motion.div>
    );
  }
  return null;
};