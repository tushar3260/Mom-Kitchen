import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (location.state?.meal) {
      const meal = location.state.meal;
      setCartItems([{ ...meal, quantity: 1 }]);
    }
  }, [location.state]);

  const handleQuantity = (index, delta) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 p-6">
      <div className="bg-[#fffce5] rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-orange-700">Your Cart</h2>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Cart Icon Box */}
          <div className="flex-shrink-0 w-40 h-40 bg-orange-400 rounded-lg flex items-center justify-center text-white text-3xl font-bold shadow-md">
            🛒 {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </div>

          {/* Right Items List */}
          <div className="flex-1 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={item._id} className="flex items-center border-b pb-2">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-20 h-20 rounded mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">
                      ₹{item.discountedPrice} x {item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() => handleQuantity(index, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() => handleQuantity(index, 1)}
                      >
                        +
                      </button>
                      <button
                        className="ml-4 text-red-500 font-semibold"
                        onClick={() => handleRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Total and Checkout */}
        <div className="text-right mt-6">
          <p className="text-xl font-semibold text-orange-800 mb-2">
            Total: ₹{total}
          </p>
          <button
            className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition"
            disabled={cartItems.length === 0}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
