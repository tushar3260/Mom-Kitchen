import React from 'react';

const LandingPage = () => {
  return (
    <div className="w-full relative bg-white overflow-hidden">
      {/* Header Section */}
      <header className="w-full h-20 bg-white shadow-md flex justify-between items-center px-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-300"></div>
          <div className="w-2 h-2 bg-gray-300"></div>
          <div className="w-8 h-3 bg-gradient-to-b from-yellow-200 to-orange-500"></div>
          <div className="w-8 h-4 bg-amber-300"></div>
          <div className="w-8 h-2 bg-orange-600 rounded-md"></div>
          <div className="w-8 h-2 bg-orange-400"></div>
          <div className="w-8 h-2 bg-orange-400"></div>
          <h1 className="text-orange-600 text-3xl font-bold">food<span className="text-yellow-500">waGon</span></h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-bold">Deliver to:</span>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-black">📍</span>
            <span className="text-gray-700">Mohammadpur Bus Stand, Dhaka</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-black">🔍</span>
            <span className="text-gray-700 font-bold">Search Food</span>
          </div>
          <button className="px-6 py-4 bg-white shadow-lg rounded-lg flex items-center gap-2">
            <span className="text-yellow-500 font-black">👤</span>
            <span className="text-yellow-500 font-bold">Login</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[696px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[254px] left-[190px] flex flex-col gap-8">
            <div className="rounded-2xl flex flex-col gap-4">
              <h1 className="text-8xl font-bold text-gray-900 shadow-lg">Are you starving?</h1>
              <p className="text-xl text-gray-600">Within a few clicks, find meals that are accessible near you</p>
            </div>

            <div className="shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-white p-6 flex items-start gap-2">
                <button className="px-6 py-2 bg-orange-100 rounded-lg flex items-center gap-2">
                  <span className="text-orange-600 font-black">🏍️</span>
                  <span className="text-orange-600 font-bold">Delivery</span>
                </button>
                <button className="px-6 py-2 flex items-center gap-2">
                  <span className="text-gray-500 font-black">🛍️</span>
                  <span className="text-gray-500 font-bold">Pickup</span>
                </button>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="bg-white p-6 flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-100 rounded-lg p-2 flex items-center gap-3">
                    <span className="text-red-400 text-2xl font-black">📍</span>
                    <span className="text-gray-400">Enter Your Address</span>
                  </div>
                  <button className="px-12 py-6 bg-gradient-to-r from-red-400 to-orange-500 rounded-lg flex items-center gap-2">
                    <span className="text-white font-bold">Find Food</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[672px] left-[1842px] w-[217px] h-[191px] rotate-180 opacity-10 outline outline-2 outline-red-500"></div>
        <div className="absolute top-[168px] left-[1146px] w-[197px] h-[133px] opacity-10 outline outline-2 outline-red-500"></div>
      </section>

      {/* Deals Section */}
      <section className="flex gap-4 p-20">
        {[15, 10, 25, 20].map((discount, index) => (
          <div key={index} className="flex flex-col gap-8">
            <div className="w-[357px] h-[301px] bg-white rounded-2xl overflow-hidden relative">
              <img src="https://placehold.co/357x301" alt="Deal" className="w-full h-full object-cover" />
              <div className="absolute left-0 top-[219px] bg-yellow-500 rounded-tr-3xl flex items-center px-4 py-2">
                <span className="text-white text-6xl font-bold">{discount}</span>
                <div className="flex flex-col">
                  <span className="text-white text-3xl font-bold">%</span>
                  <span className="text-white text-xl">Off</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-gray-700 text-xl font-bold">Greys Vage</h3>
              <div className="bg-orange-100 px-4 py-2 rounded-lg">
                <span className="text-orange-600 font-bold">{6 + index} Days Remaining</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 bg-gradient-to-b from-yellow-100 to-transparent flex flex-col items-center gap-16">
        <h2 className="text-orange-600 text-4xl font-bold">How does it work</h2>
        <div className="flex justify-center gap-8">
          {[
            {
              icon: (
                <div className="w-20 h-28 shadow-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-b from-yellow-400 to-yellow-300 border-2 border-yellow-500">
                    <div className="w-12 h-12 bg-white absolute top-5 left-5"></div>
                  </div>
                </div>
              ),
              title: "Select location",
              desc: "Choose the location where your food will be delivered."
            },
            {
              icon: (
                <div className="w-20 h-28 shadow-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-b from-yellow-400 to-yellow-300 rounded-xl border-2 border-yellow-500">
                    <div className="w-12 h-14 absolute top-6 left-6 bg-white"></div>
                  </div>
                </div>
              ),
              title: "Choose order",
              desc: "Check over hundreds of menus to pick your favorite food"
            },
            {
              icon: (
                <div className="w-20 h-28 bg-gradient-to-b from-yellow-400 to-yellow-300 rounded-full border-2 border-yellow-500 shadow-lg">
                  <div className="w-12 h-16 bg-white absolute top-16 left-14"></div>
                </div>
              ),
              title: "Pay advanced",
              desc: "It's quick, safe, and simple. Select several methods of payment"
            },
            {
              icon: (
                <div className="w-28 h-28 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-b from-yellow-400 to-yellow-300 border-2 border-yellow-500">
                    <div className="w-20 h-20 absolute top-5 left-5 bg-white"></div>
                  </div>
                </div>
              ),
              title: "Enjoy meals",
              desc: "Food is made and delivered directly to your home."
            }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-10">
              <div className="flex justify-center">{item.icon}</div>
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-gray-700 text-xl font-bold w-[307px] text-center">{item.title}</h3>
                <p className="text-gray-500 text-center">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="relative h-[605px]">
        <div className="absolute left-[221px] top-0 flex flex-col items-center gap-20">
          <h2 className="text-gray-900 text-4xl font-bold">Popular items</h2>
          <div className="w-[1481px] flex gap-4">
            {[
              { name: "Cheese Burger", restaurant: "Burger Arena", price: "$3.88" },
              { name: "Toffe's Cake", restaurant: "Top Sticks", price: "$4.00" },
              { name: "Dancake", restaurant: "Cake World", price: "$1.99" },
              { name: "Crispy Sandwitch", restaurant: "Fastfood Dine", price: "$3.00" },
              { name: "Thai Soup", restaurant: "Foody man", price: "$2.79" }
            ].map((item, index) => (
              <div key={index} className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="h-[283px] relative rounded-2xl overflow-hidden">
                    <img src="https://placehold.co/283x283" alt={item.name} className="w-full h-full" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-gray-700 text-xl font-bold">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500 font-black">📍</span>
                        <span className="text-yellow-500">{item.restaurant}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-900 text-xl font-bold">{item.price}</span>
                    </div>
                  </div>
                </div>
                <button className="px-12 py-6 bg-orange-600 shadow-lg rounded-lg flex justify-center">
                  <span className="text-white font-bold">Order Now</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-[256px] left-[99px] w-[1724px] flex justify-between">
          <button className="p-2 bg-yellow-500 shadow-lg rounded-full outline outline-1 outline-yellow-400">
            <span className="text-white text-3xl">◀</span>
          </button>
          <button className="p-2 bg-yellow-500 shadow-lg rounded-full outline outline-1 outline-yellow-400">
            <span className="text-white text-3xl">▶</span>
          </button>
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section className="flex flex-col items-center gap-20 py-20">
        <h2 className="text-gray-900 text-4xl font-bold">Featured Restaurants</h2>
        <div className="flex flex-col gap-16">
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="rounded-2xl overflow-hidden flex flex-col gap-6">
                <div className="w-[357px] h-[301px] bg-white rounded-2xl relative">
                  <img src="https://placehold.co/357x301" alt="Restaurant" className="w-full h-full" />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <div className="px-4 py-2 bg-orange-600 rounded-lg flex items-center gap-2">
                      <span className="text-white font-black">🏷️</span>
                      <span className="text-white font-bold">{item === 1 ? "20%" : item === 2 ? "15%" : "10%"} off</span>
                    </div>
                    <div className="px-4 py-2 bg-yellow-500 rounded-lg flex items-center gap-2">
                      <span className="text-white font-black">⏱️</span>
                      <span className="text-white font-bold">Fast</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-6">
                    <img src="https://placehold.co/64x64" alt="Logo" className="w-16 h-16" />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-700 text-xl font-bold">Foodworld</h3>
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-500 font-black">⭐</span>
                        <span className="text-yellow-500">46</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-orange-100 rounded-xl">
                    <span className="text-orange-600 font-bold">Opens tomorrow</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            {[5, 6, 7, 8].map((item) => (
              <div key={item} className="rounded-2xl overflow-hidden flex flex-col gap-6">
                <div className="w-[357px] h-[301px] bg-white rounded-2xl relative">
                  <img src="https://placehold.co/357x301" alt="Restaurant" className="w-full h-full" />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <div className="px-4 py-2 bg-orange-600 rounded-lg flex items-center gap-2">
                      <span className="text-white font-black">🏷️</span>
                      <span className="text-white font-bold">{item === 5 ? "10%" : item === 6 ? "25%" : "10%"} off</span>
                    </div>
                    <div className="px-4 py-2 bg-yellow-500 rounded-lg flex items-center gap-2">
                      <span className="text-white font-black">⏱️</span>
                      <span className="text-white font-bold">Fast</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-6">
                    <img src="https://placehold.co/64x64" alt="Logo" className="w-16 h-16" />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-700 text-xl font-bold">
                        {item === 5 ? "Ruby Tuesday" : item === 6 ? "Kuakata Fried Chicken" : item === 7 ? "Red Square" : "Taco Bell"}
                      </h3>
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-500 font-black">⭐</span>
                        <span className="text-yellow-500">{item === 5 ? "26" : item === 6 ? "53" : item === 7 ? "45" : "35"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-green-100 rounded-xl">
                    <span className="text-green-600 font-bold">Open Now</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="px-12 py-6 bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg rounded-xl flex items-center gap-2">
          <span className="text-white font-bold">View All</span>
          <span className="text-white font-black">▶</span>
        </button>
      </section>

      {/* Search by Food Section */}
      <section className="relative h-[571px] bg-[#FEFAF1]">
        <div className="absolute left-[223px] top-[82px] w-[1479px] h-[434px] flex flex-col items-center gap-20">
          <div className="w-full flex justify-between items-start">
            <h2 className="text-gray-900 text-4xl font-bold">Search by Food</h2>
            <div className="pr-4 flex items-center gap-6">
              <div className="py-6 rounded-full flex justify-end items-center gap-2">
                <span className="text-yellow-500 font-bold">View All</span>
                <span className="text-yellow-500 font-black">▶</span>
              </div>
              <div className="flex gap-4">
                <button className="p-2 bg-yellow-500 shadow-lg rounded-full outline outline-1 outline-yellow-400">
                  <span className="text-white text-3xl">◀</span>
                </button>
                <button className="p-2 bg-yellow-500 shadow-lg rounded-full outline outline-1 outline-yellow-400">
                  <span className="text-white text-3xl">▶</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
            {["Pizza", "Burger", "Noodles", "Sub-sandiwch", "Chowmein", "Steak"].map((food, index) => (
              <div key={index} className="flex flex-col items-center gap-6">
                <div className="w-[218px] h-[218px] rounded-full overflow-hidden">
                  <img src="https://placehold.co/218x218" alt={food} className="w-full h-full" />
                </div>
                <h3 className="text-gray-700 text-xl font-bold">{food}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-[130px] bg-[#FEEFD0] flex flex-col items-center gap-[124px]">
        <div className="w-[1230px] p-[55px] bg-white shadow-xl rounded-[46px] flex justify-between items-center">
          {[
            {
              icon: (
                <div className="w-[136px] h-[136px] relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-b from-yellow-400 to-yellow-300 border-2 border-yellow-500">
                    <div className="w-[46px] h-[56px] absolute top-[24px] left-[43px] bg-yellow-500"></div>
                    <div className="w-[25px] h-[8px] absolute top-[65px] left-[63px] bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
                    <div className="w-[8px] h-[36px] absolute top-[33px] left-[59px] bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
                  </div>
                </div>
              ),
              title: "Daily\nDiscounts"
            },
            {
              icon: (
                <div className="w-[136px] h-[136px] relative overflow-hidden">
                  <div className="w-[87px] h-[112px] absolute top-0 left-0 bg-gradient-to-b from-yellow-400 to-yellow-300 rounded-xl border-2 border-yellow-500">
                    <div className="w-[50px] h-[50px] absolute top-[17px] left-[43px] bg-white rounded-full"></div>
                  </div>
                </div>
              ),
              title: "Live\nTracing"
            },
            {
              icon: (
                <div className="w-[136px] h-[136px] relative overflow-hidden">
                  <div className="w-[105px] h-[105px] absolute top-[16px] left-[10px] bg-gradient-to-b from-white to-gray-300">
                    <div className="w-[3px] h-[12px] absolute top-[27px] left-[61px] bg-gradient-to-r from-red-400 to-orange-500"></div>
                    <div className="w-[3px] h-[13px] absolute top-[98px] left-[61px] bg-gradient-to-r from-red-400 to-orange-500"></div>
                    <div className="w-[13px] h-[3px] absolute top-[67px] left-[92px] bg-gradient-to-r from-red-400 to-orange-500"></div>
                    <div className="w-[12px] h-[3px] absolute top-[67px] left-[21px] bg-gradient-to-r from-red-400 to-orange-500"></div>
                  </div>
                </div>
              ),
              title: "Quick\nDelivery"
            }
          ].map((item, index) => (
            <React.Fragment key={index}>
              <div className="rounded-[27px] flex items-center gap-8">
                {item.icon}
                <h3 className="text-red-600 text-3xl font-bold whitespace-pre-line">{item.title}</h3>
              </div>
              {index < 2 && <div className="w-[2px] h-[96px] bg-gray-300"></div>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* App Section */}
      <section className="relative h-[589px] bg-gradient-to-b from-yellow-400 to-yellow-500 overflow-hidden">
        <div className="absolute w-[7216px] h-[7216px] left-[-2456px] top-[-6707px] bg-[#FEEFD0] rounded-full"></div>
        <div className="absolute left-[1095px] top-[118px] w-[479px] flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-yellow-500 text-6xl font-bold">Install the app</h2>
            <p className="text-gray-500">It's never been easier to order food. Look for the finest discounts and you'll be lost in a world of delectable food.</p>
          </div>
          <div className="flex gap-2">
            <button className="w-[202px] h-[60px] bg-white shadow-lg rounded-sm">
              <div className="w-[127px] h-[26px] absolute top-[26px] left-[62px] bg-gray-900"></div>
            </button>
            <button className="w-[180px] h-[60px] bg-white shadow-lg rounded-lg">
              <div className="w-[113px] h-[24px] absolute top-[27px] left-[52px] bg-gray-900"></div>
            </button>
          </div>
        </div>
        <div className="absolute left-[622px] top-[62px] w-[329px] h-[664px]">
          <div className="w-full h-full bg-gray-200 rounded-[52px] border-4 border-white"></div>
          <img src="https://placehold.co/320x664" alt="App Mockup" className="absolute top-0 left-[3px] w-[320px] h-[664px]" />
        </div>
      </section>

      {/* Details Cards Section */}
      <section className="flex flex-col items-center gap-20 py-20">
        {[
          {
            title: "Best deals Crispy Sandwiches",
            description: "Enjoy the large size of sandwiches. Complete perfect slice of sandwiches.",
            image: "https://placehold.co/961x512",
            reverse: false
          },
          {
            title: "Celebrate parties with Fried Chicken",
            description: "Get the best fried chicken smeared with a lip smacking lemon chili flavor. Check out best deals for fried chicken.",
            image: "https://placehold.co/961x512",
            reverse: true
          },
          {
            title: "Wanna eat hot & spicy Pizza?",
            description: "Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals.",
            image: "https://placehold.co/961x512",
            reverse: false
          }
        ].map((card, index) => (
          <div key={index} className={`w-[1480px] shadow-xl rounded-2xl overflow-hidden flex ${card.reverse ? 'flex-row-reverse' : ''}`}>
            <div className="flex-1 p-14 bg-white flex flex-col gap-12">
              <div className="flex-1 flex flex-col gap-5 justify-center">
                <h2 className="text-gray-900 text-5xl font-bold">{card.title}</h2>
                <p className="text-gray-600">{card.description}</p>
              </div>
              <button className="px-12 py-6 bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg rounded-lg flex items-center justify-center gap-2">
                <span className="text-white font-bold uppercase">Proceed to order</span>
                <span className="text-white font-black">▶</span>
              </button>
            </div>
            <div className="w-[961px] h-[512px]">
              <img src={card.image} alt="Food" className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img src="https://placehold.co/1920x400" alt="Background" className="w-full h-full object-cover opacity-90" />
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[91px] w-[728px] text-center text-white text-6xl font-black">
          Are you ready to order with the best deals?
        </div>
        <button className="absolute left-1/2 transform -translate-x-1/2 top-[265px] px-12 py-6 bg-gradient-to-r from-orange-600 to-orange-700 shadow-lg rounded-lg flex items-center justify-center gap-2">
          <span className="text-white font-bold uppercase">Proceed to order</span>
          <span className="text-white font-black">▶</span>
        </button>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gray-900">
        <div className="w-full h-[936px] relative overflow-hidden">
          <div className="absolute left-[221px] top-[99px] w-[1480px] h-[236px] flex flex-col gap-10">
            <h3 className="text-white text-xl font-bold">Our top cities</h3>
            <div className="w-full flex justify-between">
              {[
                ["San Francisco", "Miami", "San Diego", "East Bay", "Long Beach"],
                ["Los Angeles", "Washington DC", "Seattle", "Portland", "Nashville"],
                ["New York City", "Orange County", "Atlanta", "Charlotte", "Denver"],
                ["Chicago", "Phoenix", "Las Vegas", "Sacramento", "Oklahoma City"],
                ["Columbus", "New Mexico", "Albuquerque", "Sacramento", "New Orleans"]
              ].map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-4">
                  {column.map((city, cityIndex) => (
                    <span key={cityIndex} className="text-gray-100">{city}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute left-[221px] top-[434px] w-[1480px] flex flex-col gap-16">
            <div className="w-full flex justify-between">
              <div className="w-[607px] flex justify-between">
                <div className="flex flex-col gap-10">
                  <h3 className="text-white text-xl font-bold">Company</h3>
                  <div className="flex flex-col gap-4">
                    {["About us", "Team", "Careers", "Blog"].map((item, index) => (
                      <span key={index} className="text-gray-100">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-10">
                  <h3 className="text-white text-xl font-bold">Contact</h3>
                  <div className="flex flex-col gap-4">
                    {["Help & Support", "Partner with us", "Ride with us"].map((item, index) => (
                      <span key={index} className="text-gray-100">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-10">
                  <h3 className="text-white text-xl font-bold">Legal</h3>
                  <div className="flex flex-col gap-4">
                    {["Terms & Conditions", "Refund & Cancellation", "Privacy Policy", "Cookie Policy"].map((item, index) => (
                      <span key={index} className="text-gray-100">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-[483px] flex flex-col gap-10">
                <div className="flex flex-col gap-10">
                  <h3 className="text-gray-100 opacity-60 font-bold uppercase">Follow Us</h3>
                  <div className="flex gap-4 opacity-30">
                    <span className="text-gray-100 text-2xl">📷</span>
                    <span className="text-gray-100 text-2xl">📘</span>
                    <span className="text-gray-100 text-2xl">🐦</span>
                  </div>
                </div>
                <div className="flex flex-col gap-10">
                  <h3 className="text-gray-300 font-bold">Receive exclusive offers in your mailbox</h3>
                  <div className="w-full flex items-center gap-4">
                    <div className="flex-1 bg-gray-700 rounded-lg p-2 flex items-center gap-3">
                      <span className="text-gray-400 text-2xl font-black">✉️</span>
                      <span className="text-gray-400">Enter Your email</span>
                    </div>
                    <button className="w-[133px] px-6 py-6 bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg rounded-lg flex justify-center">
                      <span className="text-white font-bold">Subscribe</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[53px] flex flex-col gap-4">
              <div className="w-full flex justify-between">
                <div className="flex items-start gap-2">
                  <span className="text-gray-100">All rights Reserved</span>
                  <span className="text-gray-100">©</span>
                  <span className="text-gray-100 font-bold">Your Company, 2021</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-100">Made with ❤️ by</span>
                  <span className="text-gray-100 font-bold">Themewagon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
