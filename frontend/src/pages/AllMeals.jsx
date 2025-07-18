import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const AllMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("meal")?.toLowerCase() || "";

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/meals");
      setMeals(res.data);
    } catch (err) {
      setError("Failed to fetch meals");
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
    <section className="bg-[#fffaf1] min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white py-10 rounded-t-xl mb-10">
          <h2 className="text-4xl font-bold text-center text-[#8a3d00] flex items-center justify-center gap-3">
            🍽️ Available Meals
          </h2>
        </div>

        {/* Meal Cards */}
        {loading ? (
          <p className="text-center text-lg text-gray-700">Loading meals...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredMeals.length === 0 ? (
          <p className="text-center text-gray-600">No meals found</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMeals.map((meal) => (
              <div
                key={meal._id}
                className="bg-white rounded-xl shadow-md p-4 transition hover:shadow-lg border border-gray-200"
              >
                <img
                  src={meal.photo}
                  alt={meal.title}
                  className="w-full h-44 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {meal.title}
                </h3>
                <p className="text-sm text-gray-700 flex items-center gap-1 mb-1">
                  <FaMapMarkerAlt className="text-orange-500" />
                  Chef: {meal.chefId?.name}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-1 mb-1">
                  <FaStar className="text-yellow-500" />
                  Rating: {meal.rating || "N/A"}
                </p>
                <p className="text-lg font-semibold text-gray-900">₹{meal.price}</p>
                <Link
                  to={`/tiffin/${meal._id}`}
                  className="mt-4 inline-block bg-[#c44d00] hover:bg-[#a83e00] text-white px-5 py-2 rounded-md text-sm font-semibold"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllMeals;
