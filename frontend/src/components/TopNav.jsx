import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import TiffinTalesLogo from "../assets/tiffintaleslogo.png";
import { useUser } from "../context/userContext.jsx";
import Loading from "../Loading.jsx";
import { storage } from "../utils/Storage.js";

function TopNav({ onLoginClick }) {
  const { user, setUser } = useUser();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [redirectLoading, setRedirectLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const userId = user?._id;

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/${userId}/address`
        );
        const data = res.data;
        if (Array.isArray(data) && data.length > 0) {
          setAddresses(data);
          setSelectedAddress(data[0]);
        } else if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
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
            (err) => console.error("Geolocation error:", err),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
          );
        }
      } catch (err) {
        console.error("Error fetching addresses from backend:", err);
      }
    };
    fetchAddresses();
  }, [userId]);

  // Fetch Cart Count
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

  const handleLoginRedirect = () => {
    setRedirectLoading(true);
    storage.setItem("redirectAfterLogin", window.location.pathname);
    setTimeout(() => (window.location.href = "/login"), 800);
  };

  const handleLogout = () => {
    setLogoutLoading(true);
    storage.removeItem("userData");
    setTimeout(() => (window.location.href = "/"), 800);
    setUser(null);
  };

  if (redirectLoading) return <Loading message="Redirecting to login..." />;
  if (logoutLoading) return <Loading message="Logging Out..." />;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={TiffinTalesLogo} alt="Tiffin Tales" className="h-14 w-auto" />
        </div>

        {/* Address Bar (Desktop Only) */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full shadow-sm max-w-[400px] cursor-pointer">
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Become a Chef */}
          <motion.button
            whileHover={{ scale: 0.9 }}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold px-4 py-2 rounded-full shadow"
            onClick={() => (window.location.href = "/chef")}
          >
            Become a Chef
          </motion.button>

          {/* Cart & Profile */}
          {user && (
            <>
              <motion.div whileHover={{ scale: 1.2 }} className="relative">
                <button onClick={() => (window.location.href = "/cart")}>
                  <FaShoppingCart size={22} className="text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.2 }} className="relative">
                <img
                  src={
                    user?.avtar ||
                    "https://cdn-icons-png.flaticon.com/512/11018/11018596.png"
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full cursor-pointer border-2 border-orange-300 object-cover"
                  onClick={() => setProfileOpen(!profileOpen)}
                />
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
                          onClick={() => (window.location.href = "/orders")}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          My Orders
                        </li>
                        <li
                          onClick={() => (window.location.href = "/profile")}
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
                          onClick={() => (window.location.href = "/dashboard")}
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

          {!user && (
            <button
              onClick={onLoginClick}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white shadow-lg px-4 py-3"
          >
            <ul className="space-y-3 text-gray-700">
              <li onClick={() => (window.location.href = "/chef")}>
                Become a Chef
              </li>
              {user && (
                <>
                  <li onClick={() => (window.location.href = "/cart")}>
                    Cart ({cartCount})
                  </li>
                  <li onClick={() => (window.location.href = "/orders")}>
                    My Orders
                  </li>
                  <li onClick={() => (window.location.href = "/profile")}>
                    Profile
                  </li>
                  <li onClick={handleLogout} className="text-red-500">
                    Logout
                  </li>
                </>
              )}
              {!user && (
                <li>
                  <button
                    onClick={onLoginClick}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold transition"
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default TopNav;
