import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeadset, FaEnvelope, FaPhone, FaQuestionCircle, FaPaperPlane } from "react-icons/fa";

export default function Support() {
  const [faqOpen, setFaqOpen] = useState(null);

  const faqs = [
    { q: "How can I update my plan?", a: "Go to 'My Plans' in Dashboard > Edit Plan > Save changes." },
    { q: "What if my meal is late?", a: "Contact our support team via Live Chat or Call." },
    { q: "How do I add money to my wallet?", a: "Open Wallet > Click on 'Add Money' > Complete payment." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 sm:p-6 lg:p-10 bg-gradient-to-b from-gray-50 to-white min-h-screen space-y-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl shadow-md text-white text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Customer Support</h1>
        <p className="text-sm sm:text-base opacity-90 mt-1">We’re here to help you 24/7</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-5 rounded-xl shadow text-center space-y-3"
        >
          <FaPhone className="text-3xl text-blue-500 mx-auto" />
          <h2 className="text-lg font-semibold">Call Us</h2>
          <p className="text-gray-600 text-sm">+91 98765 43210</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-5 rounded-xl shadow text-center space-y-3"
        >
          <FaEnvelope className="text-3xl text-green-500 mx-auto" />
          <h2 className="text-lg font-semibold">Email Us</h2>
          <p className="text-gray-600 text-sm">support@tiffintales.com</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-5 rounded-xl shadow text-center space-y-3"
        >
          <FaHeadset className="text-3xl text-purple-500 mx-auto" />
          <h2 className="text-lg font-semibold">Live Chat</h2>
          <p className="text-gray-600 text-sm">Connect instantly</p>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-5 rounded-xl shadow"
      >
        <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
          <FaQuestionCircle className="text-blue-500" /> Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full flex justify-between items-center px-4 py-2 font-medium text-gray-800 hover:bg-gray-50"
              >
                {item.q}
                <span className="text-xl">{faqOpen === i ? "−" : "+"}</span>
              </button>
              {faqOpen === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-4 py-2 text-gray-600 text-sm bg-gray-50"
                >
                  {item.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-gradient-to-r from-indigo-100 to-blue-50 p-6 rounded-xl shadow"
      >
        <h2 className="text-lg sm:text-xl font-bold mb-3">Need More Help?</h2>
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <textarea
            rows="3"
            placeholder="Your Message"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FaPaperPlane /> Send
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
