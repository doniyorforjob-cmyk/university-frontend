import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DownloadLink from '@/components/shared/DownloadLink';
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
import Container from '../shared/Container';


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

  className?: string;
  children?: React.ReactNode;
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
  sidebarContent,
  showCalendar = false,
  calendarView = 'all',
  displayDate = new Date(),
  onCalendarViewChange,
  onDateChange,
  className = '',
  children
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SectionFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Calendar state
  const [activeCalendarView, setActiveCalendarView] = useState(sectionType === 'announcements' ? 'all' : calendarView);
  const [currentDisplayDate, setCurrentDisplayDate] = useState(displayDate);

  // Calendar handlers
  const handleCalendarViewChange = (view: string) => {
    setActiveCalendarView(view);
    onCalendarViewChange?.(view);

    // Update filters based on view
    const now = new Date();
    let dateRange: { from: string; to: string } | undefined;

    if (view === 'today') {
      const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
      const tomorrow = new Date(today);
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      dateRange = { from: today.toISOString(), to: tomorrow.toISOString() };
    } else if (view === 'day') {
      const dayStart = new Date(Date.UTC(currentDisplayDate.getUTCFullYear(), currentDisplayDate.getUTCMonth(), currentDisplayDate.getUTCDate()));
      const dayEnd = new Date(dayStart);
      dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);
      dateRange = { from: dayStart.toISOString(), to: dayEnd.toISOString() };
    } else if (view === 'week') {
      const weekStart = new Date(currentDisplayDate);
      weekStart.setUTCDate(currentDisplayDate.getUTCDate() - currentDisplayDate.getUTCDay() + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setUTCDate(weekStart.getUTCDate() + 7);
      dateRange = { from: weekStart.toISOString(), to: weekEnd.toISOString() };
    } else if (view === 'month') {
      const monthStart = new Date(Date.UTC(currentDisplayDate.getUTCFullYear(), currentDisplayDate.getUTCMonth(), 1));
      const monthEnd = new Date(Date.UTC(currentDisplayDate.getUTCFullYear(), currentDisplayDate.getUTCMonth() + 1, 1));
      dateRange = { from: monthStart.toISOString(), to: monthEnd.toISOString() };
    } else if (view === 'all') {
      dateRange = undefined; // No date filter
    }

    handleFilterChange({ dateRange });
  };

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
  }, []);


  // Filtr qo'llash
  let filteredItems = items.filter(item => {
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
  });

  // Agar "Bugun" da e'lonlar kam bo'lsa, qo'shimcha e'lonlar qo'shish
  if (activeCalendarView === 'today' && filters.dateRange && filteredItems.length < 5) {
    const todayEnd = new Date(filters.dateRange.to);
    const sevenDaysAgo = new Date(todayEnd);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const additionalItems = items.filter(item => {
      const itemDate = item.date ? new Date(item.date) : null;
      if (!itemDate) return false;

      // So'nggi 7 kun ichida, lekin bugungi emas
      if (itemDate >= sevenDaysAgo && itemDate < todayEnd) {
        // Asosiy filtrlar ham mos kelishi kerak
        const titleMatch = !filters.search || item.title.toLowerCase().includes(filters.search.toLowerCase()) || item.description.toLowerCase().includes(filters.search.toLowerCase());
        const categoryMatch = !filters.category || item.category === filters.category;
        const priorityMatch = !filters.priority || item.priority === filters.priority;

        return titleMatch && categoryMatch && priorityMatch && !filteredItems.some(f => f.id === item.id);
      }
      return false;
    }).sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime()).slice(0, 10 - filteredItems.length);

    filteredItems.push(...additionalItems);
  }

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
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = [
      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
      'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} | ${hours}:${minutes}`;
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
          className="flex items-start justify-between border-b border-gray-200 transition-colors py-4"
        >
          <div className="w-40 h-36 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
            <OptimizedImage
              src={item.image || '/images/logo.png'}
              alt={item.title}
              className={`w-full h-full ${item.image === '/images/logo.png' ? 'object-contain p-2' : 'object-cover'}`}
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
                // Agar item.fileUrl mavjud bo'lsa, uni ishlatadi
                fileUrl={item.fileUrl}
                // Aks holda, sarlavha va tavsifdan matn yaratib, yuklaydi
                contentToDownload={
                  !item.fileUrl
                    ? `${item.title}\n\n${item.description}`
                    : undefined
                }
                // Fayl nomini sarlavhadan oladi
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
              src={item.image || '/images/logo.png'}
              alt={item.title}
              className={`w-full h-full object-center ${item.image === '/images/logo.png' ? 'object-contain p-8' : 'object-cover'}`}
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
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>{item.views || 0}</span>
            </div>
          </div>

          {/* Sarlavha */}
          <h3 className="text-lg font-bold mb-3 flex-grow group-hover:text-blue-600 transition-colors line-clamp-3">
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
                {currentItems.map(item => <motion.div key={item.id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>{renderItem(item)}</motion.div>)}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500 text-lg">Hech narsa topilmadi</p>
              </div>
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
