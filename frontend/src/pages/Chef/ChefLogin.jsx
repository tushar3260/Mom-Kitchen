import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

const ChefLogin = () => {
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

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
      localStorage.setItem('chefEmail', email);
      localStorage.setItem('chefToken', token);
      if (!token) {
        toast.error('❌ Login failed! No token received');
        return;
      }

      window.location.href = '/chef/otp'; // Redirect to Chef Dashboard or Home
        // Store token in localStorage

     
      toast.success(res.data.message || 'Chef logged in successfully!');
      // navigate('/chef');  // Redirect to Chef Dashboard or Home
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8ee] px-4 py-10">
      <Toaster position="top-center" />
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-[#ff7e00] text-center">Chef Login</h2>

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
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#ff7e00] hover:bg-orange-600'} text-white py-3 rounded-xl`}
          >
            {loading ? 'Logging in...' : 'Login as Chef'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <a href="/chef" className="text-[#ff7e00] underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ChefLogin;
