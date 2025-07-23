import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import axios from "axios";
import TiffinTalesLogo from "../assets/tiffintaleslogo.png";
import { useUser } from "../context/userContext.jsx";
import Loading from "../Loading.jsx";
import { storage } from "../utils/Storage.js";
import { Navigate } from "react-router-dom";
function TopNav({onLoginClick}) {
  const { user, setUser } = useUser();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [redirectLoading, setRedirectLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // ✅ Profile dropdown state
  const [cartCount, setCartCount] = useState(0); // ✅ Dynamic Cart Count
  const userId = user?._id;

  //address
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userId) return;

      try {
        // 🔹 Try to fetch saved addresses from backend
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/${userId}/address`
        );
        const data = res.data;

        if (Array.isArray(data) && data.length > 0) {
          setAddresses(data);
          setSelectedAddress(data[0]);
        } else {
          // 🔹 No address in DB – fallback to real-time geolocation
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                console.log("Detected Latitude:", latitude);
                console.log("Detected Longitude:", longitude);

                try {
                  // 🔹 Reverse geocoding via Nominatim (free)
                  const locationRes = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                  );

                  const locationData = locationRes.data;

                  const addressObj = {
                    addressLine: locationData.display_name,
                    latitude,
                    longitude,
                  };

                  setAddresses([addressObj]);
                  setSelectedAddress(addressObj);
                } catch (err) {
                  console.error("Error in reverse geocoding:", err);
                }
              },
              (err) => {
                console.error("Geolocation error:", err);
              },
              {
                enableHighAccuracy: true, // ✅ Use GPS when available
                timeout: 10000,
                maximumAge: 0,
              }
            );
          } else {
            console.warn("Geolocation is not supported by this browser.");
          }
        }
      } catch (err) {
        console.error("Error fetching addresses from backend:", err);
      }
    };

    fetchAddresses();
  }, [userId]);

  // ✅ Fetch Cart Count
  useEffect(() => {
    if (!userId) return;
    const fetchCartCount = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/cart/${userId}`
        );
        setCartCount(res.data?.items?.length || 0);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCartCount();
  }, [userId]);

  // ✅ Login Redirect
  const handleLoginRedirect = () => {
    setRedirectLoading(true);
    storage.setItem("redirectAfterLogin", window.location.pathname);
    setTimeout(() => {
      window.location.href = "/login";
    }, 800);
  };

  // ✅ Logout
  const handleLogout = () => {
    setLogoutLoading(true);
    storage.removeItem("userData");
    setTimeout(() => {
      window.location.href = "/";
    }, 800);
    setUser(null);
  };

  if (redirectLoading) return <Loading message="Redirecting to login..." />;
  if (logoutLoading) return <Loading message="Logging Out..." />;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* ✅ Logo */}
        <div className="flex items-center">
          <img
            src={TiffinTalesLogo}
            alt="Tiffin Tales"
            className="h-40 w-auto"
          />
        </div>

        <div className="hidden md:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full shadow-sm transition-all duration-300 max-w-[400px] overflow-hidden cursor-pointer">
          <span className="text-pink-600 text-lg">📍</span>

          {user ? (
            addresses.length > 0 ? (
              <select
                value={selectedAddress?._id || "live-location"}
                onChange={(e) => {
                  const selected = addresses.find(
                    (addr) => addr._id === e.target.value
                  );
                  if (selected) setSelectedAddress(selected);
                }}
                className="bg-transparent outline-none text-sm font-medium text-gray-800 truncate w-full"
              >
                {addresses.map((addr) => (
                  <option key={addr._id} value={addr._id}>
                    {addr.tag} - {addr.city} ({addr.pincode})
                  </option>
                ))}
                {selectedAddress?.addressLine && !selectedAddress?._id && (
                  <option value="live-location">
                    📍 {selectedAddress.addressLine}
                  </option>
                )}
              </select>
            ) : selectedAddress?.addressLine ? (
              <p className="text-sm font-medium text-gray-800 truncate">
                {selectedAddress.addressLine}
              </p>
            ) : (
              <p className="text-sm font-medium text-gray-600">
                No Address Found
              </p>
            )
          ) : (
            <p className="text-sm font-medium text-gray-600">
              Login to see addresses
            </p>
          )}
        </div>

        {/* ✅ Buttons */}
        <div className="flex items-center gap-4">
          {/* Become a Chef */}
          <motion.button
            whileHover={{ scale: 0.9 }}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold px-4 py-2 rounded-full shadow hover:shadow-lg transition"
            onClick={() => (window.location.href = "/chef")}
          >
            Become a Chef
          </motion.button>

          {/* ✅ Show Cart & Profile Only if Logged In */}
          {user && (
            <>
              {/* Cart */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="relative cursor-pointer"
              >
                <button
                  onClick={() => {
                    window.location.href = "/cart";
                  }}
                >
                  <FaShoppingCart size={22} className="text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              </motion.div>

              {/* ✅ Profile Dropdown */}
              <motion.div whileHover={{ scale: 1.2 }} className="relative">
                <span>
                  <img
                    src={
                      user?.avtar ||
                      "https://cdn-icons-png.flaticon.com/512/11018/11018596.png"
                    }
                    alt="Profile"
                    className="w-9 h-9 rounded-full cursor-pointer border-2 border-orange-300 object-cover"
                    onClick={() => setProfileOpen(!profileOpen)}
                  />
                </span>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border"
                    >
                      <ul className="text-gray-700 text-sm">
                        <li
                          onClick={() => {
                            window.location.href = "/orders";
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          My Orders
                        </li>
                        <li
                          onClick={() => {
                            window.location.href = "/profile";
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Profile
                        </li>
                        <li
                          onClick={handleLogout}
                          className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
                        >
                          Logout
                        </li>
                        <li
                          onClick={() => {
                            window.location.href = "/dashboard";
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Dashboard
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </>
          )}

          {/* ✅ Login button only when not logged in */}
          {!user && (
        <button
          onClick={onLoginClick}  // 👈 Yaha call ho raha hai
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold transition"
        >
          Login
        </button>
      )}
        </div>
      </div>
    </header>
  );
}

export default TopNav;
