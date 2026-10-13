import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { ToastContainer } from '../common/Toast';

export const AppLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col antialiased">
      <div className="flex flex-1">
        {/* Desktop Sidebar & Mobile Drawer */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Application Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
          <Navbar onToggleSidebar={() => setMobileSidebarOpen(true)} />
          
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Bottom Thumb Navigation */}
      <MobileNav />

      {/* Ephemeral Toast Alert System */}
      <ToastContainer />
    </div>
  );
};
