import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PopularItems() {
  const scrollRef = useRef(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals/`);
        setMeals(res.data);
      } catch (err) {
        console.error("Error fetching meals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="p-10 bg-gradient-to-b from-yellow-100 via-orange-100 to-yellow-50">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Popular Items</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading meals...</p>
      ) : meals.length === 0 ? (
        <p className="text-center text-red-400">No meals found.</p>
      ) : (
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white rounded-full p-2 shadow hover:bg-orange-500 z-10"
          >
            &#8592;
          </button>

          {/* Scrollable Meals */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 px-10 scrollbar-hidden"
          >
            {meals.map((item) => (
              <motion.div
                key={item._id}
                className="bg-white rounded-xl shadow-md min-w-[220px] hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={item.photo || "https://placehold.co/600x400?text=No+Image"}
                  alt={item.title}
                  className="rounded-t-xl w-full h-36 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.chefId?.name || "Unknown Chef"}</p>
                  <p className="font-bold mt-2">₹{item.price}</p>
                  <motion.button
                    onClick={() => navigate(`/order-now/${item._id}`)}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  >
                    Order Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white rounded-full p-2 shadow hover:bg-orange-500 z-10"
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
}

export default PopularItems;
