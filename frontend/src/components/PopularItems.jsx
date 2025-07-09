import React, { useRef } from 'react';

const popularItems = [
  {
    id: 1,
    name: 'Cheese Burger',
    place: 'Burger Arena',
    price: '$3.88',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzdGZvb2R8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 2,
    name: "Toffee's Cake",
    place: 'Top Sticks',
    price: '$4.00',
    image: 'https://media.istockphoto.com/id/178079507/photo/takeaway-curry.webp?a=1&b=1&s=612x612&w=0&k=20&c=5Q53q_MajvtYWG6NSkieiSfwm86i8SMmtHcAyy4hUEg='
  },
  {
    id: 3,
    name: 'Dancake',
    place: 'Cake World',
    price: '$1.99',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 4,
    name: 'Crispy Sandwich',
    place: 'Fastfood Dine',
    price: '$3.00',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 5,
    name: 'Thai Soup',
    place: 'Foody Man',
    price: '$2.79',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 6,
    name: 'Thai Soup',
    place: 'Foody Man',
    price: '$2.79',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 7,
    name: 'Thai Soup',
    place: 'Foody Man',
    price: '$2.79',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'
  }
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
      <h2 className="text-2xl font-bold mb-6 text-center">Popular Items</h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white rounded-full p-2 shadow hover:bg-orange-500"
        >
          &#8592;
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scrollbar-hidden px-10"
        >
          {popularItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md min-w-[220px]">
              <img src={item.image} alt={item.name} className="rounded-t-xl w-full h-36 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.place}</p>
                <p className="font-bold mt-2">{item.price}</p>
                <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white rounded-full p-2 shadow hover:bg-orange-500"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default PopularItems;
