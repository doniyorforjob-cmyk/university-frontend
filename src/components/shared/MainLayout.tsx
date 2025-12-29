import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from './Container';

import { useGlobalLayout } from '../templates/GlobalLayout';

/**
 * Asosiy layout komponenti.
 * Sidebar doimiy turadi, <Outlet /> orqali esa sahifa kontenti almashadi.
 */
const MainLayout: React.FC = () => {
  const { sidebarContent } = useGlobalLayout();

  return (
    <Container className="py-8">
      <div className="flex flex-col lg:grid lg:grid-cols-[6fr_2fr] gap-8">
        <main className="w-full min-w-0">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
        {sidebarContent ? (
          <aside className="w-full min-w-0">
            {sidebarContent}
          </aside>
        ) : (
          <aside className="w-full">
            <div className="animate-pulse bg-gray-200 h-64 w-full"></div>
          </aside>
        )}
      </div>
    </Container>
  );
};

export default MainLayout;
