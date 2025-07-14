import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import AdminContext from "./context/AdminContext"; // Adjust path if needed

export default function AdminSignup() {
  const navigate = useNavigate();
  const { setAdmin, setAdminToken } = useContext(AdminContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (!form.username || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admins/register`,
        {
          username: form.username,
          password: form.password,
        },
        { withCredentials: true }
      );

      localStorage.setItem("AdminToken", res.data.token);
      localStorage.setItem("AdminData",res.data);
      setAdmin(res.data.admin);
      setAdminToken(res.data.token);

      toast.success("Signup successful!");

      setTimeout(() => {
        navigate("/admin/secure/tales/dashboard");
      }, 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white rounded-3xl shadow-xl px-10 py-12 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-8">
          Admin Sign Up
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full bg-orange-500 text-white py-3 rounded-xl text-lg font-semibold transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/admin/secure/tales/login")}
            disabled={loading}
            className="text-orange-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
