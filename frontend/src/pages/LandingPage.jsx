// import React, { useState } from 'react';
import React from 'react';
// import { motion } from 'framer-motion';

const LandingPage = () => {
  
  

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex flex-col items-center justify-center text-gray-800 p-8">
      
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-4 text-orange-700 drop-shadow-lg"
      >
        Mom's Kitchen
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg mb-8 max-w-xl text-center"
      >
        Homemade food made with love, straight to your doorstep. Taste the magic of authentic, home-cooked meals.
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7 }}
        className="flex gap-6"
      >
        <button
          
          className="bg-orange-600 hover:bg-orange-500 rounded-xl px-6 py-2 text-white shadow-lg"
        >
          Login
        </button>

        <button
         
          className="bg-yellow-500 hover:bg-yellow-400 rounded-xl px-6 py-2 text-white shadow-lg"
        >
          Sign Up
        </button>
      </motion.div>

      
      
    </div>
  );
};

export default LandingPage;
