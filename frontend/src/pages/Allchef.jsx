import React, { useState } from "react";

const dummyChefs = [
  {
    id: 1,
    name: "Chef Sita Ram",
    location: "Vrindavan",
    rating: 4.8,
    image: "https://via.placeholder.com/200x200",
    speciality: "Pure Veg Meals",
    type: "veg"
  },
  {
    id: 2,
    name: "Chef Khan",
    location: "Govardhan",
    rating: 4.6,
    image: "https://via.placeholder.com/200x200",
    speciality: "Spicy Non-Veg Tiffins",
    type: "non-veg"
  },
  {
    id: 3,
    name: "Chef Lakshmi",
    location: "Dauji",
    rating: 4.9,
    image: "https://via.placeholder.com/200x200",
    speciality: "South Indian Dishes",
    type: "veg"
  },
  {
    id: 4,
    name: "Chef Balwinder",
    location: "Barsana",
    rating: 4.7,
    image: "https://via.placeholder.com/200x200",
    speciality: "Punjabi Thalis",
    type: "veg"
  },
  {
    id: 5,
    name: "Chef Arjun",
    location: "Radha Kund",
    rating: 4.5,
    image: "https://via.placeholder.com/200x200",
    speciality: "Egg & Light Meals",
    type: "non-veg"
  }
];

const Allchef = () => {
  const [filter, setFilter] = useState("all");

  const filteredChefs = dummyChefs.filter(chef => {
    if (filter === "all") return true;
    return chef.type === filter;
  });

  return (
    <section className="bg-[#fffaf1] min-h-screen w-screen overflow-x-hidden py-16 px-4">
      <div className="max-w-6xl w-full mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Our Chefs</h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded font-medium ${filter === "all" ? "bg-orange-500 text-white" : "bg-white border border-orange-500 text-orange-500"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("veg")}
            className={`px-4 py-2 rounded font-medium ${filter === "veg" ? "bg-orange-500 text-white" : "bg-white border border-orange-500 text-orange-500"}`}
          >
            Veg
          </button>
          <button
            onClick={() => setFilter("non-veg")}
            className={`px-4 py-2 rounded font-medium ${filter === "non-veg" ? "bg-orange-500 text-white" : "bg-white border border-orange-500 text-orange-500"}`}
          >
            Non-Veg
          </button>
        </div>

        {/* Chef Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChefs.map((chef) => (
            <div
              key={chef.id}
              className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition duration-300"
            >
              <img
                src={chef.image}
                alt={chef.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-orange-600 mb-1">{chef.name}</h3>
              <p className="text-sm text-gray-600 mb-1">📍 {chef.location}</p>
              <p className="text-sm text-gray-600 mb-2">⭐ {chef.rating} rating</p>
              <p className="text-gray-700 font-medium">Speciality: {chef.speciality}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Allchef;