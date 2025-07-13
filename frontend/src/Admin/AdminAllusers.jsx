import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Generate 50 dummy users
    const dummyUsers = Array.from({ length: 50 }, (_, i) => ({
      _id: (i + 1).toString(),
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `9876500${(i + 10) % 100}`, // random number
      isBlocked: Math.random() < 0.3, // 30% chance to be blocked
    }));

    setUsers(dummyUsers);
  }, []);

  // toggle block/unblock
  const toggleBlock = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === id ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 p-6">
      <motion.h2
        className="text-3xl font-bold text-orange-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        All Registered Users
      </motion.h2>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-yellow-100 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">
                    {user.isBlocked ? (
                      <span className="text-red-600 font-semibold">Blocked</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Active</span>
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                      View
                    </button>
                    <button
                      onClick={() => toggleBlock(user._id)}
                      className={`${
                        user.isBlocked ? "bg-green-600" : "bg-red-600"
                      } hover:opacity-90 text-white px-3 py-1 rounded`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
