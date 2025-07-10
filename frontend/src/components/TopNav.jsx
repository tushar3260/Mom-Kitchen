import React, { useEffect, useState } from "react";
import TiffinTalesLogo from "../assets/tiffintaleslogo.png";

function TopNav() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/user/${userId}/addresses`);
        const data = await res.json();
        setAddresses(data);
        setSelectedAddress(data[0]); // default selected address
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };

    if (userId) fetchAddresses();
  }, [userId]);

  return (
    <header className="bg-white shadow-sm border-b-2 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        
        {/* LOGO SECTION */}
        <div className="flex items-center pl-2 min-w-[120px]">
          <img
            src={TiffinTalesLogo}
            alt="Tiffin Tales Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* LOCATION DROPDOWN */}
        <div className="hidden md:block text-sm text-gray-600">
          Deliver to:{" "}
          {addresses.length > 0 ? (
            <select
              value={selectedAddress?._id}
              onChange={(e) =>
                setSelectedAddress(
                  addresses.find((addr) => addr._id === e.target.value)
                )
              }
              className="ml-2 border-none bg-transparent font-semibold text-black"
            >
              {addresses.map((addr) => (
                <option key={addr._id} value={addr._id}>
                  {addr.tag} - {addr.city} ({addr.pincode})
                </option>
              ))}
            </select>
          ) : (
            <span className="font-semibold text-black ml-2">Loading...</span>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <button 
          onClick={() => (window.location.href = "/addlocation")}
          className="text-sm border border-gray-300 px-3 py-1 rounded-full text-gray-600 hover:text-black hover:border-black transition">
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

      {/* Mobile: Show selected address */}
      <div className="md:hidden px-4 pb-2 text-sm text-center text-gray-600">
        Deliver to:{" "}
        <span className="font-semibold text-black">
          {selectedAddress
            ? `${selectedAddress.tag} - ${selectedAddress.city} (${selectedAddress.pincode})`
            : "Loading..."}
        </span>
      </div>
    </header>
  );
}

export default TopNav;
