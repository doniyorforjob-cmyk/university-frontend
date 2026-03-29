import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface VideoBlockProps {
  block: ContentBlock;
  index: number;
}

export const VideoBlock: React.FC<VideoBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
      {block.data.title && <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>}
      <div className="aspect-video">
        {block.data.type === 'youtube' ? (
          <iframe
            src={`https://www.youtube.com/embed/${block.data.videoId}`}
            className="w-full h-full"
            allowFullScreen
            title={block.data.title}
          />
        ) : (
          <video
            src={block.data.src}
            controls
            className="w-full h-full"
            poster={block.data.poster}
          >
            <track kind="captions" srcLang="uz" label="O'zbek" />
            Video yuklanmadi
          </video>
        )}
      </div>
      {block.data.description && <p className="text-gray-600">{block.data.description}</p>}
    </motion.div>
  );
};