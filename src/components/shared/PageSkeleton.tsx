import React from 'react';

interface PageSkeletonProps {
  type?: 'news' | 'announcements' | 'contact' | 'appeals' | 'media' | 'university' | 'default';
  className?: string;
}

/**
 * Sahifa yuklanayotganda ko'rsatiladigan skeleton komponenti
 */
const PageSkeleton: React.FC<PageSkeletonProps> = ({ type = 'default', className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'news':
        return (
          <div className="bg-gray-50">
            {/* Banner skeleton */}
            <div className="h-48 bg-gray-300 animate-pulse"></div>

            {/* Content skeleton */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Breadcrumbs skeleton */}
              <div className="flex space-x-2 mb-6">
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
              </div>

              <div className="flex flex-col lg:flex-row gap-10">
                {/* Main content */}
                <div className="lg:w-3/4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Image skeleton */}
                        <div className="h-48 bg-gray-300 animate-pulse"></div>
                        {/* Content skeleton */}
                        <div className="p-4">
                          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2 mb-3 animate-pulse"></div>
                          <div className="h-3 bg-gray-300 rounded w-full mb-1 animate-pulse"></div>
                          <div className="h-3 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar skeleton */}
                <div className="lg:w-1/4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'announcements':
        return (
          <div className="bg-gray-50">
            {/* Banner skeleton */}
            <div className="h-48 bg-gray-300 animate-pulse"></div>

            {/* Content skeleton */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Breadcrumbs skeleton */}
              <div className="flex space-x-2 mb-6">
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
              </div>

              <div className="flex flex-col lg:flex-row gap-10">
                {/* Main content */}
                <div className="lg:w-3/4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Image skeleton */}
                        <div className="h-64 bg-gray-300 animate-pulse"></div>
                        {/* Content skeleton */}
                        <div className="p-4">
                          <div className="flex items-center mb-2">
                            <div className="h-4 w-4 bg-gray-300 rounded mr-2 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                          </div>
                          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                          <div className="h-4 bg-gray-300 rounded w-full mb-1 animate-pulse"></div>
                          <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar skeleton */}
                <div className="lg:w-1/4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="bg-gray-100">
            {/* Banner skeleton */}
            <div className="h-48 bg-gray-300 animate-pulse"></div>

            {/* Content skeleton */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
              {/* Breadcrumbs skeleton */}
              <div className="flex space-x-2 mb-8">
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Department list skeleton */}
                <div>
                  <div className="h-8 bg-gray-300 rounded w-1/3 mb-8 animate-pulse"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="h-5 w-5 bg-gray-300 rounded mr-2 animate-pulse"></div>
                          <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-gray-300 rounded mr-3 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-gray-300 rounded mr-3 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact form skeleton */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="h-8 bg-gray-300 rounded w-1/2 mb-8 animate-pulse"></div>

                  <div className="space-y-6">
                    {/* Form fields */}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="relative">
                        <div className="h-5 w-5 bg-gray-300 rounded absolute top-3 left-4 animate-pulse"></div>
                        <div className="h-12 bg-gray-300 rounded-lg w-full animate-pulse"></div>
                      </div>
                    ))}

                    {/* CAPTCHA */}
                    <div className="flex gap-3">
                      <div className="flex-1 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                      <div className="flex-1 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                      <div className="h-12 bg-gray-300 rounded-lg flex-1 animate-pulse"></div>
                      <div className="h-12 bg-gray-300 rounded-lg flex-1 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appeals':
        return (
          <div className="bg-gray-100">
            {/* Banner skeleton */}
            <div className="h-48 bg-gray-300 animate-pulse"></div>

            {/* Content skeleton */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Breadcrumbs skeleton */}
              <div className="flex space-x-2 mb-6">
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
              </div>

              <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="lg:w-3/4">
                  <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="h-8 bg-gray-300 rounded w-1/3 mb-6 animate-pulse"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i}>
                          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
                          <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6">
                      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2 animate-pulse"></div>
                      <div className="h-32 bg-gray-300 rounded animate-pulse"></div>
                    </div>

                    <div className="mb-6">
                      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
                      <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
                    </div>

                    <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Sidebar skeleton */}
                <div className="lg:w-1/4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="bg-gray-50">
            {/* Banner skeleton */}
            <div className="h-48 bg-gray-300 animate-pulse"></div>

            {/* Content skeleton */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Breadcrumbs skeleton */}
              <div className="flex space-x-2 mb-6">
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-28 animate-pulse"></div>
              </div>

              <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-3/4 space-y-8">
                  {/* Intro text skeleton */}
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                  </div>

                  {/* Articles list skeleton */}
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="space-y-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="border-b pb-6 last:border-b-0">
                          <div className="h-6 bg-gray-300 rounded w-2/3 mb-2 animate-pulse"></div>
                          <div className="flex space-x-4 mb-3">
                            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                          </div>
                          <div className="h-5 bg-gray-300 rounded w-32 animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar skeleton */}
                <div className="lg:w-1/4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="bg-gray-50">
            {/* Banner skeleton */}
            <div className="h-48 bg-gray-300 animate-pulse"></div>

            {/* Content skeleton */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Breadcrumbs skeleton */}
              <div className="flex space-x-2 mb-6">
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              </div>

              <div className="flex flex-col lg:flex-row gap-10">
                {/* Main content skeleton */}
                <div className="lg:w-3/4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="h-8 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
                    <div className="space-y-3">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar skeleton */}
                <div className="lg:w-1/4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={className}>
      {renderSkeleton()}
    </div>
  );
};

export { PageSkeleton };
export default PageSkeleton;
