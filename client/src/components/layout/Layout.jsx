// client/src/components/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-text flex">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 px-4 py-4 md:px-8 md:py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
