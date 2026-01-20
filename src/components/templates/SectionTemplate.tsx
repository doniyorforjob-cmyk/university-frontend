import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DownloadLink from '@/components/shared/DownloadLink';
import { useSettingsStore } from '@/store/settingsStore';
import { OptimizedImage } from '../shared';
import CalendarViewSelector from '../shared/CalendarViewSelector';
import CalendarHeader from '../shared/CalendarHeader';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import GenericPageSkeleton from '../shared/GenericPageSkeleton';
import EmptyState from '../shared/EmptyState';
import { formatStandardDate } from '@/config/constants';


// Section turlari
export type SectionType = 'news' | 'announcements' | 'services' | 'info';
export type LayoutType = 'grid' | 'list' | 'card' | 'masonry' | 'horizontal';
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
  fileUrl?: string;
  fileName?: string;
  gallery?: string[];
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

  // Sidebar
  sidebarContent?: React.ReactNode;

  // Calendar
  showCalendar?: boolean;
  calendarView?: string;
  displayDate?: Date;
  onCalendarViewChange?: (view: string) => void;
  onDateChange?: (date: Date) => void;

  // Featured layout
  featuredFirst?: boolean;

  className?: string;
  children?: React.ReactNode;
}

const SectionTemplate: React.FC<SectionTemplateProps> = ({
  sectionTitle,
  sectionType,
  items,
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
  sidebarContent,
  showCalendar = false,
  calendarView = 'all',
  displayDate = new Date(),
  onCalendarViewChange,
  onDateChange,
  featuredFirst = false,
  className = '',
  children
}) => {
  const { settings } = useSettingsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SectionFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Calendar state
  const [activeCalendarView, setActiveCalendarView] = useState(sectionType === 'announcements' ? 'all' : calendarView);
  const [currentDisplayDate, setCurrentDisplayDate] = useState(displayDate);

  // Calendar handlers
  const handleCalendarViewChange = React.useCallback((view: string) => {
    setActiveCalendarView(view);
    onCalendarViewChange?.(view);

    // Update filters based on view
    let dateRange: { from: string; to: string } | undefined;

    if (view === 'today') {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(start.getDate() + 1);
      dateRange = { from: start.toISOString(), to: end.toISOString() };
    } else if (view === 'day') {
      const start = new Date(currentDisplayDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(start.getDate() + 1);
      dateRange = { from: start.toISOString(), to: end.toISOString() };
    } else if (view === 'week') {
      const start = new Date(currentDisplayDate);
      start.setHours(0, 0, 0, 0);
      const day = start.getDay();
      const diff = day === 0 ? -6 : 1 - day; // Monday start
      start.setDate(start.getDate() + diff);
      const end = new Date(start);
      end.setDate(start.getDate() + 7);
      dateRange = { from: start.toISOString(), to: end.toISOString() };
    } else if (view === 'month') {
      const start = new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth(), 1);
      const end = new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth() + 1, 1);
      dateRange = { from: start.toISOString(), to: end.toISOString() };
    } else if (view === 'all') {
      dateRange = undefined; // No date filter
    }

    // Filter qo'llash logic inside handleFilterChange but we invoke it here
    setFilters(prev => ({ ...prev, dateRange }));
    setCurrentPage(1);
    onFilterChange?.({ ...filters, dateRange });
  }, [currentDisplayDate, filters, onCalendarViewChange, onFilterChange]);

  const handleDateChange = (date: Date) => {
    setCurrentDisplayDate(date);
    onDateChange?.(date);
    // Re-apply current view filter with new date
    handleCalendarViewChange(activeCalendarView);
  };

  useEffect(() => {
    if (sectionType === 'announcements') {
      handleCalendarViewChange(activeCalendarView);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Filtr qo'llash
  let filteredItems = (Array.isArray(items) ? items : []).filter(item => {
    // Sana filtri
    if (filters.dateRange) {
      const itemDate = item.date ? new Date(item.date) : null;
      if (itemDate) {
        const from = new Date(filters.dateRange.from);
        const to = new Date(filters.dateRange.to);
        if (itemDate < from || itemDate >= to) {
          return false;
        }
      }
    }

    // Qidirish filtri
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const titleMatch = item.title.toLowerCase().includes(query);
      const descMatch = item.description.toLowerCase().includes(query);
      if (!titleMatch && !descMatch) {
        return false;
      }
    }

    // Kategoriya filtri
    if (filters.category && item.category !== filters.category) {
      return false;
    }

    // Prioritet filtri
    if (filters.priority && item.priority !== filters.priority) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    // Default sort by date descending
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });


  // Sahifalash
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

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


  // Sahifa o'zgarishi
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  // Sana formatini o'zgartiruvchi funksiya
  const formatDate = (dateString?: string) => {
    return formatStandardDate(dateString);
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
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6';
      case 'horizontal':
        return 'space-y-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  // Item render qilish
  const renderItem = (item: SectionItem) => {
    const handleClick = () => {
      onItemClick?.(item);
    };

    if (layoutType === 'horizontal') {
      return (
        <div
          key={item.id}
          className="flex items-start justify-between border-b border-gray-200 transition-colors py-4"
        >
          <div className="w-40 h-36 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
            <OptimizedImage
              src={item.image || settings?.logo || ""}
              alt={item.title}
              className={`w-full h-full ${(item.image === settings?.logo || !item.image) ? 'object-contain p-2' : 'object-cover'}`}
              width={160}
              height={144}
              lazy={true}
            />
          </div>
          <div className="flex-1 px-8 flex flex-col justify-start self-stretch">
            <time className="text-sm text-gray-500 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{formatDate(item.date)}</span>
            </time>
            <div className="mb-2">
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
                className="inline-block cursor-pointer group"
              >
                <h3
                  className="text-lg font-bold text-primary group-hover:text-blue-600 transition-all line-clamp-2 pb-0 border-b border-dotted group-hover:border-solid border-primary"
                >
                  {item.title}
                </h3>
              </a>
            </div>
            <p className="text-base text-gray-600 line-clamp-2 mt-1">
              {item.description}
            </p>
          </div>
          <div className="flex-shrink-0 w-48 flex flex-col items-end justify-center text-right">

            <div className="">
              <DownloadLink
                fileUrl={item.fileUrl}
                contentToDownload={
                  !item.fileUrl
                    ? `${item.title}\n\n${item.description}`
                    : undefined
                }
                fileName={item.fileName || `${item.title.replace(/ /g, '_')}.txt`}
                label=""
                className="bg-transparent hover:bg-gray-100 text-gray-600 hover:text-primary p-2 rounded-full"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        key={item.id}
        className={`flex flex-col bg-white overflow-hidden transition-all duration-300 relative group shadow-sm cursor-pointer h-full ${layoutType === 'masonry' ? 'break-inside-avoid' : ''}`}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
        role="link"
        tabIndex={0}
      >
        <div className="absolute bottom-0 left-0 h-1 bg-secondary w-[10%] group-hover:w-full transition-all duration-700 ease-out"></div>
        <div className="overflow-hidden relative block">
          <AspectRatio ratio={4 / 3} className="bg-gray-50">
            <OptimizedImage
              src={item.image || settings?.logo || ""}
              alt={item.title}
              className={`w-full h-full object-center ${(item.image === settings?.logo || !item.image) ? 'object-contain p-8' : 'object-cover'}`}
              width={400}
              height={225}
              lazy={true}
            />
          </AspectRatio>
          <div className="absolute -bottom-3 left-4 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[30px] border-b-white"></div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Meta ma'lumotlar */}
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {formatDate(item.date)}
            </span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <span>{((item.image ? 1 : 0) + ((item as any).gallery?.length || 0))}</span>
            </div>
          </div>

          {/* Sarlavha */}
          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {item.title}
          </h3>


        </div>
      </div>
    );
  };

  if (loading && items.length === 0) {
    return <GenericPageSkeleton layoutType="grid" gridItems={itemsPerPage} showSidebar={false} showBanner={false} noContainer={true} />;
  }

  return (
    <div className={`${className}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full">
          <motion.div
            key={sectionType} // Stable key to prevent flicker on title translation change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Kalendar navigatsiyasi (faqat e'lonlar uchun) */}
            {(showCalendar || sectionType === 'announcements') && (
              <CalendarViewSelector
                activeView={activeCalendarView}
                onViewChange={handleCalendarViewChange}
              />
            )}
            {(showCalendar || sectionType === 'announcements') && (
              <CalendarHeader
                activeView={activeCalendarView}
                displayDate={currentDisplayDate}
                onViewChange={handleCalendarViewChange}
                onDateChange={handleDateChange}
              />
            )}

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

            {/* Items grid/list or Children */}
            {children ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {children}
              </motion.div>
            ) : currentItems.length > 0 ? (
              <motion.div
                className={getLayoutClasses()}
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {currentItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={featuredFirst && index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
                    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  >
                    {renderItem(item)}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState
                resourceKey={sectionType as any}
                className="min-h-[25rem]"
              />
            )}

            {/* Pagination */}
            {showPagination && totalPages > 1 && (
              <Pagination className="mt-12 justify-center">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(Math.max(1, currentPage - 1)); }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}>{i + 1}</PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(Math.min(totalPages, currentPage + 1)); }} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </motion.div>
        </div>

        {showSidebar && (
          <aside className="w-full lg:w-1/5">
            {sidebarContent}
          </aside>
        )}
      </div>
    </div>
  );
};

export default SectionTemplate;
