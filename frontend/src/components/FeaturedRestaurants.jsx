import React, { useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useGsapFadeUp } from "../context/useGsapFadeUp";

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

// ✅ Restaurant Card Component (with forwardRef)
const RestaurantCard = React.forwardRef(({ image, name, rating, offer, status, fast }, ref) => (
  <div ref={ref} className="bg-white rounded-xl overflow-hidden shadow-md">
    <div className="relative">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="absolute top-2 left-2 bg-orange-500 text-white text-sm px-2 py-1 rounded">{offer}</div>
      {fast && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-sm px-2 py-1 rounded">Fast</div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-1">{name}</h3>
      <div className="flex items-center text-sm text-gray-600">
        <FaStar className="text-yellow-400 mr-1" /> {rating}
      </div>
      <div
        className={`mt-2 inline-block px-3 py-1 text-xs rounded-full ${
          status === "Open Now" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
        }`}
      >
        {status}
      </div>
    </div>
  </div>
));

const FeaturedRestaurants = () => {
  const titleRef = useGsapFadeUp(0.1, 20);
  const buttonRef = useGsapFadeUp(0.6, 20);

  // 🧠 Create refs for each card
  const cardRefs = useRef([]);
  cardRefs.current = restaurants.map((_, i) => cardRefs.current[i] ?? React.createRef());

  // ⚡ Trigger GSAP for cards
  useEffect(() => {
    cardRefs.current.forEach((ref, i) => {
      if (ref?.current) {
        gsap.from(ref.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: 0.15 + i * 0.05,
          ease: "power3.out",
        });
      }
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 ref={titleRef} className="text-2xl font-bold text-center mb-8">
        Featured Restaurants
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            {...restaurant}
          />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          ref={buttonRef}
          onClick={() => (window.location.href = "/allchef")}
          className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
