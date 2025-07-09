import React from 'react';
import Sidebar from './chefComponents/Sidebar';
import StatsCard from './chefComponents/StatsCard';
import OrderCard from './chefComponents/OrderCard';
import MessageCard from './chefComponents/MessageCard';
import Header from './chefComponents/header';
import { FaClipboardList, FaDollarSign } from 'react-icons/fa';

const ChefDashboard = () => (
  <div className="flex bg-[#fff8ee] min-h-screen">
    <Sidebar />
    <div className="flex-1 p-8">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatsCard icon={FaClipboardList} label="Total Orders" value="1,200" />
        <StatsCard icon={FaDollarSign} label="Total Earnings" value="60,000" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrderCard />
        <MessageCard />
      </div>
    </div>
  </div>
);

export default ChefDashboard;
