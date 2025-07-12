import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext.jsx"; // Custom hook for user context


const Threedot = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user, setUser } = useUser();


  const handleOptionClick = (label) => {
    setIsMenuOpen(false);

    if (label === "Profile") {
      navigate("/dashboard");
    } else if (label === "Orders") {
      navigate("/orders");
    } else if (label === "Logout") {
      alert("Logging out...");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      {/* Three Dot Icon */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="text-gray-600 hover:text-black p-2"
        title="More Options"
      >
        <FaEllipsisV size={18} />
      </button>

      {/* Side Drawer */}
      {isMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-500 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => handleOptionClick("Profile")}
              className="w-full px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              Profile
            </button>
            <button
              onClick={() => handleOptionClick("Orders")}
              className="w-full px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              Orders
            </button>
            <button
              onClick={() => handleLogout("Logout")}
              className="w-full px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Threedot;
