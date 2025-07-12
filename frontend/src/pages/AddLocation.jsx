import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useUser } from '../context/userContext.jsx'
function AddLocation() {
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [tag, setTag] = useState("Home");
 const { user } = useUser();
  const userId = user?._id; // Assuming user object has _id property
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/${userId}/address`,
        { pincode, city, street, tag },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      toast.success("✅ Address added successfully!");
      console.log(res.data);
      // Optionally clear the form after success
      setPincode("");
      setCity("");
      setStreet("");
      setTag("Home");
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error(err.response?.data?.message || "Failed to add address!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 mt-6 rounded-lg shadow">
      <Toaster position="top-center" />
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
