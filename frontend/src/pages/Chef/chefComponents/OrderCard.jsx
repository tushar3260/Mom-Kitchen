import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const OrderCard = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl shadow-lg p-6"
  >
    <h3 className="text-xl font-semibold mb-3">Latest Order</h3>
    <div className="flex items-center gap-4">
      <FaUserAlt className="text-2xl text-[#ff7e00]" />
      <div>
        <p className="font-semibold">William Durbin</p>
        <p className="text-sm text-gray-500">william@example.com</p>
      </div>
    </div>
    <p className="mt-4 font-medium">Ordered Dish:</p>
    <div className="mt-2 flex items-center gap-2">
      <img src="https://i.ibb.co/0j1cYYT/mexican-fried-chicken.jpg" alt="dish" className="w-10 h-10 rounded-full object-cover" />
      <p>Mexican Fried Chicken 🌶🔥</p>
    </div>
  </motion.div>
);

export default OrderCard;
