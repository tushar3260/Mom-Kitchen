import React from 'react';
import { FaMoneyBillWave, FaWallet, FaCalendarAlt } from 'react-icons/fa';

const earningsData = [
  {
    orderId: '#12345',
    date: '2025-07-14',
    items: '2x Roti, 1x Sabzi, 1x Dal',
    amount: 120,
    status: 'Paid',
  },
  {
    orderId: '#12346',
    date: '2025-07-15',
    items: '3x Roti, 1x Paneer, Rice',
    amount: 150,
    status: 'Pending',
  },
  {
    orderId: '#12347',
    date: '2025-07-16',
    items: '2x Roti, 1x Aloo, 1x Dal',
    amount: 100,
    status: 'Paid',
  },
];

const ChefEarning = () => {
  const totalEarnings = earningsData
    .filter((e) => e.status === 'Paid')
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
        💰 Earnings Dashboard
      </h1>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4">
          <FaMoneyBillWave className="text-3xl text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="text-xl font-bold text-gray-800">₹{totalEarnings}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4">
          <FaWallet className="text-3xl text-indigo-500" />
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-bold text-gray-800">{earningsData.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4">
          <FaCalendarAlt className="text-3xl text-pink-500" />
          <div>
            <p className="text-sm text-gray-500">Last Payment</p>
            <p className="text-xl font-bold text-gray-800">
              ₹{earningsData[0].amount} on {earningsData[0].date}
            </p>
          </div>
        </div>
      </div>

      {/* Earnings List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-orange-50 text-orange-700">
            <tr>
              <th className="text-left px-4 py-3">Order ID</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Items</th>
              <th className="text-left px-4 py-3">Amount (₹)</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {earningsData.map((earning) => (
              <tr key={earning.orderId} className="border-t hover:bg-gray-50 text-sm">
                <td className="px-4 py-3 font-medium">{earning.orderId}</td>
                <td className="px-4 py-3 text-gray-500">{earning.date}</td>
                <td className="px-4 py-3">{earning.items}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">₹{earning.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      earning.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {earning.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChefEarning;
