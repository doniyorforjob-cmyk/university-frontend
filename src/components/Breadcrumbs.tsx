import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
        {items.map((item, index) => (
          <li key={item.label}>
            <div className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              )}
              <Link
                to={item.href || '#'}
                className={`ml-2 text-sm font-medium ${
                  index === items.length - 1
                    ? 'text-gray-500'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                aria-current={index === items.length - 1 ? 'page' : undefined}
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