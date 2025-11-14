import React from 'react';

interface VirtualListItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isVisible?: boolean;
  style?: React.CSSProperties;
}

export const VirtualListItem: React.FC<VirtualListItemProps> = ({
  children,
  className = '',
  onClick,
  isVisible = true,
  style = {}
}) => {
  if (!isVisible) return null;

  const baseStyle: React.CSSProperties = {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'background-color 0.2s',
    ...style
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#f9fafb';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  if (onClick) {
    return (
      <div
        className={`virtual-list-item ${className}`}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label="List item"
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`virtual-list-item ${className}`}
      style={baseStyle}
    >
      {children}
    </div>
  );
};