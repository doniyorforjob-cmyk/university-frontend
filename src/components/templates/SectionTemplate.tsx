import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { OptimizedImage } from '../shared';
import Banner from '../shared/Banner';
import Sidebar from '../shared/Sidebar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import GenericPageSkeleton from '../shared/GenericPageSkeleton';

// BreadcrumbItem interfeysi
interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Section turlari
export type SectionType = 'news' | 'announcements' | 'services' | 'info';
export type LayoutType = 'grid' | 'list' | 'card';
export type SortType = 'date' | 'title' | 'priority';

// Section item interfeysi
export interface SectionItem {
  id: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  image?: string;
  views?: number;
  author?: string;
  tags?: string[];
  href: string;
}

// Filter interfeysi
export interface SectionFilters {
  category?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  priority?: string;
  search?: string;
}

// Props interfeysi
interface SectionTemplateProps {
  // Asosiy ma'lumotlar
  parentTitle: string;
  sectionTitle: string;
  sectionType: SectionType;
  
  // Content
  items: SectionItem[];
  totalItems?: number;
  
  // Layout sozlamalari
  layoutType?: LayoutType;
  itemsPerPage?: number;
  
  // Features
  showFilters?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  showSorting?: boolean;
  showSidebar?: boolean;

  loading?: boolean; // Keep loading for skeleton logic
  
  // Callbacks
  onItemClick?: (item: SectionItem) => void;
  onFilterChange?: (filters: SectionFilters) => void;
  onPageChange?: (page: number) => void;
  onSortChange?: (sort: SortType) => void;

  // Sidebar
  sidebarContent?: React.ReactNode;

  className?: string;
}

const SectionTemplate: React.FC<SectionTemplateProps> = ({
  parentTitle,
  sectionTitle,
  sectionType,
  items,
  totalItems = items.length,
  layoutType = 'grid',
  itemsPerPage = 12,
  showFilters = true,
  showSearch = true,
  showPagination = true,
  showSorting = true,
  showSidebar = false,
  loading = false,
  onItemClick,
  onFilterChange,
  onPageChange,
  onSortChange,
  sidebarContent,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortType>('date');
  const [filters, setFilters] = useState<SectionFilters>({});
  const [searchQuery, setSearchQuery] = useState('');


  // Sahifalash
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  // Filter o'zgarishi
  const handleFilterChange = (newFilters: Partial<SectionFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    setCurrentPage(1); // Birinchi sahifaga qaytish
    onFilterChange?.(updatedFilters);
  };

  // Search o'zgarishi
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    handleFilterChange({ search: query });
  };

  // Sort o'zgarishi
  const handleSortChange = (sort: SortType) => {
    setSortBy(sort);
    onSortChange?.(sort);
  };

  // Sahifa o'zgarishi
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  // Layout klasslarini olish
  const getLayoutClasses = () => {
    switch (layoutType) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'list':
        return 'space-y-4';
      case 'card':
        return 'grid grid-cols-1 md:grid-cols-2 gap-6';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  // Item render qilish
  const renderItem = (item: SectionItem) => {
    const handleClick = () => {
      onItemClick?.(item);
    };

    return (
      <div
        className="flex flex-col bg-white overflow-hidden transition-all duration-300 relative group shadow-sm cursor-pointer h-full"
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
        role="link"
        tabIndex={0}
      >
        <div className="absolute bottom-0 left-0 h-1 bg-secondary w-[10%] group-hover:w-full transition-all duration-700 ease-out"></div>
        <div className="h-48 overflow-hidden relative block">
          <OptimizedImage
            src={item.image || 'https://via.placeholder.com/400x400?text=Rasm+Mavjud+Emas'}
            alt={item.title}
            className="w-full h-full object-cover"
            width={400}
            height={192}
            lazy={true}
          />
          <div className="absolute -bottom-3 left-4 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[30px] border-b-white"></div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Meta ma'lumotlar */}
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {item.date ? new Date(item.date).toLocaleDateString('uz-UZ') : ''}
            </span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>{item.views || 0}</span>
            </div>
          </div>

          {/* Sarlavha */}
          <h3 className="text-lg font-bold mb-4 flex-grow group-hover:text-blue-600 transition-colors line-clamp-3">
            {item.title}
          </h3>

          {/* Batafsil tugmasi */}
          <div className="mt-auto flex justify-end">
            <span className="inline-flex items-center text-blue-600 group-hover:text-blue-800 font-medium text-sm">
              Batafsil
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Sana formatini o'zgartiruvchi funksiya
  const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const months = [
          'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
          'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
      ];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
  };

  if (loading) {
    return <GenericPageSkeleton layoutType="grid" gridItems={itemsPerPage} showSidebar={false} showBanner={false} />;
  }

  return (
    <div className={`${className}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className={`w-full ${showSidebar ? 'lg:w-[70%]' : 'lg:w-full'}`}>
          <motion.div
            key={sectionTitle} // Re-animate on page change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Filters va Search */}
            {(showFilters || showSearch) && !showSorting && (
              <div className="bg-white p-6 rounded-lg">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Search */}
                  {showSearch && (
                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        placeholder="Qidirish..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Items grid/list */}
            {currentItems.length > 0 ? (
              <motion.div
                className={getLayoutClasses()}
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {currentItems.map(item => <motion.div key={item.id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>{renderItem(item)}</motion.div>)}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500 text-lg">Hech narsa topilmadi</p>
              </div>
            )}
            
            {/* Pagination */}
            {showPagination && totalPages > 1 && (
              <Pagination className="mt-12 justify-center" />
            )}
          </motion.div>
        </div>

        {showSidebar && (
          <aside className="w-full lg:w-[30%]">
            {sidebarContent}
          </aside>
        )}
      </div>
    </div>
  );
};

export default SectionTemplate;
