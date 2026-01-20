import React, { createContext } from 'react';

export const VirtualScrollContext = createContext<any>(null);

interface VirtualScrollProviderProps {
  children?: React.ReactNode;
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
}

export const VirtualScrollProvider: React.FC<VirtualScrollProviderProps> = ({
  children,
  items,
  itemHeight,
  containerHeight,
  renderItem
}) => {
  return (
    <VirtualScrollContext.Provider value={{ items, itemHeight, containerHeight }}>
      <div style={{ height: containerHeight, overflowY: 'auto' }}>
        <div style={{ position: 'relative', height: items.length * itemHeight }}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: index * itemHeight,
                height: itemHeight,
                width: '100%'
              }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
        {children}
      </div>
    </VirtualScrollContext.Provider>
  );
};