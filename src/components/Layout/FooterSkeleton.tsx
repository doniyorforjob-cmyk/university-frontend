import React from 'react';
import { Skeleton } from '../ui/skeleton';

const FooterSkeleton: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        {/* Main grid skeleton */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Logo and description section */}
          <div>
            <div className="flex items-center mb-4">
              <Skeleton className="mr-4 h-12 w-12 sm:h-16 sm:w-16 rounded" />
              <Skeleton className="h-8 w-24 sm:h-10 sm:w-32" />
            </div>
            <Skeleton className="h-4 w-full max-w-xs mb-2" />
            <Skeleton className="h-4 w-3/4 max-w-xs mb-2" />
            <Skeleton className="h-4 w-1/2 max-w-xs" />

            {/* Social links skeleton */}
            <div className="flex mt-8 space-x-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-10 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Contact and links section */}
          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            {/* Contact section */}
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>

            {/* Link groups skeleton */}
            {Array.from({ length: 3 }).map((_, groupIndex) => (
              <div key={groupIndex}>
                <Skeleton className="h-6 w-20 mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, linkIndex) => (
                    <Skeleton key={linkIndex} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeleton;