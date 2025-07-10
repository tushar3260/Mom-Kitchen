import React from "react";
import TiffinTalesLogo from "../assets/tiffintaleslogo.png"

function TopNav() {
  return (
    <header className="bg-white shadow-sm border-b-2 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        
        {/* LOGO SECTION */}
        <div className="flex items-center pl-2 min-w-[120px]">
  <img
    src={TiffinTalesLogo}
    alt="Tiffin Tales Logo"
    className="h-50 w-auto object-contain"
  />
</div>

        {/* LOCATION SECTION */}
        <div className="hidden md:block text-sm text-gray-600">
          Deliver to:{" "}
          <span className="font-semibold text-black">
            Current Location:{" "}
            <span className="text-gray-700">
              {typeof location === "string" ? location : "Loading..."}
            </span>
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <button className="text-sm border border-gray-300 px-3 py-1 rounded-full text-gray-600 hover:text-black hover:border-black transition">
            Add Location
          </button>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-yellow-400 hover:bg-yellow-500 text-sm text-white px-4 py-1.5 rounded-full transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Location for Mobile Screens */}
      <div className="md:hidden px-4 pb-2 text-sm text-center text-gray-600">
        Deliver to:{" "}
        <span className="font-semibold text-black">
          Current Location:{" "}
          <span className="text-gray-700">
            {typeof location === "string" ? location : "Loading..."}
          </span>
        </span>
      </div>
    </header>
  );
}

export default TopNav;
