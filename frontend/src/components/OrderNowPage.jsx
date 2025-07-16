import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useUser } from '../context/userContext';
import Loading from '../Loading';

const OrderNowPage = () => {
  const { id } = useParams();
  const { user } = useUser();

  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    pincode: ''
  });
  const [paymentMode, setPaymentMode] = useState('Cash on Delivery');
  const [timeSlot, setTimeSlot] = useState('Lunch');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 🧠 Fetch Meal
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals/${id}`);
        setMeal(res.data);
      } catch (err) {
        toast.error("Failed to fetch meal details.");
        console.error(err);
      }
    };
    fetchMeal();
  }, [id]);

  // 🧠 Autofill address if available
  useEffect(() => {
    if (user?.address?.length) {
      setDeliveryAddress(user.address[0]);
    }
  }, [user]);

  // 💸 Update Total Price
  useEffect(() => {
    if (meal) {
      setTotalPrice(meal.price * quantity);
    }
  }, [meal, quantity]);

  const handlePlaceOrder = async () => {
    if (!user?._id) return toast.error("Please log in to place order.");
    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.pincode)
      return toast.error("Fill full address bhai!");

    try {
      const payload = {
        userId: user._id,
        chefId: meal.chefId._id,
        meals: [
          {
            mealId: meal._id,
            title: meal.title,
            price: meal.price,
            quantity
          }
        ],
        totalPrice,
        deliveryAddress,
        paymentMode,
        timeSlot,
      };

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/orders/`, payload);
      toast.success('Order placed successfully!');
      console.log('✅ Order:', res.data);
    } catch (err) {
      toast.error('Order failed!');
      console.error(err);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = {
      mealId: meal._id,
      title: meal.title,
      price: meal.price,
      quantity,
      photo: meal.photo
    };
    cart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Added to cart 🛒');
  };

  if (!meal) return (
    <p className="text-center mt-10">
      <Loading />
    </p>
  );

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-[#fff8ee] p-8 rounded-2xl shadow-2xl mt-10 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-center text-[#e85d04] mb-6">
        🍱 Ordering: {meal.title}
      </h2>

      <img
        src={meal.photo}
        alt={meal.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <p className="text-center text-gray-700 mb-4">{meal.description}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowConfirmModal(true);
        }}
        className="space-y-6"
      >
        {/* Quantity */}
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-1 bg-gray-200 rounded text-lg font-bold"
          >
            -
          </button>
          <span className="text-xl">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-4 py-1 bg-gray-200 rounded text-lg font-bold"
          >
            +
          </button>
        </div>

        {/* Total Price */}
        <p className="text-center text-xl font-semibold text-green-600">
          Total: ₹{totalPrice}
        </p>

        {/* Address */}
        <div>
          <h3 className="font-semibold text-lg mb-2">📍 Delivery Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Street"
              className="p-2 rounded border"
              value={deliveryAddress.street}
              onChange={(e) =>
                setDeliveryAddress({
                  ...deliveryAddress,
                  street: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="City"
              className="p-2 rounded border"
              value={deliveryAddress.city}
              onChange={(e) =>
                setDeliveryAddress({ ...deliveryAddress, city: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Pincode"
              className="p-2 rounded border"
              value={deliveryAddress.pincode}
              onChange={(e) =>
                setDeliveryAddress({
                  ...deliveryAddress,
                  pincode: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Payment & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">💸 Payment Mode</label>
            <select
              className="w-full p-2 rounded border"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Credit/Debit Card</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">🍽️ Time Slot</label>
            <select
              className="w-full p-2 rounded border"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option>Lunch</option>
              <option>Dinner</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-between">
          <motion.button
            type="submit"
            className="w-full bg-[#e85d04] hover:bg-[#d9480f] text-white font-bold py-3 rounded-lg shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            ✅ Confirm & Place Order
          </motion.button>

          <motion.button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-3 rounded-lg shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            🛒 Add to Cart
          </motion.button>
        </div>
      </form>

      {/* 🔥 Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
    <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
    <p className="text-gray-600 mb-6">Do you really want to place this order?</p>
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
      
    </motion.div>
  );
};

export default OrderNowPage;
