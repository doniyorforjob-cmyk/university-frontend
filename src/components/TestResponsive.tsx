// src/components/TestResponsive.tsx
// Test komponenti responsive tizimni tekshirish uchun

import React from 'react';
import { getResponsiveText, getResponsiveSpacing, responsiveClasses } from '@/utils/responsive';
import { useResponsive } from '@/hooks/useResponsive';

const TestResponsive: React.FC = () => {
  const { breakpoint, isMobile, isTablet, isDesktop, screenWidth } = useResponsive();

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          🎨 Responsive Design System Test
        </h1>

        {/* Current breakpoint info */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">📱 Current State</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded">
              <div className="font-medium">Breakpoint</div>
              <div className="text-blue-600 font-bold">{breakpoint}</div>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <div className="font-medium">Screen Width</div>
              <div className="text-green-600 font-bold">{screenWidth}px</div>
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <div className="font-medium">Mobile</div>
              <div className={`font-bold ${isMobile ? 'text-red-600' : 'text-gray-400'}`}>
                {isMobile ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="bg-orange-50 p-3 rounded">
              <div className="font-medium">Desktop</div>
              <div className={`font-bold ${isDesktop ? 'text-red-600' : 'text-gray-400'}`}>
                {isDesktop ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>

        {/* Typography Scale Test */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-6">📝 Typography Scale</h2>
          <div className="space-y-4">
            {(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as const).map((size) => (
              <div key={size} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm font-medium w-16">text-{size}:</span>
                <span className={`text-${size} flex-1 ml-4`}>
                  The quick brown fox jumps over the lazy dog
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fluid Typography Test */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-6">🌊 Fluid Typography</h2>
          <div className="space-y-4">
            {(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as const).map((size) => (
              <div key={size} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm font-medium w-20">fluid-{size}:</span>
                <span className={`text-fluid-${size} flex-1 ml-4`}>
                  Fluid scaling text example
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacing Test */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-6">📏 Spacing Scale</h2>
          <div className="space-y-4">
            {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
              <div key={size} className="border-2 border-dashed border-gray-300">
                <div className={`bg-blue-100 p-fluid-${size}`}>
                  <span className="text-sm font-medium">p-fluid-{size}</span>
                  <div className="bg-white h-8 rounded mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Utility Functions Test */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-6">🔧 Utility Functions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded">
              <div className="font-medium mb-2">getResponsiveText(xl):</div>
              <div className={getResponsiveText('xl')}>
                This text uses getResponsiveText utility
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <div className="font-medium mb-2">getResponsiveSpacing(lg):</div>
              <div className={`bg-blue-100 ${getResponsiveSpacing('lg')}`}>
                <div className="bg-white h-12 rounded"></div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <div className="font-medium mb-2">responsiveClasses.heading1:</div>
              <h3 className={responsiveClasses.heading1}>
                Heading using responsiveClasses
              </h3>
            </div>
          </div>
        </div>

        {/* CSS Custom Properties Test */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-6">🎨 CSS Custom Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium">Typography Variables:</h3>
              {['xs', 'sm', 'base', 'lg', 'xl'].map((size) => (
                <div key={size} className="flex items-center space-x-3">
                  <span className="text-sm w-12">--text-{size}:</span>
                  <span
                    className="flex-1 p-2 bg-gray-100 rounded"
                    style={{ fontSize: `var(--text-${size})` }}
                  >
                    Sample text
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Spacing Variables:</h3>
              {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
                <div key={size} className="flex items-center space-x-3">
                  <span className="text-sm w-12">--space-{size}:</span>
                  <div
                    className="bg-blue-200 rounded flex-1"
                    style={{ height: `var(--space-${size})` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">🧪 Test Instructions</h3>
          <ul className="text-yellow-700 space-y-2">
            <li>• Browser oynasini kichraytirib/kattalashtirib breakpoint ozgarishini kuzating</li>
            <li>• Typography va spacing elementlari fluid ravishda ozgarishini tekshiring</li>
            <li>• CSS custom properties browser dev toolsda korish uchun :root elementini inspect qiling</li>
            <li>• Mobile/Tablet/Desktop rejimlarida test qiling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestResponsive;