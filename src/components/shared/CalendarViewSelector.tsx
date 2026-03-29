import React from 'react';
import { useTranslation } from 'react-i18next';

interface CalendarViewSelectorProps {
  activeView: string;
  onViewChange: (id: string) => void;
  className?: string;
}

const CalendarViewSelector: React.FC<CalendarViewSelectorProps> = ({
  activeView,
  onViewChange,
  className = ''
}) => {
  const { t } = useTranslation('components');
  const today = new Date();
  const monthsShort = t('calendar.monthsShort', { returnObjects: true }) as string[];
  const day = today.getDate();
  const month = monthsShort[today.getMonth()];
  const year = today.getFullYear();
  const todayDateLabel = `${day}-${month}, ${year}`;

  const allViews = [
    { id: 'today', label: `${t('calendar.today')}: ${todayDateLabel}` },
    { id: 'day', label: t('calendar.day') },
    { id: 'week', label: t('calendar.week') },
    { id: 'month', label: t('calendar.month') },
    { id: 'all', label: t('calendar.allAnnouncements') },
  ];

  const allEventsView = allViews.find(v => v.id === 'all');
  const otherViews = allViews.filter(v => v.id !== 'all');

  return (
    <div className={`border-b border-primary mb-6 ${className}`}>
      <nav aria-label="Calendar View">
        <ul className="flex items-center justify-between">
          <div className="flex items-center">
            {otherViews.map(view => (
              <li key={view.id}>
                <a
                  href={`#!view/${view.id}`}
                  onClick={(e) => { e.preventDefault(); onViewChange(view.id); }}
                  className={`block px-4 py-2 text-base font-medium transition-colors ${activeView === view.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-primary-dark hover:text-white'
                    }`}
                  aria-current={activeView === view.id ? 'true' : 'false'}
                >
                  {view.label}
                </a>
              </li>
            ))}
          </div>
          {allEventsView && (
            <li>
              <a href={`#!view/${allEventsView.id}`} onClick={(e) => { e.preventDefault(); onViewChange(allEventsView.id); }} className={`group flex items-center px-4 py-2 text-base font-medium transition-colors ${activeView === allEventsView.id ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary'}`} aria-current={activeView === allEventsView.id ? 'true' : 'false'}>
                <span>{allEventsView.label}</span>
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default CalendarViewSelector;
