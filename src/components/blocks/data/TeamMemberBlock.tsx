import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface TeamMemberBlockProps {
  block: ContentBlock;
  index: number;
}

export const TeamMemberBlock: React.FC<TeamMemberBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-6')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {block.data.members.map((member: any, memberIndex: number) => (
          <div key={memberIndex} className="text-center bg-white p-6 border border-gray-200">
            {member.photo && (
              <img src={member.photo} alt={member.name} className="w-24 h-24 object-cover mx-auto mb-4" />
            )}
            <h4 className="text-lg font-bold text-black mb-2">{member.name}</h4>
            <p className="text-blue-600 mb-3">{member.position}</p>
            <p className="text-black text-sm">{member.bio}</p>
            {member.contact && (
              <div className="mt-4 space-y-1 text-sm text-gray-600">
                {member.contact.email && <p>📧 {member.contact.email}</p>}
                {member.contact.phone && <p>📞 {member.contact.phone}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};