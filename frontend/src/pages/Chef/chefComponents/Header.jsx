import React from 'react';
import { motion } from 'framer-motion';

const Header = () => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex justify-between items-center mb-6"
  >
    <h2 className="text-3xl font-bold text-[#ff7e00]">Welcome Back, Chef Williams! 👨‍🍳</h2>
    <input
      type="text"
      placeholder="Search"
      className="border border-gray-300 rounded-xl p-2 px-4 shadow-sm"
    />
  </motion.div>
);

export default Header;
