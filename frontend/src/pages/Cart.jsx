import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const paymentOptions = ["Cash On Delivery", "UPI", "Card", "Razorpay"];
const upiApps = ["GPay", "PhonePe", "Paytm", "Amazon Pay"];
const timeSlots = ["Lunch", "Dinner"];

const Cart = () => {
  const [address, setAddress] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [selectedUPI, setSelectedUPI] = useState("");

  const handlePlaceOrder = () => {
    if (!address || !timeSlot || !paymentMode) {
      toast.error("Please fill all the fields.");
      return;
    }
    toast.success("Order placed successfully! 🥳");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          🍛 Checkout
        </h1>

        {/* Address */}
        <div className="mb-6">
          <label className="block font-semibold text-lg mb-2">Delivery Address</label>
          <textarea
            rows={3}
            className="w-full border border-orange-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full address..."
          />
        </div>

        {/* Time Slot */}
        <div className="mb-6">
          <label className="block font-semibold text-lg mb-2">Select Time Slot</label>
          <select
            className="w-full border border-orange-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">Select</option>
            {timeSlots.map((slot) => (
              <option key={slot}>{slot}</option>
            ))}
          </select>
        </div>

        {/* Payment Options */}
        <div className="mb-6">
          <label className="block font-semibold text-lg mb-2">Payment Option</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paymentOptions.map((option) => (
              <motion.div
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPaymentMode(option)}
                className={`p-4 rounded-xl cursor-pointer text-center shadow transition-all duration-300 font-medium
                ${
                  paymentMode === option
                    ? "bg-orange-500 text-white"
                    : "bg-white border hover:bg-orange-100"
                }`}
              >
                {option}
              </motion.div>
            ))}
          </div>
        </div>

        {/* UPI Apps */}
        {paymentMode === "UPI" && (
          <div className="mb-6">
            <label className="block font-semibold text-lg mb-2">Choose UPI App</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {upiApps.map((app) => (
                <motion.div
                  key={app}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedUPI(app)}
                  className={`p-3 rounded-xl cursor-pointer text-center shadow font-medium
                  ${
                    selectedUPI === app
                      ? "border-2 border-orange-500 bg-orange-100"
                      : "bg-white border hover:bg-orange-50"
                  }`}
                >
                  {app}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Place Order Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handlePlaceOrder}
          className="mt-8 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg"
        >
          ✅ Place Order
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Cart;
