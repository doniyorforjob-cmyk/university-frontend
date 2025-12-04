import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from './Container';

/**
 * Asosiy layout komponenti.
 * Sidebar doimiy turadi, <Outlet /> orqali esa sahifa kontenti almashadi.
 */
const MainLayout: React.FC<{ sidebar: React.ReactNode }> = ({ sidebar }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Container className="pt-2 pb-2">
        <div className="flex flex-col lg:grid lg:grid-cols-[3fr_1fr] gap-8">
          <main className="w-full pt-8">
            <Outlet />
          </main>
          <aside className="w-full pt-8">
            {sidebar}
          </aside>
        </div>
      </Container>
    </div>
  );
};

export default MainLayout;
