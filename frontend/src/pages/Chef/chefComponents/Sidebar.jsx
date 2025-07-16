import React from 'react';
import {
  FaClipboardList, FaUtensils, FaStar,
  FaDollarSign, FaEnvelope, FaSignOutAlt,
  FaShoppingCart
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', icon: <FaClipboardList />, path: '' },
  { label: 'Orders', icon: <FaShoppingCart />, path: 'orders' },
  { label: 'Menu', icon: <FaUtensils />, path: 'menu' },
  { label: 'Reviews', icon: <FaStar />, path: 'reviews' },
  { label: 'Earnings', icon: <FaDollarSign />, path: 'earnings' },
  { label: 'Messages', icon: <FaEnvelope />, path: 'messages' },
];

const Sidebar = () => {
  return (
    <div className="group fixed top-0 left-0 h-screen z-50 bg-gradient-to-b from-[#fff1e6] to-[#ffe0cc] backdrop-blur-md shadow-xl border-r border-orange-200 transition-all duration-300 w-16 hover:w-56">

      {/* Header */}
      <div className="p-4 flex items-center gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
        <span role="img" aria-label="logo">🍳</span>
        <h1 className="text-xl font-bold text-[#ff7e00] tracking-tight whitespace-nowrap">
          Tiffin Tales
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
            <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 w-full px-2">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
          className="flex items-center justify-center gap-2 w-full bg-[#ff7e00] text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <FaSignOutAlt />
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
