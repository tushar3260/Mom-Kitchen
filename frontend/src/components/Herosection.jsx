import React, { useState } from "react";
import girlPizzaImg from "../assets/girleatingpizza.jpg";

function Herosection() {
  const [mode, setMode] = useState("delivery");

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="bg-[#fff7ed] py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative">
        <div className="max-w-xl z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Are you starving?
          </h1>
          <p className="text-gray-600 mb-6">
            Within a few clicks, find meals that are accessible near you
          </p>

          {/* Delivery/Pickup Toggle */}
          <div className="relative w-fit bg-gray-100 rounded-full p-1 flex gap-2 mb-3">
            {/* Sliding Indicator */}
            <div
              className={`absolute top-1 left-1 h-[34px] w-[90px] rounded-full bg-white shadow-md transition-all duration-300 ease-in-out z-0 ${
                mode === "pickup" ? "translate-x-[100px]" : "translate-x-0"
              }`}
            ></div>

            {/* Buttons */}
            <button
              onClick={() => setMode("delivery")}
              className={`relative z-10 w-[90px] text-sm font-medium py-1.5 rounded-full ${
                mode === "delivery"
                  ? "text-orange-500"
                  : "text-gray-500"
              }`}
            >
              🍔 Delivery
            </button>
            <button
              onClick={() => setMode("pickup")}
              className={`relative z-10 w-[90px] text-sm font-medium py-1.5 rounded-full ${
                mode === "pickup"
                  ? "text-orange-500"
                  : "text-gray-500"
              }`}
            >
              🥡 Pickup
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <div className="bg-white rounded-lg p-4 w-full z-10 relative shadow-[0px_10px_30px_rgba(255,115,0,0.25)]">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter Your Address"
                  className="flex-grow bg-gray-100 px-4 py-2 rounded-l-md outline-none text-sm"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-sm font-medium rounded-r-md">
                  🔍 Find Food
                </button>
              </div>
            </div>
            <div className="absolute top-full left-0 right-0 h-3 bg-gradient-to-b from-orange-100 to-transparent rounded-b-lg shadow-xl blur-sm"></div>
          </div>
        </div>

        <div className="mt-10 md:mt-0 z-10">
          <img
            src={girlPizzaImg}
            alt="Girl Eating Pizza"
            className="w-80 md:w-96"
          />
        </div>
      </div>
    </div>
  );
}

export default Herosection;
