import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminAllChefs() {
  const [chefs, setChefs] = useState([]);
  const [selectedChef, setSelectedChef] = useState(null); // for viewing details

  useEffect(() => {
    const dummyChefs = Array.from({ length: 50 }, (_, i) => ({
      _id: (i + 1).toString(),
      name: `Chef ${i + 1}`,
      email: `chef${i + 1}@example.com`,
      phone: `98765432${(i + 10) % 100}`, // random number
      isApproved: Math.random() < 0.7,
      specialty: ["North Indian", "South Indian", "Chinese", "Italian"][(i + 1) % 4],
    }));

    setChefs(dummyChefs);
  }, []);

  // toggle approval status
  const toggleApproval = (id) => {
    setChefs((prev) =>
      prev.map((chef) =>
        chef._id === id ? { ...chef, isApproved: !chef.isApproved } : chef
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
        All Registered Chefs
      </motion.h2>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chefs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No chefs found.
                </td>
              </tr>
            ) : (
              chefs.map((chef, index) => (
                <tr key={chef._id} className="border-b hover:bg-yellow-100 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{chef.name}</td>
                  <td className="p-3">{chef.email}</td>
                  <td className="p-3">
                    {chef.isApproved ? (
                      <span className="text-green-600 font-semibold">Approved</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => setSelectedChef(chef)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => toggleApproval(chef._id)}
                      className={`${
                        chef.isApproved ? "bg-red-600" : "bg-green-600"
                      } hover:opacity-90 text-white px-3 py-1 rounded`}
                    >
                      {chef.isApproved ? "Reject" : "Approve"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Chef Detail Modal */}
      {selectedChef && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl relative">
            <h3 className="text-2xl font-bold mb-4 text-orange-700">Chef Details</h3>
            <p><strong>Name:</strong> {selectedChef.name}</p>
            <p><strong>Email:</strong> {selectedChef.email}</p>
            <p><strong>Phone:</strong> {selectedChef.phone}</p>
            <p><strong>Specialty:</strong> {selectedChef.specialty}</p>
            <p><strong>Status:</strong>{" "}
              <span className={selectedChef.isApproved ? "text-green-600" : "text-red-600"}>
                {selectedChef.isApproved ? "Approved" : "Pending"}
              </span>
            </p>

            <button
              onClick={() => setSelectedChef(null)}
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
