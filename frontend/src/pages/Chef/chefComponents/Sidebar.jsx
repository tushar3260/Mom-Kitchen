import React from 'react';
import { FaClipboardList, FaUtensils, FaStar, FaDollarSign, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => (
  <div className="w-1/5 bg-gradient-to-b from-orange-100 to-orange-50 p-6 min-h-screen flex flex-col justify-between">
    <div>
      <h1 className="text-2xl font-bold text-[#ff7e00] mb-10">🍳 MomsKitchen</h1>
      <ul className="space-y-5 text-gray-700 font-medium">
        <li className="hover:text-[#ff7e00] cursor-pointer">Dashboard</li>
        <li className="hover:text-[#ff7e00] cursor-pointer">Orders</li>
        <li className="hover:text-[#ff7e00] cursor-pointer">Menu</li>
        <li className="hover:text-[#ff7e00] cursor-pointer">Reviews</li>
        <li className="hover:text-[#ff7e00] cursor-pointer">Earnings</li>
        <li className="hover:text-[#ff7e00] cursor-pointer">Messages</li>
      </ul>
    </div>
    <button
    onClick={() => {
      localStorage.removeItem('chefToken');
      localStorage.removeItem('chefData');
      localStorage.removeItem("chefEmail");
       // Clear token from localStorage
      window.location.href = '/'; // Redirect to home page or login
    }}
     className="bg-[#ff7e00] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 mt-10">
      <FaSignOutAlt /> Logout
    </button>
  </div>
);

export default Sidebar;
