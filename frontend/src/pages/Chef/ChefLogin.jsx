import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import ChefContext from './Context/ChefContext.jsx';
import Loading from '../../Loading.jsx'; // Make sure path is correct

const ChefLogin = () => {
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();
  const { setChef, setChefToken } = useContext(ChefContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !passwordHash) {
      toast.error('❌ Email and Password required');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chefs/login`,
        { email, passwordHash },
        { withCredentials: true }
      );

      const token = res.data.token;
      const chef = res.data.chef;

      if (!token) {
        toast.error('❌ Login failed! No token received');
        return;
      }

      // Store data in localStorage and context
      localStorage.setItem('chefToken', token);
      localStorage.setItem('chefData', JSON.stringify(chef));
      localStorage.setItem('chefEmail', chef.email);

      setChef(chef);
      setChefToken(token);

      toast.success(res.data.message || '✅ Chef logged in successfully!');

      window.location.href = '/otp?role=chef'; // Redirect to OTP page
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8ee] px-4 py-10">
      <Toaster position="top-center" />

      {/* 🔥 Fullscreen Loading Component */}
      {loading && <Loading message="Logging in as Chef..." />}

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full z-10">
        <h2 className="text-3xl font-bold mb-6 text-[#ff7e00] text-center">
          Chef Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={passwordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-300"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-gray-400' : 'bg-[#ff7e00] hover:bg-orange-600'
            } text-white py-3 rounded-xl`}
          >
            {loading ? 'Logging in...' : 'Login as Chef'}
          </button>
        </form>

        <p className="mt-4 text-center">
  Don't have an account?{' '}
  <Link to="/chef/signup" className="text-[#ff7e00] underline">
    Sign up here
  </Link>
</p>

      </div>
    </div>
  );
};

export default ChefLogin;
