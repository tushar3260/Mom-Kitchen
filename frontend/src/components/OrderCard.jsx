import React from 'react';

export default function OrderCard() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">Order #56789</h4>
        <span className="text-sm text-green-600">Delivered</span>
      </div>
      <p className="text-gray-600">Items: 2x Biryani, 1x Coke</p>
      <p className="text-gray-600">Total: ₹320</p>
      <p className="text-sm text-gray-400">Delivered on: 12 July 2025</p>
    </div>
  );
}
