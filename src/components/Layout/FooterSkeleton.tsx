import React from 'react';
import { Skeleton } from '../ui/skeleton';

/**
 * Footer uchun Skeleton Loading komponenti
 */
const FooterSkeleton: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Logo va tavsif */}
          <div>
            <Skeleton className="h-9 w-32 mb-4 bg-gray-700" />
            <Skeleton className="h-20 w-full max-w-xs mb-4 bg-gray-700" />
            <div className="flex mt-8 space-x-6">
              <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
              <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
              <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
              <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
              <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
            </div>
          </div>

          {/* Ustunlar */}
          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <Skeleton className="h-6 w-24 mb-4 bg-gray-700" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full bg-gray-700" />
                  <Skeleton className="h-4 w-full bg-gray-700" />
                  <Skeleton className="h-4 w-3/4 bg-gray-700" />
                  <Skeleton className="h-4 w-5/6 bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <Skeleton className="h-4 w-64 mx-auto mt-8 bg-gray-700" />
      </div>
    </footer>
  );
};

export default FooterSkeleton;

