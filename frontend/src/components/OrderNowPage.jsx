import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useUser } from "../context/userContext";
import Loading from "../Loading";

/* ------------------ Config ------------------ */
const UPI_APPS = [
  { key: "phonepe", label: "PhonePe", icon: "📲" },
  { key: "gpay", label: "Google Pay", icon: "🟦" },
  { key: "paytm", label: "Paytm", icon: "💠" },
  { key: "amazonpay", label: "Amazon Pay", icon: "🟧" },
];

const PAYMENT_OPTIONS = [
  { key: "Cash on Delivery", label: "Cash On Delivery", icon: "💵" },
  { key: "UPI", label: "UPI", icon: "📱" },
  { key: "Credit/Debit Card", label: "Card", icon: "💳" },
  { key: "Razorpay", label: "Razorpay", icon: "🏦" },
];

const OrderNowPage = () => {
  const { id } = useParams();
  const { user } = useUser();

  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    pincode: "",
  });
  const [paymentMode, setPaymentMode] = useState("Cash on Delivery");
  const [upiApp, setUpiApp] = useState(null);
  const [upiId, setUpiId] = useState(""); // if user types UPI ID
  const [cardForm, setCardForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [timeSlot, setTimeSlot] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [placing, setPlacing] = useState(false);

  /* ------------ Fetch Meal ------------ */
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/meals/${id}`
        );
        setMeal(res.data);
      } catch (err) {
        toast.error("Failed to fetch meal details.");
        console.error(err);
      }
    };
    fetchMeal();
  }, [id]);

  /* ------------ Autofill Address ------------ */
  useEffect(() => {
    if (user?.address?.length) {
      setDeliveryAddress(user.address[0]);
    }
  }, [user]);

  /* ------------ Total Price ------------ */
  useEffect(() => {
    if (meal) setTotalPrice(meal.price * quantity);
  }, [meal, quantity]);

  /* ------------ Place Order ------------ */
  const handlePlaceOrder = async () => {
    if (!user?._id) return toast.error("Please log in to place order.");
    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.pincode)
      return toast.error("Fill full address!");
    if (!timeSlot) return toast.error("Select a time slot.");

    // basic front‑end payment validation
    if (paymentMode === "UPI" && !upiApp && !upiId)
      return toast.error("Select a UPI app or enter UPI ID.");
    if (paymentMode === "Credit/Debit Card") {
      if (!cardForm.name || !cardForm.number || !cardForm.expiry || !cardForm.cvv) {
        return toast.error("Enter complete card details.");
      }
    }

    setPlacing(true);
    try {
      const payload = {
        userId: user._id,
        chefId: meal.chefId._id,
        meals: [
          {
            mealId: meal._id,
            title: meal.title,
            price: meal.price,
            quantity,
          },
        ],
        totalPrice,
        deliveryAddress,
        paymentMode,          // "UPI" / "Cash on Delivery" / "Credit/Debit Card" / "Razorpay"
        paymentApp: upiApp,   // e.g. "phonepe" (optional)
        upiId,                // optional typed UPI
        card: cardForm,       // send (if card mode) — or strip before sending if you don’t want to store
        timeSlot,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/`,
        payload
      );
      toast.success("Order placed successfully!");
      console.log("✅ Order:", res.data);

      // If using Razorpay inline, you’d trigger it *before* confirming, see function below.
    } catch (err) {
      toast.error("Order failed!");
      console.error(err);
    } finally {
      setShowConfirmModal(false);
      setPlacing(false);
    }
  };

  /* ------------ Add to Cart ------------ */
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newItem = {
      mealId: meal._id,
      title: meal.title,
      price: meal.price,
      quantity,
      photo: meal.photo,
    };
    cart.push(newItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart 🛒");
  };

  /* ------------ Razorpay Checkout ------------ */
  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleRazorpayPay = async () => {
    // Normally you create an order on your backend & get order_id
    try {
      const ok = await loadRazorpay();
      if (!ok) {
        toast.error("Razorpay SDK load failed");
        return;
      }

      // create razorpay order on server
      const createRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/razorpay/order`,
        { amount: totalPrice * 100, currency: "INR" } // amount in paise
      );
      const { orderId, amount } = createRes.data; // adjust to backend response

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Tiffin Tales",
        description: meal.title,
        image: meal.photo,
        order_id: orderId,
        handler: async function (response) {
          // verify payment on backend
          try {
            await axios.post(
              `${import.meta.env.VITE_API_URL}/payments/razorpay/verify`,
              response
            );
            toast.success("Payment successful!");
            // now actually place the order w/ paymentMode Razorpay + Paid
            setPaymentMode("Razorpay");
            setShowConfirmModal(true); // confirm -> handlePlaceOrder()
          } catch (err) {
            toast.error("Payment verification failed");
            console.error(err);
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: { color: "#e85d04" },
      };
      const rp = new window.Razorpay(options);
      rp.open();
    } catch (err) {
      toast.error("Razorpay init failed");
      console.error(err);
    }
  };

  /* ------------ Render Helpers ------------ */
  const renderPaymentDetails = () => {
    switch (paymentMode) {
      case "UPI":
        return (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {UPI_APPS.map((u) => (
                <button
                  key={u.key}
                  type="button"
                  onClick={() => setUpiApp(u.key)}
                  className={`p-3 rounded-lg border-2 flex flex-col items-center justify-center text-xs sm:text-sm ${
                    upiApp === u.key
                      ? "border-orange-500 bg-orange-100"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                >
                  <span className="text-xl mb-1">{u.icon}</span>
                  {u.label}
                </button>
              ))}
            </div>
            <div>
              <input
                type="text"
                placeholder="or enter UPI ID (example@upi)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
            </div>
          </div>
        );

      case "Credit/Debit Card":
        return (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name on Card"
              value={cardForm.name}
              onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
              className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400 col-span-1 sm:col-span-2"
            />
            <input
              type="text"
              placeholder="Card Number"
              value={cardForm.number}
              onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
              className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400 col-span-1 sm:col-span-2"
              inputMode="numeric"
              maxLength={19}
            />
            <input
              type="text"
              placeholder="MM/YY"
              value={cardForm.expiry}
              onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
              className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
              maxLength={5}
            />
            <input
              type="password"
              placeholder="CVV"
              value={cardForm.cvv}
              onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
              className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
              maxLength={4}
            />
            <div className="col-span-1 sm:col-span-2 text-xs text-gray-500">
              Card details are not stored. Process securely.
            </div>
          </div>
        );

      case "Razorpay":
        return (
          <div className="mt-4 p-4 rounded-xl border-2 border-dashed border-orange-300 text-center">
            <p className="mb-3 text-sm text-gray-700">
              You’ll be redirected to Razorpay secure payment.
            </p>
            <button
              type="button"
              onClick={handleRazorpayPay}
              className="px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium"
            >
              Pay with Razorpay
            </button>
          </div>
        );

      case "Cash on Delivery":
      default:
        return (
          <p className="mt-4 text-green-700 text-sm font-semibold">
            Pay cash to delivery partner. 👍
          </p>
        );
    }
  };

  if (!meal) {
    return (
      <div className="flex justify-center mt-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex justify-center p-6">
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#fff8e1] w-full max-w-2xl p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-orange-700 mb-6">Checkout</h1>

        {/* Meal Details */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={meal.photo}
            alt={meal.title}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <h2 className="font-bold text-xl text-gray-800">{meal.title}</h2>
            <p className="text-gray-600 line-clamp-2">{meal.description}</p>
            <p className="font-semibold text-green-600 mt-1">
              ₹{meal.price} x {quantity}
            </p>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 bg-gray-100 rounded-full text-2xl font-bold"
          >
            -
          </button>
          <span className="text-2xl font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 bg-gray-100 rounded-full text-2xl font-bold"
          >
            +
          </button>
        </div>

        {/* Total */}
        <p className="text-center text-2xl font-bold text-green-700 mb-6">
          Total: ₹{totalPrice}
        </p>

        {/* Delivery Address */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">
            Delivery Address
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Street"
              className="p-3 rounded border"
              value={deliveryAddress.street}
              onChange={(e) =>
                setDeliveryAddress({ ...deliveryAddress, street: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              className="p-3 rounded border"
              value={deliveryAddress.city}
              onChange={(e) =>
                setDeliveryAddress({ ...deliveryAddress, city: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Pincode"
              className="p-3 rounded border"
              value={deliveryAddress.pincode}
              onChange={(e) =>
                setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })
              }
            />
          </div>
        </div>

        {/* Time Slot */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">
            Select Time Slot
          </label>
          <select
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        {/* Payment Options */}
        <div>
          <label className="block font-semibold mb-3 text-gray-700">
            Payment Option
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
            {PAYMENT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setPaymentMode(opt.key)}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition ${
                  paymentMode === opt.key
                    ? "border-orange-500 bg-orange-100"
                    : "border-gray-300 hover:border-orange-300"
                }`}
              >
                <span className="text-2xl mb-1">{opt.icon}</span>
                <span className="text-sm font-semibold">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Details Based on Payment Mode */}
          {renderPaymentDetails()}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl border border-orange-500 text-orange-500 hover:bg-orange-100 font-semibold"
          >
            ← Back to Cart
          </button>
          <button
            onClick={() =>
              paymentMode === "Razorpay"
                ? handleRazorpayPay() // payment first
                : setShowConfirmModal(true) // confirm first
            }
            disabled={placing}
            className="px-6 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 disabled:opacity-60"
          >
            {placing ? "Processing..." : "Checkout"}
          </button>
        </div>
      </motion.div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
            <p className="text-gray-600 mb-6">
              Do you really want to place this order?
            </p>
            <div className="flex justify-around">
              <button
                onClick={handlePlaceOrder}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                ✅ Yes
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderNowPage;
