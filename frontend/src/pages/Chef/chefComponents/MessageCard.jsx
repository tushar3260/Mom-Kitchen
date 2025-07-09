import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MessageCard = () => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-2xl shadow-lg p-6"
  >
    <h3 className="text-xl font-semibold mb-3">Messages</h3>
    <div className="flex gap-4 items-start">
      <FaEnvelope className="text-2xl text-[#ff7e00] mt-1" />
      <div>
        <p><strong>William</strong> ordered Mexican Fried Chicken and requested extra spicy sauce 🌶️🔥</p>
        <button className="mt-4 bg-[#ff7e00] text-white py-1 px-4 rounded-lg text-sm hover:bg-orange-600">View More</button>
      </div>
    </div>
  </motion.div>
);

export default MessageCard;
