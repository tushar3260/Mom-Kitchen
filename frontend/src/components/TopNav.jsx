import React, { useEffect, useState } from "react";
import TiffinTalesLogo from "../assets/tiffintaleslogo.png";
import { useUser } from '../context/userContext.jsx'; // Custom hook for user context

function TopNav() {
  const { user } = useUser(); // context se user fetch
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const userId = user?._id;

  // Address fetch only if user is logged in
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/user/${userId}/addresses`);
        const data = await res.json();
        setAddresses(data);
        setSelectedAddress(data[0]); // Set first address by default
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };

    if (userId) fetchAddresses();
  }, [userId]);

  // 🔁 Handle Add Address click
  const handleAddAddress = () => {
    if (!user || !user._id) {
      localStorage.setItem("redirectAfterLogin", "/addlocation");
      window.location.href = "/login";
    } else {
      window.location.href = "/addlocation";
    }
  };

  // 🔁 Handle Login click with redirect memory
  const handleLoginRedirect = () => {
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    window.location.href = "/login";
  };

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
          {user && addresses.length > 0 ? (
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
            <span className="font-semibold text-black ml-2">Login to see addresses</span>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddAddress}
            className="text-sm border border-gray-300 px-3 py-1 rounded-full text-gray-600 hover:text-black hover:border-black transition"
          >
            Add Location
          </button>

          {!user ? (
            <button
              onClick={handleLoginRedirect}
              className="bg-yellow-400 hover:bg-yellow-500 text-sm text-white px-4 py-1.5 rounded-full transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => window.location.href = "/profile"}
              className="bg-gray-100 hover:bg-gray-200 text-sm text-black px-4 py-1.5 rounded-full transition"
            >
              My Profile
            </button>
          )}
        </div>
      </div>

      {/* MOBILE SCREEN: Show selected address */}
      <div className="md:hidden px-4 pb-2 text-sm text-center text-gray-600">
        Deliver to:{" "}
        <span className="font-semibold text-black">
          {selectedAddress
            ? `${selectedAddress.tag} - ${selectedAddress.city} (${selectedAddress.pincode})`
            : user ? "Loading..." : "Login to view address"}
        </span>
      </div>
    </header>
  );
}

export default TopNav;
