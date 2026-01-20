import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* Sidebar content simplified for current structure */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          Foydali havolalar
        </h3>
        <ul className="space-y-3">
          <li>
            <a href="/admission" className="text-gray-600 hover:text-primary transition-colors block py-1">
              Qabul komissiyasi
            </a>
          </li>
          <li>
            <a href="/news" className="text-gray-600 hover:text-primary transition-colors block py-1">
              Yangiliklar
            </a>
          </li>
          <li>
            <a href="/contact" className="text-gray-600 hover:text-primary transition-colors block py-1">
              Bog&apos;lanish
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;