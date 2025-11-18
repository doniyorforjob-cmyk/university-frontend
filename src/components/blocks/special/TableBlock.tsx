import React from 'react';
import { motion } from 'framer-motion';
import { ContentBlock } from '../../shared/ContentBuilder';
import { getBaseAnimation, getBlockClassName } from '../utils';

interface TableBlockProps {
  block: ContentBlock;
  index: number;
}

export const TableBlock: React.FC<TableBlockProps> = ({ block, index }) => {
  return (
    <motion.div key={block.id} {...getBaseAnimation(index)} className={getBlockClassName(block.className, 'space-y-4')}>
      <h3 className="text-lg font-semibold text-black">{block.data.title}</h3>
      <div className="w-full">
        <table className="w-full bg-white border border-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              {block.data.headers.map((header: string, headerIndex: number) => (
                <th key={headerIndex} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider break-words">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {block.data.rows.map((row: any[], rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-4 text-sm text-black break-words align-top">
                    {typeof cell === 'string' && cell.includes('\n') ? (
                      <div className="space-y-1">
                        {cell.split('\n').map((line: string, lineIndex: number) => (
                          <div key={lineIndex} className="leading-tight">
                            {line.trim()}
                          </div>
                        ))}
                      </div>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};