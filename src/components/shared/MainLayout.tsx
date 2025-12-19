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
    <Container className="pt-2 pb-2">
      <div className={`flex flex-col gap-8 ${sidebarContent ? 'lg:grid lg:grid-cols-[3fr_1fr]' : ''}`}>
        <main className={`w-full pt-8 ${!sidebarContent ? 'flex justify-center' : ''}`}>
          <div className={!sidebarContent ? 'w-full' : ''}>
            <Outlet />
          </div>
        </main>
        {sidebarContent && (
          <aside className="w-full pt-8">
            {sidebarContent}
          </aside>
        )}
      </div>
    </Container>
  );
};

export default MainLayout;
