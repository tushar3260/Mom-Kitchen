import React from 'react';
import Sidebar from './chefComponents/Sidebar';
import Header from './chefComponents/Header';
import { Outlet } from 'react-router-dom';

const ChefDashboard = () => {
  return (
    <div className="bg-[#fff8ee] min-h-screen">
      <Sidebar />
      <div className="p-8 transition-all duration-300">
        <Header />
        <div className="w-[85%] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
