import React from 'react';
import {
  FaClipboardList,
  FaUtensils,
  FaStar,
  FaDollarSign,
  FaEnvelope,
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gradient-to-b from-orange-100 to-orange-50 p-6 min-h-screen flex flex-col justify-between shadow-lg animate-fadeIn">
      <div>
        <h1 className="text-2xl font-extrabold text-[#ff7e00] mb-10 tracking-wide flex items-center gap-2">
          🍳 <span className="hover:tracking-widest duration-300">Tiffin tales</span>
        </h1>
        <ul className="space-y-3 font-medium text-gray-700">
          <NavItem to="/chef/chefdashboard" icon={<FaHome />} label="Dashboard" />
          <NavItem to="/chef/orders" icon={<FaClipboardList />} label="Orders" />
          <NavItem to="/chef/menu" icon={<FaUtensils />} label="Menu" />
          <NavItem to="/chef/reviews" icon={<FaStar />} label="Reviews" />
          <NavItem to="/chef/earnings" icon={<FaDollarSign />} label="Earnings" />
          <NavItem to="/chef/messages" icon={<FaEnvelope />} label="Messages" />
        </ul>
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          navigate('/');
        }}
        className="bg-[#ff7e00] text-white py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-xl"
      >
        <FaSignOutAlt className="animate-pulse" />
        Logout
      </button>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
           ${
             isActive
               ? 'bg-orange-200 text-[#ff7e00] shadow-md scale-[1.03]'
               : 'hover:bg-orange-100 hover:text-[#ff7e00]'
           }`
        }
      >
        <span className="text-xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
          {icon}
        </span>
        <span className="text-[1rem] tracking-wide">{label}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;
