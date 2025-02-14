// src/layouts/MainLayout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
