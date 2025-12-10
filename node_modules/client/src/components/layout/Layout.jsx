import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background text-text">
      {/* Sidebar kiri */}
      <Sidebar />

      {/* Konten utama (geser karena sidebar md:ml-64) */}
      <div className="flex flex-1 flex-col md:ml-64">
        <Navbar />
        <main className="flex-1 px-4 py-6 md:px-8">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
