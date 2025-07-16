import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../../Loading';
import {
  FaCheckCircle,
  FaClock,
  FaUtensils,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

const statusStyles = {
  Delivered: {
    text: 'text-green-600',
    bg: 'bg-green-100',
    icon: <FaCheckCircle className="inline mr-1" />,
  },
  Pending: {
    text: 'text-yellow-700',
    bg: 'bg-yellow-100',
    icon: <FaClock className="inline mr-1" />,
  },
  Preparing: {
    text: 'text-blue-700',
    bg: 'bg-blue-100',
    icon: <FaUtensils className="inline mr-1" />,
  },
  Placed: {
    text: 'text-purple-700',
    bg: 'bg-purple-100',
    icon: <FaClock className="inline mr-1" />,
  },
  Cancelled: {
    text: 'text-red-600',
    bg: 'bg-red-100',
    icon: <FaClock className="inline mr-1" />,
  }
};

const ChefOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [loading, setLoading] = useState(true);

  const toggleDetails = (id) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
      setOrders(res.data);
      console.log('✅ Orders fetched:', res.data);
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-[#ff7e00] flex items-center gap-2">
        🧾 Orders Dashboard
        <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
          Live
        </span>
      </h2>

      <div className="overflow-x-auto rounded-lg border border-orange-100">
        <table className="min-w-full divide-y divide-orange-100">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wider">
                Meals
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wider">
                Time Slot
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wider">
                Payment
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="hover:bg-orange-50 transition-all duration-200 ease-in-out">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {order.meals.map((m) => (
                      <div key={m._id}>
                        {m.mealId?.title || "Unknown Meal"} x{m.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-sm">{order.timeSlot}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium 
                      ${statusStyles[order.status]?.text || "text-gray-600"} 
                      ${statusStyles[order.status]?.bg || "bg-gray-100"}`}
                    >
                      {statusStyles[order.status]?.icon || (
                        <FaClock className="inline mr-1" />
                      )}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    ₹{order.totalPrice}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {order.paymentMode || "N/A"} - {order.paymentStatus}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => toggleDetails(order._id)}
                      className="text-orange-600 hover:text-orange-800 flex items-center gap-1 text-xs font-semibold"
                    >
                      {expandedOrderId === order._id ? "Hide" : "View"} Details
                      {expandedOrderId === order._id ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </td>
                </tr>

                {expandedOrderId === order._id && (
                  <tr className="bg-orange-50 transition-all">
                    <td colSpan="7" className="px-6 py-4 text-sm text-gray-700">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p>
                          <strong>📍 Address:</strong>{" "}
                          {order.deliveryAddress?.street},{" "}
                          {order.deliveryAddress?.city} -{" "}
                          {order.deliveryAddress?.pincode}
                        </p>
                        <p>
                          <strong>📞 Phone:</strong> {order.phone || "N/A"}
                        </p>
                        <p>
                          <strong>📝 Instructions:</strong>{" "}
                          {order.instructions || "None"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {loading && (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChefOrders;
