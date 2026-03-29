import React from 'react';

interface ExpandableGridProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    initialItemsCount?: number;
    gridClassName?: string;
    isExpanded?: boolean;
}

const ExpandableGrid = <T,>({
    items,
    renderItem,
    initialItemsCount = 5,
    gridClassName = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8",
    isExpanded = false
}: ExpandableGridProps<T>) => {
    // If not expanded, show only initialItemsCount. If expanded, show all.
    const displayedItems = isExpanded ? items : items.slice(0, initialItemsCount);

    return (
        <div className={gridClassName}>
            {displayedItems.map((item, index) => renderItem(item, index))}
        </div>
    );
};

export default ExpandableGrid;
