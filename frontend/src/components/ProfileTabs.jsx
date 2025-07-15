import React, { useState } from 'react';
import OrderCard from './OrderCard';

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('orders');

  const renderTabContent = () => {
    if (activeTab === 'orders') {
      return (
        <div className="grid gap-4">
          <OrderCard />
          <OrderCard />
        </div>
      );
    } else if (activeTab === 'settings') {
      return <p className="text-gray-700">Settings Page (Coming Soon)</p>;
    } else {
      return <p className="text-gray-700">History is empty.</p>;
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        {['orders', 'settings', 'history'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white border'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
}
