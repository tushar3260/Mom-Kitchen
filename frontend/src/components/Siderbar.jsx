import React from 'react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <ul className="space-y-2 text-gray-700">
        <li>Dashboard</li>
        <li className="font-semibold text-blue-600">Profile</li>
        <li>Orders</li>
        <li>Support</li>
      </ul>
    </div>
  );
}
