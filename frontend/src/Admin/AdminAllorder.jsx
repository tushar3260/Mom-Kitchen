import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminAllOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const dummyOrders = Array.from({ length: 50 }, (_, i) => ({
      _id: (i + 1).toString(),
      userName: `User ${i + 1}`,
      chefName: `Chef ${((i % 10) + 1)}`,
      items: [`Item A${i + 1}`, `Item B${i + 2}`],
      address: `Street ${i + 5}, City ${(i % 5) + 1}`,
      amount: Math.floor(Math.random() * 1000) + 200,
      status: Math.random() < 0.6 ? "Delivered" : Math.random() < 0.5 ? "Pending" : "Cancelled",
      date: new Date(Date.now() - i * 86400000).toLocaleDateString("en-IN"),
    }));

    setOrders(dummyOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 p-6">
      <motion.h2
        className="text-3xl font-bold text-orange-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        All Orders
      </motion.h2>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">User</th>
              <th className="p-3">Chef</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order._id} className="border-b hover:bg-yellow-100 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{order.userName}</td>
                  <td className="p-3">{order.chefName}</td>
                  <td className="p-3">₹{order.amount}</td>
                  <td className="p-3">
                    <span className={`font-semibold ${
                      order.status === "Delivered" ? "text-green-600" :
                      order.status === "Pending" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl relative">
            <h3 className="text-2xl font-bold mb-4 text-orange-700">Order Details</h3>
            <p><strong>User:</strong> {selectedOrder.userName}</p>
            <p><strong>Chef:</strong> {selectedOrder.chefName}</p>
            <p><strong>Amount:</strong> ₹{selectedOrder.amount}</p>
            <p><strong>Status:</strong>{" "}
              <span className={
                selectedOrder.status === "Delivered" ? "text-green-600" :
                selectedOrder.status === "Pending" ? "text-yellow-600" :
                "text-red-600"
              }>
                {selectedOrder.status}
              </span>
            </p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Items:</strong> {selectedOrder.items.join(", ")}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>

            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 text-red-600 hover:scale-110 font-bold text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
