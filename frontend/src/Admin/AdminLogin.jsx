import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import AdminContext from "./context/AdminContext"; 
import { useContext } from "react";// ✅ Check this path based on your folder

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setAdmin, setAdminToken } = useContext(AdminContext); 
  // ✅ From custom hook

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admins/login`,
        {
          username: form.username,
          password: form.password,
        },
        { withCredentials: true }
      );

      const { admin, token } = res.data;

      if (admin && token) {
        setAdmin(admin);
        setAdminToken(token);
        localStorage.setItem("AdminToken", token);
        localStorage.setItem("AdminData", JSON.stringify(admin));
        toast.success("Login successful!");

        setTimeout(() => {
          window.location.href = '/admin/secure/tales/dashboard'; // 🔄 Redirect after login

        }, 1500);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white rounded-3xl shadow-xl px-10 py-12 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-8">
          Admin Login
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
          onClick={handleLogin}
          disabled={loading}
          className={`w-full bg-orange-500 text-white py-3 rounded-xl text-lg font-semibold transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/admin/secure/tales/")}
            disabled={loading}
            className="text-orange-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
