import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const popularItems = [
  {
    id: 1,
    name: 'Cheese Burger',
    place: 'Burger Arena',
    price: '$3.88',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    name: "Toffee's Cake",
    place: 'Top Sticks',
    price: '$4.00',
    image: 'https://media.istockphoto.com/id/178079507/photo/takeaway-curry.webp'
  },
  {
    id: 3,
    name: 'Dancake',
    place: 'Cake World',
    price: '$1.99',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'
  }
  // ... you can keep others too
];

function PopularItems() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-10 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Popular Items</h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white rounded-full p-2 shadow hover:bg-orange-500 z-10"
        >
          &#8592;
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 px-10 scrollbar-hidden"
        >
          {popularItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-md min-w-[220px] hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img src={item.image} alt={item.name} className="rounded-t-xl w-full h-36 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.place}</p>
                <p className="font-bold mt-2">{item.price}</p>
                <motion.button
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
    </div>
  );
}

export default PopularItems;
