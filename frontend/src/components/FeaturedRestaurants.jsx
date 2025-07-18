
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FeaturedRestaurants = () => {
  const [chefs, setChefs] = useState([]);
  const [selectedChef, setSelectedChef] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/chefs/getAllChefs`);
        const data = await res.json();
        const updatedChefs = data.slice(0, 8).map((chef) => ({
          ...chef,
          rating: (Math.random() * 2 + 3).toFixed(1),
        }));
        setChefs(updatedChefs);
      } catch (err) {
        console.error("Failed to fetch chefs:", err);
      }
    };

    fetchChefs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-orange-500 text-center">Featured Chefs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {chefs.map((chef, index) => (
          <div
            key={index}
            className="group bg-white p-6 rounded-2xl shadow-md border border-yellow-200 relative flex flex-col justify-between h-full hover:bg-orange-100  hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out hover:border-transparent"
          >
            <div className="absolute top-2 left-2">
              <span className="bg-orange-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow">
                BEST CHOICE
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-4 border-orange-300 group-hover:border-transparent transition-all duration-300 overflow-hidden mb-4">
                <img
                  src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                  className="w-full h-full object-cover"
                  alt={chef.name}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">{chef.name}</h3>
              <p className="text-orange-500 font-medium mb-1 text-center text-sm">
                {chef.cuisine?.join(", ")}
              </p>
              <div className="flex items-center mb-1">
                {(() => {
                  const ratingOutOfFive = parseFloat(chef.rating);
                  const fullStars = Math.floor(ratingOutOfFive);
                  const hasHalfStar = ratingOutOfFive % 1 >= 0.5;
                  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                  return (
                    <>
                      {[...Array(fullStars)].map((_, i) => (
                        <FaStar key={`full-${i}`} className="text-yellow-400" />
                      ))}
                      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
                      {[...Array(emptyStars)].map((_, i) => (
                        <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
                      ))}
                    </>
                  );
                })()}
                <span className="ml-2 text-sm font-medium text-gray-600">{chef.rating}</span>
              </div>
              <p className="text-sm text-gray-500">I am chef</p>
            </div>

            <div className="mt-auto pt-2 flex justify-center">
              <button
                onClick={() => setSelectedChef(chef)}
                className="bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-orange-600 transition duration-300 shadow"
              >
                View Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate("/allchef")}
          className="bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-orange-500 transition duration-300 flex items-center gap-2"
        >
          View All Chefs
          <svg
            className="w-4 h-4 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Modal Popup */}
     {selectedChef && (
  <div className="fixed inset-0 bg-[#FFFAF1] py-16 bg-opacity-50 flex justify-center items-center z-50">
    <div className="group bg-white px-8 py-10 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 w-full max-w-xl mx-auto text-center relative">
      <button
        onClick={() => setSelectedChef(null)}
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
      >
        &times;
      </button>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 rounded-full border-4 border-orange-400 overflow-hidden mb-4">
          <img
            src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
            alt={selectedChef.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name & Location */}
        <h2 className="text-2xl font-bold text-gray-800">{selectedChef.name}</h2>
        <p className="text-gray-500 text-sm">
  {selectedChef.location?.area}
</p>


        {/* Cuisine */}
        <p className="text-orange-600 font-semibold mt-1 capitalize">
          {selectedChef.cuisine?.join(", ") || "indian, italian"}
        </p>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-3 items-center text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-pink-600">📞</span>
          <span>{selectedChef.phone || "8126919197"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-500">📧</span>
          <span>{selectedChef.email || "aroravartul@gmail.com"}</span>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-700 mb-1">Bio</h3>
        <p className="text-gray-600 text-sm">{selectedChef.bio || "i am chef"}</p>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default FeaturedRestaurants;
