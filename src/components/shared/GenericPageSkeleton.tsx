import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';

interface GenericPageSkeletonProps {
  showSidebar?: boolean;
  showBanner?: boolean;
  showHeroImage?: boolean;
  contentBlocks?: number;
  layoutType?: 'default' | 'grid' | 'list';
  gridItems?: number;
  noContainer?: boolean;
}

const GenericPageSkeleton: React.FC<GenericPageSkeletonProps> = ({
  showSidebar = false,
  showBanner = false,
  showHeroImage = true,
  contentBlocks = 5,
  layoutType = 'default',
  gridItems = 9,
  noContainer = false,
}) => {
  const content = (
    <div className="">
      {/* Main grid container */}
      <div className="grid grid-cols-1 gap-8">
        {/* Main Content */}
        <div className="w-full">
          {layoutType === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: gridItems }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                    <div className="flex justify-end">
                      <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : layoutType === 'list' ? (
            <div className="space-y-4">
              {Array.from({ length: gridItems }).map((_, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
                  <div className="flex-1 py-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm">
              {/* Title */}
              <div className="h-8 bg-gray-200 rounded w-64 mb-6 animate-pulse"></div>

              {/* Hero image */}
              {showHeroImage && (
                <div className="w-full h-64 bg-gray-200 rounded mb-6 animate-pulse"></div>
              )}

              {/* Content blocks */}
              <div className="space-y-6">
                {Array.from({ length: contentBlocks }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* End of Main Content */}

      </div>
    </div>
  );

  if (noContainer) return content;

  return (
    <Container className="py-8">
      {content}
    </Container>
  );
};

export default GenericPageSkeleton;