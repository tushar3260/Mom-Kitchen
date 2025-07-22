import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const AllMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("meal")?.toLowerCase() || "";
  const navigate = useNavigate();

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals`);
      setMeals(res.data);
    } catch (err) {
      setError("⚠️ Unable to fetch meals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const filteredMeals = meals.filter((meal) =>
    meal.title?.toLowerCase().includes(searchQuery)
  );

  return (
    <section className="min-h-screen bg-gradient-to-tr from-[#fff4ec] to-[#ffe0c8] px-4 py-14">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto text-center mb-14">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff6600] to-[#cc3300] drop-shadow-md"
        >
          Delicious Homestyle Meals 🥘
        </motion.h1>
        <p className="mt-4 text-gray-700 text-lg">
          Curated by local chefs. Served fresh daily.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-lg text-orange-700 font-semibold">
            ⏳ Fetching mouth-watering meals...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 font-medium">{error}</p>
        ) : filteredMeals.length === 0 ? (
          <p className="text-center text-gray-600">No meals found for your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredMeals.map((meal, index) => (
              <motion.div
                key={meal._id}
                className="rounded-3xl overflow-hidden shadow-lg border border-orange-200 bg-white hover:scale-[1.03] transition-transform duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                {/* Meal Image */}
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={meal.photo}
                    alt={meal.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">{meal.title}</h3>
                    <span className="bg-orange-200 text-orange-700 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                      ₹{meal.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <FaMapMarkerAlt className="text-orange-500" />
                    Chef: {meal.chefId?.name}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-yellow-600 mb-4">
                    <FaStar className="text-yellow-400" />
                    {meal.rating ? `${meal.rating.toFixed(1)} / 5` : "No Rating"}
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    <span className="text-[11px] px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Fresh
                    </span>
                    <span className="text-[11px] px-2 py-1 bg-red-100 text-red-800 rounded-full">
                      Homemade
                    </span>
                    {meal.veg && (
                      <span className="text-[11px] px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                        Pure Veg
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => navigate(`/order-now/${meal._id}`)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-[#ff6a00] to-[#c44500] text-white font-semibold rounded-xl shadow hover:from-[#ff5000] hover:to-[#a83800] transition-all duration-300"
                  >
                    Order Now 🍽️
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllMeals;
