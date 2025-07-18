import React, { useEffect, useState } from "react";
import axios from "axios";
import TiffinTalesLogo from "../assets/tiffintaleslogo.png";
import { useUser } from "../context/userContext.jsx"; // Custom hook for user context
import ThreeDotMenu from "./Threedot.jsx";
import Loading from "../Loading.jsx";

function TopNav() {
  const { user, setUser } = useUser();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [redirectLoading, setRedirectLoading] = useState(false); // ✅ NEW
  const [logoutLoading, setLogoutLoading] = useState(false)
  const userId = user?._id;

  // ✅ Fetch addresses on user login
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userId) return;

      try {
        console.log("Fetching addresses for userId:", userId);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/${userId}/address`
        );
        const data = res.data;

        console.log("Fetched addresses:", data);

        if (Array.isArray(data) && data.length > 0) {
          setAddresses(data);
          setSelectedAddress(data[0]);
        } else {
          setAddresses([]);
          setSelectedAddress(null);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };

    fetchAddresses();
  }, [userId]);

  // ✅ Add Address Click
  const handleAddAddress = () => {
    if (!userId) {
      localStorage.setItem("redirectAfterLogin", "/addlocation");
      window.location.href = "/login";
    } else {
      window.location.href = "/addlocation";
    }
  };

  // ✅ Login Click with Redirect and Loading
  const handleLoginRedirect = () => {
    setRedirectLoading(true);
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    setTimeout(() => {
      window.location.href = "/login";
    }, 800); // for smooth UX
  };

  // ✅ Logout
  const handleLogout = () => {
    setLogoutLoading(true);
    localStorage.removeItem("userData");
    setTimeout(()=>{
      window.location.href = "/"
    },800)
    setUser(null);
   
  };

  // ✅ Show loading screen when redirecting
  if (redirectLoading) return <Loading message="Redirecting to login..." />;
  if (logoutLoading)   return <Loading message="Logging Out....." />;
  return (
    <header className="bg-red shadow-sm border-b-2 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center pl-2 min-w-[120px]">
          <img
            src={TiffinTalesLogo}
            alt="Tiffin Tales Logo"
            className="h-50 w-auto object-contain"
          />
        </div>

        {/* LOCATION DROPDOWN - Desktop */}
        <div className="hidden md:block text-sm text-gray-600">
          Deliver to:{" "}
          {user ? (
            addresses.length > 0 ? (
              <select
                value={selectedAddress?._id || ""}
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
              <span className="ml-2 font-semibold text-black">
                No address found
              </span>
            )
          ) : (
            <span className="ml-2 font-semibold text-black">
              Login to see addresses
            </span>
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
              onClick={handleLogout}
              className="bg-red-100 hover:bg-red-200 text-sm text-red-600 px-4 py-1.5 rounded-full transition"
            >
              Logout
            </button>
          )}
          <ThreeDotMenu />
        </div>
      </div>

      {/* MOBILE SCREEN: Show selected address */}
      <div className="md:hidden px-4 pb-2 text-sm text-center text-gray-600">
        Deliver to:{" "}
        <span className="font-semibold text-black">
          {user ? (
            selectedAddress ? (
              `${selectedAddress.tag} - ${selectedAddress.city} (${selectedAddress.pincode})`
            ) : addresses.length === 0 ? (
              "No address found"
            ) : (
              "Loading..."
            )
          ) : (
            "Login to view address"
          )}
        </span>
      </div>
    </header>
  );
}

export default TopNav;
