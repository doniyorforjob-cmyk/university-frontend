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
      <div className="flex flex-col lg:grid lg:grid-cols-[3fr_1fr] gap-8">
        <main className="w-full">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
        {sidebarContent ? (
          <aside className="w-full">
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
