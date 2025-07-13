import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ChefDetail() {
  const { id } = useParams();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/chef/getChefById/${id}`, {
      method: "GET",
      credentials: "include", // ⬅️ Important for auth cookie
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or Not Found");
        return res.json();
      })
      .then((data) => {
        setChef(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err.message);
        setChef(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">⏳ Loading...</p>;
  if (!chef) return <p className="text-red-500 p-6">❌ Chef not found or unauthorized</p>;

  return (
    <div className="min-h-screen bg-[#fffaf1] flex flex-col items-center justify-center py-10">
      <img
        src={chef.kitchenImages?.[0] || "https://via.placeholder.com/200"}
        alt={chef.name}
        className="w-40 h-40 rounded-full object-cover mb-4"
      />
      <h1 className="text-2xl font-bold text-orange-600 mb-2">{chef.name}</h1>
      <p className="text-gray-700">📍 {chef.location}</p>
      <p className="text-gray-700">📧 {chef.email}</p>
      <p className="text-gray-700">📞 {chef.phone}</p>
      <p className="text-gray-700">Cuisine: {chef.cuisine?.join(", ")}</p>
      <p className="text-center max-w-xl mt-4 text-gray-600">{chef.bio}</p>
    </div>
  );
}

export default ChefDetail;
