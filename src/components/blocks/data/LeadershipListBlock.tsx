import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';
import LeadershipCard from '../../shared/LeadershipCard';
import { Leadership } from '@/types/leadership.types';

interface LeadershipListBlockProps {
    block: ContentBlock;
    index: number;
}

export const LeadershipListBlock: React.FC<LeadershipListBlockProps> = ({ block, index }) => {
    const members = block.data.members || [];

    return (
        <motion.div
            key={block.id}
            {...getBaseAnimation(index)}
            className={getBlockClassName(block.className, 'space-y-6')}
        >
            {block.data.title && (
                <h3 className="text-2xl font-bold text-main mb-6">{block.data.title}</h3>
            )}

            <div className="space-y-6">
                {members.map((member: Leadership, memberIndex: number) => (
                    <LeadershipCard
                        key={member.id || memberIndex}
                        member={member}
                        isMain={memberIndex === 0 && block.data.highlightFirst}
                        variant={block.data.variant}
                    />
                ))}
            </div>
        </motion.div>
    );
};
