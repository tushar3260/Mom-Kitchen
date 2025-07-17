import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useChef } from './Context/ChefContext.jsx';
import Loading from '../../Loading.jsx'; // make sure path is correct

const ChefLogin = () => {
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState(''); // backend expects `passwordHash`
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [showForgotLink, setShowForgotLink] = useState(false);

  const {chef}  = useChef()
  console.log(chef) 

  const shouldShowForgot = (msg = '') => {
    const m = msg.toLowerCase();
    return (
      m.includes('password') ||
      m.includes('invalid credentials') ||
      m.includes('incorrect') ||
      m.includes('unauthorized')
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setShowForgotLink(false);

    if (!email || !passwordHash) {
      const msg = '❌ Email and Password required';
      toast.error(msg);
      setError(msg);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chefs/login`,
        { email: email.trim(), passwordHash: passwordHash },
        { withCredentials: true }
      );

      const token = res.data.token;
      const chef = res.data.chef;

      if (!token) {
        const msg = '❌ Login failed! No token received';
        toast.error(msg);
        setError(msg);
        setShowForgotLink(true); // something’s off; let them reset
        return;
      }

      // Persist
      localStorage.setItem('chefToken', token);
      localStorage.setItem('chefData', JSON.stringify(chef));
      localStorage.setItem('chefEmail', chef.email);

      setChef(chef);
      setChefToken(token);

      toast.success(res.data.message || '✅ Chef logged in successfully!');
      setLoading(false);

      // Redirect to OTP verify
      window.location.href = '/otp?role=chef';
    } catch (err) {
      const msg = err?.response?.data?.message || '❌ Login failed!';
      toast.error(msg);
      setError(msg);
      setShowForgotLink(shouldShowForgot(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8ee] px-4 py-10">
      <Toaster position="top-center" />

      {/* Fullscreen Loading Overlay */}
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
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={passwordHash}
            disabled={loading}
            onChange={(e) => setPasswordHash(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-300"
          />

          {error && (
            <p className="text-center text-sm text-red-600 -mt-1">{error}</p>
          )}

          {showForgotLink && (
            <p className="text-center text-sm">
              <Link
                to="/forgot-password?role=chef"
                className="text-[#ff7e00] underline font-medium"
              >
                Forgot Password?
              </Link>
            </p>
          )}

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
          Don&apos;t have an account?{' '}
          <Link to="/chef/signup" className="text-[#ff7e00] underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ChefLogin;
