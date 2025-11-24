import React from 'react';

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
  const today = new Date();
  const uzMonthsShort = [
    'Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn',
    'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'
  ];
  const day = today.getDate();
  const month = uzMonthsShort[today.getMonth()];
  const year = today.getFullYear();
  const todayLabel = `${day}-${month}, ${year}`;

  const allViews = [
    { id: 'today', label: `Bugun: ${todayLabel}` },
    { id: 'day', label: 'Kun' },
    { id: 'week', label: 'Hafta' },
    { id: 'month', label: 'Oy' },
    { id: 'all', label: 'Barcha e\'lonlar' },
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
                  className={`block px-4 py-2 text-base font-medium transition-colors ${
                    activeView === view.id
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
