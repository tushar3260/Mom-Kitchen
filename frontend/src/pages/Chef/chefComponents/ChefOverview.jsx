import React from 'react';
import StatsCard from './StatsCard';
import OrderCard from './OrderCard';
import MessageCard from './MessageCard';
import { FaClipboardList, FaDollarSign } from 'react-icons/fa';

const ChefOverview = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatsCard icon={FaClipboardList} label="Total Orders" value="1,200" />
        <StatsCard icon={FaDollarSign} label="Total Earnings" value="60,000" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrderCard />
        <MessageCard />
      </div>
    </>
  );
};

export default ChefOverview;
