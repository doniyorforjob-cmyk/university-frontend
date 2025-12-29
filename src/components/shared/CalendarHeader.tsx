import React from 'react';
import { useTranslation } from 'react-i18next';

interface CalendarHeaderProps {
  activeView: string;
  displayDate: Date;
  onViewChange: (view: string) => void;
  onDateChange: (date: Date) => void;
  className?: string;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  activeView,
  displayDate,
  onViewChange,
  onDateChange,
  className = ''
}) => {
  const { t } = useTranslation('components');
  const monthsFull = t('calendar.months', { returnObjects: true }) as string[];

  const getHeaderLabel = () => {
    if (activeView === 'today') {
      return t('calendar.today');
    }
    if (activeView === 'day') {
      return `${displayDate.getDate()} ${monthsFull[displayDate.getMonth()]}, ${displayDate.getFullYear()}`;
    }
    if (activeView === 'week') {
      const startOfWeek = new Date(displayDate);
      startOfWeek.setDate(displayDate.getDate() - displayDate.getDay() + 1); // Monday
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

      const startMonth = monthsFull[startOfWeek.getMonth()];
      const endMonth = monthsFull[endOfWeek.getMonth()];

      return startMonth === endMonth
        ? `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${startMonth}, ${startOfWeek.getFullYear()}`
        : `${startOfWeek.getDate()} ${startMonth} - ${endOfWeek.getDate()} ${endMonth}, ${endOfWeek.getFullYear()}`;
    }
    if (activeView === 'month') {
      return `${monthsFull[displayDate.getMonth()]} ${displayDate.getFullYear()}`;
    }
    return t('calendar.today');
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(displayDate);
    const increment = direction === 'next' ? 1 : -1;

    const filter = activeView === 'today' ? 'day' : activeView;

    if (activeView === 'today') {
      onViewChange('day');
    }

    if (filter === 'day') {
      newDate.setDate(newDate.getDate() + increment);
    } else if (filter === 'week') {
      newDate.setDate(newDate.getDate() + 7 * increment);
    } else if (filter === 'month') {
      newDate.setMonth(newDate.getMonth() + increment);
    }
    onDateChange(newDate);
  };

  if (activeView === 'all') {
    return null;
  }

  return (
    <div className={`flex items-center justify-between py-2 mb-4 ${className}`}>
      <h2 className="text-3xl font-bold text-gray-700">
        {getHeaderLabel()}
      </h2>
      <div className="flex items-center space-x-2">
        <button onClick={() => handleDateChange('prev')} className="p-1.5 rounded-full bg-primary hover:bg-primary-dark transition-colors" aria-label="Previous">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={() => handleDateChange('next')} className="p-1.5 rounded-full bg-primary hover:bg-primary-dark transition-colors" aria-label="Next">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;