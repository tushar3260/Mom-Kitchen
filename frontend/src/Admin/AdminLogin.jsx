import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import AdminContext from './context/AdminContext';
import { storage } from "../utils/Storage";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setAdmin, setAdminToken } = useContext(AdminContext);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotLink, setShowForgotLink] = useState(false);

  const shouldShowForgot = (msg = '') => {
    const m = msg.toLowerCase();
    return (
      m.includes('password') ||
      m.includes('invalid credentials') ||
      m.includes('incorrect') ||
      m.includes('unauthorized')
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const username = form.username.trim();
    const email = form.email.trim();
    const password = form.password.trim();

    setError('');
    setShowForgotLink(false);

    if (!username || !email || !password) {
      const msg = 'Please fill all fields';
      toast.error(msg);
      setError(msg);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admins/login`,
        { username, email, password },
        { withCredentials: true }
      );

      const { admin, token, message } = res.data;

      console.log('✅ Full Admin Received:', admin);

      if (admin && token) {
        setAdmin(admin);
        setAdminToken(token);

        storage.setItem('AdminToken', token);
        storage.setItem('AdminData', admin);

        toast.success(message || 'Login successful!');
        setLoading(false);

        // redirect to OTP
        setTimeout(() => {
          window.location.href = '/otp?role=admin';
        }, 1500);
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Login failed. Please try again.';
      toast.error(msg);
      setError(msg);
      setShowForgotLink(shouldShowForgot(msg));
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
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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
          className="w-full px-4 py-3 mb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {error && (
          <p className="text-center text-sm text-red-600 mb-2">{error}</p>
        )}

        {showForgotLink && (
          <p className="text-center text-sm mb-4">
            <Link
              to="/forgot-password?role=admin"
              className="text-orange-600 font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full bg-orange-500 text-white py-3 rounded-xl text-lg font-semibold transition ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => navigate('/admin/secure/tales/')}
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
