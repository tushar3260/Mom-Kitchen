import React from "react";
import girlPizzaImg from "../assets/girleatingpizza.jpg";

function Herosection() {
  return (
    <div className="font-sans">
     
      

      {/* Hero Section */}
      <div className="bg-[#fff7ed] py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative">
        <div className="max-w-xl z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">Are you starving?</h1>
          <p className="text-gray-600 mb-6">Within a few clicks, find meals that are accessible near you</p>

          <div className="relative">
            <div className="bg-white rounded-lg p-4 w-full z-10 relative shadow-[0px_10px_30px_rgba(255,115,0,0.25)]">
              <div className="flex items-center gap-4 mb-3">
                <button className="bg-orange-100 text-orange-500 px-4 py-1.5 rounded-full font-medium text-sm">🍔 Delivery</button>
                <button className="text-gray-500 px-4 py-1.5 rounded-full font-medium text-sm">🥡 Pickup</button>
              </div>

              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter Your Address"
                  className="flex-grow bg-gray-100 px-4 py-2 rounded-l-md outline-none text-sm"
                />
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-sm font-medium rounded-r-md"
                >
                  🔍 Find Food
                </button>
              </div>
            </div>

            <div className="absolute top-full left-0 right-0 h-3 bg-gradient-to-b from-orange-100 to-transparent rounded-b-lg shadow-xl blur-sm"></div>
          </div>
        </div>

        <div className="mt-10 md:mt-0 z-10">
          <img
            src={girlPizzaImg}
            alt="Girl Eating Pizza"
            className="w-80 md:w-96"
          />
        </div>
      </div>

      {/* Offers Section */}
      <div className="bg-white py-10 px-6 md:px-20 border-t-2 border-blue-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded overflow-hidden">
            <div className="relative">
              <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS7nJsnt7nacCDdKRwUD1yCG2wE6EtC6RG5jRp-m7doJGjJnpGS" alt="Food" className="w-full h-44 object-cover" />
              <span className="absolute bottom-2 left-2 bg-orange-400 text-white text-xs px-2 py-1 rounded font-semibold">
                15% Off
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold">Greys Vage</h3>
              <p className="text-xs text-orange-500 font-semibold mt-1">6 Days Remaining</p>
            </div>
          </div>
           <div className="bg-white shadow rounded overflow-hidden">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" alt="Food" className="w-full h-44 object-cover" />
              <span className="absolute bottom-2 left-2 bg-orange-400 text-white text-xs px-2 py-1 rounded font-semibold">
                15% Off
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold">Greys Vage</h3>
              <p className="text-xs text-orange-500 font-semibold mt-1">6 Days Remaining</p>
            </div>
          </div>
           <div className="bg-white shadow rounded overflow-hidden">
            <div className="relative">
              <img src="https://media.istockphoto.com/id/481772772/photo/chow-chow-bath.webp?a=1&b=1&s=612x612&w=0&k=20&c=9XGgHoxgXkU5Ir_9-H6oy1k0K-3ZnOK5K5K0-KR9jf0=" alt="Food" className="w-full h-44 object-cover" />
              <span className="absolute bottom-2 left-2 bg-orange-400 text-white text-xs px-2 py-1 rounded font-semibold">
                15% Off
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold">Greys Vage</h3>
              <p className="text-xs text-orange-500 font-semibold mt-1">6 Days Remaining</p>
            </div>
          </div>
           <div className="bg-white shadow rounded overflow-hidden">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" alt="Food" className="w-full h-44 object-cover" />
              <span className="absolute bottom-2 left-2 bg-orange-400 text-white text-xs px-2 py-1 rounded font-semibold">
                15% Off
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold">Greys Vage</h3>
              <p className="text-xs text-orange-500 font-semibold mt-1">6 Days Remaining</p>
            </div>
          </div>




          {/* You can duplicate the card above 3 times or map through items if you want dynamic later */}
        </div>
        
      </div>
    </div>
  );
}

export default Herosection;
