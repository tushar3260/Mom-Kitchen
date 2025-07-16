import React from 'react';
import {
  FaClipboardList, FaUtensils, FaStar,
  FaDollarSign, FaEnvelope, FaSignOutAlt,
  FaShoppingCart
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', icon: <FaClipboardList />, path: '' },
  { label: 'Orders', icon: <FaShoppingCart  />, path: 'orders' },
  { label: 'Menu', icon: <FaUtensils />, path: 'menu' },
  { label: 'Reviews', icon: <FaStar />, path: 'reviews' },
  { label: 'Earnings', icon: <FaDollarSign />, path: 'earnings' },
  { label: 'Messages', icon: <FaEnvelope />, path: 'messages' },
];

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-54 z-50 bg-gradient-to-b from-[#fff1e6] to-[#ffe0cc] backdrop-blur-md shadow-xl border-r border-orange-200">
      
      {/* Header */}
      <div className="p-4">
        <h1 className="text-xl font-bold text-[#ff7e00] tracking-tight flex items-center gap-2">
          <span role="img" aria-label="logo">🍳</span> Tiffin Tales
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3 mt-6 px-2">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            end={item.label === 'Dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group
              ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md'
                  : 'text-gray-800 hover:bg-orange-100'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 w-full flex flex-col items-center gap-3 px-2">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
          className="flex items-center gap-3 w-full justify-center bg-[#ff7e00] text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
