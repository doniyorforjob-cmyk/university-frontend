import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from './Container';

import { useGlobalLayout } from '../templates/GlobalLayout';

/**
 * Asosiy layout komponenti.
 * Sidebar doimiy turadi, <Outlet /> orqali esa sahifa kontenti almashadi.
 */
const MainLayout: React.FC = () => {
  const { sidebarContent, sidebarExtraContent, sidebarMobileHidden } = useGlobalLayout();
  const hasSidebar = sidebarContent || sidebarExtraContent;

  return (
    <Container className="pt-4 pb-8">
      <div className={hasSidebar ? (
        sidebarMobileHidden
          ? "flex flex-col lg:grid lg:grid-cols-[6fr_2fr] gap-6"
          : "flex flex-col lg:grid lg:grid-cols-[6fr_2fr] gap-6"
      ) : "w-full"}>
        <main className="w-full min-w-0">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
        {hasSidebar && (
          <aside className={`w-full min-w-0 flex flex-col gap-6 ${sidebarMobileHidden ? 'hidden lg:flex' : ''}`}>
            {sidebarContent}
            {sidebarExtraContent}
          </aside>
        )}
      </div>
    </Container>
  );
};

export default MainLayout;
