import React, { useState, useEffect, useMemo, useCallback } from 'react';

interface VirtualScrollProviderProps {
  items: any[];
  itemHeight: number;
  containerHeight?: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
  overscanCount?: number;
}

const VirtualScrollProvider: React.FC<VirtualScrollProviderProps> = ({
  items,
  itemHeight,
  containerHeight = 400,
  renderItem,
  className = '',
  overscanCount = 5
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(start + visibleCount + overscanCount, items.length);

    return {
      start: Math.max(0, start - overscanCount),
      end
    };
  }, [scrollTop, itemHeight, containerHeight, overscanCount, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, index) => {
      const actualIndex = visibleRange.start + index;
      return {
        item,
        index: actualIndex,
        style: {
          position: 'absolute' as const,
          top: actualIndex * itemHeight,
          height: itemHeight,
          width: '100%'
        }
      };
    });
  }, [items, visibleRange, itemHeight]);

  const totalHeight = items.length * itemHeight;

  return (
    <div
      className={`virtual-scroll-container ${className}`}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, style }) => (
          <div key={index} style={style}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

VirtualScrollProvider.displayName = 'VirtualScrollProvider';

export { VirtualScrollProvider };