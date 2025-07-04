import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaLeaf, FaHeartbeat } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-yellow-100 flex flex-col items-center justify-center text-gray-800 p-8">

      {/* Logo + Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring' }}
        className="flex items-center gap-4 mb-6"
      >
        <FaUtensils className="text-5xl text-orange-600 drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold text-orange-700 drop-shadow-lg tracking-widest">
          Tiffin Tales
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-xl mb-4 max-w-2xl text-center text-gray-700 leading-relaxed font-semibold"
      >
        Every Meal Tells a Story. Taste the warmth of **homemade love**—fresh, authentic, and delivered right to your doorstep.
      </motion.p>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-center"
      >
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-yellow-300 hover:scale-105 transition">
          <FaHeartbeat className="text-red-500 text-3xl mb-3 mx-auto" />
          <h3 className="font-bold text-lg mb-2">Healthy & Homemade</h3>
          <p className="text-sm text-gray-600">
            Made with fresh ingredients, just like your mom would cook.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-yellow-300 hover:scale-105 transition">
          <FaLeaf className="text-green-500 text-3xl mb-3 mx-auto" />
          <h3 className="font-bold text-lg mb-2">Pure Veg Options</h3>
          <p className="text-sm text-gray-600">
            100% vegetarian and customizable meals—everyday comfort food.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-yellow-300 hover:scale-105 transition">
          <FaUtensils className="text-orange-500 text-3xl mb-3 mx-auto" />
          <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
          <p className="text-sm text-gray-600">
            Hot and fresh meals delivered on time, every time.
          </p>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="flex gap-6 mt-10"
      >
        <motion.a
          href="/login"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-600 hover:bg-orange-500 rounded-2xl px-8 py-3 text-white shadow-lg text-lg font-semibold tracking-wide transition"
        >
          Login
        </motion.a>

        <motion.a
          href="/signup"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-500 hover:bg-yellow-400 rounded-2xl px-8 py-3 text-white shadow-lg text-lg font-semibold tracking-wide transition"
        >
          Sign Up
        </motion.a>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-10 text-sm text-gray-500 text-center"
      >
        © 2025 Tiffin Tales | Made with ❤️, Spice & Everything Nice.
      </motion.div>

    </div>
  );
};

export default LandingPage;
