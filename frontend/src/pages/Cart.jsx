import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import { FaMinus, FaPlus, FaShoppingCart, FaRedo } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../context/userContext";
import { storage } from "../utils/Storage";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const [cartItems, setCartItems] = useState([]);
  const [userOrders, setUserOrders] = useState([]); // past orders
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Loader & error states for fetching cart from backend
  const [loadingCart, setLoadingCart] = useState(false);
  const [errorCart, setErrorCart] = useState("");

  const baseURL = import.meta.env.VITE_API_URL;

  /* ------------------------ FETCH CART ITEMS FROM BACKEND ------------------------ */
  useEffect(() => {
    if (!user?._id) return;

    setLoadingCart(true);
    setErrorCart("");

    axios
      .get(`${baseURL}/cart/${user._id}`)
      .then((res) => {
        // expecting res.data to be cart object with items array
        const items = res.data?.items || [];
        if (Array.isArray(items)) {
          setCartItems(
            items.map((item) => ({
              _id: item._id || item.mealId || Math.random().toString(36).substr(2, 9),
              mealId: item.mealId || item._id,
              title: item.title,
              price: item.price ?? 0,
              discountedPrice: item.discountedPrice, // optional
              photo: item.photo || "",
              quantity: item.quantity || 1,
            }))
          );
        } else {
          setCartItems([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch cart items:", err);
        setErrorCart("Failed to load cart items.");
      })
      .finally(() => {
        setLoadingCart(false);
      });
  }, [user?._id, baseURL]);

  /* ------------------ FETCH USER ORDERS (for re-order) ------------------ */
  useEffect(() => {
    if (!user?._id) return;
    setLoadingOrders(true);
    axios
      .get(`${baseURL}/orders/user/${user._id}`)
      .then((res) => {
        setUserOrders(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch user orders:", err);
      })
      .finally(() => {
        setLoadingOrders(false);
      });
  }, [user?._id, baseURL]);

  /* ------------------ HANDLE REMOVE (DELETE /cart/delete) ------------------ */
  const handleRemove = (index) => {
    if (!user?._id) {
      toast.error("User not authenticated");
      return;
    }
    const item = cartItems[index];
    if (!item) return;

    axios
      .delete(`${baseURL}/cart/delete`, {
        data: { userId: user._id, mealId: item.mealId || item._id },
      })
      .then(() => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
        toast.success(`Removed ${item.title} from cart.`);
      })
      .catch((err) => {
        console.error("Failed to remove item from cart:", err);
        toast.error("Failed to remove item from cart.");
      });
  };

  /* ------------------ HANDLE CLEAR CART (DELETE /cart/clear with body) ------------------ */
  const handleClearCart = () => {
    if (!user?._id) {
      toast.error("User not authenticated");
      return;
    }
    axios
      .delete(`${baseURL}/cart/clear`, {
        data: { userId: user._id }, // send userId in request body (not in URL)
      })
      .then(() => {
        setCartItems([]);
        toast.success("Cart cleared.");
      })
      .catch((err) => {
        console.error("Failed to clear cart:", err);
        toast.error("Failed to clear cart.");
      });
  };

  /* ------------------ HANDLE QUANTITY UPDATE (PUT /cart/update) ------------------ */
  const handleQuantity = (index, delta) => {
    if (!user?._id) {
      toast.error("User not authenticated");
      return;
    }

    const item = cartItems[index];
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    // Optimistically update local state
    setCartItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: newQuantity } : item))
    );

    axios
      .put(`${baseURL}/cart/update`, {
        userId: user._id,
        mealId: item.mealId || item._id,
        quantity: newQuantity,
      })
      .then(() => {
        toast.success(`Updated quantity for ${item.title}.`);
      })
      .catch((err) => {
        console.error("Failed to update cart item quantity:", err);
        toast.error("Failed to update quantity.");
        // Rollback optimistic update on failure
        setCartItems((prev) =>
          prev.map((item, i) => (i === index ? { ...item, quantity: item.quantity } : item))
        );
      });
  };

  /* ------------------ HANDLE ADD TO CART (POST /cart/add) ------------------ */
  const handleAddToCartBackend = async (mealId, quantity = 1) => {
    if (!user?._id) return;

    try {
      await axios.post(`${baseURL}/cart/add`, {
        userId: user._id,
        item: {
          mealId,
          quantity,
        },
      });
    } catch (err) {
      console.error("Failed to add item to cart backend:", err);
      toast.error("Failed to add item to cart.");
    }
  };

  /* ------------------ REORDER: update local state & sync with backend ------------------ */
  const handleReOrder = useCallback(
  async (order) => {
    if (!order?.meals?.length) return;

    const updatedItems = [];
    const backendAddPromises = [];

    setCartItems((prev) => {
      const next = [...prev];

      order.meals.forEach((m) => {
        const meal = m.mealId || m;
        const id = meal._id || m.mealId;
        const title = meal.title || "Meal";
        const price = meal.price ?? 0;

        const idx = next.findIndex(
          (ci) => ci._id === id || ci.mealId === id
        );

        if (idx >= 0) {
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + (m.quantity || 1),
          };
        } else {
          next.push({
            _id: id,
            mealId: id,
            title,
            discountedPrice: price,
            price,
            photo: meal.photo || "",
            quantity: m.quantity || 1,
          });
        }

        // Prepare backend sync
        backendAddPromises.push(handleAddToCartBackend(id, m.quantity || 1));
      });

      updatedItems.push(...next);
      return updatedItems;
    });

    try {
      await Promise.all(backendAddPromises);
      toast.success("Items added from past order!");
    } catch (error) {
      console.error("Reorder failed: ", error);
      toast.error("Failed to sync some items to cart.");
    }
  },
  [user?._id]
);


  /* ------------------ Persist cart locally (optional) --------- */
  useEffect(() => {
    storage.setItem("cart", cartItems);
  }, [cartItems]);

  /* ------------------ Totals ---------------- */
  const total = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) =>
          acc +
          (item.discountedPrice != null
            ? item.discountedPrice
            : item.price || 0) *
            item.quantity,
        0
      ),
    [cartItems]
  );

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const hasItems = cartItems.length > 0;

  const normalizeForCheckout = () =>
    cartItems.map((item) => ({
      mealId: item.mealId || item._id,
      title: item.title,
      price: item.discountedPrice != null ? item.discountedPrice : item.price || 0,
      quantity: item.quantity,
      photo: item.photo,
    }));

  const goCheckout = () => {
    if (!hasItems) return;
    const payload = normalizeForCheckout();
    navigate("/checkout", { state: { cart: payload } });
  };

  /* ------------------ UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 flex justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl grid lg:grid-cols-[1fr_320px] gap-8"
      >
        {/* -------- Cart Items Card -------- */}
        <div className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaShoppingCart className="text-2xl text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Your Cart ({itemCount})
              </h2>
            </div>
            {hasItems && (
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                aria-label="Clear Cart"
              >
                <FiTrash2 /> Clear Cart
              </button>
            )}
          </div>

          {loadingCart ? (
            <p className="text-center text-gray-600">Loading cart items...</p>
          ) : errorCart ? (
            <p className="text-center text-red-600">{errorCart}</p>
          ) : !hasItems ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <p className="text-6xl mb-4">🛒</p>
              <p className="text-gray-500 mb-6">Your cart is empty.</p>
              <button
                onClick={() => navigate("/meals")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition shadow-lg"
              >
                Browse Meals
              </button>
            </motion.div>
          ) : (
            <ul className="divide-y divide-orange-100">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.li
                    key={item._id || index}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="py-4 flex items-start sm:items-center gap-4"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                      {item.photo ? (
                        <img
                          src={item.photo}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-orange-200 flex items-center justify-center text-2xl">
                          🍲
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-lg text-gray-800 truncate">
                        {item.title}
                      </p>
                      <p className="text-orange-600 font-medium text-sm">
                        ₹
                        {item.discountedPrice != null
                          ? item.discountedPrice
                          : item.price || 0}{" "}
                        each
                      </p>

                      {/* Qty Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantity(index, -1)}
                          className="p-1 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                          aria-label={`Decrease quantity for ${item.title}`}
                        >
                          <FaMinus size={10} />
                        </motion.button>

                        <span className="w-6 text-center font-semibold">{item.quantity}</span>

                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleQuantity(index, 1)}
                          className="p-1 w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white"
                          aria-label={`Increase quantity for ${item.title}`}
                        >
                          <FaPlus size={10} />
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemove(index)}
                          className="ml-4 flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-semibold"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <FiTrash2 />
                          Remove
                        </motion.button>
                      </div>
                    </div>

                    {/* Line Total */}
                    <div className="hidden sm:block text-right font-semibold text-gray-800 min-w-[80px]">
                      ₹
                      {(item.discountedPrice != null
                        ? item.discountedPrice
                        : item.price || 0) * item.quantity}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {/* -------- Order Summary (sticky on lg) -------- */}
        <div className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="backdrop-blur-xl bg-white/90 border border-white/60 rounded-3xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between">
                <p>Items ({itemCount})</p>
                <p>₹{total}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery</p>
                <p className="text-green-600">Free</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p>—</p>
              </div>
            </div>

            <hr className="my-4 border-orange-200/60" />

            <div className="flex justify-between items-center text-lg font-bold text-gray-900 mb-6">
              <p>Total</p>
              <p>₹{total}</p>
            </div>

            <button
              disabled={!hasItems}
              onClick={goCheckout}
              className={`w-full py-3 rounded-xl font-semibold transition shadow-md ${
                hasItems
                  ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Proceed to Checkout →
            </button>
          </div>

          {/* -------- Past Orders / Reorder -------- */}
          {user?._id && (
            <div className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-3xl shadow p-4">
              <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                Recent Orders
              </h4>
              {loadingOrders ? (
                <p className="text-gray-500 text-sm">Loading…</p>
              ) : userOrders.length === 0 ? (
                <p className="text-gray-500 text-sm">No past orders yet.</p>
              ) : (
                <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {userOrders.map((order) => (
                    <li
                      key={order._id}
                      className="flex items-center justify-between text-sm bg-white/80 rounded-xl px-3 py-2 hover:bg-orange-50 transition"
                    >
                      <div className="truncate mr-2">
                        <p className="font-semibold text-gray-800 truncate max-w-[160px]">
                          {order.meals
                            .map((m) => m.mealId?.title || m.title || "Meal")
                            .join(", ")}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₹{order.totalPrice} • {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                     
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
