import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface GalleryBlockProps {
  block: ContentBlock;
  index: number;
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {block.data.images.map((img: any, imgIndex: number) => (
          <div key={imgIndex} className="overflow-hidden">
            <img
              src={img.src}
              alt={img.alt || `Gallery image ${imgIndex + 1}`}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                // Fallback to colored div if image fails to load
                const target = e.target as HTMLImageElement;
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-48 flex items-center justify-center text-white font-bold text-lg"
                          style="background-color: ${imgIndex === 0 ? '#22c55e' : imgIndex === 1 ? '#16a34a' : imgIndex === 2 ? '#15803d' : '#166534'}">
                      ${img.alt}
                    </div>
                  `;
                }
              }}
            />
            {img.caption && <p className="text-sm text-gray-600 mt-2">{img.caption}</p>}
          </div>
        ))}
      </div>
    </motion.div>
  );
};