import React from "react";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#fff8ee] flex">
      {/* Sidebar - FIXED */}
      <div className="w-64 fixed top-0 left-0 h-screen bg-white shadow-lg z-40">
        <Sidebar />
      </div>

      {/* Main Content with Outlet */}
      <div className="flex-1 ml-64 p-6 transition-all">
        <Outlet /> {/* Yahi par nested routes ka content dikhega */}
      </div>
    </div>
  );
}
