import React, { useEffect, useState } from "react";
import { Bell, Wallet, MapPin, User } from "lucide-react";
import TopNav from "../components/TopNav";

export default function Dashboard() {
  const [user, setUser] = useState({ name: "", city: "", phone: "", address: "" });
  const [subscription, setSubscription] = useState(null);
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wallet, setWallet] = useState({ balance: 0, lastRecharge: 0 });

  useEffect(() => {
    fetchUser();
    fetchSubscription();
    fetchMenu();
    fetchOrders();
    fetchWallet();
  }, []);

  const fetchUser = async () => {
    setUser({
      name: "Tushar",
      city: "XYZ City",
      phone: "+91-9876543210",
      address: "123, Green Street, XYZ City, 123456"
    });
  };

  const fetchSubscription = async () => {
    setSubscription({ plan: "Weekly Veg Tiffin", nextDelivery: "Tomorrow @ 12:30PM" });
  };

  const fetchMenu = async () => {
    setMenu(["Aloo Matar Curry", "Jeera Rice", "Tandoori Roti (2)", "Salad & Pickle"]);
  };

  const fetchOrders = async () => {
    setOrders([
      { date: "13 Jul", meal: "Dinner", status: "Scheduled" },
      { date: "12 Jul", meal: "Lunch", status: "Delivered" },
      { date: "14 Jul", meal: "Lunch", status: "Scheduled" },
    ]);
  };

  const fetchWallet = async () => {
    setWallet({ balance: 120, lastRecharge: 500 });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen font-sans">
      {/* Top Bar */}
      <TopNav />

      {/* Welcome */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold">Good Morning, {user.name}! ☕</h2>
        <p className="text-gray-600">Ready for your healthy tiffin today?</p>
      </div>

      {/* User Details */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-medium mb-2">Your Details</h3>
        <p className="text-sm text-gray-700">📞 {user.phone}</p>
        <p className="text-sm text-gray-700">🏠 {user.address}</p>
      </div>

      {/* Subscription Summary */}
      {subscription && (
        <div className="bg-white rounded-2xl shadow p-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">{subscription.plan}</h3>
            <p className="text-sm text-gray-500">Next Delivery: {subscription.nextDelivery}</p>
          </div>
          <div className="space-x-2">
            <button className="px-4 py-1 border rounded-lg text-sm">Manage</button>
            <button className="px-4 py-1 border rounded-lg text-sm">Pause</button>
          </div>
        </div>
      )}

      {/* Today's Menu */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-medium mb-2">Today's Menu 🍽️</h3>
        <ul className="list-disc list-inside text-gray-700">
          {menu.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Upcoming Orders / History */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="grid grid-cols-2 border-b pb-2 mb-2">
          <button className="text-sm font-medium text-blue-600">Upcoming Orders</button>
          <button className="text-sm text-gray-400">Order History</button>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          {orders.map((order, index) => (
            <div key={index} className="flex justify-between">
              <span>{order.date} | {order.meal}</span>
              <span className={order.status === "Delivered" ? "text-green-600" : ""}>{order.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet */}
      <div className="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-600">
          <Wallet className="text-green-500" />
          <div>
            <h4 className="text-md font-semibold">Wallet Balance</h4>
            <p className="text-sm">₹{wallet.balance} (Last Recharge: ₹{wallet.lastRecharge} via UPI)</p>
          </div>
        </div>
        <button className="px-4 py-1 border rounded-lg text-sm">Add Money</button>
      </div>

      {/* Refer Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <h3 className="text-lg font-medium">Refer & Earn 🎁</h3>
        <p className="text-sm text-gray-700">
          Invite friends and earn ₹50 for each signup. More food, less spend!
        </p>
        <button className="mt-2 px-4 py-1 border rounded-lg text-sm">Invite Now</button>
      </div>
    </div>
  );
}
