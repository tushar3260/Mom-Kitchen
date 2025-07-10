import React, { useState, useEffect } from "react";
import axios from "axios";

const plans = [
  { id: "Weekly", title: "Weekly Plan", meals: "7 Days - 2 Meals/day", price: 700 },
  { id: "Monthly", title: "Monthly Plan", meals: "30 Days - 2 Meals/day", price: 2500 },
];

const Subscription = ({ currentUser, currentChef }) => {
  const [form, setForm] = useState({
    userId: "",
    chefId: "",
    plan: "Weekly",
    autoRenew: false,
    totalAmount: 700,
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      setForm((prev) => ({ ...prev, userId: currentUser._id }));
    }
    if (currentChef) {
      setForm((prev) => ({ ...prev, chefId: currentChef._id }));
    }
  }, [currentUser, currentChef]);

  const handlePlanSelect = (planId, price) => {
    setForm({ ...form, plan: planId, totalAmount: price });
    setDiscount(0);
    setCouponMessage("");
    setCoupon("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleApplyCoupon = () => {
    if (coupon === "FIRST50") {
      setDiscount(500);
      setCouponMessage("✅ ₹500 OFF applied");
    } else if (coupon === "WEEK100" && form.plan === "Weekly") {
      setDiscount(100);
      setCouponMessage("✅ ₹100 OFF applied");
    } else {
      setDiscount(0);
      setCouponMessage("❌ Invalid or not applicable");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalData = {
        ...form,
        totalAmount: form.totalAmount - discount,
      };
      const res = await axios.post("/api/subscriptions", finalData);
      alert("Subscription Created Successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to create subscription");
    }
  };

  const finalAmount = form.totalAmount - discount;

  return (
    <section className="bg-[#fffaf1] min-h-screen w-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-orange-600 mb-6">Choose a Subscription Plan</h2>
        <p className="text-center text-gray-600 mb-10">Enjoy delicious meals delivered daily.</p>

        {/* Plans */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 border rounded-xl cursor-pointer shadow-sm hover:shadow-md transition ${
                form.plan === plan.id ? "border-orange-500" : "border-gray-200"
              }`}
              onClick={() => handlePlanSelect(plan.id, plan.price)}
            >
              <h3 className="text-xl font-semibold text-orange-600 mb-2">{plan.title}</h3>
              <p className="text-gray-700">{plan.meals}</p>
              <p className="font-semibold mt-2">₹{plan.price}</p>
              {form.plan === plan.id && (
                <p className="mt-2 text-sm text-green-600 font-medium">Selected</p>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6">
          {/* Auto Renew */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="autoRenew"
              checked={form.autoRenew}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label className="text-sm text-gray-700">Enable Auto Renew</label>
          </div>

          {/* Coupon Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700 font-medium">Have a coupon? (Optional)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="border border-gray-300 p-3 rounded-lg w-full text-black"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="bg-orange-500 text-black px-10 py-2 rounded-lg hover:bg-orange-600"
              >
                Apply
              </button>
            </div>
            {couponMessage && (
              <p className={`text-sm ${couponMessage.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>
                {couponMessage}
              </p>
            )}
          </div>

          {/* Total */}
          <div className="text-lg font-semibold mt-4">
            Total Payable: ₹{finalAmount}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition"
          >
            Confirm Subscription
          </button>
        </form>
      </div>
    </section>
  );
};

export default Subscription;
