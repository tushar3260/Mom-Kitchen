import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaUserAlt, FaUtensils, FaRupeeSign } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useChef } from "../Context/ChefContext";

const statusColors = {
  Preparing: "bg-blue-100 text-blue-700",
  Placed: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

/**
 * OrderCard
 * @param {number} autoRefreshMs - polling interval in ms (default 15000). Pass 0/false to disable.
 * @param {function} onLatestOrderChange - callback(latestOrder) fired when order updates (optional).
 */
const OrderCard = ({ autoRefreshMs = 15000, onLatestOrderChange }) => {
  const { chef } = useChef();
  const chefId = chef?._id;

  const [latestOrder, setLatestOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Track mounted state to avoid setting state after unmount
  const isMountedRef = useRef(false);

  // Cache previous latestOrder _id to signal changes
  const prevOrderIdRef = useRef(null);

  const fetchLatestOrder = useCallback(async () => {
    if (!chefId) return;

    // We don't force loading spinner on every poll; only on first load
    let showSpinner = false;
    if (loading && latestOrder === null) showSpinner = true;
    if (showSpinner) setLoading(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/chef/${chefId}`
      );

      const orders = Array.isArray(res.data)
        ? res.data
        : res.data?.orders || [];

      if (orders.length) {
        // Sort by createdAt DESC
        const sorted = orders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const newest = sorted[0];

        // Update state only if component still mounted
        if (isMountedRef.current) {
          setLatestOrder(newest);

          // Fire callback if order changed
          if (newest?._id !== prevOrderIdRef.current) {
            prevOrderIdRef.current = newest?._id;
            onLatestOrderChange?.(newest);
          }
        }
      } else {
        if (isMountedRef.current) setLatestOrder(null);
      }
    } catch (error) {
      console.error("❌ Error fetching latest order:", error);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  }, [chefId, loading, latestOrder, onLatestOrderChange]);

  // Initial fetch on mount / chef change
  useEffect(() => {
    isMountedRef.current = true;
    fetchLatestOrder();
    return () => {
      isMountedRef.current = false;
    };
  }, [chefId, fetchLatestOrder]);

  // Polling effect
  useEffect(() => {
    if (!autoRefreshMs || autoRefreshMs < 1) return; // disabled
    const id = setInterval(() => {
      fetchLatestOrder();
    }, autoRefreshMs);
    return () => clearInterval(id);
  }, [autoRefreshMs, fetchLatestOrder]);

  // --- Render states ---
  if (loading) {
    return (
      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-gray-400 animate-pulse">Fetching latest order...</p>
      </motion.div>
    );
  }

  if (!latestOrder) {
    return (
      <motion.div
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-gray-400">No recent orders found.</p>
      </motion.div>
    );
  }

  return (
    <>
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-xl p-6 border border-orange-100 cursor-pointer hover:shadow-2xl transition"
        onClick={() => setShowModal(true)}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-orange-600">🔥 Latest Order</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              statusColors[latestOrder.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {latestOrder.status}
          </span>
        </div>

        {/* Customer Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <FaUserAlt className="text-orange-600 text-lg" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {latestOrder.userId?.name || "Customer"}
            </p>
            <p className="text-sm text-gray-500">{latestOrder.userId?.email}</p>
          </div>
        </div>

        {/* Meals */}
        <p className="text-gray-700 font-medium mb-2 flex items-center gap-2">
          <FaUtensils /> Ordered Meals:
        </p>
        <ul className="list-disc pl-6 text-sm">
          {latestOrder.meals.map((m) => (
            <li key={m._id} className="font-semibold text-gray-800">
              {m.mealId?.title || "Unknown Meal"}{" "}
              <span className="text-gray-500">x{m.quantity}</span>
            </li>
          ))}
        </ul>

        {/* Price & Time */}
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <FaRupeeSign /> {latestOrder.totalPrice}
          </span>
          <span>{latestOrder.timeSlot}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Ordered on: {new Date(latestOrder.createdAt).toLocaleString()}
        </p>
      </motion.div>

      {/* Full Order Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-2xl relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
              <h2 className="text-2xl font-bold text-orange-600 mb-4">
                Order Details
              </h2>

              <p className="font-semibold">
                Customer: {latestOrder.userId?.name || "Customer"}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Email: {latestOrder.userId?.email}
              </p>

              <p className="font-semibold">Delivery Address:</p>
              <p className="text-sm text-gray-600 mb-4">
                {latestOrder.deliveryAddress?.street},{" "}
                {latestOrder.deliveryAddress?.city} -{" "}
                {latestOrder.deliveryAddress?.pincode}
              </p>

              <p className="font-semibold mb-2">Meals Ordered:</p>
              <ul className="list-disc pl-6 mb-4">
                {latestOrder.meals.map((m) => (
                  <li key={m._id}>
                    {m.mealId?.title} x{m.quantity} - ₹{m.price}
                  </li>
                ))}
              </ul>

              <p className="font-semibold">
                Total Price: ₹{latestOrder.totalPrice}
              </p>
              <p className="text-sm text-gray-500">
                Payment: {latestOrder.paymentMode} ({latestOrder.paymentStatus})
              </p>
              <p className="text-sm text-gray-500">
                Status: {latestOrder.status}
              </p>
              <p className="text-sm text-gray-500">
                Ordered on: {new Date(latestOrder.createdAt).toLocaleString()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderCard;
