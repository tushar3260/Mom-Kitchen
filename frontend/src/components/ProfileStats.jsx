import React from 'react';

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white shadow p-4 rounded-lg">
        <p className="text-sm text-gray-500">Total Orders</p>
        <p className="text-lg font-semibold">43</p>
      </div>
      <div className="bg-white shadow p-4 rounded-lg">
        <p className="text-sm text-gray-500">Wallet Balance</p>
        <p className="text-lg font-semibold">₹1,320</p>
      </div>
      <div className="bg-white shadow p-4 rounded-lg">
        <p className="text-sm text-gray-500">Rating</p>
        <p className="text-lg font-semibold">4.8 ⭐</p>
      </div>
    </div>
  );
}
