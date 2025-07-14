import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminAllChefs() {
  const [chefs, setChefs] = useState([]);
  const [selectedChef, setSelectedChef] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const token = localStorage.getItem("AdminToken");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/chefs/getAllChefs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChefs(res.data);
      } catch (err) {
        console.error("Error fetching chefs:", err);
        setError(err.response?.data?.message || "Something went wrong");
      }
    };

    fetchChefs();
  }, []);

  const fetchChefDetails = async (id) => {
    try {
      const token = localStorage.getItem("AdminToken");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/chefs/getChefById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedChef(res.data);
    } catch (err) {
      console.error("Error fetching chef details:", err);
      setError(err.response?.data?.message || "Failed to fetch chef details");
    }
  };

  const toggleApproval = (id) => {
    setChefs((prev) =>
      prev.map((chef) =>
        chef._id === id ? { ...chef, isVerified: !chef.isVerified } : chef
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
                    {chef.isVerified ? (
                      <span className="text-green-600 font-semibold">Approved</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    {/* Stylish View Button */}
                    <button
                      onClick={() => fetchChefDetails(chef._id)}
                      className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-white px-4 py-1.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 font-semibold"
                    >
                      👁 View
                    </button>

                    {/* Original Approve/Reject Button */}
                    <button
                      onClick={() => toggleApproval(chef._id)}
                      className={`${
                        chef.isVerified ? "bg-red-600" : "bg-green-600"
                      } hover:opacity-90 text-white px-3 py-1 rounded`}
                    >
                      {chef.isVerified ? "Reject" : "Approve"}
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
          <div className="bg-white p-6 rounded-2xl w-[95%] max-w-2xl shadow-xl relative overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold mb-4 text-orange-700">Chef Details</h3>
            <p><strong>Name:</strong> {selectedChef.name}</p>
            <p><strong>Email:</strong> {selectedChef.email}</p>
            <p><strong>Phone:</strong> {selectedChef.phone}</p>
            <p><strong>Bio:</strong> {selectedChef.bio}</p>
            <p><strong>Cuisine:</strong> {selectedChef.cuisine?.join(", ")}</p>
            <p><strong>Aadhaar:</strong> {selectedChef.documents?.aadhaar}</p>
            <p><strong>PAN:</strong> {selectedChef.documents?.pan}</p>
            <p><strong>Bank Details:</strong></p>
            <ul className="pl-4">
              <li>Acc No: {selectedChef.bankDetails?.accNo}</li>
              <li>IFSC: {selectedChef.bankDetails?.ifsc}</li>
              <li>Holder: {selectedChef.bankDetails?.holderName}</li>
            </ul>
            <p><strong>Location:</strong></p>
            <ul className="pl-4">
              <li>Area: {selectedChef.location?.area}</li>
              <li>Lat: {selectedChef.location?.lat}</li>
              <li>Lng: {selectedChef.location?.lng}</li>
            </ul>
            <p><strong>Status:</strong> <span className={selectedChef.isVerified ? "text-green-600" : "text-red-600"}>{selectedChef.isVerified ? "Approved" : "Pending"}</span></p>
            <p><strong>Rating:</strong> {selectedChef.rating}</p>
            <p><strong>Created:</strong> {new Date(selectedChef.createdAt).toLocaleString()}</p>

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
