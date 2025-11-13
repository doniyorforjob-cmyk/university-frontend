import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';

interface GenericPageSkeletonProps {
  showSidebar?: boolean;
  showBanner?: boolean;
  showHeroImage?: boolean;
  contentBlocks?: number;
  layoutType?: 'default' | 'grid';
  gridItems?: number;
}

const GenericPageSkeleton: React.FC<GenericPageSkeletonProps> = ({
  showSidebar = true,
  showBanner = false,
  showHeroImage = true,
  contentBlocks = 5,
  layoutType = 'default',
  gridItems = 9,
}) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Container className="py-8">

        {/* Main flex container */}
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Main Content */}
          <div className={`w-full ${showSidebar ? 'lg:w-[70%]' : 'lg:w-full'}`}>
            {layoutType === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: gridItems }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
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
            ) : (
              <div className="bg-white p-8 rounded-lg">
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

          {/* Sidebar */}
          {showSidebar && (
            <aside className="w-full lg:w-[30%]">
              <div className="bg-white p-6 rounded-lg">
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-6 animate-pulse"></div>

                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
        {/* End of flex container */}
      </Container>
    </div>
  );
};

export default GenericPageSkeleton;