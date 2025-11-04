import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const filteredItems = items.filter(item => item.label.toLowerCase() !== 'bosh sahifa');

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-200 px-4 py-2.5 rounded-full shadow-md">
        <li>
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-700 transition-colors duration-200">
            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="ml-2 text-sm font-medium">Bosh sahifa</span>
          </Link>
        </li>
        {filteredItems.map((item, index) => (
          <li key={item.label}>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link
                to={item.href || '#'}
                className={`text-sm font-medium transition-colors duration-200 ${
                  index === filteredItems.length - 1
                    ? 'text-gray-900 font-bold cursor-default'
                    : 'text-gray-600 hover:text-blue-700'
                }`}
                onClick={(e) => { if (index === filteredItems.length - 1) e.preventDefault(); }}
                aria-current={index === filteredItems.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;