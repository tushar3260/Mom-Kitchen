import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const dummyMeals = [
  {
    id: 1,
    name: "Braj Thali",
    price: 130,
    location: "Vrindavan",
    rating: 4.6,
    type: "veg",
    image:
      "https://images.unsplash.com/photo-1676212768815-7ffecf9d4e35?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Desi Ghee Poori-Sabzi",
    price: 100,
    location: "Chhattikara",
    rating: 4.4,
    type: "veg",
    image:
      "https://images.unsplash.com/photo-1600751829939-d25d9c6a1c4e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Mathura Peda Combo",
    price: 90,
    location: "Mathura",
    rating: 4.8,
    type: "veg",
    image:
      "https://images.unsplash.com/photo-1600404294282-2561f7a572d8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Special UP Thali",
    price: 160,
    location: "Goverdhan",
    rating: 4.5,
    type: "veg",
    image:
      "https://images.unsplash.com/photo-1623175433934-e1f9f5fbe91a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Egg Masala Meal",
    price: 140,
    location: "Vikas Market,Mathura",
    rating: 4.3,
    type: "non-veg",
    image:
      "https://images.unsplash.com/photo-1617692855027-c3df2f98e2b9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Spicy Tandoori Chicken Thali",
    price: 190,
    location: "Chaumuhan Bypass",
    rating: 4.5,
    type: "non-veg",
    image:
      "https://images.unsplash.com/photo-1599021014534-1ff63513ab2c?auto=format&fit=crop&w=600&q=80",
  },
];

const AllMeals = () => {
  const [filter, setFilter] = useState("all");
  const location = useLocation(); // ✅
  const searchQuery = location.state?.query?.toLowerCase() || "";

  const filteredMeals = dummyMeals.filter((meal) => {
  const matchesType = filter === "all" || meal.type === filter;
  const matchesSearch = meal.name.toLowerCase().includes(searchQuery);
  return matchesType && matchesSearch;
});

  

  return (
    <section className="bg-[#fffaf1] min-h-screen w-full py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-8">
          🍽️ Available Meals
        </h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {["all", "veg", "non-veg"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded text-white transition ${
                filter === type
                  ? type === "veg"
                    ? "bg-red-600"
                    : type === "non-veg"
                    ? "bg-red-600"
                    : "bg-orange-600"
                  : type === "veg"
                  ? "bg-orange-600"
                  : type === "non-veg"
                  ? "bg-red-600"
                  : "bg-orange-600"
              }`}
            >
              {type === "all" ? "All" : type === "veg" ? "Veg" : "Non-Veg"}
            </button>
          ))}
        </div>

        {/* Meal Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold text-orange-600">
                {meal.name}
              </h3>
              <p className="text-gray-600">📍 Location: {meal.location}</p>
              <p className="text-gray-600">⭐ Rating: {meal.rating}</p>
              <p className="text-lg font-bold mt-2">₹{meal.price}</p>

              <Link
                to={`/tiffin/${meal.id}`}
                className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllMeals;
