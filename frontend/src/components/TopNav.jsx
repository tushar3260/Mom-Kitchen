import React from "react";


function TopNav() {
  

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-orange-500 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" className="w-8" />
          <span className="text-orange-500 font-bold text-lg">food</span>
          <span className="text-yellow-500 font-bold text-lg">wagon</span>
        </div>
        <div className="text-sm text-gray-600">
            Deliver to: <span className="font-semibold text-black">Current Location: <span className="text-gray-700">{typeof location === 'string' ? location : "Loading..."}</span></span>

        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm border border-gray-300 px-4 py-1 rounded-full text-gray-600 hover:text-black hover:border-black">Add Location</button>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-sm text-white px-5 py-1.5 rounded-full">Login</button>
        </div>
      </div>

      
    </div>
  );
};

export default TopNav;