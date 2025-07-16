import React, { useEffect, useState } from "react";

const Allchef = () => {
  const [chefs, setChefs] = useState([]);
  const [selectedChef, setSelectedChef] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/chefs/getAllChefs`,{
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch chefs");
        return res.json();
      })
      .then((data) => {
        setChefs(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setChefs([]);
      });
  }, []);

  return (
    <section className="bg-[#fffaf1] min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-orange-600 mb-10">Our Chefs</h2>

        {/* 🔹 If a chef is selected, show full details */}
        {selectedChef ? (
          <div className="bg-white p-8 rounded-2xl shadow-md border border-orange-300 text-left max-w-2xl mx-auto">
           <button
  onClick={() => setSelectedChef(null)}
  className="inline-block mb-6 px-4 py-2 border border-orange-500 text-orange-700 font-semibold text-lg rounded-lg hover:bg-orange-50 hover:text-orange-800 transition duration-200"
>
  ← Back to all chefs
</button>


            <h3 className="text-3xl font-bold text-orange-700 mb-4">{selectedChef.name}</h3>

            <div className="space-y-3 text-[17px] text-gray-800 leading-relaxed">
              <p>📍 <strong>Area:</strong> {selectedChef.location?.area || "N/A"}</p>
              <p>📞 <strong>Phone:</strong> {selectedChef.phone || "N/A"}</p>
              <p>📧 <strong>Email:</strong> {selectedChef.email || "N/A"}</p>
              <p>🍽 <strong>Cuisine:</strong> {selectedChef.cuisine?.join(", ") || "N/A"}</p>
              <p>📝 <strong>Bio:</strong> {selectedChef.bio || "No description provided."}</p>

              {/* ✅ No links — plain text documents */}
              

             
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chefs.map((chef) => (
      <div
  key={chef._id}
  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-200 cursor-pointer"
  onClick={() => setSelectedChef(chef)}
>
  {/* Name - centered and themed */}
  <h3 className="text-2xl font-bold text-orange-700 text-center mb-4">
    {chef.name}
  </h3>

  {/* Cuisine - above area */}
  <p className="text-base text-center mb-2">
    🍽 <span className="font-semibold text-orange-600">Cuisine:</span>{" "}
    <span className="text-gray-800 font-normal">
      {chef.cuisine?.join(", ") || "N/A"}
    </span>
  </p>

  {/* Area */}
  <p className="text-base text-gray-700 text-center mb-2">
    📍 {chef.location?.area || "N/A"}
  </p>

  {/* Bio */}
  <p className="text-base text-gray-600 mt-2 text-center">
    {chef.bio?.slice(0, 60) || "No bio available..."}
  </p>
</div>

            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Allchef;
