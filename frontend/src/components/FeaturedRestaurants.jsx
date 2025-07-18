import React, { useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useGsapFadeUp } from "../context/useGsapFadeUp";
import gsap from "gsap";

// Dummy restaurant data
const restaurants = [
  {
    name: "Foodworld",
    rating: 46,
    offer: "20% off",
    status: "Opens tomorrow",
    fast: true,
    image: "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Pizzahub",
    rating: 40,
    offer: "15% off",
    status: "Opens tomorrow",
    fast: true,
    image: "https://plus.unsplash.com/premium_photo-1673580742890-4af144293960?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Donuts hut",
    rating: 20,
    offer: "10% off",
    status: "Open Now",
    fast: true,
    image: "https://media.istockphoto.com/id/157472912/photo/ice-cream-composition-on-a-bowl.webp",
  },
  {
    name: "Donuts hut",
    rating: 50,
    offer: "15% off",
    status: "Open Now",
    fast: true,
    image: "https://images.unsplash.com/photo-1589627461407-6257b1acf0fd?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Ruby Tuesday",
    rating: 26,
    offer: "10% off",
    status: "Open Now",
    fast: true,
    image: "https://plus.unsplash.com/premium_photo-1681826495246-aac523b9461f?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Kuakata Fried Chicken",
    rating: 53,
    offer: "25% off",
    status: "Open Now",
    fast: true,
    image: "https://images.unsplash.com/photo-1537790698196-aad88bf9bb27?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Red Square",
    rating: 45,
    offer: "10% off",
    status: "Open Now",
    fast: true,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=60",
  },
  {
    name: "Taco Bell",
    rating: 35,
    offer: "10% off",
    status: "Open Now",
    fast: true,
    image: "https://plus.unsplash.com/premium_photo-1672498329467-b27e2a97d29b?w=600&auto=format&fit=crop&q=60",
  },
];

// ✅ Restaurant Card
const RestaurantCard = React.forwardRef(({ image, name, rating, offer, status, fast }, ref) => (
  <div ref={ref} className="bg-white rounded-2xl shadow-lg overflow-hidden text-sm hover:scale-105 transition-transform duration-300" style={{ width: "250px" }}>
    <div className="relative">
      <img src={image} alt={name} className="w-full h-32 object-cover" />
      <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
        {offer}
      </div>
      {fast && (
        <div className="absolute top-2 right-2 bg-yellow-300 text-black text-xs px-2 py-0.5 rounded">
          Fast
        </div>
      )}
    </div>
    <div className="p-3">
      <h3 className="font-semibold text-base mb-1">{name}</h3>
      <div className="flex items-center text-gray-600">
        <FaStar className="text-yellow-400 mr-1" /> {rating}
      </div>
      <div
        className={`mt-2 inline-block px-2 py-0.5 text-[10px] rounded-full ${
          status === "Open Now"
            ? "bg-green-100 text-green-600"
            : "bg-orange-100 text-orange-600"
        }`}
      >
        {status}
      </div>
    </div>
  </div>
));

const FeaturedRestaurants = () => {
  const [chefs, setChefs] = useState([]);
  const [selectedChef, setSelectedChef] = useState(null);
  const navigate = useNavigate();

  const cardRefs = useRef([]);
  cardRefs.current = restaurants.map((_, i) => cardRefs.current[i] ?? React.createRef());

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
    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 ref={titleRef} className="text-3xl font-bold text-center text-orange-800 mb-8">
          Featured Restaurants
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              {...restaurant}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            ref={buttonRef}
            onClick={() => (window.location.href = "/allchef")}
            className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            View All
          </button>
        </div>
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
