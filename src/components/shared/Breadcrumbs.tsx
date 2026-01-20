import React from 'react';
import PrefetchLink from './PrefetchLink';
import { HomeIcon } from '@heroicons/react/24/solid';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbData {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbData[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {


  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index === items.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <PrefetchLink to={item.href || '#'} className={index === 0 ? "flex items-center" : ""}>
                    {index === 0 && <HomeIcon className="h-4 w-4 mr-1" />}
                    {item.label}
                  </PrefetchLink>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;