import React, { useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import UserContext from '../context/userContext.jsx';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotLink, setShowForgotLink] = useState(false); // 👈 new state

  const { setUser, setToken } = useContext(UserContext);

  const checkPasswordStrength = (pwd) => {
    if (!pwd) return '';
    if (pwd.length < 6) return 'Weak';
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.match(/[^A-Za-z0-9]/)) return 'Strong';
    return 'Medium';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setShowForgotLink(false); // Reset on new attempt

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const userData = { email, passwordHash: password };
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, userData);
      console.log("Login response:", res.data);

      if (res.status === 200) {
        const { user, token, message } = res.data;

        if (user && token) {
          setUser(user);
          setToken(token);
          localStorage.setItem("userData", JSON.stringify(user));
          localStorage.setItem("usertoken", token);

          setSuccess(message || "Login successful! Redirecting...");
          setLoading(false);

          setTimeout(() => {
            window.location.href = '/otp?role=user';
          }, 1500);
        } else {
          setError("Invalid response: Missing user or token");
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      const errorMsg = error?.response?.data?.message || "Login failed. Please try again.";
      setError(errorMsg);

      if (
    errorMsg.toLowerCase().includes("password") ||
    errorMsg.toLowerCase().includes("invalid credentials") ||
    errorMsg.toLowerCase().includes("incorrect")
  ) {
    setShowForgotLink(true); // 👈 Now it'll show even if backend says "invalid credentials"
  } else {
    setShowForgotLink(false);
  }

      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-orange-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-96 border border-orange-300"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-orange-600 text-center tracking-wide">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300"
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordStrength(checkPasswordStrength(e.target.value));
            }}
            className="w-full p-3 mb-2 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300"
            disabled={loading}
          />

          {password && (
            <p className={`text-sm mb-4 ${
              passwordStrength === 'Strong'
                ? 'text-green-500'
                : passwordStrength === 'Medium'
                ? 'text-yellow-500'
                : 'text-red-500'
            }`}>
              Password Strength: {passwordStrength}
            </p>
          )}

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          {showForgotLink && (
            <p className="text-center mb-4">
              <a
                href="/forgot-password?role=user"
                className="text-sm text-orange-500 hover:underline font-medium"
              >
                Forgot Password?
              </a>
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl text-lg shadow-lg transition duration-200 font-semibold focus:outline-none focus:ring-4 focus:ring-orange-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading && <FaSpinner className="animate-spin h-5 w-5 mr-2" />}
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-orange-500 hover:underline font-semibold">Sign Up</a>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;
