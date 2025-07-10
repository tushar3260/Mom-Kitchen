import { useState } from "react";

function AddLocation() {
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [tag, setTag] = useState("Home");

  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/user/${userId}/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ pincode, city, street, tag })
      });

      const data = await res.json();
      alert("Address added successfully!");
      console.log(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 mt-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Add New Address</h2>

      <input
        type="text"
        placeholder="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        className="w-full mb-3 border border-gray-300 p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full mb-3 border border-gray-300 p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        className="w-full mb-3 border border-gray-300 p-2 rounded"
        required
      />

      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="w-full mb-4 border border-gray-300 p-2 rounded"
      >
        <option value="Home">Home</option>
        <option value="Work">Work</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
        Save Address
      </button>
    </form>
  );
}
export default AddLocation;