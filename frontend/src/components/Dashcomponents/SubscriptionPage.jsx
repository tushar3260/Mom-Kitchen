import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const userId = "USER_ID"; // Replace with context user._id
        const res = await axios.get(
          `http://localhost:5000/api/subscription/${userId}`
        );
        setSubscription(res.data);
      } catch (err) {
        console.error("Error fetching subscription:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (loading) return <p className="p-6">Loading subscription details...</p>;

  if (!subscription)
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">No Active Subscription</h2>
        <p className="text-gray-500 mt-2">
          You don't have any active subscription. Buy a plan to enjoy meals!
        </p>
        <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
          Browse Plans
        </button>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Subscription</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold">{subscription.planName}</h2>
        <p className="text-gray-500">
          Status:{" "}
          <span
            className={`font-bold ${
              subscription.active ? "text-green-600" : "text-red-500"
            }`}
          >
            {subscription.active ? "Active" : "Expired"}
          </span>
        </p>
        <p className="mt-2">
          <strong>Start Date:</strong>{" "}
          {new Date(subscription.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {new Date(subscription.endDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Meals Left:</strong> {subscription.mealsLeft} /{" "}
          {subscription.totalMeals}
        </p>
        <p>
          <strong>Next Billing:</strong>{" "}
          {new Date(subscription.nextBilling).toLocaleDateString()}
        </p>

        <div className="mt-4 flex gap-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
            Renew Plan
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
